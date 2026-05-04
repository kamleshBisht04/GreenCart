import Newsletter from '../models/Newsletter.js';

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    // simple email check
    if (!email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email',
      });
    }

    const exists = await Newsletter.findOne({ email });

    if (exists) {
      return res.status(200).json({
        success: true,
        message: 'Already subscribed ',
      });
    }

    const subscriber = await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully ',
      data: subscriber,
    });
  } catch (error) {
    console.error('Newsletter Error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
