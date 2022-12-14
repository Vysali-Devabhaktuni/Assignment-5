
// getUsers button 
/* document.getElementById("btn-users").addEventListener('click', getUsers);
 function getUsers() {
   fetch("http://localhost:3000/users/")
   .then((res)=> res.json())
   .then((data) => console.log(data))
   .catch((err)=> console.log(err))
 }*/ 

 require('dotenv').config();
 const mysql = require('mysql2');
 
 const con = mysql.createConnection({
   host: process.env.MYSQL_HOST,
   user: process.env.MYSQL_USERNAME,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DB
 })
 
 const query = (sql, binding) => {
   return new Promise((resolve, reject) => {
     con.query(sql, binding, (err, result, fields)=> {
       if(err) reject(err);
       resolve(result);
     })
   })
 }
 con.connect(function (err){
   if(err) throw err;
   console.log("connected successfully");
   con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB}`, function (err, result){
        if(err) throw err;
        console.log("Database created successfully ");
     });
 });
 module.exports = {con, query};