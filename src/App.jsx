import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { getRequest, postRequest } from "./api";
import ActiveScans from "./components/ActiveScans";
import StartScan from "./components/StartScan";
import ArbLogo from "./assets/arb.png";
import toast, { Toaster } from "react-hot-toast";

const PASSWORD = import.meta.env.VITE_PASSWORD;

function App() {
  const [activeScans, setActiveScans] = useState([]);
  const [authorized, setAuthorized] = useState(false);

  const refreshScans = useCallback(async () => {
    const active = await getRequest("/active");
    setActiveScans(active);
  }, []);

  useEffect(() => {
    refreshScans();
  }, [refreshScans]);

  function toastResponse(response) {
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response);
    }
  }

  async function stopScan(slug) {
    const response = await postRequest("/stop", { collectionSlug: slug });
    toastResponse(response);
    refreshScans();
  }

  async function startScan(
    slug,
    margin,
    increment,
    schema,
    token,
    superblaster,
    isCollectionOffer
  ) {
    const response = await postRequest("/start", {
      collectionSlug: slug,
      margin: Number(margin),
      increment: Number(increment),
      schema,
      token,
      superblaster,
      isCollectionOffer,
    });
    toastResponse(response);
    refreshScans();
  }

  async function getCollectionInfo(slug) {
    console.log(`getCollectionInfo: ${slug}`);
    const response = await getRequest(`/collectionInfo/${slug}`);
    console.log(`response: ${response}`);
    return response;
  }

  return (
    <div className="App">
      <Toaster />
      {authorized ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              width: "50vw",
            }}
          >
            <p
              style={{
                fontSize: "1.7rem",
                transform: "translateY(1.5rem)",
              }}
            >
              Arb Anderson <span style={{ fontSize: "1.1rem" }}>v1.0.2</span>
            </p>
            <a
              href="https://opensea.io/ArbAnderson"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={ArbLogo}
                alt="Arb Anderson"
                style={{ transform: "translateY(7px)", width: "100px" }}
              />
            </a>
            <div></div>
          </div>
          <StartScan
            startScan={startScan}
            fetchCollectionInfo={getCollectionInfo}
          />
          <ActiveScans
            activeScans={activeScans}
            stopScan={stopScan}
            fetchCollectionInfo={getCollectionInfo}
          />
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50vw",
            }}
          >
            <a
              href="https://opensea.io/ArbAnderson"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={ArbLogo}
                alt="Arb Anderson"
                style={{ transform: "translateY(7px)", width: "100px" }}
              />
            </a>
            <div></div>
          </div>
          <div style={{ width: "50vw", backgroundColor: "white", color: "black", padding: "20px", borderRadius: "1rem", opacity: "50%" }}>
            <p style={{ fontSize: "1.5rem" }}>
              Enter your password to continue
            </p>
            <input
              type="password"
              onChange={(e) => {
                if (e.target.value === PASSWORD) {
                  setAuthorized(true);
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
