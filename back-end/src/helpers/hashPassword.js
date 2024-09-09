import bcrypt from 'bcrypt';

const hashPassword = (password, saltRounds) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export default hashPassword;