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

    },
    dialogTitle: {
        padding: '5px 10px',
        '& h2': {
            fontSize: '1rem',
            lineHeight: '1'
        }
    },
    dialogContent: {
        padding: '5px 10px'
    }
}));

const ProductCard = ({ propsRoute, basket, setBasket }) => {
    const productId = propsRoute.match.params.id
    const classes = useStyles()
    const [quantity, setQuantity] = useState(1)
    const [productObj, setProductObj] = useState([])
    const [openDialog, setOpenDialog] = useState(false)


    const addToBasket = (currProdObj) => {
        const prodAlrInBask = basket.find((prodObj) => prodObj.id === currProdObj.id)
        if (prodAlrInBask) {
            let newQuantity = currProdObj.quantity ? parseInt(currProdObj.quantity) + quantity : quantity
            setBasket((prevState) => {
                const newPrevState = prevState.filter((el) => el.id !== currProdObj.id)
                const prevQuantity = prevState.find((el) => el.id === currProdObj.id).quantity
                return [...newPrevState, { ...currProdObj, quantity: prevQuantity + newQuantity }]
            })
        } else setBasket((prevState) => [...prevState, { ...currProdObj, quantity }])
        setOpenDialog(true)
    }

    useEffect(() => {
        const API = 'https://fakestoreapi.com/products/' + productId
        fetch(API)
            .then(response => {
                if (response.ok) return response
                else throw Error(response.statusText)
            })
            .then(response => response.json())
            .then(response => setProductObj(response))
            .catch(errors => console.log(errors))
    }, [productId])
    return (
        <>
            {productObj.length === 0 &&
                <Backdrop open={true} className={classes.backdrop}>
                    <CircularProgress color="inherit" />
                    Loading...
                </Backdrop>
            }
            {productObj.length !== 0 &&
                <div>
                    <p className='product-back-link' onClick={() => propsRoute.history.goBack()}
                    >&#8592; Back to the list</p>
                    <Divider />
                    <p className='product-img-wrap'>
                        <img src={productObj.image} alt="" />
                    </p>

                    <h3>{productObj.title}</h3>
                    <span className='product-price'>£{productObj.price}</span>
                    <div>
                        <PlusMinusInput value={quantity} getCurrValue={(newValue) => setQuantity(newValue)} />
                    </div>
                    <Button
                        className={classes.root}
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={() => addToBasket(productObj)}>
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
                                {productObj.description}
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
                </div>
            }
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className='dialog-product-desc-wrap'>
                    <div className='dialog-img-wrap'>
                        <img src={productObj.image} alt="img" />
                    </div>
                    <div>



                        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>Product has been added to the basket</DialogTitle>

                        <DialogContent className={classes.dialogContent}>
                            {productObj.title}
                        </DialogContent>
                    </div>
                </div>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => setOpenDialog(false)} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ProductCard