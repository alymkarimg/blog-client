import React, { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Rating from "./Rating";
import Banner from "../../core/components/AnimatedBanner";
import EditableArea from "../../core/components/EditableArea";
import MultipleSelect from "../../core/components/MultipleSelect";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "5px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 1,
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    paddingBottom: "15px",
  },
  content: {
    flex: "1 0 auto",
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

function changeBackground(e) {
  e.target.className = "dark-overlay";
}

function removeBackground(e) {
  e.target.className = "";
}

export default function ShopCard({
  product,
  size = { width: "100%", height: "100%" },
  truncate = false,
  readMoreButton = false,
}) {
  const { cartItems } = useContext(CartContext).cart;
  const { addProduct, increase } = useContext(CartContext);

  const isInCart = () => {
    const temp = cartItems.find(
      (item) => item._id === product._id && product.size == item.size
    );
    console.log(temp);
    return temp;
  };

  useEffect(() => {}, [cartItems]);

  const classes = useStyles();
  return (
    <Card className={(classes.root, "fade-in")} raised={true}>
      <div className={classes.details}>
        <CardHeader
          subheader={`£${product ? product.price : "2.50"}`}
          title={product ? product.title : "dummy title"}
        />
        <Banner
          alwaysOn={false}
          size={{ maxHeight: "400px", height: size.height, width: size.width }}
          title={`shop ${product && product.slug}`}
        />
        <CardContent>
          <Typography component={"span"}>
            <EditableArea
              truncate={truncate}
              size={{ height: size.height, width: size.width }}
              useloading={true}
              fade={false}
              pathname={`shop editableArea`}
              guid={`shop ${product && product.slug} description`}
            />
          </Typography>
          <Typography>
            <Rating
              value={product ? product.rating : 4.5}
              text={` ${product ? product.numReviews : 10} reviews`}
            ></Rating>
          </Typography>
          <Typography
            className={classes.pos}
            color="textSecondary"
          ></Typography>
          <MultipleSelect
            value={[]}
            title="Options"
            // build an epos
            menuitems={["With Fries", "With Rice"]}
          />
        </CardContent>
        <CardContent>
          <div style={{ display: "flex" }}>
            {readMoreButton && (
              <Link
                to={`/product/${product.slug}`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0px",
                }}
                className="btn btn-sm btn-outline-info"
              >
                {" "}
                Read More{" "}
              </Link>
            )}
            {isInCart(product) && (
              <button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0px",
                }}
                id={product._id}
                onClick={() => {
                  toast.success("Product added to cart");
                  increase(product);
                }}
                className="btn btn-outline-primary btn-sm"
              >
                Add more
              </button>
            )}

            {!isInCart(product) && (
              <button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0px",
                }}
                id={product._id}
                onClick={() => {
                  toast.success("Product added to cart");
                  addProduct(product);
                }}
                className="btn btn-primary btn-sm"
              >
                Add to cart
              </button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
