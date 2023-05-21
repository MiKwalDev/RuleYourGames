import React from "react"
import { Link } from "react-router-dom"

const SubmitField = ({ validationLabel, canceLabel, cancelUrl, disabled }) => {

  return (
    <div className="mt-6 flex items-center justify-between gap-x-6">
      <Link className="text-sm lg:text-base font-semibold leading-6 text-gray-100" to={cancelUrl}>
        {canceLabel}
      </Link>
      <button
        disabled={disabled}
        type="submit"
        className="rounded-md bg-amber-600 px-3 py-1.5 text-sm lg:text-base font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
      >
        {validationLabel}
      </button>
    </div>
  );
};

export default SubmitField;
