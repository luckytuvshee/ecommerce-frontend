import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LocalShipping from "@material-ui/icons/LocalShippingOutlined";
import ShoppingCart from "@material-ui/icons/ShoppingCartOutlined";
import Button from "@material-ui/core/Button";
import Spinner from "../layout/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    background: "#cfe8fc",
    borderRadius: 0,
  },
  paper: {
    padding: 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    maxHeight: "100vh",
    minHeight: "100%",
    borderRadius: 0,
  },
}));

const CartItem = ({
  auth: { isAuthenticated, loading },
  cart: { cartItems, guestCartItems, cartProducts, loading: cartLoading },
}) => {
  const classes = useStyles();

  if (!isAuthenticated) {
    cartItems = guestCartItems;
  }

  return loading ||
    cartLoading ||
    Object.keys(cartProducts).length !== cartItems.length ? (
    <Spinner />
  ) : (
    <Card className={classes.root}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton>
              <LocalShipping style={{ width: 50, height: 50 }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography component="span">
              Хүргэлт <strong>5000₮</strong>
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton>
              <ShoppingCart style={{ width: 50, height: 50 }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography component="span">Таны авсан барааны дүн</Typography>
            <Typography component="span">
              <strong>50,000₮</strong> өөс их байвал хүргэлт{" "}
              <strong>үнэгүй</strong>
            </Typography>
          </Grid>
        </Grid>
        <Paper className={classes.paper}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Typography component="span">Нийт үнэ:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" component="span">
                {cartItems.reduce((a, b) => {
                  return (
                    a + b["quantity"] * cartProducts[b["product_id"]].price
                  );
                }, 0)}{" "}
                ₮
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {!isAuthenticated && (
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Button
                style={{ marginTop: 15 }}
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                to="/login"
              >
                Нэвтрэх
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ marginTop: 15 }}
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                to={{ pathname: "/order", fromLink: true }}
              >
                Захиалга хийх (Зочин)
              </Button>
            </Grid>
          </Grid>
        )}

        {isAuthenticated && (
          <Grid container justify="flex-end" alignItems="center">
            <Grid item>
              <Button
                style={{ marginTop: 15 }}
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                to={{ pathname: "/order", fromLink: true }}
              >
                Захиалга хийх
              </Button>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

export default connect(mapStateToProps)(CartItem);
