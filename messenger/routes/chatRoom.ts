const router = require("express").Router();
const chatroomController = require("../controllers/chatroomController");


router.get("/", chatroomController.getAllChatrooms);
router.post("/", chatroomController.createChatroom);

module.exports = router;