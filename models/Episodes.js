module.exports = (sequelize , DataTypes) => {
    const Episodes = sequelize.define("Episodes", {
        title : {
            type : DataTypes.STRING,
            allowNull : false,
            validate: {
                customValidator(value) {
                  if (value === null) {
                    throw new Error("title is required");
                  }
                }
              }
        } ,
        search_title : {
            type : DataTypes.STRING,
        },
        server_one : {
            type : DataTypes.STRING,
            allowNull : false, 
            isUrl: true, 
        } ,
        server_tow : {
            type : DataTypes.STRING,

            isUrl: true, 
        } ,
        server_three : {
            type : DataTypes.STRING,
            allowNull : false, 
            isUrl: true, 
        } ,
        server_four : {
            type : DataTypes.STRING,
            isUrl: true, 
        } ,
        server_five : {
            type : DataTypes.STRING,
            isUrl: true, 
        } ,
        server_six : {
            type : DataTypes.STRING,
            isUrl: true, 
        } ,
        is_first : {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_last : {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        } ,
        poster : {
            type : DataTypes.STRING
        }
        
    
    } ,
    {
        charset: 'utf8',
        collate: 'utf8_general_ci', 
      })

      Episodes.associate = (models) => {
        Episodes.hasMany(models.history_list, {
           
         });
    }


    return Episodes
}