import * as mongoose from 'mongoose';

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

export default makeTestSuite;
