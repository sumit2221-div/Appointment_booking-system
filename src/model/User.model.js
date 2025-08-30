import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: { 
     type: String, 
    required: true
 },
 email: { 
    type: String, 
    required: true,
     unique: true 
    },
 password: { 
    type: String, 
    required: true
 },
 
 role: { type: String,
     enum: ["student", "professor"],
    
     }
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
 
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const bcrypt = await import('bcrypt');
  return bcrypt.compare(candidatePassword, this.password);
}
userSchema.methods.generateJWT = function () {
  return jwt.sign({
    id: this._id, 
    email: this.email, 
    role: this.role 
},
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export default mongoose.model("User", userSchema);
