import express from 'express';

const app = express();
app.use(express.json());

const port = 5000;

app.get("/", (req, res, next) => {
  return res.send('Hello World');
});

app.post("/hello", (req, res, next) => {
  req.body.name ? console.log(req.body.name) : console.log('No body');
  return res.send('Hello World');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

