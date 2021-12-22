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
  },
  details: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
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

<<<<<<< Updated upstream
export default function ShopCard({ product }) {
=======
function changeBackground(e) {
  e.target.className = "dark-overlay";
}

function removeBackground(e) {
  e.target.className = "";
}

export default function ShopCard({
  product,
  size = { width: "100%", height: "400px" },
  truncate = false,
  readMoreButton = false,
}) {
>>>>>>> Stashed changes
  const classes = useStyles();
  
  return (
    <Card className={classes.root} raised={true}>
      <div className={classes.details}>
        <Banner
          alwaysOn={false}
          size={{ height: size.height, width: size.width }}
          title={`shop ${product && product.title}`}
        ></Banner>
        <CardHeader
          title={product ? product.title : "dummy title"}
        ></CardHeader>
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
          <Rating
            value={product ? product.rating : 4.5}
            text={`${product ? product.numReviews : 10} reviews`}
          ></Rating>
          <Typography className={classes.pos} color="textSecondary">
            £{product ? product.price : "2.50"}
          </Typography>
          <Typography component={'span'}>
            <MultipleSelect
              value={[]}
              title="Options"
              menuitems={["With Fries", "With Rice"]}
            />
          </Typography>
        </CardContent>
        <CardContent>
          {readMoreButton && (
            <Link
              to={`/product/${product.slug}`}
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "30px 0px",
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
  );
}
