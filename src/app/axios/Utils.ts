export const transformErrors = (rawErrors: any): string => {
  return rawErrors;
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
