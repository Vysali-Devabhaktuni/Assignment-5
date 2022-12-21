const con = require("./db_connect");

async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS notes (
  noteID INT NOT NULL AUTO_INCREMENT,
  notetxt VARCHAR(255) NOT NULL,
  userID INT NOT NULL,
  CONSTRAINT note_pk PRIMARY KEY(noteID),
  CONSTRAINT note_fk FOREIGN KEY(userID) REFERENCES users(userID)
); `
await con.query(sql);
}
createTable();

async function create(note) {

const sql = `INSERT INTO notes (userID,notetxt)
  VALUES ("${note.userID}","${note.notetxt}");
`

console.log(await con.query(sql));
return {success:"Note Added"};
}


async function getAllNotes() {
 const sql = "SELECT * FROM notes;";
 let note = await con.query(sql);
 console.log(note)
 return note;
}


async function getNote(note) {
  let sql;
  
    sql = `
      SELECT * FROM notes
       WHERE userID = "${note.userID}"
    `
  
  return await con.query(sql);  
}

async function deleteNote(note) {
    let sql = `DELETE FROM notes
      WHERE noteID = "${note.noteID}"
    `
    await con.query(sql);
    }
async function editNote(note) {
  let sql = `UPDATE notes 
    SET notetxt = "${note.notetxt}"
    WHERE noteID = ${note.noteID}
  `;
  
  await con.query(sql);
  let updatedNote = await getNote(note);
  return updatedNote;
  }



module.exports = { getAllNotes, getNote, create, deleteNote, editNote};