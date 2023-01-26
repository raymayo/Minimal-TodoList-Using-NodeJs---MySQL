const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'todo'
});

const app = express();

app.use(cors());

app.get('/todos', (req, res) => {
    connection.query('SELECT * FROM todos', (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});



app.listen(3333, () => {
    console.log('Server started on port 3000');
});


app.use(express.json());

app.post('/post', function (req) {
    var data = req.body;

    var dataPost = `INSERT INTO todos (todos) VALUES ('${data.todo}')`
    connection.query(dataPost, function (error) {
        if (error) throw error;
        console.log("Data added successfully");
    });

});

app.listen(3555, function () {
    console.log('Server listening on port 3555');
});





app.use(express.json());

app.post('/delete', function (req) {
    var data = req.body;

    var dataPost = `DELETE todos FROM todos WHERE id=${data.todo};`
    connection.query(dataPost, function (error) {
        if (error) throw error;
        console.log("Data removed successfully");
    });

});

app.listen(3444, function () {
    console.log('Server listening on port 3555');
});



