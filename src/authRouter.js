const express = require('express');
const passport = require('passport');
const User = require('../models/UserModel');

const authRouter = express.Router();

authRouter.get('/login', (req, res) => {
  // Lógica para renderizar la vista de login
  res.render('login');
});

authRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/views/products', // Redirección exitosa
  failureRedirect: '/auth/login', // Redirección en caso de fallo
}));

authRouter.get('/register', (req, res) => {
  // Lógica para renderizar la vista de registro
  res.render('register');
});

authRouter.post('/register', async (req, res) => {
  // Lógica para registrar un nuevo usuario
  const { email, password } = req.body;

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.redirect('/auth/login'); // Redirección después del registro exitoso
  } catch (error) {
    console.error(error);
    res.redirect('/auth/register'); // Redirección en caso de error
  }
});

authRouter.get('/logout', (req, res) => {
  // Lógica para cerrar sesión
  req.logout();
  res.redirect('/auth/login'); // Redirección después de cerrar sesión
});

module.exports = authRouter;