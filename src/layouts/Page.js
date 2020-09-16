import React from 'react';
import { Route, Switch } from 'react-router-dom'
import ProductsList from '../pages/ProductsList'
import ProductCard from '../pages/ProductCard'
import Basket from '../pages/Basket'

const Page = (props) => {
    return (
        <>
            <Switch>
                <Route path='/' exact render={() => <ProductsList {...props} />} />
                <Route path='/basket' render={() => <Basket {...props} />} />
                <Route path='/product/:id' render={(propsRoute) => <ProductCard {...props} propsRoute={propsRoute} />} />
                <Route render={() => (<div style={{ textAlign: 'center' }}>Page not found</div>)} />
            </Switch>
        </>
    )
}

export default Page