const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
//   res.status(301)
  res.send('Hello Im the auth service')
})

app.get('/auth', (req, res) => {
      let  role = req.body.role
      // console.log(req.body);
      res.status(200)
      // if(role=="admin"){
      //     res.status(200)
      // }else{
      //     res.status(301)
      // }
      res.send('Yes you are alloed')
    })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})