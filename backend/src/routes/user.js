const router = require('express').Router();
const {User} = require('../dbonfig/dbconfig');
const passport = require('passport');

router.post('/', async(req,res)=> {
    await User.create(req.body);
    res.end();
});

router.post('/login', (req,res, next)=>{
    passport.authenticate('local', (err,user)=> {
        if(err) throw err;
        if(!user) res.send("no hay usuario");
        else{
            req.login(user , (err) => {
                if(err) throw err;
                res.send("autenticación ready");
                console.log(req.user);
            })
        }
    })(req, res, next);
});

router.get('/ver',(req, res) =>{
    res.send(req.user);
    console.log(typeof req.user);
    res.end();
})


module.exports = router;