const express = require('express');
const session = require('express-session');

const exphbs = require('express-handlebars');
const routes = require('./controllers');

// const routes = require('./controllers');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//sessions setup
const sess = {
    secret: 'Anime_secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

// app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});