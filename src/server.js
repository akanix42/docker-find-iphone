import express from 'express';
import findIphone from './find-iphone';

const app = express();

app.post('/find-iphone/:deviceName', async function (req, res) {
  try {
    console.log(`Finding device ${req.params.deviceName}`);
    res.send(await findIphone(req.params.deviceName));
  } catch (err) {
    console.error(err)
    res.statusCode = 500;
    res.send(err);
  }
  res.end();
});

export default app;
