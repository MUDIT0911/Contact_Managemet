const express = require('express');
const { createContact, deletecontact, getallcontact, updatecontact } = require('../controllers/contactController');
const router = express.Router();


router.post('/createcontact', createContact);

router.put('/updatecontact/:contact_id', updatecontact);
router.delete('/deletecontact/:contact_id', deletecontact);
router.get('/getallcontact/:user_id', getallcontact);


module.exports = router;



