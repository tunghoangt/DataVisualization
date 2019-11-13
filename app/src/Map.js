
import React, { useState, useEffect } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"

// import allStates from "../data/allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// const offsets = {
//   VT: [50, -8],
//   NH: [34, 2],
//   MA: [30, -1],
//   RI: [28, 2],
//   CT: [35, 10],
//   NJ: [34, 1],
//   DE: [33, 0],
//   MD: [47, 10],
//   DC: [49, 21]
// };
//
// const Map = ( data, activeState ) => {
//   return (
//     <ComposableMap projection="geoAlbersUsa">
//       <Geographies geography={geoUrl}>
//         {({ geographies }) => (
//           <>
//             {geographies.map(geo => (
//               <Geography
//                 key={geo.rsmKey}
//                 stroke="#FFF"
//                 geography={geo}
//                 fill="#DDD"
//               />
//             ))}
//             {geographies.map(geo => {
//               const centroid = geoCentroid(geo);
//               const cur = allStates.find(s => s.val === geo.id);
//               return (
//                 <g key={geo.rsmKey + "-name"}>
//                   {cur &&
//                     centroid[0] > -160 &&
//                     centroid[0] < -67 &&
//                     (Object.keys(offsets).indexOf(cur.id) === -1 ? (
//                       <Marker coordinates={centroid}>
//                         <text y="2" fontSize={14} textAnchor="middle">
//                           {cur.id}
//                         </text>
//                       </Marker>
//                     ) : (
//                       <Annotation
//                         subject={centroid}
//                         dx={offsets[cur.id][0]}
//                         dy={offsets[cur.id][1]}
//                       >
//                         <text x={4} fontSize={14} alignmentBaseline="middle">
//                           {cur.id}
//                         </text>
//                       </Annotation>
//                     ))}
//                 </g>
//               );
//             })}
//           </>
//         )}
//       </Geographies>
//     </ComposableMap>
//   );
// };

class Map extends Rect.Component {


  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  const projection = geoEqualEarth()
                        .scale(160)
                        .translate([800 / 2, 450 / 2])

  makeMap() {
    const [geographies, setGeographies] = useState([])

    useEffect(() => {
      fetch(geoUrl).then(response => {
        if (response.status != 200) {
          console.log(`There was a problem ${response.status}`)
          return
        }
        response.json().then(statesdata => {
          setGeographies(feature(statesdata, statesdata.objects.states).features)
      })
    })
  }, [])

  return (

    geographies.map((d, i) => (
      <path
        key={`path-${ i }`}
        d={ geoPath().projection(projection)(d) }
      >
    ))
  )

}



export default Map;
