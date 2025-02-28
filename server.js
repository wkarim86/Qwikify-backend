const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let careNotes = [
    {
      id: 1,
      residentName: 'Alice Johnson',
      dateTime: '2024-09-17T10:30:00Z',
      content: 'Medication administered as scheduled.',
      authorName: 'Nurse Smith',
    },
    {
      id: 2,
      residentName: 'Bob Williams',
      dateTime: '2024-09-17T11:45:00Z',
      content: 'Assisted with physical therapy exercises.',
      authorName: 'Dr. Brown',
    },
  ];

// GET /care-notes
app.get('/care-notes', (req, res) => {
    res.json(careNotes);
});

// POST /care-notes
app.post('/care-notes', (req, res) => {
    if(Object.keys(req.body).length === 0){
      res.status(400).send('Bad Request Exception');
    } else {
    const newNote = {
      id: careNotes.length + 1,
      ...req.body,
      dateTime: req.body['dateTime'] ? req.body['dateTime'] : new Date().toISOString(),
    };
    careNotes.push(newNote);
    res.status(201).json(newNote);
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});  