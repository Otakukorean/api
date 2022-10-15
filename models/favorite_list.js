module.exports = (sequelize , DataTypes) => {
    const favorite_list = sequelize.define("favorite_list" , {
          show_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Shows',
              key: 'id'
            } 
        }  ,
        Show_name : {
          type : DataTypes.STRING,
          allowNull : false,
          charset: 'utf8',
          collate: 'utf8_general_ci', 
          validate: {
              customValidator(value) {
                if (value === null) {
                  throw new Error("Name is required");
                }
              }
            }
      } ,
        Show_title : {
          type : DataTypes.STRING,
          allowNull : false,
          charset: 'utf8',
          collate: 'utf8_general_ci', 
          validate: {
              customValidator(value) {
                if (value === null) {
                  throw new Error("Tilte is required");
                }
              }
            }
      } ,
      Show_related_name : {
        type : DataTypes.STRING,
        allowNull : false,
      },
      Show_imdb_rating : {
          type : DataTypes.STRING
      } ,
      Show_release_date : {
          type : DataTypes.INTEGER,
      },
      Show_seaseon_release : {
          type : DataTypes.STRING,
      } ,
      Show_poster : {
          type : DataTypes.STRING,
      },
      Show_category_id: {
          type: DataTypes.INTEGER,
        } ,
        Show_isMovie : {
          type : DataTypes.BOOLEAN,
          defaultValue: false
        },
        Show_isSeries : {
          type : DataTypes.BOOLEAN,
          defaultValue: false
        },
        Show_isOna : {
          type : DataTypes.BOOLEAN,
          defaultValue: false
        },
        Show_isOva : {
          type : DataTypes.BOOLEAN,
          defaultValue: false
        },
    },
    
    {
        charset: 'utf8',
        collate: 'utf8_general_ci', 
      })

    
    favorite_list.associate = (models) => {
        favorite_list.belongsTo(models.Users , {
            onDelete : "cascade",
        })
    }
    return favorite_list
}