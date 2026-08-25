import mongoose from 'mongoose';

const drinksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    
    },

    image: {
      type: String,
      required: true,
    },
},
{ timestamps: true }
);

const Drinks = mongoose.model('Drinks', drinksSchema);

export default Drinks;