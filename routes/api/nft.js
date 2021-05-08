const router = require("express").Router();
const nftController = require("../../controllers/nftController");

// @route GET api/nft/get/all
// @desc Retrieve nft
// @access Public
router.route("/get/all").post(nftController.getAll);

// @route GET api/nft/get
// @desc Retrieve nft
// @access Public
router.route("/get/:id").get(nftController.get);

// @route POST api/nft/create
// @desc Register nft
// @access Public
router.route("/create/:id").post(nftController.create);

// @route PUT api/nft/update
// @desc Update nft records
// @access Public
router.route("/update").put(nftController.update);

// @route DELETE api/nft/delete
// @desc Remove nft from database
// @access Public
router.route("/delete").delete(nftController.delete);

module.exports = router;