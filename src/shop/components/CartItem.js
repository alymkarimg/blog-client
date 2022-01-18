import React, { useContext } from "react";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  Delete,
} from "@material-ui/icons";
import { CartContext } from "../../contexts/CartContext";
import Banner from "../../core/components/AnimatedBanner";

import { formatNumber } from "../../helpers/Default";

const CartItem = ({ product }) => {
  const { increase, decrease, removeProduct } = useContext(CartContext);

  return (
    <div className="row no-gutters py-2">
      <div className="col-sm-2 p-2">
        <Banner
          alwaysOn={false}
          size={{ }}
          title={`shop ${product && product.slug}`}
        />
      </div>
      <div className="col-sm-4 p-2">
        <h5 className="mb-1">{product.title}</h5>
        <p className="mb-1">Price: {formatNumber(product.price)} </p>
      </div>
      <div className="col-sm-2 p-2 text-center ">
        <p className="mb-0">
          Size: {product.size && product.size.toUpperCase()}
        </p>
      </div>
      <div className="col-sm-2 p-2 text-center ">
        <p className="mb-0">Qty: {product.quantity}</p>
      </div>
      <div className="col-sm-4 p-2 text-right">
        <button
          onClick={() => increase(product)}
          className="btn btn-primary btn-sm mr-2 mb-1"
        >
          <AddCircleOutline width={"20px"} />
        </button>

        {product.quantity > 1 && (
          <button
            onClick={() => decrease(product)}
            className="btn btn-danger btn-sm mb-1"
          >
            <RemoveCircleOutline width={"20px"} />
          </button>
        )}

        {product.quantity === 1 && (
          <button
            onClick={() => removeProduct(product)}
            className="btn btn-danger btn-sm mb-1"
          >
            <Delete width={"20px"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
