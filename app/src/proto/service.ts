import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ServiceClient as _service_ServiceClient, ServiceDefinition as _service_ServiceDefinition } from './service/Service';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  service: {
    GetSolidityCodeRequest: MessageTypeDefinition
    GetSolidityCodeResponse: MessageTypeDefinition
    Plugin: MessageTypeDefinition
    Service: SubtypeConstructor<typeof grpc.Client, _service_ServiceClient> & { service: _service_ServiceDefinition }
  }
}

