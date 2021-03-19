import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Products from '../products/Products';
import PopularProducts from '../products/PopularProducts';
import MostPurchasedProducts from '../products/MostPurchasedProducts';

const Home = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <PopularProducts />
        <MostPurchasedProducts />
        <Products />
      </Container>
    </Fragment>
  );
};

export default Home;
