import { useState, useEffect } from 'react'
import './App.css'
import { getRequest, apiUrl } from './api'

const ActiveScansCard = ({scan}) => {
  return (
    <div className="scan-card">
      <h2>{scan}</h2>
    </div>
  )
}

function App() {
  const [activeScans, setActiveScans] = useState([])

  useEffect(() => {
    const getData = async () => {
      const data = await getRequest(`${apiUrl}/active`)
      setActiveScans(data)
    }
    getData()
  }, [])

  return (
    <div className="App">
      <h1>Active Scans</h1>
      {activeScans.length === 0 ? (
        <p>No active scans</p>
      ) : (
        activeScans.map((scan, index) => (
          <ActiveScansCard key={index} scan={scan} />
        ))
      )}
    </div>
  )
}

export default App
