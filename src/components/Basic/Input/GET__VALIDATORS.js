const LENGTH__VALIDATOR = (min = 1, max = 20) => ({
  type: "length",
  interval: [min, max],
});
const EMAIL__VALIDATOR = () => ({
  type: "email",
});

const NUMBER__VALIDATOR = (min = 0, max = 100000) => ({
  type: "number",
  interval: [min, max],
});
const NAME__VALIDATOR = () => ({
  type: "name",
});

export const GET__VALIDATORS = (VALIDATORS__LIST = "") => {
  let IS__REQUIRED = false;
  const VALIDATORS = [];

  let regex = /IS__REQUIRED/;
  if (regex.test(VALIDATORS__LIST)) IS__REQUIRED = true;

  regex = /EMAIL__VALIDATOR/;
  if (regex.test(VALIDATORS__LIST)) VALIDATORS.push(EMAIL__VALIDATOR());

  regex = /LENGTH__VALIDATOR\s*\((\d+),(\d+)\)/;
  if (regex.test(VALIDATORS__LIST)) {
    const match = regex.exec(VALIDATORS__LIST);
    VALIDATORS.push(LENGTH__VALIDATOR(+match[1], +match[2]));
  }

  regex = /NUMBER__VALIDATOR\s*\((\d+),(\d+)\)/;
  if (regex.test(VALIDATORS__LIST)) {
    const match = regex.exec(VALIDATORS__LIST);
    VALIDATORS.push(NUMBER__VALIDATOR(+match[1], +match[2]));
  }

  regex = /NAME__VALIDATOR/;
  if (regex.test(VALIDATORS__LIST)) VALIDATORS.push(NAME__VALIDATOR());

  return { IS__REQUIRED, VALIDATORS };
};
