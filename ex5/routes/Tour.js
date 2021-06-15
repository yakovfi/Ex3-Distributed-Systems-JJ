const express = require('express')
userRoutes = require('./Server_Error_Handling_and_implementation');
var router = express.Router();


router.get('/tour', userRoutes.read_Tour);
router.post('/tour', userRoutes.createTour);
router.put('/tour/:id', userRoutes.update_Tour);
router.delete('/tour/:id', userRoutes.delete_Tour);

module.exports = router;