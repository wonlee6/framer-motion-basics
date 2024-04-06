import {useEffect, useState} from "react";
import {Wrapper, Status} from "@googlemaps/react-wrapper";
import Map from "./Map";
import Marker from "./Marker";
import "./App.css";
import AdvanceMarker from "./AdvanceMarker";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

function App() {
    const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = useState(10); // initial zoom
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({
        lat: 37.55199432373047,
        lng: 126.99177551269531
    });

    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng!]);
    };

    const onIdle = (m: google.maps.Map) => {
        setZoom(m.getZoom()!);
        setCenter(m.getCenter()!.toJSON());
    };

    useEffect(() => console.log(clicks), [clicks]);

    const form = (
        <div
            style={{
                padding: "1rem",
                flexBasis: "250px",
                height: "100%",
                overflow: "auto"
            }}
        >
            <label htmlFor="zoom">Zoom</label>
            <input
                type="number"
                id="zoom"
                name="zoom"
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
            />
            <br />
            <label htmlFor="lat">Latitude</label>
            <input
                type="number"
                id="lat"
                name="lat"
                value={center.lat}
                onChange={(event) => setCenter({...center, lat: Number(event.target.value)})}
            />
            <br />
            <label htmlFor="lng">Longitude</label>
            <input
                type="number"
                id="lng"
                name="lng"
                value={center.lng}
                onChange={(event) => setCenter({...center, lng: Number(event.target.value)})}
            />
            <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
            {clicks.map((latLng, i) => (
                <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
            ))}
            <button onClick={() => setClicks([])}>Clear</button>
        </div>
    );

    return (
        <div style={{height: "100%", display: "flex"}}>
            <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!} render={render} libraries={["marker"]}>
                <Map
                    center={center}
                    onClick={onClick}
                    onIdle={onIdle}
                    zoom={zoom}
                    style={{flexGrow: "1", height: "100%"}}
                >
                    {clicks.map((latLng, i) => (
                        // <Marker key={i} position={latLng} />
                        <AdvanceMarker key={i} position={latLng} />
                    ))}
                </Map>
                {/* <MyMapComponent center={center} zoom={zoom} /> */}
            </Wrapper>
            {/* Basic form for controlling center and zoom of map. */}
            {form}
        </div>
    );
}

export default App;
