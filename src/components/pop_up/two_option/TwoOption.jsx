const TwoOption = ({
  title,
  desc,
  onClose,
  submitData,
  cancel,
  btnTitle,
  cancelTitle,
}) => {
  return (
    <div
      className={`backdrop-blur-2xl load border-1 border-light-dark w-fit rounded-[2rem] z-50 p-4 `}
    >
      <header className="flex relative justify-between items-center">
        <button
          className="absolute -left-[.3rem] text-org-color text-[10px] -top-[.3rem] w-8 h-8 bg-org-dark rounded-full"
          onClick={onClose}
        >
          <i className="fi fi-rr-cross flex justify-center items-center"></i>
        </button>
        <h4 className="flex-grow text-center text-org-color text-xl font-bold">
          {title}
        </h4>
      </header>
      <main>
        <p className="text-org-light max-w-60 my-4 text-center">{desc}</p>

        <button
          className="w-full transition-all duration-200 hover:scale-95 bg-org-color p-2 rounded-full"
          onClick={submitData}
        >
          {btnTitle}
        </button>
      </main>
    </div>
  );
};

export default TwoOption;
