import "./Form.scss";
import Input from "../Input/Input";
import { useCallback, useState } from "react";
import React from "react";

function Form() {
  const [inputUsername, setinputUsername] = useState({
    isValid: false,
    name: "N/A",
    count: 0,
  });
  // const [inputUsername2, setinputUsername2] = useState("N/A");

  const getValuehandler = useCallback((value, isValid) => {
    setinputUsername((prev) => ({
      isValid,
      name: value,
      count: prev.count + 1,
    }));
  }, []);

  console.log(inputUsername);

  return (
    <>
      {/* <h1 className="header header__size">
        HELLO {inputUsername.name + " count =" + inputUsername.count}
      </h1> */}

      <div className="user__Input_label">
        <Input
          id="username"
          styles="ModernStyle" // ColorsStyle// ModernStyle
          label="Username"
          type="text"
          layout="top"
          placeHolder="Username"
          //   VALIDATORS="IS__REQUIRED,NUMBER__VALIDATOR(1,10)arbi"
          // VALIDATORS="IS__REQUIRED,EMAIL__VALIDATOR"
          getValue={getValuehandler}
        />
      </div>
    </>
  );
}

export default React.memo(Form);
