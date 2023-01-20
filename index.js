const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const port = 4000;

// insert cookies
app.post("/message", async (req, res) => {
  const { message } = req.body;
  console.log('message:', message)
  try {
    res.status(201).cookie("message", message).json({ status: "true" });
  } catch (error) {
    res.status(500).json({ status: "false" });
  }
});

// get Cookies
app.get("/message", async (req, res) => {
  const cookieMessage = req.cookies.message;
  res.status(200).json({ cookieMessage });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
