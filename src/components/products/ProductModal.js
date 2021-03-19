import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getProduct } from "../../actions/product";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Divider from "@material-ui/core/Divider";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ShoppingCart from "@material-ui/icons/ShoppingCartOutlined";
import Payment from "@material-ui/icons/PaymentOutlined";
import IconButton from "@material-ui/core/IconButton";
import CloseButton from "@material-ui/icons/Close";
import { red } from "@material-ui/core/colors";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { toast } from "react-toastify";
import { addLikedProduct, removeLikedProduct } from "../../actions/profile";
import { addCartItem, addGuestCartItem } from "../../actions/cart";
import { instantPurchase } from "../../actions/order";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
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

  imageSlider: {
    [theme.breakpoints.down("xs")]: {
      height: "auto",
      width: 300,
      margin: "auto",
    },
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  typography: {
    padding: "5px 0",
  },

  cardContent: {
    minWidth: 345,
    height: "100%",
    padding: 10,
    overflowX: "hidden",
  },

  colorImage: {
    padding: 2,
    width: 80,
    marginRight: 10,
    objectFit: "cover",
  },

  selectedColorImage: {
    outline: "3px solid black",
    padding: 2,
    width: 80,
    marginRight: 10,
    objectFit: "cover",
  },

  size: {
    marginRight: 10,
    borderRadius: 0,
  },

  count: {
    padding: "0 20px",
    backgroundColor: theme.palette.secondary.dark,
    color: "#000 !important", // because of disabled button, I used !important
  },

  button: {
    marginRight: 10,
    borderRadius: 0,
  },

  like: {
    color: red[500],
  },
}));

const ProductModal = ({
  id,
  product: { productsMore, loading },
  auth,
  profile,
  fullModalHeight,
  modalClose,
  getProduct,
  addLikedProduct,
  removeLikedProduct,
  addCartItem,
  addGuestCartItem,
  instantPurchase,
  history,
}) => {
  const classes = useStyles();

  const [selectedColorIndex, setSelectedColorIndex] = useState(-1);
  const [selectedSizeIndex, setselectedSizeIndex] = useState(-1);
  const [count, setCount] = React.useState(1);

  const check_liked = () => {
    if (profile.likedProducts.length === 0) return false;

    for (let i = 0; i < profile.likedProducts.length; i++) {
      if (
        profile.likedProducts[i].user_id === auth.user.id &&
        profile.likedProducts[i].product_id === id
      ) {
        return true;
      }
    }
    return false;
  };

  const [liked, setLiked] = React.useState(check_liked());

  const checkRequired = () => {
    if (selectedColorIndex === -1) {
      toast.warn("Барааны өнгө сонгоогүй байна");
      return false;
    }

    if (selectedSizeIndex === -1) {
      toast.warn("Барааны хэмжээ сонгоогүй байна");
      return false;
    }

    return true;
  };

  const checkQuantity = () => {
    const quantity =
      selectedSizeIndex !== -1 &&
      productsMore[id].colors[selectedColorIndex][selectedSizeIndex].quantity;

    if (quantity >= count) {
      return true;
    } else {
      toast.warn(
        "Нөөцийн тоо ширхэг хүрэлцэхгүй байна, бага тоогоор худалдаж авна уу"
      );
      return false;
    }
  };

  const like = () => {
    if (auth.isAuthenticated) {
      if (!liked) {
        addLikedProduct(auth.user.id, id);
        setLiked(!liked);
        toast.success("Бараа таалагдсан бараанд нэмэгдлээ");
      } else {
        removeLikedProduct(auth.user.id, id);
        setLiked(!liked);
        toast.warn("Бараа таалагдсан бараанаас хасагдлаа");
      }
    } else {
      toast.error("Та эхлээд нэвтэрнэ үү!");
    }
  };

  const addToCart = () => {
    if (!checkRequired() || !checkQuantity()) {
      return;
    }

    if (auth.isAuthenticated) {
      addCartItem(
        auth.user.id,
        productsMore[id].colors[selectedColorIndex][selectedSizeIndex].id,
        count
      );
      toast.success("Сагсанд бараа нэмэгдлээ");
    } else {
      addGuestCartItem(
        productsMore[id].colors[selectedColorIndex][selectedSizeIndex].id,
        count
      );
      toast.success("Сагсанд бараа нэмэгдлээ");
    }
  };

  const purchaseNow = () => {
    if (!checkRequired() || !checkQuantity()) {
      return;
    }

    instantPurchase({
      user_id: auth.isAuthenticated ? auth.user.id : 1,
      product_registration_id:
        productsMore[id].colors[selectedColorIndex][selectedSizeIndex].id,
      price: productsMore[id].price,
      quantity: count,
    });
    history.push({ pathname: "/order", fromLink: true });
  };

  useEffect(() => {
    getProduct(id);
  }, [getProduct, id]);

  const getConfigurableProps = () => ({
    showArrows: true,
    showStatus: true,
    showIndicators: true,
    infiniteLoop: true,
    showThumbs: true,
    useKeyboardArrows: true,
    autoPlay: true,
    stopOnHover: true,
    swipeable: true,
    dynamicHeight: true,
    emulateTouch: true,
    thumbWidth: 80,
    selectedItem: 0,
    interval: 3000,
    transitionTime: 150,
    swipeScrollTolerance: 5,
  });

  return loading || !productsMore.hasOwnProperty(id) ? (
    <Spinner />
  ) : (
    <Fragment>
      <Card className={classes.root}>
        <CardContent
          className={classes.cardContent}
          style={{
            overflowY: fullModalHeight ? "hidden" : "auto",
          }}
        >
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={5}>
              <Paper className={classes.paper}>
                <Carousel
                  className={classes.imageSlider}
                  {...getConfigurableProps()}
                >
                  {productsMore[id].images.split("\\").map((image, index) => (
                    <div key={index}>
                      <img
                        alt={"product_image"}
                        style={{ maxHeight: 400, objectFit: "cover" }}
                        src={require(`../../assets${image}`)}
                      />
                      <p className="legend">{productsMore[id].product_name}</p>
                    </div>
                  ))}
                </Carousel>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Paper className={classes.paper}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="h6" component="span">
                      ₮ {productsMore[id].price}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {modalClose && (
                      <IconButton
                        onClick={() => modalClose()}
                        aria-label="Хаах"
                      >
                        <CloseButton />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>

                <Typography variant="h6" component="span">
                  {productsMore[id].product_name}
                </Typography>

                <Divider />

                <Typography className={classes.typography} component="span">
                  Өнгө
                </Typography>

                {productsMore[id].colors.map((color, index) => (
                  <img
                    alt={"product_image"}
                    key={index}
                    className={
                      selectedColorIndex === index
                        ? classes.selectedColorImage
                        : classes.colorImage
                    }
                    onClick={() => setSelectedColorIndex(index)}
                    src={require(`../../assets${color[0].color_image}`)}
                  />
                ))}

                <Typography className={classes.typography} component="span">
                  Хэмжээ{" "}
                  <strong>
                    {selectedColorIndex === -1
                      ? "(Өнгөний төрөл сонгоно уу)"
                      : ""}
                  </strong>
                </Typography>

                {selectedColorIndex === -1
                  ? ""
                  : productsMore[id].colors[selectedColorIndex].map(
                      (size, index) => (
                        <Button
                          className={classes.size}
                          variant="contained"
                          color={
                            selectedSizeIndex === index
                              ? "secondary"
                              : "default"
                          }
                          onClick={() => setselectedSizeIndex(index)}
                        >
                          {size.size}
                        </Button>
                      )
                    )}

                <Typography className={classes.typography} component="span">
                  Нөөцөнд байгаа тоо хэмжээ
                  <Typography>
                    {selectedSizeIndex !== -1 &&
                      productsMore[id].colors[selectedColorIndex][
                        selectedSizeIndex
                      ].quantity}
                  </Typography>
                </Typography>

                <Typography className={classes.typography} component="span">
                  Тоо ширхэг:
                </Typography>

                <ButtonGroup style={{ marginBottom: 10, borderRadius: 0 }}>
                  <Button
                    aria-label="багасгах"
                    style={{
                      borderRadius: 0,
                    }}
                    onClick={() => {
                      setCount(Math.max(count - 1, 1));
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button disabled className={classes.count} color="secondary">
                    {count}
                  </Button>
                  <Button
                    aria-label="нэмэх"
                    style={{
                      borderRadius: 0,
                    }}
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
                <Divider />

                <Typography
                  variant="h6"
                  component="span"
                  style={{ marginBottom: 20 }}
                >
                  Нийт үнэ: ₮ {count * productsMore[id].price}
                </Typography>

                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<ShoppingCart />}
                    onClick={() => addToCart()}
                  >
                    Сагсанд нэмэх
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<Payment />}
                    onClick={() => purchaseNow()}
                  >
                    Худалдаж авах
                  </Button>

                  <IconButton
                    onClick={() => like()}
                    color="default"
                    className={classes.button}
                  >
                    <FavoriteOutlinedIcon
                      className={liked ? classes.like : null}
                    />
                  </IconButton>
                </ButtonGroup>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

ProductModal.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getProduct,
  addLikedProduct,
  removeLikedProduct,
  addCartItem,
  addGuestCartItem,
  instantPurchase,
})(withRouter(ProductModal));
