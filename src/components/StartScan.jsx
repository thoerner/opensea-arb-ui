import React, { useState } from 'react'

const StartScan = ({ startScan }) => {
  const [slug, setSlug] = useState('')
  const [margin, setMargin] = useState('0.15')
  const [increment, setIncrement] = useState('0.01')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (slug !== '') {
      startScan(slug, margin, increment)
      setSlug('')
    }
  }

  return (
    <div id="startScan">
        <form id="inputForm" onSubmit={handleSubmit}>
        <label className='formInput'>
            Collection Slug:{" "}
            <input 
            type="text"
            value={slug}
            onChange={event => setSlug(event.target.value)}
            placeholder="Enter collection slug"
            />
        </label>{" "}
        <label className='formInput'>
            Margin:{" "}
            <input
            type="text"
            value={margin}
            onChange={event => setMargin(event.target.value)}
            placeholder="Enter margin"
            />
        </label>{" "}
        <label className='formInput'>
            Increment:{" "}
            <input
            type="text"
            value={increment}
            onChange={event => setIncrement(event.target.value)}
            placeholder="Enter increment"
            />
        </label>{" "}
        <button type="submit">Start Scan</button>
        </form>
    </div>
  )
}

export default StartScan
