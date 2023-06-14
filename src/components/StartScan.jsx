import React, { useState } from 'react'

const StartScan = ({ startScan, fetchCollectionInfo }) => {
  const [slug, setSlug] = useState('')
  const [margin, setMargin] = useState('0.15')
  const [increment, setIncrement] = useState('0.01')
  const [collectionInfo, setCollectionInfo] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (slug !== '') {
      startScan(slug, margin, increment)
      setSlug('')
    }
  }

  const handleFetchInfo = async (event) => {
    event.preventDefault()
    if (slug !== '') {
      const info = await fetchCollectionInfo(slug)
      setCollectionInfo(info)
    }
  }

  const RenderObject = ({ object }) => {
    return Object.keys(object).map(key => {
      const value = object[key];
      return (
        <div key={key}>
          <strong>{key}: </strong>
          {typeof value === 'object' && value !== null
            ? <RenderObject object={value} />
            : JSON.stringify(value)}
        </div>
      );
    });
  };

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
        <button type="button" onClick={handleFetchInfo}>Fetch Collection Info</button>
        <button type="submit">Start Scan</button>
      </form>
      <div className='collectionInfo'>
        {collectionInfo && <>
          <a href={`https://opensea.io/collection/${slug}`} target='_blank' rel="noreferrer">{collectionInfo.name}</a><br/><br/>
          {collectionInfo.creatorFee.isEnforced ? <><span style={{color: 'red'}}>Creator Fee enforced!</span> <span style={{color: 'yellow'}}>{collectionInfo.creatorFee.fee / 100}%</span></> : <span style={{color: 'darkgreen'}}>Creator Fee is not enforced</span>}<br/>
          <span style={{color: 'purple'}}>Floor: {collectionInfo.stats.floor_price}</span><br/>
          Traits:
          <RenderObject object={collectionInfo.traits} />
        </>}
      </div>
    </div>
  )
}

export default StartScan
