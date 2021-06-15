const express = require('express')
userRoutes = require('./Server_Error_Handling_and_implementation');
var router = express.Router();


router.get('/Server_Error_Handling_and_implementation', userRoutes.read_users);
router.post('/Server_Error_Handling_and_implementation', userRoutes.createTour);
router.put('/Server_Error_Handling_and_implementation/:id', userRoutes.update_user);
router.delete('/Server_Error_Handling_and_implementation/:id', userRoutes.delete_user);

module.exports = router;

// router.post('/Tours', (req, res) => {
//     const Tour = new Tour(req.body);

//     Tour.save().then(Tour=>
//         res.status(201).send(Tour)
//     ).catch(e=>res.status(400).send(e))
// })

// router.get('/Tours', (req, res) => {
//     Tour.find().populate('author').then(Tours => res.send(Tours)
//     ).catch (e=> res.status(500).send())
// })
