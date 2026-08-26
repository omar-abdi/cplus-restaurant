import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
     
    },
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

const Product = mongoose.model('Prod', foodSchema);

export default Product;