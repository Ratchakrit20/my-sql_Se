const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    password: "",
    host: "localhost",
    database: "employeesystem"
})
app.get('/employee',(req,res) =>{
    db.query("SELECT * FROM employee",(err,result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.post('/create',(req,res)=>{
    const name = req.body.name;

    db.query("INSERT INTO employee (name) VALUES(?)",[name],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Values inserted")
        }
    })
})

app.put('/update',(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    db.query("UPDATE employee SET name = ? WHERE id = ?",[name,id],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Values inserted")
        }
    })

})


app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM employee WHERE id = ?",id,
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Values inserted")
        }
    })
})


app.listen('3001',()=>{
    console.log('Server is running 3001');
})