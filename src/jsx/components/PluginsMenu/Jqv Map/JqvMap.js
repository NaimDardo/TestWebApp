import React from "react";

// import { SVGMap } from "react-svg-map";

import GoogleMapReact from 'google-map-react';

// import "react-svg-map/lib/index.css";
import PageTitle from "../../../layouts/PageTitle";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627
  },
  zoom: 11
  };

const JqvMap = () => {
  
  return (
    <div className="h-80">
      <PageTitle activeMenu="jqvmap" motherMenu="Map" />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">World Map</h4>
            </div>
            <div className="card-body mb-2" style={{ height: "100%" }}>
                <GoogleMapReact        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}/>
                <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
            </div>
          </div>
        </div>
  
      </div>
    </div>
  );
};

export default JqvMap;
