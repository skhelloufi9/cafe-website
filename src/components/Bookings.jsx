import React, { useEffect, useState } from 'react'

export default function Bookings(){
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function load(){
    setLoading(true)
    setError(null)
    try{
      const res = await fetch('/api/bookings')
      if(!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const data = await res.json()
      setBookings(data || [])
    }catch(err){
      setError(err.message || 'Failed to load')
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, [])

  return (
    <section id="bookings" style={{marginTop:18}}>
      <h3>Bookings</h3>
      <div style={{marginBottom:8}}>
        <button onClick={load} style={{background:'#b5651d',color:'#fff',border:'none',padding:'8px 12px',borderRadius:6}}>Refresh</button>
      </div>

      {loading && <div>Loading bookings…</div>}
      {error && <div style={{color:'crimson'}}>Error: {error}</div>}

      {!loading && !error && bookings.length === 0 && (
        <div>No bookings yet.</div>
      )}

      {!loading && bookings.length > 0 && (
        <div style={{display:'grid',gap:10}}>
          {bookings.map(b => (
            <article key={b.id} style={{padding:12,background:'#fff',border:'1px solid #f0e6dd',borderRadius:8}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <strong>{b.name}</strong> <span style={{color:'#6b6b6b'}}>({b.email})</span>
                </div>
                <div style={{color:'var(--accent)'}}>{b.date} {b.time}</div>
              </div>
              <div style={{marginTop:6,color:'#444'}}>People: {b.people} — Notes: {b.notes || '—'}</div>
              <div style={{marginTop:6,fontSize:12,color:'#888'}}>Created: {new Date(b.createdAt).toLocaleString()}</div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
