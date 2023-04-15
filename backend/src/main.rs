use tonic::{transport::Server, Request, Response, Status};

use tonic::service::service_server::{Service, ServiceServer};
use tonic::service::{GetSolidityCodeRequest, GetSolidityCodeResponse};

mod bookstore {
    include!("service.rs");
}

#[derive(Default)]
pub struct ServiceImpl {}

#[tonic::async_trait]
impl Service for ServiceImpl {
    async fn get_solidity(
        &self,
        request: Request<GetSolidityCodeRequest>,
    ) -> Result<Response<GetSolidityCodeResponse>, Status> {
        println!("Request from {:?}", request.remote_addr());

        let response = GetSolidityCodeResponse {
            compiled: true,
            code: "contract A{}",
        };
        Ok(Response::new(response))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "[::1]:1510".parse().unwrap();
    let bookstore = ServiceImpl::default();

    println!("Service server listening on {}", addr);

    Server::builder()
        .add_service(ServiceServer::new(bookstore))
        .serve(addr)
        .await?;

    Ok(())
}
