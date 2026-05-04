let razorpayLoaded = false;

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (razorpayLoaded) return resolve(true);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      razorpayLoaded = true;
      resolve(true);
    };

    document.body.appendChild(script);
  });
};
