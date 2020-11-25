const router = require('express').Router();
const {User} = require('../dbonfig/dbconfig');
const passport = require('passport');




router.post('/', async(req,res)=> {
    await User.create(req.body);
    
});



router.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err,user)=> {
        if(err) throw err;
        if(!user) res.send("no hay usuario");
        else{
            req.logIn(user , (err) => {
                if(err) throw err;
                    res.send("exito mijo");
                    console.log(req.user);
            })
        }
    })(req, res, next);
});

router.get('/usuario',(req, res) =>{
res.send(req.user);
    
})


module.exports = router;