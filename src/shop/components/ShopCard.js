import React from "react";
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
  const classes = useStyles();
  return (
    <Card className={classes.root} raised={true}>
      <div className={classes.details}>
        <CardHeader
          subheader={`£${product ? product.price : "2.50"}`}
          title={product ? product.title : "dummy title"}
        />
        <Banner
          alwaysOn={false}
          size={{ maxHeight: "300px", height: size.height, width: size.width }}
          title={`shop ${product && product.slug}`}
        />
        <CardContent>
          <Typography component={'span'}>
            <EditableArea
              truncate={truncate}
              size={{ height: size.height, width: size.width }}
              useloading={true}
              fade={false}
              pathname={`shop editableArea`}
              guid={`shop ${product && product.slug}`}
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
            menuitems={["With Fries", "With Rice"]}
          />
        </CardContent>
        <CardContent>
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
          <Link
            to="/auth/password/forgot"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0px",
            }}
            className="btn btn-sm btn-outline-info"
          >
            {" "}
            Add to Cart{" "}
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}
