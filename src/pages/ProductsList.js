import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Header from "../layouts/Header.js";
import Footer from "../layouts/Footer";
import '../styles/ProductsList.css'


const useStyles = makeStyles((theme) => ({

    root: {
        '& > span': {
            display: 'flex',
            justifyContent: 'center',
        },
        "& > span::after": {
            content: '`{$comments}`',
            color: '#5f5f5f',
            fontSize: '0.7rem'
        }
    },
}));

const Product = ({ product }) => {
    const classes = useStyles();
    const stars = (Math.random() * 6)

    return (
        <div className='product'>
            <span className='img-wrap' ><img src={product.image} alt="" /></span>
            <Link to={`/product/${product.id}`}>
                <p className='title'>{product.title}</p>
            </Link>

            <p className='spacer'></p>
            <p className={classes.root}>
                <Rating name="half-rating" value={stars} defaultValue={2.6} precision={0.5} size='small' readOnly />
            </p>
            <p className='price'>£{product.price.toFixed(2)}</p>
        </div >
    )
}

const ProductsList = ({ basket, productsList }) => {
    return (
        <>
            <Header basket={basket} />
            <content>
                <div className='products'>
                    {(productsList && productsList.map(el =>
                        <Product product={el} key={el.id} />
                    ))}
                </div>
            </content>

            <Footer />
        </>
    )
}

export default ProductsList;