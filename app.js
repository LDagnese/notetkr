const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'R!%oBUe$xd$G3fe^6S&R',
        database: 'notes_db'
    },
    console.log('Connected to notes_db')
);

app.get('/api/notes', (req, res) => {
    const sql = `SELECT * FROM notes`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

app.post('/api/note', ({ body }, res) => {
    const sql = `INSERT INTO notes (title,author,body)
                VALUES (?,?,?)`;
    const params = [body.title, body.author, body.body];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});