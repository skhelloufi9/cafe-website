import React from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import BookingForm from './components/BookingForm'
import Bookings from './components/Bookings'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <section className="intro">
          <h2>Welcome to The Corner Cafe</h2>
          <p>Cozy place. Fresh coffee. Homemade pastries.</p>
        </section>
        <Menu />
        <BookingForm />
        <Bookings />
      </main>
      <Footer />
    </div>
  )
}
