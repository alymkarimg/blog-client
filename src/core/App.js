import Layout from "../layouts/Layout";
import EditableArea from "./components/EditableArea";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../assets/css/Style.css";
import DashboardCard from "./components/DashboardCard";
import { makeStyles } from "@material-ui/core/styles";
import Banner from "./components/AnimatedBanner";
import YouTubeSubscribe from './components/YoutubeSubscribe'
import FacebookLike from './components/FacebookLike'
import TwitterFollow from './components/TwitterFollow'

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

const size = { width: "400px", height: "345px" };
const fade = true;

const App = () => {
  const classes = useStyles();
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <TwitterFollow showCount={false} />
        <YouTubeSubscribe
          channelid={"UChBEbMKI1eCcejTtmI32UEw"}
          theme={"default"}
          layout={"default"}
          count={"default"}
        />
        <FacebookLike/>
      </div>

      <EditableArea
        fade={true}
        className="p-5 text-center"
        path="/"
        guid="ea_profile_intro"
      ></EditableArea>
      <div>
        <div
          className="adminHome row"
          style={{ display: "flex", marginBottom: "20px" }}
        >
          <div
            className="col-md-3 p-3"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <DashboardCard
              size={size}
              fade={fade}
              link={true}
              pathname="/"
              guid="Box1"
            ></DashboardCard>
          </div>
          <div
            className="col-md-3 p-3"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <DashboardCard
              size={size}
              fade={fade}
              link={true}
              pathname="/"
              guid="Box2"
            ></DashboardCard>
          </div>
          <div
            className="col-md-3 p-3"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <DashboardCard
              size={size}
              fade={fade}
              link={true}
              pathname="/"
              guid="Box3"
            ></DashboardCard>
          </div>
          <div
            className="col-md-3 p-3"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <a
              class="twitter-timeline"
              data-height="300"
              href="https://twitter.com/Twitter?ref_src=twsrc%5Etfw"
            >
              Tweets by Twitter
            </a>{" "}
          </div>
        </div>
      </div>
      <Banner size={{}} title="mainBanner2"></Banner>
    </Layout>
  );
};

export default App;
