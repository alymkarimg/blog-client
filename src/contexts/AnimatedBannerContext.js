/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState, useRef } from "react";
import { getCookie } from "../helpers/Default";
import { toast } from "react-toastify";
import axios from "axios";
import { removeQuery } from "../helpers/Default";

export const AnimatedBannerContext = createContext(null);

const AnimatedBannerContextProvider = (props) => {
  const [animatedBannerValues, setValues] = useState({
    publishAnimatedBanners: false,
    animatedBanners: [],
  });

  const [animatedBannerModelsValues, setanimatedBannerModelsValues] = useState({
    animatedBannerModels: [],
  });

  var { publishAnimatedBanners, animatedBanners } = animatedBannerValues;
  let { animatedBannerModels } = animatedBannerModelsValues;

  const updateAnimatedBanners = (animatedBanner) => {
    if (!animatedBanners.find((q) => q.title === animatedBanner.title)) {
      animatedBanners.push(animatedBanner);
    }
    // else {
    //   var bannerToEdit = animatedBanners.find(
    //     (q) => q.title === animatedBanner.title
    //   );
    //   if (bannerToEdit) {
    //     bannerToEdit.title = animatedBanner.title;
    //     bannerToEdit.items = animatedBanner.items;
    //   }
    // }
    setValues({
      ...animatedBannerValues,
      animatedBanners: [...animatedBanners],
    });
  };

  const getURL = `${process.env.REACT_APP_API}/animated-banner`;

  // when pubishAnimatedBanner changes, update db if there are editable areas to update
  useEffect(() => {
    if (publishAnimatedBanners && animatedBannerModels.length > 0) {
      var bodyFormData = new FormData();

      animatedBannerModels.forEach((banner) => {
        for (var key in banner) {
          if (key === "items") {
            bodyFormData.append(key, banner[key]);
            for (var i = 0; i < banner.items.length; i++) {
              if (banner.items[i].newImage) {
                // append the image
                bodyFormData.append(
                  `${banner.title}::${banner.items[i].guid}::${banner.items[i].newImage.name}`,
                  banner.items[i].newImage
                );
              }
            }
          } else {
            bodyFormData.append(key, banner[key]);
          }
        }
      });

      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/animated-banner/save`,
        data: bodyFormData,
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
        .then((response) => {
          var urlsObjects = response.data.urlsObjects;

          urlsObjects.forEach((urlObject, index) => {
            var fileProps = urlObject.fileProps;

            var bannerToEdit = animatedBannerModels.find(
              (q) => q.title === fileProps[0]
            );
            if (bannerToEdit) {
              bannerToEdit.items.forEach((item) => {
                if (
                  item.pathname === fileProps[0] &&
                  item.guid === fileProps[1]
                ) {
                  item.image = urlObject.url;
                  item.newImage = undefined;
                }
              });
            }
          });
          setValues({
            ...animatedBannerValues,
            publishAnimatedBanners: false,
          });

          if (urlsObjects.length > 0) {
            setanimatedBannerModelsValues({
              ...animatedBannerModelsValues,
              animatedBannerModels: [...animatedBannerModels],
            });
          }

          toast.success("animated banners saved");
        })
        .catch((error) => {
          console.log("Error saving to the database", error.response.data);

          error.response.data.errors.forEach((error) => {
            toast.error(error.message);
          });
        });
    }
  }, [publishAnimatedBanners]);

  const isInitialRender = useRef(false);

  useEffect(() => {
    if (isInitialRender.current) {
      axios({
        method: "POST",
        url: `${getURL}/loadAllAnimatedBanners`,
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
        data: { animatedBanners },
      })
        .then((response) => {
          setanimatedBannerModelsValues({
            ...animatedBannerModelsValues,
            animatedBannerModels: response.data,
          });
        })
        .catch((error) => {
          error.response.data.errors.forEach((error) => {
            toast.error(error.message);
          });
        });
    } else {
      isInitialRender.current = true;
    }
  }, [animatedBanners]);

  // for a button in the navigation to update publish editable area state
  const updatePublishAnimatedBanners = () => {
    setValues({
      ...animatedBannerValues,
      publishAnimatedBanners: true,
      animatedBanners: [],
    });
  };

  return (
    <AnimatedBannerContext.Provider
      value={{
        animatedBannerValues,
        animatedBannerModelsValues,
        updateAnimatedBanners,
        updatePublishAnimatedBanners,
      }}
    >
      {props.children}
    </AnimatedBannerContext.Provider>
  );
};

export default AnimatedBannerContextProvider;
