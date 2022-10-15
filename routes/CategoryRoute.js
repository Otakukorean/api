const router = require('express').Router();
const { Category, Shows } = require('../models');
const {
  verifyTokenAndAdmin,
  verifyTokenAndCeo

} = require("../middlewares/validateAuth.js");
// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  // find all categories
  // be sure to include its associated Products
 await Category.findAll({
    include: [
      {
        model: Shows 
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
 await Category.findOne({
    where: {
      id:parseInt(req.params.id) 
    }, include: [
      {
        model: Shows 
      }
    ]
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this ID' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.post('/',verifyTokenAndAdmin ,async (req, res) => {
  // create a new category
 await Category.create({
    category_name: req.body.category_name
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      res.status(400).json(err.message);
    });
});

router.put('/:id',verifyTokenAndAdmin,async (req, res) => {
  // update a category by its `id` value
 await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData[0]) {
        res.status(404).json({ message: 'No category found with this ID'});
        return;
      }
      res.json(dbCategoryData);
    })
});

router.delete('/:id',verifyTokenAndAdmin , async(req, res) => {
  // delete a category by its `id` value
await  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this ID'});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;