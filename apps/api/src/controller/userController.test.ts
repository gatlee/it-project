// Simply Testing
import wowController from './userController';
test('that ok is returned', async () => {
  //Setup
  let actual: string;
  const res = {
    send: (data) => {
      actual = data;
    },
  };
  const req = {};
  wowController.getOk(req, res);
  expect(actual).toBe('ok');
});
