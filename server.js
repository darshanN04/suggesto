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
            const hi_name = result.recordset[0].User_id;
            console.log(hi_name);
            res.status(200).json({ message: 'Login successful', user_id: hi_name });            
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/getTypes', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query`EXEC [dbo].[get_types]`;
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

  app.get('/getPlaces', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query`EXEC [dbo].[get_places]`;
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
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

app.post('/addMessage', async (req, res) => {
    const { user_id, place_id, types_id, msg_content } = req.body;

    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .input('place_id', sql.Int, place_id)
            .input('types_id', sql.Int, types_id)
            .input('msg_content', sql.NVarChar(sql.MAX), msg_content)
            .execute('dbo.add_msgs');

        const msg_id = result.recordset[0].msg_id;
        res.status(201).json({ msg_id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/likeMessage', async (req, res) => {
    const { user_id, msg_id } = req.body;

    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('user_id', sql.Int, user_id)
        .input('msg_id', sql.Int, msg_id)
        .execute('dbo.my_like');

      const LIKE_ID = result.recordset[0].LIKE_ID;
      const LIKE_COUNT = result.recordset[0].LIKE_COUNT;
      res.status(200).json({ LIKE_ID, LIKE_COUNT });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

app.post('/dislikeMessage', async(req1, res1) => {
    const {user_id, msg_id} = req1.body;
    try{
        let pool = await sql.connect(config);
        let result1 = await pool.request()
            .input('user_id', sql.Int, user_id)
            .input('msg_id', sql.Int, msg_id)
            .execute('dbo.my_dislike');
        const DISLIKE_ID = result1.recordset[0].DISLIKE_ID;
        const DISLIKE_COUNT = result1.recordset[0].DISLIKE_COUNT;
        res1.status(200).json({ DISLIKE_ID, DISLIKE_COUNT });
    } catch (err) {
        console.error(err);
        res1.status(500).send('Server error');
    }
});
  
app.post('/update-password', async (req, res) => {
    const { user_id, oldpassword, newpassword } = req.body;
  
    try {
      let pool = await sql.connect(config);
  
      let result = await pool.request()
        .input('user_id', sql.Int, user_id)
        .input('oldpassword', sql.NVarChar(100), oldpassword)
        .input('newpassword', sql.NVarChar(100), newpassword)
        .execute('update_password');
  
      const updateResult = result.recordset[0].RESULT;
  
      if (updateResult === 1) {
        res.status(200).send({ message: 'Password updated successfully' });
      } else {
        res.status(400).send({ message: 'Old password is incorrect' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'An error occurred' });
    }
  });
  app.get('/getUserInfo', async (req, res) => {
    const userId = req.query.userId;
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('userId', sql.Int, userId)
        .query('SELECT * FROM user_table WHERE User_id = @userId');
      let msg = await pool.request()
        .input('userId', sql.Int, userId)
        .query('SELECT COUNT(*) as total FROM msgs_table WHERE User_id = @userId');
      const combinedResult = { ...result.recordset[0], total: msg.recordset[0].total };
      res.json(combinedResult);
      console.log(combinedResult);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error fetching user info' });
    }
  });


  


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
