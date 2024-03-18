const express = require('express');
const { 
    createuser, 
    loginuserctrl, 
    getalluser, 
    getauser, 
    deleteauser, 
    updateauser 
} = require('../controller/userctrl');
const router = express.Router();

router.post("/register", createuser);
router.post("/login", loginuserctrl);
router.get("/all-users", getalluser);
router.get("/:id", getauser);
router.delete("/:id", deleteauser);
router.put("/:id", updateauser);

module.exports = router;
