import * as mongoose from 'mongoose';

const jsonMangle = (object) => JSON.parse(JSON.stringify(object));

const expectJSONMatching = (actual, expected) => {
  expect(actual).toMatchObject(jsonMangle(expected));
};

const makeTestSuite = (name, tests) =>
  describe(name, () => {
    let connection;

    beforeAll(async () => {
      connection = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    });

    afterAll(async () => {
      await connection.close();
    });

    tests();
  });

export { jsonMangle, expectJSONMatching, makeTestSuite };
