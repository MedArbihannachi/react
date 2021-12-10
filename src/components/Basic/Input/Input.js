import React from "react";
import "./InputColorsStyle.scss";
// import "./InputModernStyle.scss";
import { useState, useRef, useEffect, useMemo } from "react";
import { VALIDATE } from "./INPUT__VALIDATOR";
import {
  onChangeHandler,
  onBlurHandler,
  stylesHandler,
  idCreator,
  changeHandler,
  onFocusHandler,
} from "./handler";

const Input = (props) => {
  const inputRef = useRef("Input");
  const [updatedState, setUpdateState] = useState({
    value: "",
    isFocus: false,
  });
  const [isInputValid, setIsInputValid] = useState({
    isValid: false,
    value: "",
    isBlured: false,
    message: "",
  });
  // console.log("Input running", updatedState);

  // console.log("component state updated", updatedState, isInputValid);
  const inputId = useMemo(() => idCreator(), []);

  const { getValue = () => {}, VALIDATORS: INPUT__VALIDATORS } = props;

  useEffect(() => {
    if (isInputValid.isValid) {
      getValue(isInputValid.value, isInputValid.isValid);
    }
  }, [getValue, isInputValid.value, isInputValid.isValid]);

  useEffect(() => {
    if (!isInputValid.isValid && isInputValid.isBlured)
      getValue("N/A", isInputValid.isValid);
  }, [getValue, isInputValid.isValid, isInputValid.isBlured]);

  useEffect(() => {
    const timeout = changeHandler(
      isInputValid.isValid,
      isInputValid.isBlured,
      setIsInputValid,
      VALIDATE,
      INPUT__VALIDATORS,
      updatedState.value
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [
    INPUT__VALIDATORS,
    updatedState.value,
    isInputValid.isBlured,
    isInputValid.isValid,
  ]);

  const { inputStyle, labelStyle, notValidMessage } = stylesHandler(
    isInputValid,
    props.styles
  );

  return (
    <div className={`Input__layout Input__layout--${props.layout}`}>
      <label className={labelStyle} htmlFor={inputId}>
        {props.label}
      </label>
      <div className="Input__layout--field">
        <input
          className={inputStyle}
          id={inputId}
          type={props.type}
          // placeholder={props.placeHolder}
          ref={inputRef}
          onFocusCapture={onFocusHandler(setUpdateState)}
          onChange={onChangeHandler(setUpdateState, inputRef)}
          onBlur={onBlurHandler(
            setIsInputValid,
            isInputValid,
            setUpdateState,
            updatedState,
            VALIDATE,
            INPUT__VALIDATORS,
            inputRef
          )}
          // maxLength="4"
        />
        {notValidMessage}
      </div>
    </div>
  );
};
export default React.memo(Input);
