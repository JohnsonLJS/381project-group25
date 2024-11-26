const http = require('http');
const url = require('url');
const PORT = process.env.PORT || 3000;
const uri = 'mongodb+srv://s1383991:12345@cluster0.sxzpi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const mongoose = require('mongoose');
const User = require('./models/User'); 
const Note = require('./models/Note');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'info.html'));
});

app.get('/login', (req, res) => {
    const error = req.query.error ? true : false;
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/note', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'note.html'));
});

// user register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    try {
        await newUser.save();
        res.redirect('/register?success=true'); // Registration success
    } catch (error) {
        console.error(error);
        res.redirect('/register?error=true'); // If registration fails
    }
});

// user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        console.log('Login successful for user:', username);
        res.redirect('/index');  
    } else {
        console.log('Login failed for user:', username);
        res.redirect('/login?error=true'); 
    }
});

//RESTful services: READ ~ GET
app.get('/api/users', async (req,res) => {
	const users = await User.find();
	res.status(200).type('json').json(users).end();
});

//RESTful services: CREATE ~ POST
app.post('/api/users', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    try {
        await newUser.save();
        res.status(201).json({ message: ' Create User Successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//RESTful services: UPDATE ~ PUT
app.put('/api/users/:username/:password', async (req, res) => {
    const { username, password } = req.params;
    const { newUsername, newPassword } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { username, password },
            { username: newUsername, password: newPassword },
            { new: true }
        );
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//RESTful services: DELETE ~ DELETE
app.delete('/api/users/:username/:password', async (req, res) => {
    const { username, password } = req.params;
    try {
        const deletedUser = await User.findOneAndDelete({ username, password });
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// RESTful services: READ ~ GET
app.get('/api/notes', async (req, res) => {
    const notes = await Note.find();
    res.status(200).json(notes);
});

// RESTful services: CREATE ~ POST
app.post('/api/notes', async (req, res) => {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// RESTful services: UPDATE ~ PUT
app.put('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        if (updatedNote) {
            res.status(200).json(updatedNote);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// RESTful services: DELETE ~ DELETE
app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        if (deletedNote) {
            res.status(200).json({ message: 'Note deleted successfully' });
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function main() {
    try {
        // Ensure the database connection is established
        await mongoose.connect(uri);
        console.log('MongoDB connected');

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server created: http://localhost:${PORT}/`);
        });
    } catch (err) {
        console.log('Error occurred:', err);
    }
}

main()
  .finally()
