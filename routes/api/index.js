const router = require("express").Router();
const userRoutes = require("./user");
const nftRoutes = require("./nft")

router.use("/user", userRoutes);
router.use("/nft", nftRoutes);


module.exports = router