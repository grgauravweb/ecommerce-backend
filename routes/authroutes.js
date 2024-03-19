const express = require('express');
const { 
    createuser, 
    loginuserctrl, 
    getalluser, 
    getauser, 
    deleteauser, 
    updateauser, 
    blockuser,
    unblockuser
} = require('../controller/userctrl');
const { authmiddleware, isadmin } = require('../middlewares/authmiddleware');
const router = express.Router();

router.post("/register", createuser);
router.post("/login", loginuserctrl);
router.get("/all-users", getalluser);
router.get("/:id", authmiddleware, isadmin, getauser);
router.delete("/:id", deleteauser);
router.put("/block-user/:id", authmiddleware, isadmin, blockuser);
router.put("/unblock-user/:id", authmiddleware, isadmin, unblockuser);

module.exports = router;
