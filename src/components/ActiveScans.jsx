import { useState, useEffect } from "react";
import PropTypes from "prop-types";

ActiveScans.propTypes = {
  activeScans: PropTypes.array.isRequired,
  stopScan: PropTypes.func.isRequired,
  fetchCollectionInfo: PropTypes.func.isRequired,
};

function ActiveScans({ activeScans, stopScan, fetchCollectionInfo }) {
  const [rowInfo, setRowInfo] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      const info = await Promise.all(
        activeScans.map(async (scan) => {
          const slug = scan.substring(
            0,
            scan.lastIndexOf("-") !== -1 ? scan.lastIndexOf("-") : scan.length
          );
          const collectionInfo = await fetchCollectionInfo(slug);
          collectionInfo.scan = scan;
          return collectionInfo;
        })
      );
      setRowInfo(info);
    };
    getInfo();
  }, [activeScans, fetchCollectionInfo]);

  return (
    <div id="activeScans">
      <h1>Active Scans</h1>
      {activeScans.length === 0 ? (
        <p>No active scans</p>
      ) : (
        rowInfo.map((row, index) => (
          <div className="scan" key={index}>
            <button className="stopButton" onClick={() => stopScan(row.scan)}>
              X
            </button>
            <a
              href={`https://opensea.io/collection/${row.scan.substring(
                0,
                row.scan.lastIndexOf("-") !== -1
                  ? row.scan.lastIndexOf("-")
                  : row.scan.length
              )}`}
              target="_blank"
              rel="noreferrer"
            >
            <img
              src={row.imageUrl}
              alt={row.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            </a>
            <a
              href={`https://opensea.io/collection/${row.scan.substring(
                0,
                row.scan.lastIndexOf("-") !== -1
                  ? row.scan.lastIndexOf("-")
                  : row.scan.length
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <h2 className="scanText">{row.name}</h2>
            </a>
            <p className="scanText">{row.schema}
            {row.schema === "ERC1155" ? (
              <>
                {" "}(Token{" "}
                {row.scan.substring(
                  row.scan.lastIndexOf("-") !== -1
                    ? row.scan.lastIndexOf("-") + 1
                    : row.scan.length
                )})
              </>
            ) : null}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ActiveScans;
