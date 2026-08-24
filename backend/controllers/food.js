import Product from '../modals/food.js';

  export    const createmenu = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      success: true,
      message: "food created successfully", 
      data: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getfood = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      success: true,
      message: "food fetched successfully",
      data: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



