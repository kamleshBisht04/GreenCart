import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    address: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Address',
    },

    status: {
      type: String,
      enum: [
        'Order Placed',
        'Confirmed',
        'Packed',
        'Shipped',
        'Out for Delivery',
        'Delivered',
        'Cancelled',
      ],
      default: 'Order Placed',
    },

    paymentType: {
      type: String,
      enum: ['COD', 'ONLINE'],
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
