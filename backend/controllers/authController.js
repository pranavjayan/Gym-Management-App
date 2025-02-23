const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
      const { firstName, lastName, mobile, age, email, password, confirmPassword, role } = req.body;
  
      
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      
      const newUser = new User({
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        mobile,
        age,
        role,
      });
  
      await newUser.save();
      res.status(201).json({ message: "User registered successfully", user: newUser });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      console.log("User Found:", user); 
  
      if (!user) return res.status(400).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.json({ token, user }); 
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  
