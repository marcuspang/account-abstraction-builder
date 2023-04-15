/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "service";

export interface Plugin {
  id: number;
  params: { [key: string]: string };
}

export interface Plugin_ParamsEntry {
  key: string;
  value: string;
}

export interface GetSolidityCodeRequest {
  plugins: Plugin[];
}

export interface GetSolidityCodeResponse {
  compiled: boolean;
  artifact: string;
}

function createBasePlugin(): Plugin {
  return { id: 0, params: {} };
}

export const Plugin = {
  encode(message: Plugin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    Object.entries(message.params).forEach(([key, value]) => {
      Plugin_ParamsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Plugin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlugin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          const entry2 = Plugin_ParamsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.params[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Plugin {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      params: isObject(object.params)
        ? Object.entries(object.params).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Plugin): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    obj.params = {};
    if (message.params) {
      Object.entries(message.params).forEach(([k, v]) => {
        obj.params[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Plugin>, I>>(base?: I): Plugin {
    return Plugin.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Plugin>, I>>(object: I): Plugin {
    const message = createBasePlugin();
    message.id = object.id ?? 0;
    message.params = Object.entries(object.params ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBasePlugin_ParamsEntry(): Plugin_ParamsEntry {
  return { key: "", value: "" };
}

export const Plugin_ParamsEntry = {
  encode(message: Plugin_ParamsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Plugin_ParamsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlugin_ParamsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Plugin_ParamsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: Plugin_ParamsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<Plugin_ParamsEntry>, I>>(base?: I): Plugin_ParamsEntry {
    return Plugin_ParamsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Plugin_ParamsEntry>, I>>(object: I): Plugin_ParamsEntry {
    const message = createBasePlugin_ParamsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseGetSolidityCodeRequest(): GetSolidityCodeRequest {
  return { plugins: [] };
}

export const GetSolidityCodeRequest = {
  encode(message: GetSolidityCodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.plugins) {
      Plugin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSolidityCodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSolidityCodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.plugins.push(Plugin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSolidityCodeRequest {
    return { plugins: Array.isArray(object?.plugins) ? object.plugins.map((e: any) => Plugin.fromJSON(e)) : [] };
  },

  toJSON(message: GetSolidityCodeRequest): unknown {
    const obj: any = {};
    if (message.plugins) {
      obj.plugins = message.plugins.map((e) => e ? Plugin.toJSON(e) : undefined);
    } else {
      obj.plugins = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSolidityCodeRequest>, I>>(base?: I): GetSolidityCodeRequest {
    return GetSolidityCodeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetSolidityCodeRequest>, I>>(object: I): GetSolidityCodeRequest {
    const message = createBaseGetSolidityCodeRequest();
    message.plugins = object.plugins?.map((e) => Plugin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetSolidityCodeResponse(): GetSolidityCodeResponse {
  return { compiled: false, artifact: "" };
}

export const GetSolidityCodeResponse = {
  encode(message: GetSolidityCodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.compiled === true) {
      writer.uint32(8).bool(message.compiled);
    }
    if (message.artifact !== "") {
      writer.uint32(18).string(message.artifact);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSolidityCodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSolidityCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.compiled = reader.bool();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.artifact = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSolidityCodeResponse {
    return {
      compiled: isSet(object.compiled) ? Boolean(object.compiled) : false,
      artifact: isSet(object.artifact) ? String(object.artifact) : "",
    };
  },

  toJSON(message: GetSolidityCodeResponse): unknown {
    const obj: any = {};
    message.compiled !== undefined && (obj.compiled = message.compiled);
    message.artifact !== undefined && (obj.artifact = message.artifact);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSolidityCodeResponse>, I>>(base?: I): GetSolidityCodeResponse {
    return GetSolidityCodeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetSolidityCodeResponse>, I>>(object: I): GetSolidityCodeResponse {
    const message = createBaseGetSolidityCodeResponse();
    message.compiled = object.compiled ?? false;
    message.artifact = object.artifact ?? "";
    return message;
  },
};

export interface Service {
  GetSolidityCode(request: GetSolidityCodeRequest): Promise<GetSolidityCodeResponse>;
}

export class ServiceClientImpl implements Service {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "service.Service";
    this.rpc = rpc;
    this.GetSolidityCode = this.GetSolidityCode.bind(this);
  }
  GetSolidityCode(request: GetSolidityCodeRequest): Promise<GetSolidityCodeResponse> {
    const data = GetSolidityCodeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetSolidityCode", data);
    return promise.then((data) => GetSolidityCodeResponse.decode(_m0.Reader.create(data)));
  }
}

export interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
