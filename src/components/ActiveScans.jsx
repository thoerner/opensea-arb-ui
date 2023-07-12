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
                        >X</button>
                        <a href={`https://opensea.io/collection/${scan.substring(0, scan.lastIndexOf('-') !== -1 ? scan.lastIndexOf('-') : scan.length)}`} target="_blank" rel="noreferrer"><h2 className="scanText">{scan}</h2></a>
                    </div>
                ))
            )}
        </div>
    )
}

export default ActiveScans