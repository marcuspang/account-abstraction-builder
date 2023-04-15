use std::fs::read_to_string;

use serde::{Deserialize, Serialize};
use serde_json::Result;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Plugin {
    pub id: u32,
    pub constants: String,
    pub on_execute_calls: String,
    pub imports: String,
}

impl Plugin {
    pub fn get_from_file(filename: &str) -> Result<Vec<Self>> {
        let file = read_to_string(filename).unwrap();

        let plugins: Vec<Self> = serde_json::from_str(&file)?;

        return Ok(plugins);
    }
}
