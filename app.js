const express = require('express');

const mongoose = require('mongoose');

const app = express();
const User = require('./models/user');

const bodyParser = require('body-parser');

require('dotenv/config');

app.use(bodyParser.json());

// Import Routes
const postRoute = require('./routes/posts');


const authMiddleware = (req, res, next) => {
    const userId = req.params.userId;
  
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
  
    req.userId = userId;
    next();
  };

app.use('/api/posts/', postRoute);
// app.use('/api/:uid', postRoute);
app.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error });
    }
});

// const authMiddleware = (req, res, next) => {
//     const userId = req.params.userId;
  
//     if (!userId) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }
  
//     req.userId = userId;
//     next();
//   }
  


// Connect to database
mongoose.connect("mongodb+srv://admin:admin@cluster0.8unxxd0.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log('Connected to DB');
});

// app.post('/follow/:userId', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId);
//        await user.followers.push(req.params.userId);
//         await user.save();
//         res.send(user);
//     } catch (error) {
//         console.log(error.message);
//         res.status(400).json({ message: error });
//     }
// }); 

// ENVIRONMENT PORT
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));