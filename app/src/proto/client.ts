import { ProtoGrpcType } from "@/proto/service";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(process.cwd(), "../backend/proto/service.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  defaults: true,
  oneofs: true,
});

const clientService = (
  grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
).service;

export default clientService;

// const serviceClient = new ServiceClient(
//   `localhost:1510`,
//   grpc.credentials.createInsecure()
// );

// export const temp = serviceClient.getSolidityCode(
//   new GetSolidityCodeRequest(),
//   console.log
// );

// export default serviceClient;
