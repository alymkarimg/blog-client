import React, { useContext, useState } from "react";
import Layout from "../../layouts/Layout";
import CartProducts from "../components/CartProduct";
import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../helpers/Default";
import { Link } from "react-router-dom";
import UserForm from "../components/UserForm";

const Cart = () => {
  if (useContext(CartContext)) {
  }
  const { clearCart, checkout, handleCheckout, cart } = useContext(CartContext);
  const { cartItems, storage } = cart;
  const { total, itemCount } = storage;

  const [open, setOpen] = useState(false);

  const closeModal = () => {
      setOpen(false);
  }

  const openModal = () => {
    setOpen(true);
}

  return (
    <Layout title="Cart" description="This is the Cart page">
      <div>
        <UserForm open={open} closeModal={closeModal} openModal={openModal}></UserForm>
      </div>
      <div>
        <div className="text-center mt-5">
          <h1>Cart</h1>
          <p>This is the Cart Page.</p>
        </div>

        <div className="row no-gutters justify-content-center">
          <div className="col-sm-9 p-3">
            {cartItems && cartItems.length > 0 ? (
              <CartProducts />
            ) : (
              <div className="p-3 text-center text-muted">
                Your cart is empty
              </div>
            )}

            {checkout && (
              <div className="p-3 text-center text-success">
                <p>Checkout successful</p>
                <Link to="/" className="btn btn-outline-success btn-sm">
                  BUY MORE
                </Link>
              </div>
            )}
          </div>
          {cartItems && cartItems.length > 0 && (
            <div className="col-sm-3 p-3">
              <div className="card card-body">
                <p className="mb-1">Total Items</p>
                <h4 className=" mb-3 txt-right">{itemCount}</h4>
                <p className="mb-1">Total Payment</p>
                <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
                <hr className="my-4" />
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary mb-2"
                    onClick={() => {
                      setOpen(true);
                      // handleCheckout()
                    }}
                  >
                    CHECKOUT
                  </button>
                  <button
                    type="button"
                    className="btn btn-outlineprimary btn-sm"
                    onClick={clearCart}
                  >
                    CLEAR
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
