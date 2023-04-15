import { UnaryCallback, Client} from "@grpc/grpc-js/build/src/client";
import { Rpc } from "./service";
import { ChannelCredentials } from "@grpc/grpc-js";

export class HttpRpc implements Rpc {
  request(service: string, method: string, data: Uint8Array) {
    const path = `${service}.${method}`;

    return new Promise<Uint8Array>((resolve, reject) => {
      const resultCallback: UnaryCallback<any> = (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      };

      function passThrough(argument: any) {
        return argument;
      }

      const conn = new Client("localhost:1510", ChannelCredentials.createInsecure());

      conn.makeUnaryRequest(path, passThrough, passThrough, data, resultCallback);
    });
  }
};
