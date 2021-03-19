import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import { getUserOrders } from "../../actions/order";
import Spinner from "../layout/Spinner";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const MyOrders = ({ auth, order: { loading, userOrders }, getUserOrders }) => {
  const classes = useStyles();

  useEffect(() => {
    getUserOrders(auth.user.id);
  }, [getUserOrders, auth.user.id]);

  return loading ? (
    <Spinner />
  ) : (
    <div className={classes.root}>
      {userOrders.length === 0 && <strong>Та захиалга хийгээгүй байна</strong>}
      {userOrders.map((order) => (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              <strong>Захиалгийн дугаар: </strong>
              {order.order_id} <strong> Огноо: </strong>
              {order.created_at}
              <strong> Төлөв: </strong> {order.order_status}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              {order.product_registrations.map((product_registration) => (
                <Grid container spacing={3}>
                  <Grid item>
                    <Link to={`/product/${product_registration.product_id}`}>
                      <img
                        alt={"color_image"}
                        width="150"
                        src={require(`../../assets${product_registration.color_image}`)}
                      />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Typography>
                      <strong>Бараа: </strong>
                      {product_registration.product_name}
                    </Typography>
                    <Typography>
                      <strong>Өнгө: </strong>
                      {product_registration.color}
                    </Typography>
                    <Typography>
                      <strong>Хэмжээ: </strong>
                      {product_registration.size}
                    </Typography>
                    <Typography>
                      <strong>Нэгж үнэ: </strong>
                      {product_registration.price}₮
                    </Typography>
                    <Typography>
                      <strong>Тоо ширхэг: </strong>
                      {product_registration.quantity}
                    </Typography>
                    <Typography>
                      <strong>Нийт үнэ: </strong>
                      {product_registration.price *
                        product_registration.quantity}
                      ₮
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              <Typography>
                <strong>Захиалгийн төлөв: </strong>
                {order.order_status}
              </Typography>

              <Typography>
                <strong>Захиалгийн нийт үнэ: </strong>
                {order.total}₮
              </Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
});

export default connect(mapStateToProps, { getUserOrders })(MyOrders);
