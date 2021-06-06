const express = require('express'),
    userRoutes = require('./Server_Error_Handling_and_implementation');

var router = express.Router();


router.get('/Server_Error_Handling_and_implementation', userRoutes.read_tours);
router.post('/Server_Error_Handling_and_implementation', userRoutes.create_tours);
router.put('/Server_Error_Handling_and_implementation/:id', userRoutes.update_tours);
router.delete('/Server_Error_Handling_and_implementation/:id', userRoutes.delete_tours);

module.exports = router;