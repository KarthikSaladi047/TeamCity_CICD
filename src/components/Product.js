import React from "react";

export default function Product(props) {
  return (
    <div className="container">
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {props.product.name}
          <span className="badge bg-primary rounded-pill">
            ${props.product.price}
          </span>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                props.decrementQuantity(props.index);
              }}
            >
              -
            </button>
            <button type="button" className="btn btn-warning">
              {props.product.quantity}
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                props.increaseQty(props.index);
              }}
            >
              +
            </button>
          </div>
          <div>
            <p>This item total price:</p>
            {props.product.quantity * props.product.price}
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              props.removeDetails(props.index);
            }}
          >
            Remove
          </button>
        </li>
      </ul>
    </div>
  );
}
