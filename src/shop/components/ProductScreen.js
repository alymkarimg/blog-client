import React, { useState, useEffect } from "react";
import Layout from "../../layouts/Layout";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Rating from "./Rating";
import Banner from "../../core/components/AnimatedBanner";
import EditableArea from "../../core/components/EditableArea";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 800,
    height: 500,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    float: "left",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const ProductScreen = ({ history, match }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    product: null,
  });

  const { product } = values;

  useEffect(() => {
    // axios({
    //   method: 'GET',
    //   url: `${process.env.REACT_APP_API}/product/${match.params.id}`
    // }).then(response => {
    //   setValues({ ...values, product: response.data.product });
    // }).catch(error => {
    //   console.log(error)
    //   error.response.data.errors.forEach((error) => {
    //     toast.error(error.message)
    //   })
    // })
  }, []);

  return (
    <Layout>
      <Link to={product ? `/product/${product.id}` : "/product/1"}>
        <Card className={classes.root} raised={true}>
          <div className={classes.details}>
            <Banner
              alwaysOn={false}
              size={{ width: "100%" }}
              title={`shopBanner ${product && product.title}`}
            ></Banner>
            <CardHeader
              title={product ? product.title : "dummy title"}
            ></CardHeader>
            <CardContent>
              <EditableArea
                truncate={200}
                size={{ width: "100%", height: "400px" }}
                useloading={true}
                fade={false}
                pathname={`shop editableArea`}
                guid={`shop ${product ? product.id : 1}`}
              />
              <Rating
                value={product ? product.rating : 4.5}
                text={`${product ? product.numReviews : 10} reviews`}
              ></Rating>
              <Typography className={classes.pos} color="textSecondary">
                £{product ? product.price : "2.50"}
              </Typography>
            </CardContent>
            <CardContent>
              <Link
                to="/auth/password/forgot"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "30px 0px",
                }}
                className="btn btn-sm btn-outline-info"
              >
                {" "}
                Add to Cart{" "}
              </Link>
            </CardContent>
          </div>
        </Card>
      </Link>
    </Layout>
  );
};

export default ProductScreen;
