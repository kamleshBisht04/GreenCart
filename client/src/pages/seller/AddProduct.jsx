import { useState } from 'react';
import { assets, categories } from '../../assets/assets';

import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const initialState = {
  name: '',
  description: '',
  category: '',
  price: '',
  offerPrice: '',
  images: [],
};

const AddProduct = () => {
  const [product, setproduct] = useState(initialState);
  const { axios,fetchProducts  } = useAppContext();

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    setproduct((prev) => {
      const newImages = [...prev.images];
      newImages[index] = file;
      return { ...prev, images: newImages };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setproduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { name, description, category, price, offerPrice, images } =
        product;

        if (images.length === 0 || !images.some((img) => img)) {
          return toast.error('Please upload at least one image');
        }

      const productData = {
        name,
        description: description ? description.split('\n') : [],
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();

      formData.append('productData', JSON.stringify(productData));

      images.forEach((img) => {
        if (img) {
          formData.append('images', img);
        }
      });
      //API CALL
      const { data } = await axios.post('/api/product/add', formData);
      fetchProducts(); 
      if (data.success) {
        toast.success(data.message);
        setproduct(initialState);
      } else {
        toast.error(data.message || 'Something wrong');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="no-scrollbar flex h-[95vh] flex-1 flex-col justify-between overflow-y-scroll">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-lg space-y-5 p-4 md:p-10"
      >
        <div>
          <p className="text-lg font-medium">Product Image</p>
          <div className="bg-primary mb-4 h-0.5 w-30 rounded-full"></div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            {Array(4)
              .fill('')
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    onChange={(e) => handleImageChange(e, index)}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      product.images[index]
                        ? URL.createObjectURL(product.images[index])
                        : assets.upload_area
                    }
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>
        <div className="flex max-w-md flex-col gap-1">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            name="name"
            onChange={handleChange}
            value={product.name}
            id="product-name"
            type="text"
            placeholder="name with quantity"
            className="rounded border border-gray-500/40 px-3 py-2 outline-none md:py-2.5"
            required
          />
        </div>
        <div className="flex max-w-md flex-col gap-1">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            name="description"
            onChange={handleChange}
            value={product.description}
            id="product-description"
            rows={4}
            className="resize-none rounded border border-gray-500/40 px-3 py-2 outline-none md:py-2.5"
            placeholder="Type here"
          ></textarea>
        </div>
        <div className="flex w-full flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            onChange={handleChange}
            value={product.category}
            id="category"
            className="rounded border border-gray-500/40 px-3 py-2 outline-none md:py-2.5"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>
                {item.path}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex w-32 flex-1 flex-col gap-1">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              name="price"
              onChange={handleChange}
              value={product.price}
              id="product-price"
              type="number"
              placeholder="0"
              className="rounded border border-gray-500/40 px-3 py-2 outline-none md:py-2.5"
              required
            />
          </div>
          <div className="flex w-32 flex-1 flex-col gap-1">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              name="offerPrice"
              onChange={handleChange}
              value={product.offerPrice}
              id="offer-price"
              type="number"
              placeholder="0"
              className="rounded border border-gray-500/40 px-3 py-2 outline-none md:py-2.5"
              required
            />
          </div>
        </div>
        <button className="bg-primary rounded px-8 py-2.5 font-medium text-white">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
