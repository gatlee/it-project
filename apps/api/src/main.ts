import * as express from 'express';
import * as path from 'path';
import { Message } from '@pure-and-lazy/api-interfaces';

const app = express();

app.use(express.static(path.join(process.cwd(), '/dist/apps/client')));

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});


app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(process.cwd(), '/dist/apps/client')});
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log('Express listening at http://localhost:' + port + '/');
});
server.on('error', console.error);
