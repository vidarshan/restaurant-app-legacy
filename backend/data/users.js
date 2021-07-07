import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'John Smith',
    email: 'johnsmith@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Kate Smith',
    email: 'katesmith@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jake Paul',
    email: 'jakepaul@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Micheal Smith',
    email: 'michealsmith@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
