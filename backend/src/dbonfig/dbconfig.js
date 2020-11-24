
const Sequelize = require('sequelize');
const userModel = require('../models/users');

const sequelize = new Sequelize('pruebapassport','root','54321', {
    host:'localhost',
    dialect:'mysql'
});


const User = userModel(sequelize , Sequelize);


sequelize.sync({force:false})
.then(()=>console.log("sincronizacion exitosa"))
.catch((err)=>console.log(err));

module.exports= {
    User
}

