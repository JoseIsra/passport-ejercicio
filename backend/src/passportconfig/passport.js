
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../dbonfig/dbconfig');

module.exports = function(passport){
    
    passport.use( new LocalStrategy ({
        usernameField: 'nombre',
        passwordField: 'contraseña'
    }, async(nombre, contraseña, done)=>{
        
        const usuario = await User.findOne({
            where:{
                nombre: nombre
            }
        });

        //si no hay usuario
        if(!usuario) return done(null, false);

        //si existe usuario
        if(usuario.contraseña !== contraseña){
            console.log("no es la contraseña");
            return done(null, false);
        }else{
            return done(null, usuario);
        }
    }))

    //serializando al usuario
    passport.serializeUser((user, done)=> {
            done(null, user.id);
    })

    passport.deserializeUser(async (id, done)=>{
        const elUsuario = await User.findByPk(id);
        done(null, elUsuario);
    });
    



}