import React, { useEffect, useState, useCallback, Fragment } from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Spinner from "../layout/Spinner";
import { getPopularProducts } from "../../actions/product";
import Slider from "react-slick";
import styled from "styled-components";
import { useWindow } from "../../hooks";
import Item from "../carousel/Item";

const StyledArrow = styled.div`
  position: absolute;
  top: calc(50% + 30px);
  z-index: 99;
  background: #fff none repeat scroll 0 0 !important;
  border-radius: 30px !important;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
  color: #000 !important;
  height: 40px;
  line-height: 40px;
  margin: 0 !important;
  text-align: center;
  text-transform: uppercase;
  width: 40px;
  display: flex !important;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    border: 2px solid;
  }
`;

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <StyledArrow
      className={className}
      style={{
        ...style,
        right: -15,
      }}
      onClick={onClick}
    >
      <ChevronRightIcon />
    </StyledArrow>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <StyledArrow
      className={className}
      style={{ ...style, left: -15 }} // should be -25
      onClick={onClick}
    >
      <ChevronLeftIcon />
    </StyledArrow>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    borderRadius: 0,
  },

  card: {
    margin: "0 10px",
    maxWidth: 250,
    background: "#cfe8fc",
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

  typography: {
    fontFamily: "Ubuntu Condensed !important",
    fontWeight: 700,
    padding: "80px 0",
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

const PopularProducts = ({
  getPopularProducts,
  product: { popularProducts, loading },
  history,
}) => {
  const [width] = useWindow();
  const classes = useStyles();
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    getPopularProducts();
  }, [getPopularProducts]);

  const slidesCount = () => {
    if (width < 481) {
      return 1;
    } else if (width < 769) {
      return 2;
    } else if (width < 1140) {
      return 3;
    } else {
      return 4;
    }
  };

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const handleOnItemClick = useCallback(
    (e, id) => {
      if (dragging) e.stopPropagation();
      else history.push(`/product/${id}`);
    },
    [dragging]
  );

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: slidesCount(),
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Grid
        style={{
          marginBottom: 50,
        }}
        justify="space-between"
        className={classes.root}
      >
        <Typography
          className={classes.typography}
          variant="h3"
          color="textSecondary"
        >
          Эрэлттэй бараанууд
        </Typography>
        <Slider
          beforeChange={handleBeforeChange}
          afterChange={handleAfterChange}
          {...settings}
        >
          {popularProducts.map((product) => (
            <Item
              key={product.id}
              product={product}
              handleOnItemClick={handleOnItemClick}
            />
          ))}
        </Slider>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getPopularProducts })(
  withRouter(PopularProducts)
);
