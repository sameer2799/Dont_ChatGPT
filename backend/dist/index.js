import express from 'express';
const app = express();
const port = 5000;
app.get("/hello", (req, res, next) => {
    return res.send('Hello World');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map