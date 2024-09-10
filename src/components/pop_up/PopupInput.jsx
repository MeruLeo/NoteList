const PopupInput = ({ type, placeholder, icon, value, onChange }) => {
  return (
    <div className="bg-org-dark border-1 border-org-color my-4 flex items-center rounded-xl">
      <span className="ml-2 mr-4 text-org-color text-2xl">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent w-full p-3 outline-none text-org-light"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PopupInput;
