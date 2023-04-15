use std::collections::{HashMap, HashSet};
use std::fs::{read_to_string, File};
use std::io::Write;
use std::process::Command;

use tonic::{transport::Server, Request, Response, Status};

mod plugin;

mod service {
    include!("service.rs");

    pub(crate) const FILE_DESCRIPTOR_SET: &[u8] =
        tonic::include_file_descriptor_set!("service_descriptor");
}

use crate::service::service_server::{Service, ServiceServer};
use crate::service::{GetSolidityCodeRequest, GetSolidityCodeResponse};
use plugin::Plugin;

#[derive(Default)]
pub struct ServiceImpl {}

#[tonic::async_trait]
impl Service for ServiceImpl {
    async fn get_solidity_code(
        &self,
        request: Request<GetSolidityCodeRequest>,
    ) -> Result<Response<GetSolidityCodeResponse>, Status> {
        println!("Request from {:?}", request.remote_addr());

        let request_params = request.into_inner();

        let ids: HashSet<i32> = HashSet::from_iter(request_params.plugins.iter().map(|p| p.id));
        let plugin_map: HashMap<i32, &HashMap<String, String>> =
            HashMap::<_, _, _>::from_iter(request_params.plugins.iter().map(|p| (p.id, &p.params)));

        let all_plugins = Plugin::get_from_file("plugins.json").unwrap();

        let mut plugins = vec![];
        for plugin in all_plugins {
            if ids.contains(&plugin.id) {
                plugins.push(plugin);
            }
        }

        plugins.iter_mut().for_each(|p| p.enrich(plugin_map[&p.id]));
        add_plugins_to_file(plugins);

        let response = compile_contracts();

        Ok(Response::new(response))
    }
}

fn add_plugins_to_file(plugins: Vec<Plugin>) {
    let mut template = read_to_string("UserAccount.solx").unwrap();

    let constants = plugins
        .iter()
        .map(|p| p.constants.clone())
        .reduce(|s1, s2| s1.to_string() + "\n" + &s2)
        .unwrap();

    let on_execute_calls = plugins
        .iter()
        .map(|p| p.on_execute_calls.clone())
        .reduce(|s1, s2| s1 + "\n" + &s2)
        .unwrap();

    let imports = plugins
        .iter()
        .map(|p| p.imports.clone())
        .reduce(|s1, s2| s1 + "\n" + &s2)
        .unwrap();

    template = template.replace("<CONSTANTS>", &constants);
    template = template.replace("<LIBRARY_CALLS>", &on_execute_calls);
    template = template.replace("<IMPORTS>", &imports);

    let mut f = File::create("../contracts/src/UserAccount.sol").expect("Unable to create file");

    f.write_all(template.as_bytes())
        .expect("Unable to write data");
}

fn compile_contracts() -> GetSolidityCodeResponse {
    let mut forge = Command::new("forge");
    forge.arg("build");
    forge.current_dir("../contracts");

    let output = forge.output().unwrap();
    if !output.status.success() {
        return GetSolidityCodeResponse {
            compiled: false,
            artifact: "".to_string(),
        };
    }

    let output_json_path = "../contracts/out/UserAccount.sol/UserAccount.json";
    let artifact = read_to_string(output_json_path).unwrap();

    GetSolidityCodeResponse {
        compiled: true,
        artifact,
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "[::1]:1510".parse().unwrap();
    let service = ServiceImpl::default();

    println!("Service server listening on {}", addr);

    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(service::FILE_DESCRIPTOR_SET)
        .build()
        .unwrap();

    Server::builder()
        .add_service(ServiceServer::new(service))
        .add_service(reflection_service)
        .serve(addr)
        .await?;

    Ok(())
}
