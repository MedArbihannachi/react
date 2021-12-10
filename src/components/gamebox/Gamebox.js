import React from "react";
import { useState } from "react";
import "./Gamebox.scss";
import Form from "../Basic/Form/Form";
import Input from "../Basic/Input/Input";

const Gamebox = () => {
  const [face, setFace] = useState({
    frontFace: "",
    backFace: "",
  });
  const { frontFace, backFace } = face;

  const turnCard = () => {
    if (!frontFace || frontFace === "Gamebox_turnBack")
      setFace({
        frontFace: "Gamebox_turnFace",
        backFace: "Gamebox_turnBack ",
      });
    else
      setFace({ frontFace: "Gamebox_turnBack", backFace: "Gamebox_turnFace" });
  };
  return (
    <>
      {" "}
      <div className="card">
        <div className={"Gamebox__front " + frontFace}>
          <h1 className="head">hello</h1>
          <Form />
          <button className="button" onClick={turnCard}>
            turn
          </button>
        </div>

        <div className={"Gamebox__back " + backFace}>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Input
              id="username"
              styles="ModernStyle" // ColorsStyle// ModernStyle
              label="Username"
              type="text"
              layout="top"
              placeHolder="Username"
              //   VALIDATORS="IS__REQUIRED,NUMBER__VALIDATOR(1,10)arbi"
              VALIDATORS="IS__REQUIRED,NAME__VALIDATOR"
              // getValue={getValuehandler}
            />
            <Input
              id="username"
              styles="ModernStyle" // ColorsStyle// ModernStyle
              label="Email"
              type="text"
              layout="top"
              placeHolder="Username"
              //   VALIDATORS="IS__REQUIRED,NUMBER__VALIDATOR(1,10)arbi"
              VALIDATORS="IS__REQUIRED,EMAIL__VALIDATOR"
              // getValue={getValuehandler}
            />
            <Input
              id="username"
              styles="ModernStyle" // ColorsStyle// ModernStyle
              label="Age"
              type="number"
              layout="top"
              placeHolder="Username"
              VALIDATORS="IS__REQUIRED,NUMBER__VALIDATOR(5,100)"
              // VALIDATORS="IS__REQUIRED,EMAIL__VALIDATOR"
              // getValue={getValuehandler}
            />
            <Input
              id="username"
              styles="ModernStyle" // ColorsStyle// ModernStyle
              label="State"
              type="text"
              layout="top"
              placeHolder="Username"
              VALIDATORS="IS__REQUIRED"
              // VALIDATORS="IS__REQUIRED,EMAIL__VALIDATOR"
              // getValue={getValuehandler}
            />
          </div>
          <button className="button" onClick={turnCard}>
            turn
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(Gamebox);
