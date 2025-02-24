import { useState } from "react";
const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearInput = () => {
    if (typeof value === "string") {
      setValue("");
    } else if (typeof value === "number") {
      setValue(0);
    }
  };

  return {
    type,
    value,
    onChange,
    clearInput,
  };
};

export { useField };
