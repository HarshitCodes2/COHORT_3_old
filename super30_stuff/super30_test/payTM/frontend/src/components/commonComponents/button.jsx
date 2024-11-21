export const Button = ({ children, onClick }) => {
  return (
    <>
      <button onClick={onClick} className="bg-black-800 text-white p-2 rounded-md mt-4 text-center hover:bg-black-600">{children}</button>
    </>
  );
};