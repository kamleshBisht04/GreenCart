import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    offerPrice: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: 'Offer price must be <= price',
      },
    },

    images: {
      type: [String],
      required: true,
      validate: [(val) => val.length > 0, 'At least one image required'],
    },

    description: {
      type: [String],
      required: true,
      validate: [(val) => val.length > 0, 'Description required'],
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.models.Product || mongoose.model('Product',productSchema);

export default Product;
