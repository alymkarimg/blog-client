import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./core/App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import ActivateAccount from "./auth/Activate";
import Profile from "./core/Profile";
import Messenger from "./messenger/Default";
import AdminHome from "./admin/AdminHome";
import AdminMenu from "./admin/AdminMenu";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";
import {
  PrivateRoute,
  AdminRoute,
} from "./auth/components/PrivateOrAdminRoute";
import EditableAreaContextProvider from "./contexts/EditableAreaContext";
import AnimatedBannerContextProvider from "./contexts/AnimatedBannerContext";
import GlobalContextProvider from "./contexts/GlobalContext";
import CartContextProvider from './contexts/CartContext';
import Blogs from "./blog/Blogs";
import Shop from "./shop/layouts/Shop";
import ShopSingleItem from "./shop/layouts/ShopSingleItem";
import BlogCardItem from "./blog/BlogCardItem";
import AdminBlogs from "./admin/AdminBlog";
import EditablePage from "./core/EditablePage";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./assets/css/Style.css";
import AdminShop from "./admin/AdminShop";
import AdminUsers from "./admin/AdminUsers";
import AdminCategories from "./admin/AdminCategories";
import Cart from "./shop/layouts/Cart";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Lobster",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

const Routes = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalContextProvider>
          <EditableAreaContextProvider>
            <AnimatedBannerContextProvider>
              <CartContextProvider>
                <Switch>
                  <Route path="/" exact component={App} />
                  <Route path="/signup" exact component={Signup} />
                  <Route path="/signin" exact component={Signin} />
                  <Route
                    path="/auth/activate/:token"
                    exact
                    component={ActivateAccount}
                  />
                  <Route
                    path="/auth/password/forgot"
                    exact
                    component={Forgot}
                  />
                  <Route
                    path="/auth/password/reset/:token"
                    exact
                    component={Reset}
                  />
                  <Route path="/blogs" exact component={Blogs} />
                  <Route path="/shop" exact component={Shop} />
                  <Route path="/cart" exact component={Cart} />
                  <PrivateRoute path="/profile" exact component={Profile} />
                  <PrivateRoute path="/messenger" exact component={Messenger} />
                  <AdminRoute path="/admin/home" exact component={AdminHome} />
                  <AdminRoute path="/admin/menu" exact component={AdminMenu} />
                  <AdminRoute path="/admin/blog" exact component={AdminBlogs} />
                  <AdminRoute path="/admin/shop" exact component={AdminShop} />
                  <AdminRoute
                    path="/admin/users"
                    exact
                    component={AdminUsers}
                  />
                  <AdminRoute
                    path="/admin/categories"
                    exact
                    component={AdminCategories}
                  />
                  {/* for any page with a param, render editable page */}
                  <Route
                    path="/product/:slug"
                    exact
                    component={ShopSingleItem}
                  />
                  <Route path="/blog/:slug" exact component={BlogCardItem} />
                  <Route path="/*" exact component={EditablePage} />
                </Switch>
              </CartContextProvider>
            </AnimatedBannerContextProvider>
          </EditableAreaContextProvider>
        </GlobalContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routes;
