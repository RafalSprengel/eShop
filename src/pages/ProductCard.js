import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../layouts/Header.js";
import Footer from "../layouts/Footer";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import PlusMinusInput from "../components/PlusMinusInput";
import { useDispatch } from 'react-redux';
import { addToBasketAction } from '../actions/appActions'

import "../styles/ProductCard.scss";

const useStyles = makeStyles((theme) => ({
  button__root: {
    height: "40px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  dialog__root: {
    "& .MuiPaper-root": {
      padding: "10px"
    }
  },
  dialogBut: {
    width: '100%',
    marginBottom: theme.spacing(1),
    "& a": {
      color: "white"
    }
  }
}));

const ProductCard = ({ propsRoute }) => {
  const productId = propsRoute.match.params.id;
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const [productObj, setProductObj] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch()

  const addToBasket = (currProdObj) => {
    dispatch(addToBasketAction({ ...currProdObj, quantity }))
    setOpenDialog(true);
  };

  useEffect(() => {
    const API = "https://fakestoreapi.com/products/" + productId;
    fetch(API)
      .then((response) => {
        if (response.ok) return response;
        else throw Error(response.statusText);
      })
      .then((response) => response.json())
      .then((response) => setProductObj(response))
      .catch((errors) => console.log(errors));
  }, [productId]);

  return (
    <>
      <Header />
      <content>
        {productObj.length === 0 && (
          <Backdrop open={true} className={classes.backdrop}>
            <CircularProgress color="inherit" />
          Loading...
          </Backdrop>
        )}
        {productObj.length !== 0 && (
          <div className='productCard'>
            <p
              className="link-style"
              onClick={() => propsRoute.history.goBack()}
            >
              &#8592; Back to the list
          </p>
            <Divider />
            <p className="productCard__img-wrap">
              <img src={productObj.image} alt="" />
            </p>

            <h3 className='productCard__title'>{productObj.title}</h3>
            <span className="productCard__price">£{productObj.price.toFixed(2)}</span>
            <div className='productCard__plusMinusInput-wrap'>
              <PlusMinusInput
                style={{ width: '200px' }}
                value={quantity}
                setQuantity={(newValue) => setQuantity(newValue)}
              />
            </div>
            <Button
              className={classes.button__root}
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => addToBasket(productObj)}
            >
              Add to basket
          </Button>
            <div className='productCard__accordions'>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Description:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{productObj.description}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Review:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>feature available soon...</Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        )}
        <Dialog
          className={classes.dialog__root}
          open={openDialog}
        >
          <div className="productCard__dialog__wrap">
            <div className="productCard__dialog__img-wrap">
              <img src={productObj.image} alt="img" />
            </div>
            <div className="productCard__dialog__text">
              <h4>Added to the basket</h4>
              <p className="productCard__dialog__desc">{productObj.title}</p>
              <p className="productCard__dialog__quant">Quantity: {quantity}</p>
            </div>
          </div>
          <Link to="/basket">
            <Button
              className={classes.dialogBut}
              variant="contained"
              color="primary"
            >
              go to the basket
        </Button>
          </Link>

          <Button
            className={classes.dialogBut}
            variant="contained"
            color="secondary"
            autoFocus
            onClick={() => propsRoute.history.goBack()}
          >
            Back to shopping
        </Button>
        </Dialog>
      </content>
      <Footer />
    </>
  );
};

export default ProductCard;
