
import Order from "../modals/order.js";
import Product from "../modals/food.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({
        message: "You are not authorized",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order items are required",
      });
    }

    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
      const quantity = Number(item.quantity);

      if (!item.product || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          message: "Each item must include a product and a quantity of at least 1",
        });
      }

      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        return res.status(400).json({
          message: "Each product must have a valid ID",
        });
      }

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity,
      });

      totalPrice += product.price * quantity;
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalPrice,
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
};