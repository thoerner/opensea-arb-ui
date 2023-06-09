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

  async function stopScan(slug) {
    const response = await postRequest('/stop', { collectionSlug: slug })
    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success(response)
    }
    getData()
  }

  async function startScan(slug, margin, increment) {
    const response = await postRequest('/start', { collectionSlug: slug, margin: Number(margin), increment: Number(increment) })
    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success(response)
    }
    getData()
  }

  return (
    <div className="App">
      <Toaster />
      <img src={ArbLogo} alt="Arb Anderson" />
      <StartScan startScan={startScan} />
      <ActiveScans activeScans={activeScans} stopScan={stopScan} />
    </div>
  )
}

export default App
