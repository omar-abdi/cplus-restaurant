import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: 'items.itemModel',
        },

        itemModel: {
          type: String,
          required: true,
          enum: ['Prod', 'Drinks'],
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'preparing',
        'ready',
        'delivered',
        'cancelled',
      ],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;