const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Cargar variables de entorno

const User = require('./models/UserModel');
const productRouter = require('./routes/api/productsRouter');
const cartsRouter = require('./routes/api/cartsRouter');
const authRouter = require('./routes/authRouter');
const viewsRouter = require('./routes/viewsRouter');
const { connectToDB } = require('./dao/Dao');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuraciones y middlewares
app.use(bodyParser.json());
app.use(express.static('public'));

// Conexión a la base de datos
connectToDB();

// Configuración de sesiones y passport
app.use(session({
  secret: 'tu_secreto',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Configurar la estrategia local de passport para el login
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user || !user.validatePassword(password)) {
      return done(null, false, { message: 'Credenciales incorrectas' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Configurar la estrategia de GitHub de passport para el login
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });

    if (!user) {
      user = new User({
        email: profile.emails[0].value,
      });
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialización y deserialización del usuario para la sesión
passport.serializeUser((user, done) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  done(null, { userId: user.id, token });
});

passport.deserializeUser(async (data, done) => {
  const user = await User.findById(data.userId);
  done(null, user);
});

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);
app.use('/auth', authRouter); // Rutas de autenticación
app.use('/views', viewsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});