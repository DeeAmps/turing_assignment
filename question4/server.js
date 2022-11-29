const express = require('express');

const app = express();

app.use(express.json());

const users = [
  { id: '1', name: 'John Doe', email: 'john@deo.com' },
  { id: '2', name: 'Jane Doe', email: 'jane@doe.com' }
]

app.post('/user', (req, res) => {
  const user = req.body;

  if (!user.name || !user.email) {
    res.status(400).send('Name and email are required');
  }
  users.push(user);
  res.status(201).json(user);
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.delete('/user/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id === id);
  if (!user) {
    res.status(404).send('User not found');
  }
  users.splice(users.indexOf(user), 1);
  res.status(204).json(user);
});

app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id === id);
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


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
