module.exports = (sequelize , DataTypes) => {
  const Shows =  sequelize.define("Shows", 
  {
  name : {
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
title : {
  type : DataTypes.STRING,
  allowNull : false,
  charset: 'utf8',
  collate: 'utf8_general_ci', 
  validate: {
      customValidator(value) {
        if (value === null) {
          throw new Error("title is required");
        }
      }
    }
} ,
name_2:{ 
  type : DataTypes.STRING,
  allowNull : false,
  validate: {
      customValidator(value) {
        if (value === null) {
          throw new Error("Name2 is required");
        }
      }
    }
},
status : {
  type : DataTypes.STRING,
  allowNull : false,
} ,
relatedName : {
  type : DataTypes.STRING,
  allowNull : false,
},
description : {
    type : DataTypes.TEXT('long'),
    charset: 'utf8',
    collate: 'utf8_general_ci', 
    allowNull : false,
    validate: {
        customValidator(value) {
          if (value === null) {
            throw new Error("description is required");
          }
        }
      }
} ,
imdb_rating : {
    type : DataTypes.FLOAT
} ,
release_date : {
    type : DataTypes.INTEGER,
    allowNull : false,
    validate: {
        customValidator(value) {
          if (value === null) {
            throw new Error("release date is required");
          }
        }
      }
},
seaseon_release : {
    type : DataTypes.STRING,
    allowNull : false,
} ,
poster : {
    type : DataTypes.STRING,
    allowNull : false,
    validate: {
        customValidator(value) {
          if (value === null) {
            throw new Error("poster date is required");
          }
        }
      }
},
main_poster : {
  type : DataTypes.STRING,
  allowNull : false,
} ,
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'category',
      key: 'id'
    }
  } ,
  isMovie : {
    type : DataTypes.BOOLEAN,
    defaultValue: false
  },
  isSeries : {
    type : DataTypes.BOOLEAN,
    defaultValue: false
  },
  isOna : {
    type : DataTypes.BOOLEAN,
    defaultValue: false
  },
  isOva : {
    type : DataTypes.BOOLEAN,
    defaultValue: false
  },
  youtube_trailer : {
    type : DataTypes.STRING,

  }
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'Movies',
  charset: 'utf8',
  collate: 'utf8_general_ci', 
}
  ) 

  

  Shows.associate = (models) => {
    Shows.belongsTo(models.Category, {
        foreignKey: 'category_id',
        onDelete : "cascade"
      });
      Shows.belongsTo(models.Watchlist, {
        onDelete : "cascade"
      });
      Shows.belongsTo(models.favorite_list, {
        onDelete : "cascade"
      });
      Shows.belongsToMany(models.Gener, {
        through: 'Show_tag',
        foreignKey: 'show_id',
      });
      Shows.hasMany(models.Comments ,{ 
        onDelete : "cascade"
      });
      Shows.hasMany(models.Likes ,{ 
        onDelete : "cascade"
      })
      Shows.hasMany(models.Episodes ,{ 
        onDelete : "cascade"
})
      
  }

  return Shows

}
