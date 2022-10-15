module.exports = (sequelize , DataTypes) => {
    const Show_tag =  sequelize.define("Show_tag", 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          show_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Shows',
              key: 'id'
            }
          },
          tag_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'tag',
              key: 'id'
            }
          }
        },
        {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'Show_tag',
          charset: 'utf8',
          collate: 'utf8_general_ci', 

        }
    ) 
    return Show_tag
  
  }
  