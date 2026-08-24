import User from '../modals/user.js';
import bcrypt from 'bcryptjs';

     export const Signup = async (req, res) => {
  const { name, email, password, phone, address ,isAdmin } = req.body;

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




// login 
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
    const token = jwt.sign({
     id: user._id }, 
     process.env.JWT_SECRET,  )
     
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

