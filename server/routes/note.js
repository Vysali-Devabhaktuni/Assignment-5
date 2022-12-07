const express = require('express');
const   User = require('../models/note');
const router = express.Router();
router
.get('/getNote', async (req, res) => {
    try {
      let note = await User.getNote(req.body);
      res.send(note)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/create', async (req, res) => {
    try {
      let note = await User.create(req.body);
      res.send(note)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  

  .post('/deleteNote', async (req, res) => {
    try {
      let note = await User.deleteNote(req.body);
      res.send(note)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  .post('/editNote', async (req, res) => {
    try {
      let note= await User.editNote(req.body);
      res.send(note)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  
module.exports=router;