module.exports = (sequelize , DataTypes) => {
    const Watchlist = sequelize.define("Watchlist" , {
       show_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Shows',
              key: 'id'
            }
          },
    },
    {
        charset: 'utf8',
        collate: 'utf8_general_ci', 
      })

    
    Watchlist.associate = (models) => {
        Watchlist.belongsTo(models.Users , {
            onDelete : "cascade",
            
        })
    }
    return Watchlist
}