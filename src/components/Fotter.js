import React from "react";

export default function Fotter(props) {
  return (
    <div className="row fixed-bottom">
      <button type="button" className="btn btn-danger btn-lg col-2" onClick={()=>{props.resetQuantity()}}>
        Reset
      </button>
      <div className="col-8 btn-info">
        <h3>Total Amount:</h3>
        {props.totalAmount}
      </div>
      <button type="button" className="btn btn-success btn-lg col-2">
        payment
      </button>
    </div>
  );
}