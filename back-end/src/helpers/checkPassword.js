import bcrypt from "bcrypt"

const checkPassword = (password, hash) => bcrypt.compareSync(password, hash)

export default checkPassword;