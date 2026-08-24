import Food from '../modals/food.js';

  export    const createmenu = async (req, res) => {
  try {
    const food = new Food(req.body);
    await car.save();
    res.status(201).json({
      success: true,
      message: "food created successfully", 
      data: food,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getfood = async (req, res) => {
  try {
    const food = await Food.find();
    res.status(200).json({
      success: true,
      message: "food fetched successfully",
      data: food,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



