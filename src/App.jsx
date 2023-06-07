import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { getRequest, postRequest } from './api'
import ActiveScans from './components/ActiveScans'
import StartScan from './components/StartScan'
import ArbLogo from './assets/arb.png'

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
    await postRequest('/stop', { collectionSlug: slug })
    getData()
  }

  async function startScan(slug, margin, increment) {
    await postRequest('/start', { collectionSlug: slug, margin: Number(margin), increment: Number(increment) })
    getData()
  }

  return (
    <div className="App">
      <img src={ArbLogo} alt="Arb Anderson" />
      <StartScan startScan={startScan} />
      <ActiveScans activeScans={activeScans} stopScan={stopScan} />
    </div>
  )
}

export default App
