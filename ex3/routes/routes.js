const express = require('express'),
    userRoutes = require('./users');

var router = express.Router();


router.get('/users', userRoutes.read_users);
router.post('/users', userRoutes.createTour);
router.put('/users/:id', userRoutes.update_user);
//We have to add the routes with id's
router.put('/create_location/:id',userRoutes.update_user)
router.delete('/users/:id', userRoutes.delete_user);

module.exports = router;