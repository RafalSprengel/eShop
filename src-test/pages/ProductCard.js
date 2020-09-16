import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PlusMinusInput from '../components/PlusMinusInput'
import '../styles/ProductCard.css'

const useStyles = makeStyles((theme) => ({

    root: {
        height: '40px',
        marginBottom: '13px'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

const ProductCard = ({ propsRoute, basket, setBasket, setZmienna, zmienna, setLicznikWPage, licznikWPage, zmiennaWApp, setLicznikWApp }) => {

    const [licznik, setLicznik] = useState(0);

    const addToBasket = (currProdObj) => {

        /* const prodAlrInBask = basket.find((prodObj) => prodObj.id === currProdObj.id)
        if (prodAlrInBask) {
            let newQuantity = currProdObj.quantity ? parseInt(currProdObj.quantity) + quantity : quantity
            setBasket((prevState) => {
                const newPrevState = prevState.filter((el) => el.id !== currProdObj.id)
                const prevQuantity = prevState.find((el) => el.id === currProdObj.id).quantity
                return [...newPrevState, { ...currProdObj, quantity: prevQuantity + newQuantity }]
            })
        } else setBasket((prevState) => [...prevState, { ...currProdObj, quantity }])
        setOpenDialog(true) */
        setZmienna((prev) => prev + 1)

    }


    return (
        <>
            <p>Licznik w ProductCard : {licznik} </p>
            <p>
                <button onClick={() => setLicznik((prev) => prev + 1)}>
                    Zwieksz Licznik w ProductCard
        </button>
            </p>
      -------------------------------


        </>
    )
}

export default ProductCard