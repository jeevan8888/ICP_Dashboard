// 'use client';

// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>

// const MapPage = () => {
//     const defaultProps = {
//         center: {
//             lat: 10.99835602,
//             lng: 77.01502627
//         },
//         zoom: 11
//     };


//     return (
//     <div style={{ height: '100vh', width: '100%' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyDw36QoGkaVp5wLW4rc8M7pyvkz1Ow-SIw" }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         <AnyReactComponent
//           lat={59.955413}
//           lng={30.337844}
//           text="My Marker"
//         />
//       </GoogleMapReact>
//     </div>
//   )
// }

// export default MapPage


'use client';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
const containerStyle = {
    width: '100%',
    height: '100vh',
  };
  
  const center = {
    lat: 59.95,
    lng: 30.33,
  };

const MapPage = () => {
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };


    return (
    <div style={{ height: '100vh', width: '100%' }}>
       <LoadScript googleMapsApiKey="AIzaSyDw36QoGkaVp5wLW4rc8M7pyvkz1Ow-SIw">
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            {/* Add markers or other components here */}
        </GoogleMap>
        </LoadScript>
    </div>
  )
}

export default MapPage
