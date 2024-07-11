const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const config = require('./dbConfig'); 

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    const { username, email, password, age, phone } = req.body;

    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('user_name', sql.NVarChar(50), username)
            .input('email', sql.NVarChar(100), email)
            .input('password', sql.NVarChar(50), password)
            .input('age', sql.Int, age)
            .input('phone_no', sql.BigInt, phone)
            .execute('dbo.new_user');

        const userId = result.recordset[0].USER_ID;
        if (userId === 0) {
            res.status(400).send('User already exists');
        } else {
            res.status(201).send('User created successfully');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('user_name', sql.NVarChar(50), username)
            .input('password', sql.NVarChar(50), password)
            .execute('dbo.VERIFY_LOGIN');

        if (result.recordset.length > 0) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/getMessages', async (req, res) => {
    const { place_id, types_id } = req.body;

    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('place_id', sql.Int, place_id)
            .input('types_id', sql.Int, types_id)
            .execute('dbo.get_msgs');

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
