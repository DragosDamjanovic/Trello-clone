import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("1111", 10),
  },
  {
    name: "Dragos",
    email: "user@example.com",
    password: bcrypt.hashSync("2222", 10),
  },
];

export default users;
