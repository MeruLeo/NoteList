const Input = ({ type, placeholder, icon, field }) => {
  return (
    <div className="bg-org-dark my-4 text-org-color rounded-full flex w-[20rem] border-1 border-org-color p-2 items-center">
      <span className="mx-2 text-3xl">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent text-xl outline-none p-2 w-full"
        {...field}
      />
    </div>
  );
};

export default Input;
