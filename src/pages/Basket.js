import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import "../styles/Basket.scss";
import Header from "../layouts/Header.js";
import Footer from "../layouts/Footer";
import PlusMinusInput from "../components/PlusMinusInput";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { changeQuantity, removeFromBasket as reduxRemoveFromBasket } from '../actions/appActions'

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

const RemovingDialog = ({ currProdObj, setOpenRemConf, openRemConf }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const removeFromBasket = (currProdObj) => {
    dispatch(reduxRemoveFromBasket(currProdObj.id))
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

const SingleProduct = ({ currProdObj }) => {
  const [openRemConf, setOpenRemConf] = useState(false);
  const dispatch = useDispatch()
  const setQuantity = (newQuantity) => dispatch(changeQuantity(currProdObj.id, newQuantity))

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
        <div className='basket__product__calc'>
          <span className='basket__product__quantity basket__product__desc'>Quantity:</span>
          <span>
            <PlusMinusInput
              value={currProdObj.quantity}
              setQuantity={setQuantity}
              variant='small'
              disabled
            />
          </span>
          <span></span>
        </div>
        <div className='basket__product__calc'>
          <span className='basket__product__desc'>Item price :</span>
          <span className='basket__product__price'>£{currProdObj.price.toFixed(2)}</span>
          <span className='basket__product__price-blank'></span>
        </div>
        <div className='basket__product__calc'>
          <span className='basket__product__desc'>Total price:</span>
          <span className='basket__product__price'>£{(currProdObj.quantity * currProdObj.price).toFixed(2)}</span>

          <span className='basket__product__bin'>
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => setOpenRemConf(true)}
            />
          </span>
        </div>
      </div>
      <RemovingDialog
        openRemConf={openRemConf}
        setOpenRemConf={setOpenRemConf}
        currProdObj={currProdObj}
      />
    </>
  );
};

const Basket = () => {
  const reduxBasket = useSelector(store => store.basket)
  let prices = reduxBasket.map((el) => el.price * el.quantity)
  let summaryPrice = (reduxBasket.length > 0) ? prices.reduce((total, curr) => total + curr) : 0;
  const history = useHistory()

  const location = {
    pathname: "/checkout/login",
    state: { naszParrametr: 'dupa' }
  }
  const goToLoginPage = () => {
    history.push(location)
  }
  const goToMainPage = () => history.push({ pathname: '/' })
  return (
    <>
      <Header />
      <main>
        {(reduxBasket.length > 0 &&
          <div className="basket">
            <div className='basket__header'>
              <p className="back-link" onClick={() => goToMainPage()}>&#8592; back to shopping</p>
              <h2>Your basket</h2>
              <h4 className='basket__products-counter'>({reduxBasket.length} products)</h4>
            </div>
            <Divider />
            <div id="basket-products-list">
              {reduxBasket.map((currProdObj) => (
                <div key={currProdObj.title}>
                  <SingleProduct currProdObj={currProdObj} />
                </div>
              ))}
            </div>
            <div className='basket__summary__wrap'>
              <div className='basket__summary__title'>
                Subtotal ({reduxBasket.length} items):&nbsp;
            <span className='basket__summary__price'>£{summaryPrice.toFixed(2)}</span>
              </div>
              {/* <NavLink to='/checkout/login'> */}
              <button
                onClick={goToLoginPage}
                className='basket__summary__button'>Proceed to Checkout</button>
              {/* </NavLink> */}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Basket;
