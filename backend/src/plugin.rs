use std::{collections::HashMap, fs::read_to_string};

use serde::{Deserialize, Serialize};
use serde_json::Result;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Plugin {
    pub id: u32,
    pub constants: String,
    pub on_execute_calls: String,
    pub imports: String,
    pub file: String,
}

impl Plugin {
    pub fn get_from_file(filename: &str) -> Result<Vec<Self>> {
        let file = read_to_string(filename).unwrap();

        let plugins: Vec<Self> = serde_json::from_str(&file)?;

        return Ok(plugins);
    }

    pub fn enrich(&mut self, params: &HashMap<String, String>) {
        for (param_key, param) in params {
            self.constants = self.constants.replace(param_key, param);
            self.on_execute_calls = self.on_execute_calls.replace(param_key, param);
            self.imports = self.imports.replace(param_key, param);
        }
    }
}
