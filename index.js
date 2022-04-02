const express = require('express')
const app = express()
const db = require('./db.json')
var parseInt = require('parse-int');

app.use(express.json())
app.use(logErrors);
app.use(dbErrorHandler);
app.use(errorHandler);

//Find all db
app.get('/db', (req,res) => {
    res.status(200).json(db)
})


 
//Find db details
app.get('/db/:id', (req,res) => {
    
    const id = parseInt(req.params.id)
    const db = db.find(db => db.id === id)
    res.status(200).json(db)
})

//creates a db
app.post('/db', (req,res) => {
    db.push(req.body)
    res.status(200).json(db)
})

//updates a db
app.put('/db/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let db = db.find(db => db.id === id)
    db.name =req.body.name,
    db.sku=req.body.sku,
    db.salePrice =req.body.salePrice,
    res.status(200).json(db)
})

//Deletes a db
app.delete('/db/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let db = db.find(db => db._id === id)
    db.splice(db.indexOf(db),1)
    res.status(200).json(db)
})


//Development-only error handler
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



app.listen(3000, () => {
    console.log("Serveur à l'écoute")
})