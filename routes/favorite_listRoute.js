const express = require('express');
const {favorite_list,Shows} = require('../models');
const {
    validateToken 

  } = require("../middlewares/validateAuth");
const route = express.Router()

route.get('/',validateToken , async (req,res) => {
    const UserId = req.user.id;
    const watchlist = await favorite_list.findAll(
      {where : {UserId: UserId}
    
    });
    res.status(200).json(watchlist);
})

route.post('/',validateToken , async (req,res) => {

    const {showId ,Show_title,Show_name,Show_related_name,Show_imdb_rating,Show_release_date,Show_seaseon_release,Show_poster,Show_category_id,Show_isMovie,Show_isSeries,Show_isOna,Show_isOva} = req.body;
    const UserId = req.user.id;
    const found = await favorite_list.findOne({
        where: { show_id: showId,Show_name,Show_title,Show_related_name,Show_imdb_rating,Show_release_date,Show_seaseon_release,Show_poster,Show_category_id,Show_isMovie,Show_isSeries,Show_isOna,Show_isOva,UserId: UserId },

      },
  
      )
      if (!found) {
        await favorite_list.create({ show_id: showId,Show_title,Show_name,Show_related_name,Show_imdb_rating,Show_release_date,Show_seaseon_release,Show_poster,Show_category_id,Show_isMovie,Show_isSeries,Show_isOna,Show_isOva, UserId: UserId });
        res.json({ favorite: true });
      } else {
        await favorite_list.destroy({
          where: { show_id : showId,Show_title,Show_name,Show_related_name,Show_imdb_rating,Show_release_date,Show_seaseon_release,Show_poster,Show_category_id,Show_isMovie,Show_isSeries,Show_isOna,Show_isOva, UserId: UserId },
        });
        res.json({ favorite: false });
      }
})









module.exports =route