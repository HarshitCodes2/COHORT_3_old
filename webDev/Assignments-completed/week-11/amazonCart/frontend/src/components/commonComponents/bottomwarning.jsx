import { Link } from "react-router-dom";

export const BottomWarning = ({ warning, to, ctaText }) => {
  return (
    <>
      <p className="text-sm text-center mt-3">
        { warning } &nbsp;
        <Link to={to} className="underline text-sm">{ctaText}</Link>
      </p>
    </>
  );
};
