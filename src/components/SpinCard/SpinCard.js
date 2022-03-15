import React from "react";
import { useState } from "react";
import "./SpinCard.scss";
import Form from "../Basic/Form/Form";
import Input from "../Basic/Input/Input";

const SpinCard = () => {
  const [face, setFace] = useState({
    frontFace: "",
    backFace: "",
  });
  const { frontFace, backFace } = face;

  const turnCard = () => {
    if (!frontFace || frontFace === "SpinCard_turnBack")
      setFace({
        frontFace: "SpinCard_turnFace",
        backFace: "SpinCard_turnBack",
      });
    else
      setFace({
        frontFace: "SpinCard_turnBack",
        backFace: "SpinCard_turnFace",
      });
  };
  return (
    <>
      <div className="card">
        <div className={"SpinCard__front " + frontFace}>
          <h1 className="head">Tfadhel si el quality God  </h1>
          <Form />
          <button className="button" onClick={turnCard}>
            Next
          </button>
        </div>

        <div className={"SpinCard__back " + backFace}>
          <h1 className="head">fuck off bitch</h1>
          {backFace === "SpinCard_turnBack" && (
            <button className={"button"} onClick={turnCard}>
              Back
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(SpinCard);
