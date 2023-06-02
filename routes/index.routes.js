const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

 router.use("/auth", require("./auth.routes"))


 router.use("/artistas", require("./artist.routes"))

router.use("/obra", require("./artWork.routes")) 

module.exports = router;
