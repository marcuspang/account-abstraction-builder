// Original file: ../backend/proto/service.proto

import type { Plugin as _service_Plugin, Plugin__Output as _service_Plugin__Output } from '../service/Plugin';

export interface GetSolidityCodeRequest {
  'plugins'?: (_service_Plugin)[];
}

export interface GetSolidityCodeRequest__Output {
  'plugins': (_service_Plugin__Output)[];
}
