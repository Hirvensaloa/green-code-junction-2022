// Express server at 6000
const express = require('express');
const {
  generateReadSignedUrl,
  generateUploadSignedUrl,
} = require('./src/storage');
const app = express();
app.use(express.json());

app.get('/file', async (req, res) => {
  const { name } = req.body;
  const url = await generateReadSignedUrl(name);
  res.json({ url });
  res.status = 200;
});

app.post('/file', async (req, res) => {
  const { name, contentType } = req.body;

  const url = await generateUploadSignedUrl(contentType, name);
  res.json({ url });
  res.status = 200;
});

app.listen(6000);
