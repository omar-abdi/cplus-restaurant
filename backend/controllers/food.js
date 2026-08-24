import Food from '../modals/food.js';

  export    const createCar = async (req, res) => {
  try {
    const car = new Food(req.body);
    await car.save();
    res.status(201).json({
      success: true,
      message: "food created successfully", 
      data: car,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};   