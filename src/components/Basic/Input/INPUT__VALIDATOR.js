import { GET__VALIDATORS } from "./GET__VALIDATORS";

export const VALIDATE = (VALIDATORS__LIST = "", value) => {
  const { IS__REQUIRED = false, VALIDATORS } =
    GET__VALIDATORS(VALIDATORS__LIST);
  const validationResults = (
    message = "",
    isValid = false,
    validation = true,
    isRequired = IS__REQUIRED
  ) => ({ message, isValid, validation, isRequired });

  if (!value && VALIDATORS.length)
    return IS__REQUIRED
      ? validationResults("**This field is required")
      : validationResults("", true);
  else if (!value || !VALIDATORS.length)
    return IS__REQUIRED && !value
      ? validationResults("**This field is required", false, false)
      : validationResults("", true, false);

  for (let VALIDATOR of VALIDATORS) {
    switch (VALIDATOR.type) {
      case "length":
        const min = VALIDATOR.interval[0];
        const max = VALIDATOR.interval[1];

        if (value.trim().length < min || value.trim().length > max) {
          let message = `Length must be between ${min} and ${max}`;

          if (min === 0) {
            message = `Length must be less than ${max}`;
          }
          return validationResults(message);
        }
        break;
      case "email":
        if (!/^[a-zA-Z]/.test(value.trim()))
          return validationResults("Email must start with a letter");

        if (!/^[\w.@-]*$/.test(value.trim()))
          return validationResults(
            `Email must not contain:spaces */+=(){}[]<>&^%$!?~,#;":' ${"`"} `
          );

        if (
          !/^(?:[._-]?[a-zA-Z0-9])+[@][a-zA-Z0-9](?:[a-zA-Z0-9]*[-]?[a-zA-Z0-9]+)*(?:\.[a-zA-Z]{2,3})$/.test(
            value.trim()
          )
        )
          return validationResults(
            "Please enter a valid Email Ex: Mr.user_name-123@mail.com"
          );

        break;
      case "number":
        const Min = VALIDATOR.interval[0];
        const Max = VALIDATOR.interval[1];

        if (!/^\d+$/.test(value) || +value < Min || +value > Max) {
          return validationResults(
            `The number must be between ${Min} and ${Max}`
          );
        }
        break;
      case "name":
        console.log("name");
        if (!/^[a-zA-Z](?:[_.-]?[a-zA-Z0-9])*$/.test(value.trim()))
          return validationResults("Please enter a valid name!");
        break;
      default:
    }
  }

  return validationResults("", true);
};
