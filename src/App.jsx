import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { getRequest, postRequest } from './api'
import ActiveScans from './components/ActiveScans'
import StartScan from './components/StartScan'
import ArbLogo from './assets/arb.png'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [activeScans, setActiveScans] = useState([])

  const init = useCallback(async () => {
    const active = await getRequest('/active')
    setActiveScans(active)
  }, [])

  useEffect(() => {
    init()
  }, [init])

  function toastResponse(response) {
    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success(response)
    }
  }

  async function stopScan(slug) {
    const response = await postRequest('/stop', { collectionSlug: slug })
    toastResponse(response)
    init()
  }

  async function startScan(slug, margin, increment, schema, token, superblaster) {
    const response = await postRequest('/start', { collectionSlug: slug, margin: Number(margin), increment: Number(increment), schema, token, superblaster})
    toastResponse(response)
    init()
  }

  async function getCollectionInfo(slug) {
    console.log(`getCollectionInfo: ${slug}`)
    const response = await getRequest(`/collectionInfo/${slug}`)
    console.log(`response: ${response}`)
    return response
  }

  return (
    <div className="App">
      <Toaster />
      <a href="https://opensea.io/ArbAnderson" target="_blank" rel="noreferrer"><img src={ArbLogo} alt="Arb Anderson" style={{transform: "translateY(7px)"}} /></a>
      <StartScan startScan={startScan} fetchCollectionInfo={getCollectionInfo} />
      <ActiveScans activeScans={activeScans} stopScan={stopScan} fetchCollectionInfo={getCollectionInfo} />
    </div>
  )
}

export default App
