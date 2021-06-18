const router = require("express").Router();
const userController = require("../../controllers/userController.js");

// @route GET api/user/get
// @desc Retrieve user
// @access Public
router.route("/get/:id").get(userController.get);

// @route POST api/user/create
// @desc Register user
// @access Public
router.route("/create").post(userController.create);

// @route PUT api/user/update
// @desc Update user records
// @access Public
router.route("/update").put(userController.update);

// @route PUT api/user/update/bookmarks
// @desc Update user bookmarks
// @access Public
router.route("/update/bookmarks").put(userController.updateBookmarks);

// @route PUT api/user/update/recentviews
// @desc Update users recently viewed nfts
// @access Public
router.route("/update/recentviews").put(userController.updateRecentlyViewed);

// @route DELETE api/user/delete
// @desc Remove user from database
// @access Public
router.route("/delete").delete(userController.delete);

module.exports = router;