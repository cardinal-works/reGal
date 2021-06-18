const router = require("express").Router();
const userRoutes = require("./user");
const nftRoutes = require("./nft");
const commentRoutes = require("./comment");

router.use("/user", userRoutes);
router.use("/nft", nftRoutes);
router.use("/comment", commentRoutes);


module.exports = router