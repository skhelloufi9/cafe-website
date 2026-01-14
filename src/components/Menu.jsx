import React from 'react'

const items = [
  {id:1, name:'Flat White', desc:'Smooth espresso with steamed milk', price:'£2.90'},
  {id:2, name:'Cappuccino', desc:'Espresso, steamed milk & foam', price:'£3.10'},
  {id:3, name:'Latte', desc:'Creamy milk and espresso', price:'£3.00'},
  {id:4, name:'Blueberry Muffin', desc:'Freshly baked daily', price:'£2.20'},
]

export default function Menu(){
  return (
    <section id="menu">
      <h3>Popular Items</h3>
      <div className="menu-grid">
        {items.map(item=> (
          <article key={item.id} className="card">
            <h4>{item.name} <span className="price">{item.price}</span></h4>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
