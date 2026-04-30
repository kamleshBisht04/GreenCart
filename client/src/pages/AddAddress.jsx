import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import InputField from '../components/InputField';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const AddAddress = () => {
  const { axios, navigate, user } = useAppContext();

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/address/add', address);

      if (data.success) {
        toast.success(data.message);
        navigate('/cart');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => { 
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="mt-24 px-4 pb-16 md:px-10">
      {/* HEADING */}
      <p className="text-2xl text-gray-500 md:text-3xl">
        Add Shipping <span className="text-primary font-semibold">Address</span>
      </p>
      <p className="text-sm text-gray-500">Fill your delivery details</p>

      <div className="mt-8 flex flex-col-reverse justify-between gap-10 md:flex-row">
        {/* FORM */}
        <div className="w-full max-w-md flex-1 rounded-lg border-2 border-gray-200 bg-white px-6 py-6">
          <form onSubmit={onSubmitHandler} className="space-y-4">
            {/* NAME */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                type="text"
                placeholder="First Name"
                name="firstName"
                value={address.firstName}
                onChange={handleChange}
              />
              <InputField
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={address.lastName}
                onChange={handleChange}
              />
            </div>

            {/* STREET */}
            <InputField
              type="text"
              placeholder="Street"
              name="street"
              value={address.street}
              onChange={handleChange}
            />

            {/* CITY + STATE */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                type="text"
                placeholder="City"
                name="city"
                value={address.city}
                onChange={handleChange}
              />
              <InputField
                type="text"
                placeholder="State"
                name="state"
                value={address.state}
                onChange={handleChange}
              />
            </div>

            {/* ZIP + COUNTRY */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                type="text"
                placeholder="Zipcode"
                name="zipcode"
                value={address.zipcode}
                onChange={handleChange}
              />
              <InputField
                type="text"
                placeholder="Country"
                name="country"
                value={address.country}
                onChange={handleChange}
              />
            </div>

            {/* PHONE */}
            <InputField
              type="text"
              placeholder="Contact No"
              name="phone"
              value={address.phone}
              onChange={handleChange}
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dull w-full rounded-md py-3 font-semibold text-white uppercase transition"
            >
              Save Address
            </button>
          </form>
        </div>

        {/* IMAGE */}
        <div className="flex items-start justify-center">
          <img
            className="w-full max-w-md"
            src={assets.add_address_iamge}
            alt="address"
          />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
