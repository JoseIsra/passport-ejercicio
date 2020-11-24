
module.exports = (sequelize, type)=>{
    return sequelize.define('users',{
        nombre:{
            type:type.STRING
        },
        contraseña:{
            type:type.STRING
        }
    }, {
        timestamps:false
    } )
}