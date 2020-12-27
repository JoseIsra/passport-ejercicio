
const Sequelize = require('sequelize');
const userModel = require('../models/users');
const dbData = require('../dbCredentials');


const sequelize = new Sequelize(dbData.database,dbData.user,dbData.password, {
    host:dbData.host,
    dialect:'mysql'
});


const User = userModel(sequelize , Sequelize);


sequelize.sync({force:false})
.then(()=>console.log("sincronizacion exitosa"))
.catch((err)=>console.log(err));

module.exports= {
    User
}

