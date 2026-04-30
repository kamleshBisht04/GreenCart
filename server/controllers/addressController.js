import Address from '../models/Address.js';

// Add a new address
export const addAddress = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    if (!firstName || !street || !city || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
      });
    }

    const address = new Address({
      userId: req.user.id,
      firstName,
      lastName,

      street,
      city,
      state,
      zipcode,
      country,
      phone,
    });

    await address.save();

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all addresses for a user
export const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user ID

    const addresses = await Address.find({ userId });

    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete an address by ID
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId: req.user.id,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found or unauthorized',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
