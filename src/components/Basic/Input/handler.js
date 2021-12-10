export const onFocusHandler = (setUpdateState) => () => {
  setUpdateState((prev) => ({ ...prev, isFocus: true }));
};

export const onChangeHandler = (setUpdateState, inputRef) => () => {
  setUpdateState((prev) => ({ ...prev, value: inputRef.current.value }));
};

export const onBlurHandler =
  (
    setIsInputValid,
    isInputValid,
    setUpdateState,
    updatedState,
    VALIDATE,
    INPUT__VALIDATORS,
    inputRef
  ) =>
  () => {
    if (isInputValid.isBlured === false) {
      setIsInputValid((previous) => {
        return { ...previous, isBlured: true };
      });
    }

    setUpdateState((prev) => ({ ...prev, isFocus: false }));

    const updatedValues = VALIDATE(INPUT__VALIDATORS, updatedState.value);
    if (updatedState.value !== isInputValid.value)
      setIsInputValid((prev) => ({
        ...prev,
        value: updatedState.value,
        isBlured: true,
        ...updatedValues,
      }));
  };

export const stylesHandler = (isInputValid, InputLabelStyle) => {
  let labelStyle;

  switch (InputLabelStyle) {
    case "ModernStyle":
      labelStyle = inputLabelStlye(isInputValid);
      break;
    case "ColorsStyle":
      labelStyle = "Input__label";
      break;
    default:
      labelStyle = "Input__label";
  }
  const { inputStyle, notValidMessage } = fieldStyles_message(isInputValid);

  return {
    inputStyle,
    labelStyle,
    notValidMessage,
  };
};

export const changeHandler = (
  isValid,
  isBlured,
  setIsInputValid,
  VALIDATE,
  INPUT__VALIDATORS,
  inputValue
) => {
  const updatedValues = VALIDATE(INPUT__VALIDATORS, inputValue);

  let delay = 1300;
  if (!inputValue || updatedValues.isValid) delay = 700;
  if (
    (updatedValues.isValid !== isValid && updatedValues.isValid) ||
    !inputValue
  )
    delay = 0;
  const timeout = setTimeout(() => {
    if (!inputValue && !isBlured) {
      setIsInputValid((prev) => ({
        ...prev,
        ...updatedValues,
      }));
    } else {
      setIsInputValid((prev) => ({
        ...prev,
        value: inputValue,
        isBlured: true,
        ...updatedValues,
      }));
    }
  }, delay);
  return timeout;
};

export const idCreator = () => {
  return `id_${Math.floor(Math.random() * 100000000)}`;
};

const inputLabelStlye = (isInputValid) => {
  const { isRequired, isValid, value, validation, isBlured } = isInputValid;

  let labelStyle = "Input__label";

  isRequired &&
    isValid &&
    value &&
    isBlured &&
    (labelStyle += " Input__label--valid");

  isRequired &&
    !isValid &&
    isBlured &&
    (labelStyle += " Input__label--notValid");

  !isRequired &&
    validation &&
    !isValid &&
    isBlured &&
    value &&
    (labelStyle += " Input__label--notValid--notRequired");

  !isRequired &&
    validation &&
    isValid &&
    isBlured &&
    value &&
    (labelStyle += " Input__label--valid");

  !isRequired &&
    !validation &&
    value &&
    (labelStyle += " Input__label--default");

  return labelStyle;

  // console.log("hello ");
};

const fieldStyles_message = (isInputValid) => {
  const { isRequired, isValid, message, value, validation, isBlured } =
    isInputValid;

  let notValidMessage = null;
  let fieldStyle = "Input__field";
  let StyleClass = "Input__field";

  notValidMessage = !isValid && (
    <p className="Input__message--notValid">{message}</p>
  );

  if (isRequired) {
    notValidMessage = ((!isValid && value) ||
      (!value && !isValid && isBlured)) && (
      <p className="Input__message--notValid">{message}</p>
    );

    isBlured &&
      (fieldStyle += ` ${
        isValid ? StyleClass + "--Valid" : StyleClass + "--notValid"
      }`);
  } else
    validation &&
      value &&
      (fieldStyle += ` ${
        isValid || !isBlured || !value
          ? StyleClass + "--Valid"
          : StyleClass + "--notValid-notRequired"
      }`);
  return { notValidMessage, inputStyle: fieldStyle };
};
