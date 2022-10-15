const express = require('express');
const {Episodes} = require('../models');
const route = express.Router();
const {
    verifyTokenAndAdmin,
  
  } = require("../middlewares/validateAuth.js");

route.get('/' , async (req,res) => {
    const getAllEpisods = await Episodes.findAll({
        order: [ [ 'createdAt', 'DESC' ]]
    })
    res.status(200).json(getAllEpisods);
})

route.get('/:show_id' , async (req, res) => {
    const id = req.params.episodId;
    const ShowId = req.params.show_id;

    try {
        const getEpisod= await Episodes.findAll({where : {ShowId :ShowId}})
        res.status(200).json(getEpisod)
    } catch (error) {
        
        res.status(404).json(error.message)
    }
})
route.get('/one/:id' , async (req, res) => {
    const id = req.params.id;
    const ShowId = req.params.show_id;

    try {
        const getEpisod= await Episodes.findOne({where : {id :id}})
        res.status(200).json(getEpisod)
    } catch (error) {
        
        res.status(404).json(error.message)
    }
})


route.post('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const addEpisodes = await Episodes.create(req.body);
        res.status(201).json(addEpisodes)
    } catch (error) {
        res.status(404).json(error.message)
    }
    

})
route.put('/:id',verifyTokenAndAdmin, async (req, res) => {
    const updateepisode = await Episodes.update({
        title : req.body.title,
        server_one : req.body.server_one,
        server_tow : req.body.server_tow,
        server_three : req.body.server_three,
        server_four : req.body.server_four,
        server_five : req.body.server_five ,
        ShowId : req.body.ShowId,
        is_first: req.body.is_first,
        is_last : req.body.is_last ,
        poster : req.body.poster,
     },{where : {id : req.params.id}})

     res.json(updateepisode)
     



})
route.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Episodes.destroy({where : {id : req.params.id}})
        res.json("DELETED")
    } catch (error) {
        res.status(404).json(error.message)
    }
    

})





module.exports =route