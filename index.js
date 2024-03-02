const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const pool = require('./queries.js')
const { response } = require('express')

//menerima file json dari luar (sisi FE)
app.use(bodyParser.json())

pool.connect((err, res) =>{
  console.log(err)
  console.log('connected')
})


app.get('/', (req, res) => {
  res.send('Halaman Utama')
})

app.get('/film', (req, res) => {
  pool.query('select * from film', (err, result) => {
    if(err){
      throw err
    }
    res.send(result.rows)
  })
})

app.get('/filmid', (req, res) => {
  pool.query('SELECT * FROM film where film_id between 1 and 5', (err, result) => {
    if(err){
      throw err
    }
    res.send(result.rows)
  })
})

app.get('/category', (req, res) => {
  pool.query('select * from category', (err, result) => {
    if(err){
      throw err
    }
    res.send(result.rows)
  })
})

app.get('/film_category', (req, res) => {
    pool.query('SELECT film.film_id, film.title, category.category_id, category.name FROM film JOIN film_category ON film.film_id = film_category.film_id JOIN category ON film_category.category_id = category.category_id', (err, result) => {
      if(err){
        throw err
      }
      res.send(result.rows)
    })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//db-migrate access = Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted

