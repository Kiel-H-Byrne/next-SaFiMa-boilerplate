import React from "react";

const Marker = ({ ...props }) => {
  // console.log(props)
  const style={
    marker: {
      cursor: `${props => (props.onClick ? "pointer" : "default")}`
    }
  }

  return (
    <div
      className="App-marker"
      alt={props.text}
      {...(props.onClick ? { onClick: props.onClick } : {})}>
      <img
        height="25px"
        width="25px"
        src="http://www.orbitinformatics.com/wp-content/uploads/2016/11/fa18fbc911311b5371870c880fa5f75a-location-pin-by-vexels.png"
        alt="venue"
      />
      {props.text}
    </div>
  );
};

Marker.defaultProps = {
  onClick: null,
};

export default Marker;
