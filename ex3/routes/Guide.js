const express = require('express')
userRoutes = require('./Server_Error_Handling_and_implementation');
var router = express.Router();


router.get('/Server_Error_Handling_and_implementation', userRoutes.read_Guide);
router.post('/Server_Error_Handling_and_implementation', userRoutes.create_Guide);
router.put('/Server_Error_Handling_and_implementation/:id', userRoutes.update_guide);
router.delete('/Server_Error_Handling_and_implementation/:id', userRoutes.delete_guide);

module.exports = router;


// router.post('/Guides', (req, res) => {
//     const Guide = new Guide(req.body)
//     Guide.save().then(Guide => {
//         console.log("in then - save");
//         res.status(201).send(Guide)
//     }).catch(e => {
//         res.status(400).send(e)
//     });
  
// });

// router.get('/Guides', (req, res) => {
//     Guide.find().then(Guides =>
//         res.send(Guides)
//     ).catch(e => res.status(500).send())
// })


// router.put('/Guides/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     Guide.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).then(Guide => {
//         if (!Guide) {
//             return res.status(404).send()
//         }
//         else {
//             console.log(Guide)
//             res.send(Guide)
//         }
//     }).catch(e => res.status(400).send(e))
// })

module.exports = router