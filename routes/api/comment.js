const router = require("express").Router();
const commentController = require("../../controllers/commentController.js");

// @route GET api/comment/get
// @desc Retrieve comment
// @access Public
router.route("/get/:id").get(commentController.get);

// @route POST api/comment/create
// @desc Register comment
// @access Public
router.route("/create").post(commentController.create);

// @route PUT api/comment/update
// @desc Update comment records
// @access Public
router.route("/update").put(commentController.update);

// @route DELETE api/comment/delete
// @desc Remove comment from database
// @access Public
router.route("/delete").delete(commentController.delete);

module.exports = router;