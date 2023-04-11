export const vaildatePassword = (password: string) => {
  if (password.length < 8) {
    return false;
  } else {
    return true;
  }
};

export const vaildateEmail = (email: string) => {
  const emailPattern = /@/;

  if (emailPattern.test(email)) {
    return true;
  } else {
    return false;
  }
};
