import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import '../styles/ProductCard.css'
import PlusMinusInput from '../components/PlusMinusInput'


const useStyles = makeStyles((theme) => ({

    root: {
        height: '40px',
        marginBottom: '13px'
    }
}));

const ProductCard = ({ propsRoute, productsList, basket, setBasket }) => {
    const classes = useStyles();
    const [quantity, setQuantity] = useState(1);

    const addToBasket = (currProdObj) => {
        const prodAlrInBask = basket.find((prodObj) => prodObj.id == currProdObj.id)
        if (prodAlrInBask) {
            let newQuantity = currProdObj.quantity ? parseInt(currProdObj.quantity) + quantity : quantity
            setBasket((prevState) => {
                const newPrevState = prevState.filter((el) => el.id !== currProdObj.id)
                const prevQuantity = prevState.find((el) => el.id === currProdObj.id).quantity
                return [...newPrevState, { ...currProdObj, quantity: prevQuantity + newQuantity }]
            })
        } else setBasket((prevState) => [...prevState, { ...currProdObj, quantity }])
    }

    if (productsList.length === 0)
        return (
            <>
                Searching...
            </>
        )

    const currProdObj = productsList.find((el) => parseInt(el.id) === parseInt(propsRoute.match.params.id))
    return (
        <>
            <p className='product-back-link' onClick={() => propsRoute.history.goBack()}
            >&#8592; Back to the list</p>
            <Divider />
            <p className='product-img-wrap'>
                <img src={currProdObj.image} alt="" />
            </p>

            <h3>{currProdObj.title}</h3>
            <span className='product-price'>£{currProdObj.price}</span>
            <div>
                <PlusMinusInput setQuantity={setQuantity} quantity={quantity} />
            </div>
            <Button
                className={classes.root}
                fullWidth
                variant='contained'
                color='primary'
                onClick={() => addToBasket(currProdObj)}>
                Add to basket
            </Button>

            <Button
                className={classes.root}
                fullWidth
                variant='contained'
                color='secondary'>
                Add to favorites
            </Button>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Description:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {currProdObj.description}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Review:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        feature available soon...
                 </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default ProductCard