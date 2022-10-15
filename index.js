const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.port || 5000;
const db = require('./models');
const cors = require('cors');
const morgan = require("morgan")
const helmet = require("helmet");
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const session =require('express-session');
app.use(express.json());
app.use(cors());

app.use(morgan("common"))
app.use(helmet({
    referrerPolicy: false,
}));
app.use(cookieparser())
app.use(bodyparser.urlencoded({extended: true}));
app.use(session({
   key : "userId" ,
   secret : "Ahmed2003" ,
   resave : false ,
   saveUninitialized : false,
   cookie : {
    expires: 60 * 60 * 1000
   } 
}))

const userRoutes = require('./routes/UserRoute.js')
app.use('/user' , userRoutes)


const GenerRoutes = require('./routes/CategoryRoute.js')
app.use('/gener' , GenerRoutes)


const TagRoutes = require('./routes/tagRoute.js')
app.use('/tag' , TagRoutes)



const ShowsRoute = require('./routes/ShowsRoute.js')
app.use('/shows' , ShowsRoute)

const EpisodeRoutes = require('./routes/EpisodesRoute.js')
app.use('/episodes', EpisodeRoutes)

const watchlistRoutes = require('./routes/WatchlistRoute.js')
app.use('/watchlist' , watchlistRoutes)

const favoritelistRoutes = require('./routes/favorite_listRoute.js')
app.use('/favorite' , favoritelistRoutes)

const historyRoutes = require('./routes/historyRoute.js')
app.use('/history' , historyRoutes)

db.sequelize.sync().then(() => {
    app.listen(port , () => {
        console.log(`Listening on port ${port}`);
    })
})
