import "./App.css";
import { useJsApiLoader } from "@react-google-maps/api";
import { mapOptions } from "./components/MapConfiguration";
import Map from "./components/Map";
import RentMap from "./components/RentMap.js";

function App() {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });
  return (
    <div className="bg-black">
      <RentMap />
      <Map isLoaded={isLoaded} />
    </div>
  );
}

export default App;
