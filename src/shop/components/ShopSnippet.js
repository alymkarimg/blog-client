/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useRef
} from "react";
import ShopCard from "./ShopCard";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module

function ShopSnippet({ title, products = [] }) {
  const [values, setValues] = useState({
    largeScreen: window.matchMedia("(min-width: 991px)").matches,
    screenChanged: false,
  });

  let { largeScreen } = values;

  const handleResize = () => {
    setValues({
      ...values,
      largeScreen: window.matchMedia("(min-width: 991px)").matches,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)
  }, []);

  const swiperRef = useRef()

  if (largeScreen) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Tooltip title="Previous">
            <IconButton
              aria-label={`Previous`}
              onClick={() => {
                swiperRef.current && swiperRef.current.swiper.slidePrev()
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Next">
            <IconButton
              aria-label={`Next`}
              onClick={() => {
                swiperRef.current && swiperRef.current.swiper.slideNext()
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Swiper
          ref={swiperRef}
          spaceBetween={15}
          slidesPerView={4}
        >
          {products.map((product, i) => (
            <SwiperSlide key={`large_elem__${title}${i}`}>
              <ShopCard
                truncate={0}
                readMoreButton={true}
                product={product}
                title={title}
                index={i}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Tooltip title="Previous">
          <IconButton
            aria-label={`Previous`}
            onClick={() => {
              swiperRef.current && swiperRef.current.swiper.slidePrev()
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          slidesPerView={1}
        >
          {products.map((product, index) => (
            <SwiperSlide key={`small_elem_${title}${index}`}>
              <ShopCard
                truncate={0}
                readMoreButton={true}
                product={product}
                title={title}
                index={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Tooltip title="Next">
          <IconButton
            aria-label={`Next`}
            onClick={() => {
              swiperRef.current && swiperRef.current.swiper.slideNext()
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default ShopSnippet;
