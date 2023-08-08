
const user= require("./src/user.js")
const routes= require("./src/routes.js")
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(routes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
