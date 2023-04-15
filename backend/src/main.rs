use tonic::{transport::Server, Request, Response, Status};

mod service {
    include!("service.rs");

    pub(crate) const FILE_DESCRIPTOR_SET: &[u8] =
        tonic::include_file_descriptor_set!("service_descriptor");
}

use crate::service::service_server::{Service, ServiceServer};
use crate::service::{GetSolidityCodeRequest, GetSolidityCodeResponse};

#[derive(Default)]
pub struct ServiceImpl {}

#[tonic::async_trait]
impl Service for ServiceImpl {
    async fn get_solidity_code(
        &self,
        request: Request<GetSolidityCodeRequest>,
    ) -> Result<Response<GetSolidityCodeResponse>, Status> {
        println!("Request from {:?}", request.remote_addr());

        let response = GetSolidityCodeResponse {
            compiled: true,
            code: "contract A{}".to_string(),
        };
        Ok(Response::new(response))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "[::1]:1510".parse().unwrap();
    let bookstore = ServiceImpl::default();

    println!("Service server listening on {}", addr);

    let reflection_service = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(service::FILE_DESCRIPTOR_SET)
        .build()
        .unwrap();

    Server::builder()
        .add_service(ServiceServer::new(bookstore))
        .add_service(reflection_service)
        .serve(addr)
        .await?;

    Ok(())
}
