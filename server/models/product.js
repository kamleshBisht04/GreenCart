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
    },
    image: {
      type: [String],
      required: true,
      validate: [(val) => val.length > 0, 'At least one image required'],
    },

    //varient
    variants: {
      type: [
        {
          _id: false,
          quantity: {
            type: Number,
            required: true,
          },
          unit: {
            type: String,
            enum: ['g', 'kg', 'ml', 'l'],
            required: true,
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
                return value <= this.get('price');
              },
              message: 'offer price must be <= price',
            },
          },
          inStock: {
            type: Boolean,
            default: true,
          },
        },
      ],
      validate: [(val) => val.length > 0, 'At least one variant required'],
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
    description: [String],
  },
  { timestamps: true },
);

export default mongoose.model('Product', productSchema);
