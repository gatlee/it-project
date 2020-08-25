import * as mongoose from 'mongoose';

const connectToDatabase = () => {
  const connectionTemplate =
    'mongodb+srv://admin:<password>@it-project-cluster.trdbq.mongodb.net/pureandlazydb?retryWrites=true&w=majority';
  const CONNECTION_STRING = connectionTemplate.replace(
    '<password>',
    process.env.MONGODB_PASSWORD
  );

  mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'pureandlazydb',
  });

  const db = mongoose.connection;
  db.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  db.once('open', async () => {
    console.log('Mongo connection started on ' + db.host + ':' + db.port);
  });
};

export default connectToDatabase;
