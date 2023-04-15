use std::{env, path::PathBuf};

fn main() {
    let proto_file = "./proto/service.proto";
    let out_dir = PathBuf::from(env::var("OUT_DIR").unwrap()); // Add this

    tonic_build::configure()
        .build_server(true)
        .file_descriptor_set_path(out_dir.join("service_descriptor.bin")) // Add this
        .out_dir("./src")
        .compile(&[proto_file], &["."])
        .unwrap_or_else(|e| panic!("protobuf compile error: {}", e));

    println!("cargo:rerun-if-changed={}", proto_file);
}
