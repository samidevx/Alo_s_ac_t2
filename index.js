const express = require('express')
const app = express()
const db = require('./db.json')
var parseInt = require('parse-int');

app.use(express.json())
app.use(logErrors);
app.use(dbErrorHandler);
app.use(errorHandler);

app.get('/db', (req,res) => {
    res.status(200).json(db)
})


app.get('/db/:email', (req,res) => {
    
    const email = parseInt(req.params.email)
    const dba = db.find(dba => dba.email === email)
    res.status(200).json(dba)
})

app.post('/db', (req,res) => {
    db.push(req.body)
    res.status(200).json(db)
})


app.put('/db/:email', (req,res) => {
    const email = parseInt(req.params.email)
    let dba = db.find(dba => dba.email === email)
    db.first_name =req.body.first_name,
    db.last_name =req.body.last_name,
    db.full_name =req.body.full_name,
    db.country =req.body.country,
    db.position =req.body.position,
    db.twitter =req.body.twitter,
    db.linkedin =req.body.linkedin,
    db.phone_number =req.body.phone_number,
    db.website_url=req.body.website_url,
    db.company =req.body.company,
    res.status(200).json(db)
})

app.delete('/db/:email', (req,res) => {
    const email = parseInt(req.params.email)
    let dba = db.find(dba => dba.email === email)
    db.splice(db.indexOf(db),1)
    res.status(200).json(dba)
})


function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
  }
  function dbErrorHandler(err, req, res, next) {
    if (req.xhr) {
      res.status(500).send({ error: 'Something failed!' });
    } else {
      next(err);
    }
  }
  function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
  }



app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})
