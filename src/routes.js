const express= require('express')
const app= express.Router()
const user= require("./user")

 //rotas do usuario
app.get('/usuario', user.getUser)
// modo antigo de fazer: 
/* const batata = (req,res) => {

    console.log(req)
    res.send('Hello World Batata!')
}
 */

app.post('/usuario', user.postUser)
app.delete('/usuario', user.deleteUser)
app.put('/usuario',user.putUser);

//
module.exports = app 
