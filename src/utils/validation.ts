export const validateUserName = (name: string): boolean => {
    return typeof name === 'string' && name.length >= 2;
  };
  