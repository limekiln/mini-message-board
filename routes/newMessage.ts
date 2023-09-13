import express from "express";
import { messages } from ".";

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, _next) {
  res.render("form");
});

router.post("/", (req, res, _next) => {
  console.log("Post Req Body: ", req.body.user);
  messages.push({
    user: req.body.user,
    text: req.body.message,
    added: new Date(),
  });
  res.redirect("/");
});

export { router as newMessageRouter };
