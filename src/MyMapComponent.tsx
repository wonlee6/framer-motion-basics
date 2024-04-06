import {useEffect, useRef} from "react";

export default function MyMapComponent({center, zoom}: {center: google.maps.LatLngLiteral; zoom: number}) {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            new window.google.maps.Map(ref.current, {
                center,
                zoom
            });
        }
    });

    return <div ref={ref} id="map" />;
}
