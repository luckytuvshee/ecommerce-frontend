import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Spinner from "../layout/Spinner";
import ProductItem from "./ProductItem";
import Modal from "@material-ui/core/Modal";
import ProductModal from "./ProductModal";
import { getSimilarProducts } from "../../actions/product";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    borderRadius: 0,
  },

  card: {
    margin: "0 10px",
    maxWidth: 345,
    background: "#cfe8fc",
    "&:hover": {
      boxShadow: " 6px 6px 7px 2px rgba(255,172,155,1)",
      cursor: "pointer",
    },
    backgroundSize: "contain",
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

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  typography: {
    padding: "80px 0",
    textAlign: "center",
    fontFamily: "Ubuntu Condensed !important",
  },

  cardContent: {
    minWidth: 100,
    minHeight: 200,
    maxWidth: 250,
    maxHeight: 350,
    padding: 10,
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const SimilarProducts = ({
  id,
  getSimilarProducts,
  product: { similarProducts, loading },
  history,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [modalId, setModalId] = React.useState(null);

  const handleOpen = (modalId) => {
    setModalId(modalId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getSimilarProducts(id);
  }, [getSimilarProducts, id]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Typography
        className={classes.typography}
        variant="h3"
        color="textSecondary"
      >
        Төстэй бараанууд
      </Typography>
      <Grid
        style={{
          marginBottom: 50,
        }}
        container
        className={classes.root}
      >
        {similarProducts.map((product, index) => (
          <Grid key={product.id} item xs="auto" sm="auto" md="auto" lg="auto">
            <ProductItem modalOpen={handleOpen} product={product} />
          </Grid>
        ))}
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <ProductModal
          textRem={1.4}
          fullModalHeight={false}
          modalClose={handleClose}
          id={modalId}
        />
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getSimilarProducts })(
  withRouter(SimilarProducts)
);
