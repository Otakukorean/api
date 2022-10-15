module.exports = (sequelize , DataTypes) => {
    const history_list = sequelize.define("history_list" ,{
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
        Poster : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        related_name : {
            type : DataTypes.STRING,
            allowNull : false,
        } ,
        anime_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', 

    })

    
    history_list.associate = (models) => {
        history_list.belongsTo(models.Users , {
            onDelete : "cascade",
        })
    }
    return history_list
}