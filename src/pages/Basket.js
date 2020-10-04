import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import "../styles/Basket.scss";
import PlusMinusInput from "../components/PlusMinusInput";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  dialog__remove__wrap: {
    padding: '15px',
  },
  dialog__remove__title: {
    margin: "0",
    padding: '0'
  },
  dialog__remove__content: {
    padding: '0'
  }
}));

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

  const RemovingDialog = ({ basket, setBasket, currProdObj }) => {

    const classes = useStyles();
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
        <div className={classes.dialog__remove__wrap}>
          <DialogTitle id="alert-dialog-title" className={classes.dialog__remove__title}>
            Delete item
        </DialogTitle>
          <DialogContent className={classes.dialog__remove__content}>
            <DialogContentText id="alert-dialog-description">
              Do you really want to remove this item from your basket ?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => removeFromBasket(currProdObj)} color="primary">
              Confirm
          </Button>
            <Button
              onClick={() => setOpenRemConf(false)}
              color="primary"
              autoFocus
            >
              Cancel
          </Button>
          </DialogActions>
        </div>
      </Dialog >

    );
  };
  return (
    <>
      <div className="basket__product">
        <div className='basket__product__image-and-title-wrap'>
          <div className='basket__product__image-wrap'>
            <img src={currProdObj.image} alt="pic" />
          </div>
          <div className='basket__product__title-wrap'>
            <p>{currProdObj.title}</p>
            <p className='basket_product__code'>Product code: {currProdObj.id}</p>
          </div>
        </div>
        <div className='basket__product__quantity-wrap'>
          <p>{currProdObj.quantity && `Quantity: ${currProdObj.quantity}`}</p>
          <PlusMinusInput
            value={currProdObj.quantity}
            getCurrValue={setQuantity}
            variant='small'
          />
        </div>
        <div className='basket__product__price-wrap'>
          <span>Item price :</span>
          <span>£{currProdObj.price}</span>
        </div>
        <div className='basket__product__totalPrice-wrap'>
          <p>Total price:</p>
          <p>£{(currProdObj.quantity * currProdObj.price)}</p>
        </div>
        <Button variant="contained" color="primary" onClick={() => setOpenRemConf(true)}>Remove</Button>
      </div>
      <Divider />
      <RemovingDialog
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
      <div className="basket">
        <p className="basket__back-link">&laquo; continue shopping</p>
        <h2>Your basket</h2>
        <h4 className='basket__products-counter'>({basket.length} products)</h4>
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
    </>
  );
};

export default Basket;
