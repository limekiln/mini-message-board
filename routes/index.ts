import express from "express";

type Message = {
  text: string;
  user: string;
  added: Date;
};

export const messages: Message[] = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, _next) {
  res.render("index", { title: "Mini Message Board", messages });
});

export { router as indexRouter };
