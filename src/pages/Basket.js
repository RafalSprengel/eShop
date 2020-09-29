import React, { useState } from "react";
import Divider from "@material-ui/core/Divider";
import "../styles/Basket.css";
import PlusMinusInput from "../components/PlusMinusInput";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const SingleProduct = ({
  basket,
  setBasket,
  currProdObj,
  removeFromBasket,
  chanProdQuantInBask
}) => {
  const [openRemConf, setOpenRemConf] = useState(false);
  const setQuantity = (newQuantity) =>
    chanProdQuantInBask(currProdObj, newQuantity);

  const RemoveDialog = ({ basket, setBasket, currProdObj }) => {
    const removeFromBasket = (currProdObj) => {
      const updatedBasket = basket.filter((el) => el.id !== currProdObj.id);
      setBasket(updatedBasket);
    };

    return (
      <Dialog
        open={openRemConf}
        onClose={() => setOpenRemConf(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => removeFromBasket(currProdObj)} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => setOpenRemConf(false)}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <>
      <div className="product-in-basket">
        <ul>
          <li>
            <img src={currProdObj.image} alt="pic" />
          </li>
          <li>
            <p>{currProdObj.title}</p>
            <p>Product code: {currProdObj.id}</p>
          </li>
        </ul>
        <PlusMinusInput
          value={currProdObj.quantity}
          getCurrValue={setQuantity}
        />
        <p>{currProdObj.quantity && `Quantity: ${currProdObj.quantity}`}</p>
        <button onClick={() => setOpenRemConf(true)}>Romove</button>
        <Divider />
      </div>
      <RemoveDialog
        openRemConf={openRemConf}
        setOpenRemConf={setOpenRemConf}
        basket={basket}
        setBasket={setBasket}
        currProdObj={currProdObj}
      />
    </>
  );
};

const Basket = ({ basket, setBasket, chanProdQuantInBask }) => {
  return (
    <>
      <div id="basket-wrap">
        <div id="basket-header">
          <p id="basket-back-link">Continue shopping</p>
          <h2>Your basket</h2>
          <h4>({basket.length} products)</h4>
          <Divider />
          <div id="basket-products-list">
            {basket.map((currProdObj) => (
              <div key={currProdObj.title}>
                <SingleProduct
                  currProdObj={currProdObj}
                  chanProdQuantInBask={chanProdQuantInBask}
                  basket={basket}
                  setBasket={setBasket}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Basket;
