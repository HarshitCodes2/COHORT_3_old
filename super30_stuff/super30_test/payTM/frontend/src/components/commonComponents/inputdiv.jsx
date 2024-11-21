export const InputDiv = ({ labelTitle, placeholder, onChange, type }) => {
  return (
    <>
      <label className="text-sm font-medium py-2">{labelTitle}</label>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="outline outline-1 outline-gray-300 placeholder-grey-800 p-2 rounded-md mb-2"
      />
    </>
  );
};