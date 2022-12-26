import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AddItem from "./components/AddItem";
import ProductList from "./components/ProductList";
import Fotter from "./components/Fotter";

function App() {
  const products = [
    { price: 9999, name: "Iphone X", quantity: 0},
    { price: 1999, name: "realme 10a", quantity: 0 },
  ];

  let [productList, setProductList] = useState(products);
  let [totalAmount, setTotalAmount] = useState(0);

  const incrementQuantity = (index) => {
    let newProductList = [...productList];
    let newTotalAmount = totalAmount;
    newProductList[index].quantity++;
    newTotalAmount += newProductList[index].price;
    setProductList(newProductList);
    setTotalAmount(newTotalAmount);
  };
  const decrementQuantity = (index) => {
    let newProductList = [...productList];
    let newTotalAmount = totalAmount;
    if (newProductList[index].quantity > 0) {
      newTotalAmount -= newProductList[index].price;
      newProductList[index].quantity--;
    }
    setProductList(newProductList);
    setTotalAmount(newTotalAmount);
  };
  const resetQuantity = () => {
    let newProductList = [...productList];
    newProductList.map((products) => {
      products.quantity = 0;
    });
    setProductList(newProductList);
    setTotalAmount(0);
  };
  const addItem = (name, price) => {
    let newProductList = [...productList];
    newProductList.push({ name: name, price: price, quantity: 0 });
    setProductList(newProductList);
  };
  const removeItem = (index) => {
    let newProductList = [...productList];
    let newTotalAmount = totalAmount;
    newTotalAmount -=
      newProductList[index].quantity * newProductList[index].price;
    newProductList.splice(index, 1);
    setProductList(newProductList);
    setTotalAmount(newTotalAmount);
  };

  return (
    <div className="App">
      <Navbar />
      <main className="container mt-5">
        <AddItem addItem={addItem} />
        <ProductList
          productList={productList}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          removeItem={removeItem}
        />
      </main>

      <Fotter totalAmount={totalAmount} resetQuantity={resetQuantity} />
    </div>
  );
}
export default App;
