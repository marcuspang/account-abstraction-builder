use std::collections::HashMap;
use std::fs::{read_to_string, File};
use std::io::Write;

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

        let plugins = Plugin::get_from_file("plugins.json").unwrap();
        add_plugins_to_file(plugins);

        let response = GetSolidityCodeResponse {
            compiled: true,
            code: HashMap::new(),
        };
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
