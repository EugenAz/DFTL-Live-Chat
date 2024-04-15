import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

// Middleware to log the request
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.get('/meeting', (req, res) => {
  const filePath = path.join('fixtures', 'meetings.json');

  console.log('filePath', filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send('File not found');
      return;
    }

    res.header('Content-Type', 'application/json');
    res.send(data);
  });
});

app.get('/meeting/:id', (req, res) => {
  const filePath = path.join('fixtures', `${req.params.id}.json`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send('File not found');
      return;
    }

    res.header('Content-Type', 'application/json');
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`meeting-service running on http://localhost:${PORT}`);
});
