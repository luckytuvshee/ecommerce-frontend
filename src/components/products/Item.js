import React from "react";
import { Link } from "react-router-dom";
import "./Item.scss";

const Item = ({ product, handleOnItemClick }) => {
  return (
    <div
      className="item-container"
      onClickCapture={(e) => handleOnItemClick(e, product.id)}
    >
      <div className="item">
        <div className="image">
          <div>
            <img
              alt={"product_image"}
              style={{ height: 150 }}
              src={require(`../../assets${product.image}`)}
            />
          </div>
          <div className="text">{product.price} ₮</div>
        </div>
        <div className="info">
          <div className="restaurant-name">
            <span className="name" style={{ marginTop: 10 }}>
              <Link>{product.product_name}</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
