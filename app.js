const express = require('express');
const app = express();
const superagent = require('superagent');
const request = require('request');
const port = process.env.PORT || 6700;
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors())

app.get('/',(req,res)=>{
    res.send("<h1>Hello</h1>");
})
app.post('/users',(req,res) => {
    console.log("<<<<",req.body)
    superagent
    .post('https://github.com/login/oauth/access_token')
    .send({
        client_secret:'350134d5fe3ec8548cd76eb67590bb49ae8d3c68',
        client_id:'b4eb272998c8a4e49858',
        code:req.body.code
    })
    .set('Accept','application/json')
    .end((err,result) => {
        if(err) throw err;
        var accesstoken = result.body.access_token
        const option = {
            url:'https://api.github.com/user',
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Authorization':'token '+accesstoken,
                'User-Agent':'sep-node'
            }
        }
        var output;
        request(option,(err,response,body) => {
            output = body;
            console.log(output)
            return res.send(output)
        })
    })
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})

