import { jsonMangle } from './testUtil';

interface Res<T> {
  send: (res: T) => void;
  status: (res: number) => void;
  sendStatus: (code: number) => void;
}

const callEndpoint = async <T, U>(
  endpoint: (req: T, res: Res<U>) => Promise<void>,
  req: T
) => {
  const result: { data?; status?: number } = {};
  const res: Res<U> = {
    send: (object) => {
      result.data = jsonMangle(object);
      if (!result.status) {
        result.status = 200;
      }
    },
    status: (status) => {
      result.status = status;
    },
    sendStatus: (status) => {
      result.status = status;
    },
  };
  await endpoint(req, res);
  return result;
};

export { Res, callEndpoint };
