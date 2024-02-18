const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'usuario' },
});

// Método para validar la contraseña
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Middleware para realizar el hash de la contraseña antes de guardar en la base de datos
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;