const express = require('express'),
    userRoutes = require('./Server_Error_Handling_and_implementation');

var router = express.Router();


router.get('/Server_Error_Handling_and_implementation', userRoutes.read_guide);
router.post('/Server_Error_Handling_and_implementation', userRoutes.create_guide);
router.put('/Server_Error_Handling_and_implementation/:id', userRoutes.update_guide);
router.delete('/Server_Error_Handling_and_implementation/:id', userRoutes.delete_guide);

module.exports = router;