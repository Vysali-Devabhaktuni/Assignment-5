/*const notes = [
    {
      note: "text",
    },
    {
      note: "text",
    },
  ];*/
  
const con = require("./db_connect");


async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS notes (
  noteID INT NOT NULL AUTO_INCREMENT,
  uname VARCHAR(255) NOT NULL,
  notetext VARCHAR(255) NOT NULL,
  CONSTRAINT notePK PRIMARY KEY(noteID)
); `
await con.query(sql);
}
createTable();

async function create(note) {

const sql = `INSERT INTO notes (uname, notetext)
  VALUES ("${note.uname}","${note.notetext}");`
await con.query(sql);
return {success:"Note Added"};
}


async function getAllNotes() {
 const sql = "SELECT * FROM notes;";
 let notes = await con.query(sql);
 console.log(notes)
 return notes;
}


async function getNote(note) {
  let sql;
  
    sql = `
      SELECT * FROM notes
       WHERE uname = ${note.uname}
    `
  
  return await con.query(sql);  
}
async function deleteNote(note) {
    let sql = `DELETE FROM notes
      WHERE noteID = ${note.noteID}
    `
    await con.query(sql);
    }
async function editNote(note) {
  let sql = `UPDATE notes 
    SET notetext = "${note.notetext}"
    WHERE noteID = ${note.noteID}
  `;
  
  await con.query(sql);
  let updatedNote = await getNote(note);
  return updatedNote[0];
  }



module.exports = { getAllNotes, getNote, create, deleteNote, editNote};