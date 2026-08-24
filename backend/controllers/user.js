import User from '../modals/user.js';
import bcrypt from 'bcryptjs';

const Signup = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password || !phone || !address) {
    return res.status(400).json({
      message: 'Please fill in all fields',
    });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Error creating user',
    });
  }
};