import Layout from "../layouts/Layout";
import EditableArea from "./components/EditableArea";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../assets/css/Style.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: "3 1",
    justifyContent: "space-between",
  },
  content: {
    flex: "2 1",
  },
  cover: {
    maxWidth: "25%",
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
  actions: {
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Layout>
      <div id="intro">
        <EditableArea
          fade={true}
          className="p-5 text-center"
          path="/"
          guid="ea_profile_intro"
        ></EditableArea>
      </div>
      <div>
        <Card className={classes.root} raised={true}>
          <div className={classes.details}>
            <CardContent className={classes.blogCard}>
              <EditableArea
                truncate={400}
                size={{ width: "100%", height: "100%" }}
                useloading={true}
                fade={false}
                pathname={`/`}
                guid={`Special Offers`}
              />
            </CardContent>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default App;
