import { useState } from "react";

export const useInput = (initialValue, onChangeEvent = null) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
        if (onChangeEvent !== null)
          onChangeEvent(event);
      }
    }
  };
};