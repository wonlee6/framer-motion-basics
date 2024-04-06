import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";

export default function AdvanceMarker(options: google.maps.marker.AdvancedMarkerElementOptions) {
    useEffect(() => {
        const markerContainer = document.createElement("div");
        const markerInstance = new google.maps.marker.AdvancedMarkerElement({
            position: options.position,
            map: options.map,
            title: "마커",
            content: markerContainer
        });
        createRoot(markerContainer).render(<div style={{backgroundColor: "yellow", padding: "10px"}}>마커</div>);
        markerInstance.addListener("click", () => {
            alert("마커 클릭");
        });

        return () => {
            markerInstance.map = null;
        };
    }, [options]);

    // useEffect(() => {
    //   if (marker) {
    //     setMarker({
    //       map: options.map
    //     })
    //   }
    // }, [marker])

    return null;
}
