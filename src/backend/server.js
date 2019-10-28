if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const app = express();

const init_pass = require('./passport-config');
init_pass(passport, email => users.find(user => user.email === email));

const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render(path.join(__dirname, '../frontend', 'index.ejs'), {name: 'Kyle'});
});

app.get('/login', (req, res) => {
    res.render(path.join(__dirname, '../frontend', 'login.ejs'));
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/register', (req, res) => {
    res.render(path.join(__dirname, '../frontend', 'register.ejs'));
});

app.post('/register', async (req, res) => {
   try {
       // TODO: password to be stored in database
       const hashedPassword = await bcrypt.hash(req.body.password, 10);
       users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
       });
       res.redirect('/login');
   } catch {
       res.redirect('register');
   }
    console.log(users);
});

app.post('/login', (req, res) => {
    
});

app.listen(3000);
