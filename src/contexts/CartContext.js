/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";
import { isAuth, getLocalStorage, setLocalStorage } from "../helpers/Default";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { getCookie } from "../helpers/Default";
import { PlaylistAddOutlined } from "@material-ui/icons";

export const CartContext = createContext(null);

const CartContextProvider = (props) => {
  const [cart, setCart] = useState(() =>
    getLocalStorage("cart", {
      cartItems: [],
      storage: null,
      checkout: false,
    })
  );

  const { cartItems } = cart;

  useEffect(() => {
    setLocalStorage("cart", cart);
  }, [cart]);

  const sumItems = (cartItems) => {
    let itemCount = cartItems.reduce(
      (total, product) => total + product.quantity,
      0
    );
    let total = cartItems
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
    return { itemCount, total };
  };

  const increase = (product) => {
    if (
      !cartItems.find(
        (item) => item._id === product._id && item.size === product.size
      )
    ) {
      setCart({
        ...cart,
        cartItems: cartItems.concat({
          ...product,
          quantity: 1,
        }),
      });
    } else {
      cartItems[
        cartItems.findIndex(
          (item) => item._id === product._id && item.size === product.size
        )
      ].quantity++;
    }
    setCart({
      ...cart,
      storage: { ...sumItems(cartItems) },
    });
  };

  const decrease = (product) => {
    cartItems[
      cartItems.findIndex(
        (item) => item._id === product._id && item.size === product.size
      )
    ].quantity--;
    setCart({
      ...cart,
      storage: { ...sumItems(cartItems) },
      cartItems: [...cartItems],
    });
  };

  const addProduct = (product) => {
    const cartItem = cartItems.find(
      (item) => item._id === product._id && item.size === product.size
    );

    // create increase function
    if (!cartItem) {
      setCart({
        ...cart,
        cartItems: cartItems.concat({
          ...product,
          quantity: 1,
        }),
        storage: {
          ...sumItems(
            cartItems.concat({
              ...product,
              quantity: 1,
            })
          ),
        },
      });
    }
  };

  const removeProduct = (product) => {
    setCart({
      ...cart,
      storage: {
        ...sumItems(
          [...cartItems.filter(
            (item) => item._id !== product._id || item.size !== product.size
          )]
        ),
      },
      cartItems: [
        ...cartItems.filter((item) => {
          if (item._id !== product._id || item.size !== product.size) {
            return true;
          } else {
            return false;
          }
        }),
      ],
    });
  };
  const clearCart = () => {
    // create increase function
    setCart({
      ...cart,
      cartItems: [],
      storage: { ...sumItems([]) },
    });
  };

  const handleCheckout = () => {
    setCart({
      ...cart,
      cartItems: [],
      checkout: true,
      storage: { ...sumItems([]) },
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        increase,
        decrease,
        addProduct,
        removeProduct,
        clearCart,
        handleCheckout,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
