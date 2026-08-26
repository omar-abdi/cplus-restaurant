import User from '../modals/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
     export const Signup = async (req, res) => {
  const { name, email, password, phone, address ,isAdmin } = req.body;

  if (!name || !email || !password || !phone || !address) {
    return res.status(400).json({
      message: 'Please fill in all fields',
    });
  }
const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(400).json({
    message: 'User already exists',
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
      isAdmin
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to retrieve users",
    });
  }
}; 
// update user to admin  and updatin 
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, name, phone, address ,isAdmin } = req.body;    
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
        if (name) {
            user.name = name;
        }
        if (phone) {
            user.phone = phone;
            }
        if (address) {
            user.address = address;
        }
        if (typeof isAdmin === "boolean") {
            user.isAdmin = isAdmin;
        }
        await user.save();
        res.status(200).json({
            message: "User updated successfully",
            data: user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to update user",
        });
    }
}
  export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please fill in all fields',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Incorrect password',
      });
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
     
res.cookie('access_token' , token , { 
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 1000 * 60 * 60 * 24 * 30,
  path: '/'
});

res.status(200).json({
  message: 'User logged in successfully',
  data: user,
});

  
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Error logging in user',
    });
  }
};

