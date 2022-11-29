const express = require('express');
const mongoose = require("mongoose");
const UserModel = require("./models");


const app = express();

app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/usersdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.post('/user', (req, res) => {
  const user = req.body;

  console.log(user);

  if (!user.name || !user.email) {
    res.status(400).send('Name and email are required');
  }
  UserModel.create(user, (err, user) => {
    if (err) {
      res.status(500).send('Error creating user');
    } else {
      res.status(201).json(user);
    }

  });
});

app.get('/users', async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

app.delete('/user/:id', async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  if (!user) {
    res.status(404).send('User not found');
  }
  UserModel.deleteOne({ _id: id }, (err) => {
    if (err) {
      res.status(500).send('Error deleting user');
    } else {
      res.status(204).json({ success: true });
    }
  });
});

app.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  if (!user) {
    res.status(404).send('User not found');
  }
  res.json(user);

});

app.get('/user', (req, res) => {
  if (req.query.name) {
    const user = users.find(user => user.name === name);
    if (!user) {
      res.status(404).send('User not found');
    }
    res.json(user);
  } else if (req.query.email) {
    const user = users.find(user => user.email === email);
    if (!user) {
      res.status(404).send('User not found');
    }
    res.json(user);
  } else {
    res.status(400).send('Name or email query param is required');
  }
});


app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
