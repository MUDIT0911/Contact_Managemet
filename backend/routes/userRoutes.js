const express = require('express');
const { Signup, login, getAllUser, deleteUser } = require('../controllers/userController');
const router = express.Router();


router.post('/signup', Signup);

router.post('/login', login);
router.get('/getalluser', getAllUser);
router.delete('/deleteuser/:user_id', deleteUser);


module.exports = router;