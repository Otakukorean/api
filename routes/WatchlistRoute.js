const express = require('express');
const {Watchlist} = require('../models');
const {
    validateToken ,

  } = require("../middlewares/validateAuth.js");
const route = express.Router()

route.get('/',validateToken , async (req,res) => {
    const watchlist = await Watchlist.findAll();
    res.status(200).json(watchlist);
})


route.post('/',validateToken , async (req,res) => {

    try {
        const addtoWatchlist = await Watchlist.create(req.body)
        res.status(201).json(addtoWatchlist)  
    } catch (error) {
        res.status(401).json(error.message)
    }
   

    
})







module.exports =route