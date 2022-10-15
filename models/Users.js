module.exports = (sequelize , DataTypes) => {
    const Users = sequelize.define("Users", {
       username : {
        type : DataTypes.STRING ,
        charset: 'utf8',
        collate: 'utf8_general_ci', 
        allowNull : false ,
       } ,
       email : {
        type : DataTypes.STRING ,
        charset: 'utf8',
        collate: 'utf8_general_ci', 
        allowNull : false ,
        isEmail: true,  
        max: 200,                  
        min: 5,
       } ,
       password : {
        type : DataTypes.STRING ,
        charset: 'utf8',
        collate: 'utf8_general_ci', 
        allowNull : false ,
        max: 255,                  
        min: 3,
       } ,
      isAdmin : {
        type : DataTypes.BOOLEAN ,
        allowNull : false ,
        defaultValue : false
      },
      isCeo : {
        type : DataTypes.BOOLEAN ,
        allowNull : false ,
        defaultValue : false
      },
      isModiratore : {
        type : DataTypes.BOOLEAN ,
        allowNull : false ,
        defaultValue : false
      },
      image : {
        type : DataTypes.STRING ,
      }
        
    
    } ,
    {
        charset: 'utf8',
        collate: 'utf8_general_ci', 
      })

    Users.associate = (models) => {
        Users.hasOne(models.Watchlist , {
            onDelete : "cascade"
        })
        Users.hasOne(models.favorite_list , {
            onDelete : "cascade"
        })
        Users.hasOne(models.history_list , {
            onDelete : "cascade"
        })
    }

    return Users
}