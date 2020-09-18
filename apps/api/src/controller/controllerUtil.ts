interface Res<T> {
  send: (res: T) => void;
  sendStatus: (code: number) => void;
}

export { Res };
