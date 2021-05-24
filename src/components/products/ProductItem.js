import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { addLikedProduct, removeLikedProduct } from "../../actions/profile";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { toast } from "react-toastify";
import "./Item.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    background: "#cfe8fc",
    "&:hover": {
      boxShadow: " 6px 6px 7px 2px rgba(255,172,155,1)",
      cursor: "pointer",
    },
    backgroundSize: "contain",
    borderRadius: 0,
  },
  media: {
    height: 0,
    paddingTop: "100%",
    marginTop: 10,
    backgroundSize: "contain",
  },

  quickView: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  cardContent: {
    minWidth: 345,
    padding: "10px 0 0 0",
  },

  like: {
    color: red[500],
  },
}));

const ProductItem = ({
  product: { id, product_name, price, image },
  auth,
  profile,
  modalOpen,
  addLikedProduct,
  removeLikedProduct,
}) => {
  const classes = useStyles();
  const history = useHistory();

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

  // Component Will Mount
  useEffect(() => {
    setLiked(check_liked());
  }, [profile.loading, profile.likedProducts]);

  return profile.loading ? (
    <Card
      className={classes.root}
      style={{
        background: "#fff",
      }}
    >
      <CardContent className={classes.cardContent}>
        <Spinner />
      </CardContent>
    </Card>
  ) : (
    <div className="item-container">
      <div
        onClick={() => history.push(`/product/${id}`)}
        className="item"
        style={{ width: 300, height: "100%" }}
      >
        <div className="image">
          <div>
            <img
              alt={"product_image"}
              style={{ height: 150 }}
              src={require(`../../assets${image}`)}
            />
          </div>
          <div className="text">{price} ₮</div>
        </div>
        <div className="info" style={{ height: 50 }}>
          <div className="restaurant-name">
            <span className="name" style={{ marginTop: 10 }}>
              <Link>{product_name}</Link>
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <IconButton aria-label="add to favorites" onClick={() => like()}>
          <FavoriteOutlinedIcon className={liked ? classes.like : null} />
        </IconButton>
        <IconButton
          className={classes.quickView}
          aria-label="quick see"
          onClick={() => modalOpen(id)}
        >
          <VisibilityIcon />
        </IconButton>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addLikedProduct,
  removeLikedProduct,
})(ProductItem);
