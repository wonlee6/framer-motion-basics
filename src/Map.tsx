import React, {useEffect, useRef, useState} from "react";

interface MapProps extends google.maps.MapOptions {
    style: {[key: string]: string};
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    children?: React.ReactNode;
}
const Map = ({onClick, onIdle, children, style, center, zoom, ...options}: MapProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(
                new window.google.maps.Map(ref.current, {
                    center,
                    zoom
                })
            );
        }
    }, [ref, map]);

    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    // useDeepCompareEffectForMaps(() => {
    //   if (map) {
    //     map.setOptions(options);
    //   }
    // }, [map, options]);

    useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) => google.maps.event.clearListeners(map, eventName));

            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <div ref={ref} style={style} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    // @ts-ignore
                    return React.cloneElement(child, {map});
                }
            })}
        </>
    );
};

export default Map;

// function useDeepCompareEffectForMaps(
//   callback: React.EffectCallback,
//   dependencies: any[]
// ) {
//   React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
// }

// function useDeepCompareMemoize(value: any) {
//   const ref = React.useRef();

//   if (!deepCompareEqualsForMaps(value, ref.current)) {
//     ref.current = value;
//   }

//   return ref.current;
// }

// const deepCompareEqualsForMaps = createCustomEqual(
//   (deepEqual) => (a: any, b: any) => {
//     if (
//       isLatLngLiteral(a) ||
//       a instanceof google.maps.LatLng ||
//       isLatLngLiteral(b) ||
//       b instanceof google.maps.LatLng
//     ) {
//       return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
//     }

//     // TODO extend to other types

//     // use fast-equals for other objects
//     return deepEqual(a, b);
//   }
// );
