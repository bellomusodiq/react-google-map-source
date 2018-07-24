import React from 'react';
import FourSquare from './fourSquare';
import { compose, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const MapWithAMakredInfoWindow = compose(
    withStateHandlers(() => ({
        isOpen: false,
    }), {
        onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
        })
    }),
    
    withScriptjs,
    withGoogleMap
)(props =>{
  let markers = props.locations.map(loc =>{
    return (
      <Marker key={loc.id} position={loc.loc} onClick={() => props.display(loc.id)} >
      {props.show === loc.id ?<InfoWindow onCloseClick={() => props.closeDetail()}>
        <FourSquare ll={loc.loc.lat+','+loc.loc.lng} query={loc.query} />
      </InfoWindow>:null}
      </Marker>
    )
})
if(props.selected && props.current){
  
  markers = props.locations.map((loc, i) =>{
    return (
      <div key={loc.id}>{props.selected === i+1 ?
        <Marker position={loc.loc} onClick={() => props.display(loc.id)} >
        {props.show === loc.id ?<InfoWindow onCloseClick={() => props.closeDetail()}>
          <FourSquare ll={loc.loc.lat+','+loc.loc.lng} query={loc.query} />
        </InfoWindow>:null}
        </Marker>:null}
      </div>
    )
})
}
    let zoom = 13.6;
    if(window.innerWidth <769 && window.innerWidth>425){
      zoom = 13.4;
    }
    if(window.innerWidth <= 425){
      zoom = 12.4;
    }
    return(
      <GoogleMap
    defaultZoom={zoom}
    defaultCenter={{ lat: 41.702885, lng: 44.7655853 }}
    >
      {markers}
  </GoogleMap>
    )
  }
);


export default MapWithAMakredInfoWindow