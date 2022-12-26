import React from "react";
import Product from "./Product";
export default function ProductList(props) {
  return props.productList.length > 0 ? (
    props.productList.map((product, i) => {
      return (
        <Product
          product={product}
          key={i}
          increaseQty={props.incrementQuantity}
          decreaseQty={props.decrementQuantity}
          index={i}
          removeDetails={props.removeItem}
        />
      );
    })
  ) : (
    <h1>"No items in your Cart"</h1>
  );
}