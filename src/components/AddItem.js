import React from "react";

class AddItem extends React.Component {
    constructor(props){
        super(props);
        this.state={
            productName:"",
            productPrice:0
        };
    }
  render() {
    return (
      <>
        <form className="container wd=100px  bg-dark text-white" onSubmit={(e)=>{
            e.preventDefault();
            this.props.addItem(this.state.productName,Number(this.state.productPrice))}}>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Mobile Brand
            </label>
            <input
              type="text"
              className="form-control"
              id="nameofitem"
              placeholder="Enter the Mobile Brand"
              onChange={(e)=>{this.setState({productName:e.currentTarget.value});}}
              value={this.state.productName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="priceofitem"
              placeholder="Enter the price of Mobile"
              onChange={(e)=>{this.setState({productPrice:e.currentTarget.value});}}
              value={this.state.productPrice}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3" >
              AddItem
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default AddItem;