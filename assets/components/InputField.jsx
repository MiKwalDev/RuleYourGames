import React from "react"

const InputField = ({ label, type, name, onChange, value, placeholder = "", autoComplete = "" }) => {

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm lg:text-base font-medium leading-6 text-gray-100"
      >
        {label}
      </label>
      <div className="mt-2">
          <input
            onChange={onChange}
            id={name}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-base sm:leading-6"
          />
      </div>
    </div>
  );
};

export default InputField;
