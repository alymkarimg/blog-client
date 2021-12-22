import React from "react";
import Layout from "../../layouts/Layout";
import BlogCard from "../../blog/components/BlogCard";
import { useState, useEffect } from "react";
import axios from "axios";
import EditableArea from "../../core/components/EditableArea";
import SimpleSelect from "../../core/components/Select";
import CheckboxList from "../../core/components/Checklist";
import MultipleSelect from "../../core/components/MultipleSelect";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FadeIn from "react-fade-in";
import InputLabel from "@material-ui/core/InputLabel";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ShopSnippet from "../components/ShopSnippet";
import Banner from "../../core/components/AnimatedBanner";
import "../../assets/css/Style.css";
import ShopCard from "../components/ShopCard";

const ShopSingleItem = (props) => {
  const [values, setValues] = useState({
    product: null,
  });

  const { product } = values;

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/shop/${props.match.params.slug}`,
    })
      .then((response) => {
        if (response.data.errors && response.data.errors.length > 0) {
          response.data.errors.forEach((error) => {
            toast.error(error.message);
          });
        } else if (response.data.product) {
          setValues({ ...values, product: response.data.product });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
        error.response.data.errors.forEach((error) => {
          toast.error(error.message);
        });
      });
  }, []);

  return (
    <Layout>
      {product && (
        <React.Fragment>
          <div className="col-md-8 offset-md-2">
            <ShopCard
              product={product}
              size={{ height: "auto", width: "100%" }}
              truncate={false}
              readMoreButton={false}
            ></ShopCard>
          </div>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default ShopSingleItem;
