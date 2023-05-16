import React from "react";

const Form = ({ children, submitPart, onSubmit }) => {

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {children}
      {submitPart}
    </form>
  );
};

export default Form;
