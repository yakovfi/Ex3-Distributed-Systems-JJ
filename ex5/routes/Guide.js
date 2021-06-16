const express = require('express')
userRoutes = require('./Server_Error_Handling_and_implementation');
var router = express.Router();

router.get('/guide', userRoutes.read_Guide);
router.post('/guide', userRoutes.create_Guide);

module.exports = router;