import * as mongoose from 'mongoose';

const makeTestSuite = (name, tests) =>
  describe(name, () => {
    let connection;
    let db;

    beforeAll(async () => {
      connection = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      db = await connection.db();
    });

    afterAll(async () => {
      await connection.close();
      await db.close();
    });

    tests();
  });

export default makeTestSuite;
