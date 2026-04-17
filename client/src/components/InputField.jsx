const InputField = ({ type = "text", placeholder, name, value, onChange }) => {
  return (
    <input
      className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-700 transition outline-none focus:ring-1"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default InputField;
