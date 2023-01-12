const express = require("express");
const env = require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const posts = [
  {
    id: 1,
    title: "Post 1",
    content: "This is the content of post 1",
    username: "mujahid",
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is the content of post 2",
    username: "karim",
  },
  {
    id: 3,
    title: "Post 3",
    content: "This is the content of post 3",
    username: "mujahid",
  },
];
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/posts", (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

// User Authentication
app.post("/login", (req, res) => {
  // Authenticate user
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

// Verify Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (res, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(env.PORT || 3000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3000}`
  );
});
