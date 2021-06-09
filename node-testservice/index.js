const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  console.log('Got a request');
  res.send('Hello Im the Fucking test service')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})