import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import ProductsList from '../pages/ProductsList'
import ProductCard from '../pages/ProductCard'
import Basket from '../pages/Basket'

const Page = (props) => {
    const [licznik, setLicznik] = useState(0);
    return (
        <>
            <p>Licznik w Page : {licznik} </p>
            <p>
                <button onClick={() => setLicznik((prev) => prev + 1)}>
                    Zwieksz Licznik w Page
                </button>
            </p>
      -------------------------------
            <Switch>
                <Route path='/' exact render={() => <ProductsList {...props} />} />
                <Route path='/basket' render={() => <Basket {...props} />} />
                <Route path='/product/' component={ProductCard} />
                <Route render={() => (<div style={{ textAlign: 'center' }}>Page not found</div>)} />
            </Switch>
        </>
    )
}

export default Page