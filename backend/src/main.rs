use std::collections::{HashMap, HashSet};
use std::fs::{read_to_string, File};
use std::io::Write;
use std::process::Command;

mod plugin;
mod types;

use plugin::Plugin;
use tide::{Request, Response};
use types::{GetSolidityCodeRequest, GetSolidityCodeResponse};

async fn get_solidity_code(mut request: Request<()>) -> tide::Result {
    let request_params: GetSolidityCodeRequest = request.body_json().await?;

    let ids: HashSet<u32> = HashSet::from_iter(request_params.plugins.iter().map(|p| p.id));
    let plugin_map: HashMap<u32, &HashMap<String, String>> =
        HashMap::<_, _, _>::from_iter(request_params.plugins.iter().map(|p| (p.id, &p.params)));

    let all_plugins = Plugin::get_from_file("plugins.json").unwrap();

    let mut plugins = vec![];
    for plugin in all_plugins {
        if ids.contains(&plugin.id) {
            plugins.push(plugin);
        }
    }

    plugins.iter_mut().for_each(|p| p.enrich(plugin_map[&p.id]));
    let code = add_plugins_to_file(plugins);

    let result = compile_contracts(code);

    let response = Response::builder(200)
        .body(serde_json::to_string(&result).unwrap())
        .build();

    Ok(response)
}

fn add_plugins_to_file(plugins: Vec<Plugin>) -> HashMap<String, String> {
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

    let mut code = HashMap::new();

    for plugin in plugins {
        code.insert(
            plugin.file.clone(),
            read_to_string("../contracts/src/".to_string() + &plugin.file).unwrap(),
        );
    }
    code.insert("UserAccount.sol".to_string(), template);

    return code;
}

fn compile_contracts(code: HashMap<String, String>) -> GetSolidityCodeResponse {
    let mut forge = Command::new("forge");
    forge.arg("build");
    forge.current_dir("../contracts");

    let output = forge.output().unwrap();
    if !output.status.success() {
        return GetSolidityCodeResponse {
            compiled: false,
            artifact: "".to_string(),
            code: HashMap::new(),
        };
    }

    let output_json_path = "../contracts/out/UserAccount.sol/UserAccount.json";
    let artifact = read_to_string(output_json_path).unwrap();

    GetSolidityCodeResponse {
        compiled: true,
        artifact,
        code,
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut app = tide::new();
    app.at("/api").post(get_solidity_code);
    app.listen("127.0.0.1:1510").await?;
    Ok(())
}
