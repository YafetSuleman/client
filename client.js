const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const apiProxy = createProxyMiddleware("/api", {
    target: "http://localhost:4000/",
});

app.use(express.static("public"));
app.use(apiProxy);

// app.get("/", (_req, res) => {
//     res.sendFile("./public/home.html", { root: __dirname });
// });

app.listen(3000, function () {
    console.log("Client listening on port 3000");
});
