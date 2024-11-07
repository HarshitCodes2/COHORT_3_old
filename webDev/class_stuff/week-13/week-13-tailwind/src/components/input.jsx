export function Input({ placeholder, onchange }) {
  return (
    <>
      <input onChange={onchange}
        placeholder={placeholder}
        className={`bg-blue-300 placeholder-blue-200 text-white w-1/4 mt-4
        px-5 py-3.5 rounded-2xl outline outline-1 outline-blue-200`}
      />
    </>
  );
}
