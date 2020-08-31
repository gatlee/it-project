import * as express from 'express';
import * as path from 'path';
import authRouter from './routes/authRouter';
import portfolioRouter from './routes/portfolioRouter';
import connectToDatabase from './models/index';

connectToDatabase();

const app = express();

app.use(express.static(path.join(process.cwd(), '/dist/apps/client')));

app.use('/api/auth', authRouter);
app.use('/api/portfolio/:username', portfolioRouter);

app.get('*', (_req, res) => {
  res.sendFile('index.html', {
    root: path.join(process.cwd(), '/dist/apps/client'),
  });
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log('Express listening at http://localhost:' + port + '/');
});
server.on('error', console.error);
