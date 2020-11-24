const router = require('express').Router();
const {User} = require('../dbonfig/dbconfig');


router.post('/', async(req,res)=> {
    await User.create(req.body);
    res.end();
});



module.exports = router;