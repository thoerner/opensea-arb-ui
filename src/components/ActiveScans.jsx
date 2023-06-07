const ActiveScans = ({ activeScans, stopScan }) => {
    return (
        <div id="activeScans">
            <h1>Active Scans</h1>
            {activeScans.length === 0 ? (
                <p>No active scans</p>
            ) : (
                activeScans.map((scan, index) => (
                    <div className="scan" key={index}>
                        <button 
                            className="stopButton"
                            onClick={() => stopScan(scan)}
                        >X</button><h2>{scan}</h2>
                    </div>
                ))
            )}
        </div>
    )
}

export default ActiveScans