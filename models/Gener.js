module.exports = (sequelize , DataTypes) => {
    const Gener =  sequelize.define("Gener", 
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tag_name: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'tag',
      charset: 'utf8',
      collate: 'utf8_general_ci', 
    }
    ) 
    Gener.associate = (models) => {
        Gener.belongsToMany(models.Shows, {
          through: 'Show_tag',
          foreignKey: 'tag_id',
          onDelete : "cascade"
        });
    }
    return Gener
  
  }
  