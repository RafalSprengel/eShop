import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
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
            <p className='price'>£{product.price}</p>
        </div >
    )
}

const Products = ({ productsList }) => {
    return (
        <div className='products'>
            {(productsList && productsList.map(el =>
                <Product product={el} key={el.id} />
            ))}
        </div>
    )
}

export default Products;