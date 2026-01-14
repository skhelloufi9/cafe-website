import React, { useState } from 'react'

export default function BookingForm(){
  const [form, setForm] = useState({ name:'', email:'', date:'', time:'', people:2, notes:'' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  function onChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const API_BASE = import.meta.env.VITE_API_URL ?? ''
  const isAmplifyHost = typeof window !== 'undefined' && window.location.host.includes('amplifyapp.com')

  async function onSubmit(e){
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try{
      const url = `${API_BASE}/api/bookings`
      // helpful debug log
      console.debug('Submitting booking to', url)
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if(res.ok){
        setStatus({ type:'success', message:'Booking received! We will contact you.' })
        setForm({ name:'', email:'', date:'', time:'', people:2, notes:'' })
      }else{
        // show helpful error including URL and server message
        setStatus({ type:'error', message: `Server error: ${data.error || data.message || res.statusText}` })
        console.error('Booking failed', { url, status: res.status, body: data })
      }
    }catch(err){
      // if running on Amplify and no API_BASE provided, show a more specific hint
      if(isAmplifyHost && !API_BASE){
        setStatus({ type:'error', message: 'Network error: frontend is hosted on Amplify but VITE_API_URL is not set. Set VITE_API_URL in Amplify env vars and redeploy.' })
      }else{
        setStatus({ type:'error', message: `Network error: ${err.message}` })
      }
      console.error('Network error when submitting booking', err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <section id="contact">
      <h3>Book a table</h3>
      <form onSubmit={onSubmit} style={{maxWidth:520}}>
        <div style={{display:'flex',gap:8,marginBottom:8}}>
          <input name="name" placeholder="Name" value={form.name} onChange={onChange} required style={{flex:1,padding:8}} />
          <input name="email" placeholder="Email" value={form.email} onChange={onChange} required style={{flex:1,padding:8}} />
        </div>
        <div style={{display:'flex',gap:8,marginBottom:8}}>
          <input name="date" type="date" value={form.date} onChange={onChange} required style={{flex:1,padding:8}} />
          <input name="time" type="time" value={form.time} onChange={onChange} required style={{flex:1,padding:8}} />
        </div>
        <div style={{display:'flex',gap:8,marginBottom:8}}>
          <input name="people" type="number" min="1" value={form.people} onChange={onChange} required style={{width:100,padding:8}} />
          <input name="notes" placeholder="Notes (optional)" value={form.notes} onChange={onChange} style={{flex:1,padding:8}} />
        </div>
        <button type="submit" disabled={loading} style={{background:'#b5651d',color:'#fff',border:'none',padding:'10px 14px',borderRadius:6}}>
          {loading ? 'Sending...' : 'Request Booking'}
        </button>
        {status && (
          <div style={{marginTop:8,color: status.type === 'success' ? 'green' : 'crimson'}}>{status.message}</div>
        )}
      </form>
    </section>
  )
}
