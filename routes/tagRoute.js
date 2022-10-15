const router = require('express').Router();
const { Gener, Shows, Series_tag } = require('../models');
const {
  verifyTokenAndAdmin,
  
  verifyTokenAndCeo
} = require("../middlewares/validateAuth.js");
// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
 await Gener.findAll({
  include: [
    {
      model: Shows 
    }
  ]
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/one/:tag_name',async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
 await Gener.findOne({
    where: {
      tag_name:decodeURI(req.params.tag_name) 
    },
    include: [
      {
        model: Shows 
      }
    ]
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this ID' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});



router.post('/', verifyTokenAndAdmin,async(req, res) => {
  // create a new tag
 await Gener.create({
    tag_name: req.body.tag_name
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
});

router.put('/:id',verifyTokenAndAdmin,async (req, res) => {
  // update a tag's name by its `id` value
 await Gener.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData[0]) {
        res.status(404).json({ message: 'No tag found with this ID'});
        return;
      }
      res.json(dbTagData);
    })
});

router.delete('/:id',verifyTokenAndAdmin,async (req, res) => {
  // delete on tag by its `id` value
 await Gener.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this ID'});
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err.message);
    })
});

module.exports = router;