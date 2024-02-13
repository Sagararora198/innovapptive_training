// const express = require('express')
import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.write("Hello ")
  res.write("There")
  res.write("\n")
  res.write("Next line")
  res.end()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
