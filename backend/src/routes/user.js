const router = require('express').Router();
const {User} = require('../dbonfig/dbconfig');
// const passport = require('passport');




router.post('/', async(req,res)=> {
    await User.create(req.body);
    
});

router.post('/login', async(req, res)=> {
    
    const usuario = await User.findOne({
        where:{
            nombre: req.body.nombre
        }
    });

    if(!usuario) return console.log("no existe ese usuario");
    
        if(usuario.contraseña !== req.body.contraseña){
            console.log("no es la contraseña")
        }else{
            let userJson = JSON.stringify(usuario);
            console.log("usuario logeado");
            res.send(userJson);res.end();
        }
    
})



module.exports = router;