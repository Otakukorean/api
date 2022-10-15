const express = require('express');
const {Shows , Category ,Gener ,Show_tag } = require('../models');
const route = express.Router();

const {
    verifyTokenAndAdmin,
    verifyTokenAndCeo
  
  } = require("../middlewares/validateAuth.js");
const { Op } = require("sequelize");
route.get('/all' ,async (req,res) => {
const shows =  await Shows.findAll({
    limit : 30 ,
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name']
        },
        {
          model: Gener,
          attributes: ['id'],
        }
      ] 
      
    })
    res.json(shows)

})

route.get('/one/:id',async (req,res) => {
    await Shows.findOne({
         where: {
          id: req.params.id
         },
         include: [
           {
             model: Category,
             attributes: ['id', 'category_name']
           },
           {
             model: Gener,
             attributes: ['id', 'tag_name'],
           }
         ]
       })
         .then(dbProductData => {
           if (!dbProductData) {
             res.status(404).json({message: 'No Show found with this ID'});
             return;
            }
            res.json(dbProductData);
         })
         .catch(err => {
           console.log(err);
           res.status(500).json(err);
         });
   
 })

 route.get('/' , async (req, res) => {
  await Shows.findAll({
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Gener,
        attributes: ['id'],
      }
    ]
  }) .then(dbProductData => {
    if (!dbProductData) {
      res.status(404).json({message: 'No Show found with this Category Id'});
      return;
     }
     res.json(dbProductData);
  })
 })

 route.get('/search/:title',async (req,res) => {
  let title = req.params.title
  title.toLowerCase()
  await Shows.findAll(
    {where : {[Op.or] : [
      {title : { [Op.like] : "%" + title + "%"}},
      {name_2 : { [Op.like] : "%" + title + "%"}}
    ]} 
    ,
    include: [
      {
        model: Category,
      },
      {
        model: Gener,
      }
    ]
  }).then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
})
 route.get('/related/:relatedName/:id',async (req,res) => {
  let relatedName = req.params.relatedName
  let id = req.params.id
  await Shows.findAll(
    {
      where : { 
      [Op.and] : [
        {relatedName : { [Op.like] : "%" + relatedName + "%"}} , 
        {id :{[Op.ne] : id} }
      ]
     }
    ,
    include: [
      {
        model: Category,
      },
      {
        model: Gener,
      }
    ]
  }).then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
})
 route.get('/:year/:season' ,async (req,res) => {

  await Shows.findAll(
    {where : {
      [Op.and] : [
        {release_date : req.params.year} , 
        {seaseon_release :decodeURI(req.params.season) }
      ]
    }
    ,
    include: [
      {
        model: Category,
      },
      {
        model: Gener,
      }
    ]
  }).then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
})
 route.get('/movies',async (req,res) => {

  await Shows.findAll(
    {where : {isMovie : true }
    ,
    include: [
      {
        model: Category,
      },
      {
        model: Gener,
      }
    ]
  }).then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
})
 route.post('/', verifyTokenAndAdmin, async (req, res) => {
    /* req.body should look like this...
      {
        Show: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
    */
   const checkifexiest = await Shows.findOne({where : {name: req.body.name}})
   if(checkifexiest) {
    res.json({error:"Show Is Exiest"})
   } 
   else {
    await Shows.create({
      name: req.body.name,
      description: req.body.description,
      imdb_rating: req.body.imdb_rating,
      release_date: req.body.release_date,
      seaseon_release: req.body.seaseon_release,
      poster: req.body.poster,
      isMovie: req.body.isMovie,
      isSeries: req.body.isSeries,
      isOna: req.body.isOna,
      isOva: req.body.isOva,
      youtube_trailer: req.body.youtube_trailer,
      name_2 : req.body.name_2,
      relatedName: req.body.relatedName,
      category_id: req.body.category_id,
      tagIds: req.body.tag_id,
      status: req.body.status ,
      main_poster : req.body.main_poster,
      title : req.body.title
    })
    .then((show) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            show_id: show.id,
            tag_id,
          };
        });
        return Show_tag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
   }
    
  });


 // update Show
 route.put('/:id',verifyTokenAndAdmin,async (req, res) => {
    // update Show data
   await Shows.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((series) => {
        // find all associated tags from ProductTag
        return Show_tag.findAll({ where: { show_id: req.params.id } });
      })
      .then((productTags) => {
        // get list of current tag_ids
        const productTagIds = Show_tag.map(({ tag_name }) => tag_name);
        // create filtered list of new tag_ids
        const newProductTags = req.body.tagIds
          .filter((tag_name) => !productTagIds.includes(tag_name))
          .map((tag_name) => {
            return {
              show_id: req.params.id,
              tag_name,
            };
          });
        // figure out which ones to remove
        const productTagsToRemove = productTags
          .filter(({ tag_name }) => !req.body.tagIds.includes(tag_name))
          .map(({ id }) => id);
  
        // run both actions
        return Promise.all([
          Show_tag.destroy({ where: { id: productTagsToRemove } }),
          Show_tag.bulkCreate(newProductTags),
        ]);
      })
      .then((updatedProductTags) => res.json(updatedProductTags))
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      });
  });
  
  route.delete('/:id',verifyTokenAndAdmin,async (req, res) => {
    const id = req.params.id;
  
    await Shows.destroy({
      where: {
        id: id,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
  });




module.exports =route