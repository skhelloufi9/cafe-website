const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 4000
const DATA_FILE = path.join(__dirname, 'bookings.json')

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

// health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// read bookings
function readBookings(){
  try{
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    return JSON.parse(raw || '[]')
  }catch(e){
    return []
  }
}

// write bookings
function writeBookings(arr){
  fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8')
}

// create booking
app.post('/api/bookings', (req, res) => {
  const { name, email, date, time, people, notes } = req.body || {}
  // simple validation
  if(!name || !email || !date || !time || !people){
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const bookings = readBookings()
  const id = bookings.length ? bookings[bookings.length-1].id + 1 : 1
  const booking = { id, name, email, date, time, people: Number(people), notes: notes || '', createdAt: new Date().toISOString() }
  bookings.push(booking)
  try{
    writeBookings(bookings)
    res.status(201).json({ success: true, booking })
  }catch(err){
    console.error('Failed to write booking', err)
    res.status(500).json({ error: 'Failed to save booking' })
  }
})

// list bookings (simple, no auth) - for demo only
app.get('/api/bookings', (req, res) => {
  const bookings = readBookings()
  res.json(bookings)
})

app.listen(PORT, () => {
  console.log(`Booking API listening on http://localhost:${PORT}`)
})
