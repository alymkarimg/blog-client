import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  Fragment,
  usewindow,
} from "react";
import Card from "@material-ui/core/Card";
import EditableArea from "../../core/components/EditableArea";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import ShopCard from "./ShopCard";
// Core modules imports are same as usual
import { Navigation, Pagination } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

// Styles must use direct files imports
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ShopSnippet({ title, products = [] }) {
  const [values, setValues] = useState({
    largeScreen: window.matchMedia("(min-width: 991px)").matches,
    screenChanged: false,
  });

  let { largeScreen, screenChanged } = values;

  const classes = useStyles();

  const events = {
    onDragged: function (event) {},
    onChanged: function (event) {},
  };

  const handleResize = () => {
    setValues({
      ...values,
      largeScreen: window.matchMedia("(min-width: 991px)").matches,
    });
  };

  useEffect(() => {
    // Add event listener
    window.addEventListener("resize", () => {
      setValues({ ...values, screenChanged: true });
      handleResize();
    });
  }, []);

  useEffect(() => {
    handleResize();
  }, [screenChanged]);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  if (largeScreen) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Tooltip title="Previous" ref={navigationPrevRef}>
            <IconButton aria-label={`Previous`}>
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Next" ref={navigationNextRef}>
            <IconButton aria-label={`Next`}>
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Swiper
          navigation={{
            // Both prevEl & nextEl are null at render so this does not work
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSwiper={(swiper) => {
            // Delay execution for the refs to be defined
            setTimeout(() => {
              // Override prevEl & nextEl now that refs are defined
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;

              // Re-init navigation
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }, 1000);
          }}
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={5}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {products.map((product, i) => {
            let index = i;
            return (
              <Fragment>
                <SwiperSlide>
                  <ShopCard product={product}></ShopCard>
                </SwiperSlide>
              </Fragment>
            );
          })}
        </Swiper>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Tooltip title="Previous" ref={navigationPrevRef}>
          <IconButton aria-label={`Previous`}>
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {products.map((product, index) => {
            return (
              <React.Fragment>
                <SwiperSlide>
                  <ShopCard title={title} index={index}></ShopCard>
                </SwiperSlide>
                {products && (
                  <React.Fragment>
                    <div ref={navigationPrevRef}>Prev</div>
                    <div ref={navigationNextRef}>Next</div>
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          })}
        </Swiper>
        <Tooltip title="Next" ref={navigationNextRef}>
          <IconButton aria-label={`Next`}>
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default ShopSnippet;
