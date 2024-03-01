const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true
  }
});

//module.exports = mongoose.model('User', userSchema)

// static signup method
userSchema.statics.signup = async function (username, email, password, date_of_birth, phone_number) {
    // validation
    if (!username || !email || !password || !date_of_birth || !phone_number) {
      throw Error("All fields must be filled");
    }
    
    console.log(`Email: ${email}`); // Log the received email
  
    if (!validator.isEmail(email)) {
      console.log('Email validation failed'); // Log if email validation fails
      throw Error("Email not valid");
    }
    
    console.log('Email validation passed'); // Log if email validation passes
    
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, username, date_of_birth, phone_number });

  return user;
};

// static login method
userSchema.statics.login = async function (username, password) {
    if (!username || !password) {
      throw Error("All fields must be filled");
    }
  
    const user = await this.findOne({ username });
    if (!user) {
      throw Error("Incorrect username");
    }
  
    console.log(`Stored hashed password: ${user.password}`); // Log the stored hashed password
    console.log(`Provided password: ${password}`); // Log the provided password
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect password");
    }
  
    return user;
  };

module.exports = mongoose.model("User", userSchema);