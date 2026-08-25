import Drinks from '../modals/drinks.js';


 export  const createDrink = async (req, res) => {
  try {
    const drink = new Drinks(req.body);
    await drink.save();
    res.status(201).json({
      success: true,
      message: "drink created successfully",
      data: drink,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};