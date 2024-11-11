export const Button = ({ children, onClick }) => {
  return (
    <>
      <button onClick={onClick} className="bg-yellow-500 text-black p-2 rounded-md mt-4 text-center hover:bg-black-600">{children}</button>
    </>
  );
};