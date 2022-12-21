const con = require("./db_connect");


async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS users (
  userID INT NOT NULL AUTO_INCREMENT,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  uname VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  CONSTRAINT userPK PRIMARY KEY(userID)
); `
await con.query(sql);
}
createTable();

async function register(user) {
let cUser = await getUser(user.uname);
console.log(user)
if(cUser.length > 0) throw error("email already in use");

const sql = `INSERT INTO users (fname,lname,uname, password)
  VALUES ("${user.fname}", "${user.lname}","${user.uname}","${user.password}");
`
await con.query(sql);
return await login(user);
}
async function getUser(user) {
  let sql;
  
  if(user.userID) {
    sql = `
      SELECT * FROM users
       WHERE userID = ${user.userID}
    `
  } else {
    sql = `
    SELECT * FROM users 
      WHERE uname  = "${user.uname}"
  `;
  }
  return await con.query(sql);  
  }


async function login(user) { 
 
let cUser = await getUser(user); 

if(!cUser[0]) throw Error(user.uname+" email not found");
if(cUser[0].password !== user.password) throw Error("Password incorrect");


return cUser[0];
}

async function editUser(user) {
  let sql = `UPDATE users 
    SET uname = "${user.uname}"
    WHERE userID = ${user.userID}
  `;
  
  await con.query(sql);
  let updatedUser = await getUser(user);
  return updatedUser[0];
  }

async function deleteUser(user) {
  let sql = `DELETE FROM users
    WHERE userID = ${user.userID}
  `
  await con.query(sql);
  }

  async function getAllUsers() {
    const sql = `SELECT * FROM users;`;
    let users = await con.query(sql);
    return users
  }
  getAllUsers();

  

module.exports = {login, register, editUser, deleteUser, getAllUsers};