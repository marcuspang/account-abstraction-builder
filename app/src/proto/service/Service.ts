// Original file: ../backend/proto/service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetSolidityCodeRequest as _service_GetSolidityCodeRequest, GetSolidityCodeRequest__Output as _service_GetSolidityCodeRequest__Output } from '../service/GetSolidityCodeRequest';
import type { GetSolidityCodeResponse as _service_GetSolidityCodeResponse, GetSolidityCodeResponse__Output as _service_GetSolidityCodeResponse__Output } from '../service/GetSolidityCodeResponse';

export interface ServiceClient extends grpc.Client {
  GetSolidityCode(argument: _service_GetSolidityCodeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_service_GetSolidityCodeResponse__Output>): grpc.ClientUnaryCall;
  GetSolidityCode(argument: _service_GetSolidityCodeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_service_GetSolidityCodeResponse__Output>): grpc.ClientUnaryCall;
  GetSolidityCode(argument: _service_GetSolidityCodeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_service_GetSolidityCodeResponse__Output>): grpc.ClientUnaryCall;
  GetSolidityCode(argument: _service_GetSolidityCodeRequest, callback: grpc.requestCallback<_service_GetSolidityCodeResponse__Output>): grpc.ClientUnaryCall;
  getSolidityCode(argument: _service_GetSolidityCodeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_service_GetSolidityCodeResponse__Output>): grpc.ClientUnaryCall;
  getSolidityCode(argument: _service_GetSolidityCodeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_service_GetSolidityCodeResponse__Output>): grpc.ClientUnaryCall;
  getSolidityCode(argument: _service_GetSolidityCodeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_service_GetSolidityCodeResponse__Output>): grpc.ClientUnaryCall;
  getSolidityCode(argument: _service_GetSolidityCodeRequest, callback: grpc.requestCallback<_service_GetSolidityCodeResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ServiceHandlers extends grpc.UntypedServiceImplementation {
  GetSolidityCode: grpc.handleUnaryCall<_service_GetSolidityCodeRequest__Output, _service_GetSolidityCodeResponse>;
  
}

export interface ServiceDefinition extends grpc.ServiceDefinition {
  GetSolidityCode: MethodDefinition<_service_GetSolidityCodeRequest, _service_GetSolidityCodeResponse, _service_GetSolidityCodeRequest__Output, _service_GetSolidityCodeResponse__Output>
}
