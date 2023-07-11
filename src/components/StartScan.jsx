import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { ERC1155Dropdown } from './ERC1155Dropdown'

const CollectionInfo = ({ collectionInfo, slug, setToken, value }) => {
  if (!collectionInfo || !slug) return null

  if (value === null) {
    value = ''
  }

  return (
    <div className='collectionInfo'>
        {collectionInfo && <>
          <a href={`https://opensea.io/collection/${slug}`} target='_blank' rel="noreferrer">{collectionInfo.name}</a><br/><br/>
          <img src={collectionInfo.imageUrl} alt={collectionInfo.name} style={{width: '100px'}}/><br/>
          {collectionInfo.creatorFee.isEnforced ? <><span style={{color: 'red'}}>Creator Fee enforced!</span> <span style={{color: 'yellow'}}>{collectionInfo.creatorFee.fee / 100}%</span></> : <span style={{color: 'darkgreen'}}>Creator Fee is not enforced</span>}<br/>
          <span style={{color: 'purple'}}>Floor: {collectionInfo.stats.floor_price}</span><br/>
          <span style={{color: 'blue'}}>Schema: {collectionInfo.schema}</span><br/>
          {collectionInfo.schema === 'ERC721' ? <></> :
          <>
          <span style={{color: 'orange'}}>Token:</span>
          <ERC1155Dropdown items={collectionInfo.nfts} setToken={setToken} value={value}/>
          </>
          }
        </>}
      </div>
  )
}

const StartScan = ({ startScan, fetchCollectionInfo }) => {
  const [slug, setSlug] = useState('')
  const [margin, setMargin] = useState('0.25')
  const [increment, setIncrement] = useState('0.01')
  const [schema, setSchema] = useState('ERC721')
  const [token, setToken] = useState(null)
  const [superblaster, setSuperblaster] = useState(false)
  const [collectionInfo, setCollectionInfo] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!collectionInfo) {
      toast.error('Please fetch collection info first')
      return
    }
    if (slug !== '') {
      startScan(slug, margin, increment, schema, token, superblaster)
      setSlug('')
      setMargin('0.25')
      setIncrement('0.01')
      setSchema('ERC721')
      setToken(null)
      setSuperblaster(false)
      setCollectionInfo(null)
    }
  }

  const handleFetchInfo = async (event) => {
    event.preventDefault()
    if (slug !== '') {
      const info = await fetchCollectionInfo(slug)
      setCollectionInfo(info)
    }
  }

  useEffect(() => {
    if (collectionInfo) {
      setSchema(collectionInfo.schema)
    }
  }, [collectionInfo])

  const handleSlugChange = (event) => {
    setSlug(event.target.value)
    setCollectionInfo(null)
  }

  return (
    <div id="startScan">
      <form id="inputForm" onSubmit={handleFetchInfo}>
        <div>
          <label className='formInput'>
              Collection Slug:{" "}
              <input 
              type="text"
              value={slug}
              onChange={event => handleSlugChange(event)}
              placeholder="Enter collection slug"
              style={{width: '200px'}}
              />
          </label>
        </div>
        <div>
          <label className='formInput'>
              Margin:{" "}
              <input
              type="text"
              value={margin}
              onChange={event => setMargin(event.target.value)}
              placeholder="Enter margin"
              style={{width: '100px'}}
              />
          </label>
        </div>
        <div>
          <label className='formInput'>
              Increment:{" "}
              <input
              type="text"
              value={increment}
              onChange={event => setIncrement(event.target.value)}
              placeholder="Enter increment"
              style={{width: '100px'}}
              />
          </label>
        </div>
        <div>
          <label className='formInput'>
              Superblaster:{" "} 
              <input
              type="checkbox"
              checked={superblaster}
              onChange={event => setSuperblaster(event.target.value)}
              style={{width: '100px'}}
              />
          </label>
        </div>
        <button type="submit" style={{backgroundColor: "blue", border: "1px solid darkblue"}}>Fetch Collection Info</button>
        <button type="button" onClick={handleSubmit} style={{backgroundColor: "green", border: "1px solid darkgreen"}}>Start Scan/Offers</button>
      </form>
      <CollectionInfo collectionInfo={collectionInfo} slug={slug} setToken={setToken} value={token}/>
    </div>
  )
}

export default StartScan
