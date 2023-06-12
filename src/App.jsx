import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { getRequest, postRequest } from './api'
import ActiveScans from './components/ActiveScans'
import StartScan from './components/StartScan'
import ArbLogo from './assets/arb.png'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [activeScans, setActiveScans] = useState([])

  const getData = useCallback(async () => {
    const data = await getRequest('/active')
    setActiveScans(data)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

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
    getData()
  }

  async function startScan(slug, margin, increment) {
    const response = await postRequest('/start', { collectionSlug: slug, margin: Number(margin), increment: Number(increment) })
    toastResponse(response)
    getData()
  }

  async function getCollectionInfo(slug) {
    const response = await postRequest('/collectionInfo', { collectionSlug: slug })
    return response
  }

  return (
    <div className="App">
      <Toaster />
      <img src={ArbLogo} alt="Arb Anderson" />
      <StartScan startScan={startScan} fetchCollectionInfo={getCollectionInfo} />
      <ActiveScans activeScans={activeScans} stopScan={stopScan} />
    </div>
  )
}

export default App
