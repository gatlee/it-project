interface Res<T> {
  send: (res: T) => void;
  status: (res: number) => void;
  sendStatus: (code: number) => void;
}

export { Res };
