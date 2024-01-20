import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import WeedLeaf from "../assets/weed_leaf.png";

const API_URL = import.meta.env.VITE_API_URL;

ActiveScans.propTypes = {
  activeScans: PropTypes.array.isRequired,
  stopScan: PropTypes.func.isRequired,
  fetchCollectionInfo: PropTypes.func.isRequired,
};

function ActiveScans({
  activeScans,
  stopScan,
  fetchCollectionInfo,
}) {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img src={WeedLeaf} alt="weed leaf" style={{ width: "100px" }} />
        <h1>Active Scans</h1>
        <img src={WeedLeaf} alt="weed leaf" style={{ width: "100px" }} />
      </div>
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
            <h2 className="scanText">
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
                {row.name}
              </a>
            </h2>
            <p className="scanText">
              {row.schema === "erc1155" ? (
                <>
                  {" "}
                  (
                  <span
                    title={`Token #${row.scan.substring(
                      row.scan.lastIndexOf("-") !== -1
                        ? row.scan.lastIndexOf("-") + 1
                        : row.scan.length
                    )}`}
                  >
                    {row.nfts.find(
                      (token) =>
                        token.identifier ===
                        row.scan.substring(
                          row.scan.lastIndexOf("-") !== -1
                            ? row.scan.lastIndexOf("-") + 1
                            : row.scan.length
                        )
                    )?.name ||
                      `Token #${row.scan.substring(
                        row.scan.lastIndexOf("-") !== -1
                          ? row.scan.lastIndexOf("-") + 1
                          : row.scan.length
                      )}`}
                  </span>
                  )
                </>
              ) : null}
            </p>
            <p
              className="scanText"
              style={{
                color: "blue",
                textDecoration: "underline",
                fontSize: "0.8rem",
              }}
            >
              {" "}
              <a
                href={`${API_URL}/collectionInfo/${row.scan.substring(
                  0,
                  row.scan.lastIndexOf("-") !== -1
                    ? row.scan.lastIndexOf("-")
                    : row.scan.length
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Info
              </a>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ActiveScans;
