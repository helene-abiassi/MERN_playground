import { useEffect } from "react";
import Iframe from "react-iframe";
import LeafletMap from "../components/LeafletMap";

function Map() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1>map</h1>

      <div>
        <LeafletMap />

      </div>
    </div>
  );
}

export default Map;
