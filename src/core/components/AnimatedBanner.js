/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import EditableArea from '../../core/components/EditableArea'
import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { isAdmin, isEdit, isAdminArea, hasExtension } from '../../helpers/Default'
import 'react-toastify/dist/ReactToastify.css'
import '../assets/css/Style.css'
import '../assets/css/banner.css'
import { Button } from '@material-ui/core'
import ImageUploader from '../../core/components/ImageUploader'
import PlusOneRoundedIcon from '@material-ui/icons/PlusOneRounded';
import DeleteSweepRoundedIcon from '@material-ui/icons/DeleteSweepRounded';
import { getCookie } from '../../helpers/Default'
import Carousel from 'react-bootstrap/Carousel'
import DOMPurify from 'dompurify';
import { AnimatedBannerContext } from '../../contexts/AnimatedBannerContext';

const Banner = ({ title, size, alwaysOn = false }) => {

  const { animatedBannerValues, updateAnimatedBanners } = useContext(AnimatedBannerContext);
  const { publishAnimatedBanner } = animatedBannerValues;

  const [values, setValues] = useState({
    title,
    animatedBanner: null,
    loading: true,
    editBar: false,
    currentSlide: 0,
    source: null,
    publishAnimatedBanner: false
  })

  useEffect(() => {
    if (publishAnimatedBanner) {
      updateAnimatedBanners({ title: animatedBanner.title, items: animatedBanner.items })
    }
  }, [])

  var width = `${size.width}`
  var height = `${size.height}`
  var maxHeight = `${size.maxHeight}`
  var minWidth = `${size.maxWidth}`
  var isPercent = width.charAt(width.length - 1) === "%" ? true : false //   is it a percent
  var threshold = isPercent ? 50 : 500 // the value that it must be > to be classed as "big"
  var bigOrSmall = parseInt(width, 10) > threshold

  const getURL = `${process.env.REACT_APP_API}/animated-banner`;

  var { animatedBanner, currentSlide, source } = values

  const dataSlideTo = useRef(null);

  const removeCurrentSlide = () => {

    if (animatedBanner.items.length === 1 && currentSlide === 0) {
      toast.success("Cannot delete the only slide")
      return
    }

    axios({
      method: 'POST',
      url: `${getURL}/delete`,
      data: { animatedBanner, slideNumber: currentSlide },
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    }).then((response) => {
      if (response) {
        if (currentSlide > 0) {
          setValues({ ...values, animatedBanner: response.data.banner, currentSlide: currentSlide - 1 });
        } else {
          setValues({
            ...values, animatedBanner: response.data.banner, currentSlide: 0
          })
        }

        reloadEditableArea()
      }


    }).catch(error => {
      error.response.data.errors.forEach((error) => {
        toast.error(error.message)
      })
    })
  }

  const addSlide = () => {
    axios({
      method: 'POST',
      url: `${getURL}/add`,
      // new guid is just the count - 1
      data: values.animatedBanner,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    }).then((response) => {
      loadBanner();
      handleSelect((animatedBanner.items.length - 1), undefined)
      reloadEditableArea()
      toast.success(response.data.message)

    }).catch(error => {
      error.response.data.errors.forEach((error) => {
        toast.error(error.message)
      })
    })
  }

  const loadBanner = () => {
    axios({
      method: 'POST',
      url: `${getURL}/${title}`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    }).then(response => {
      var animatedBanner = response.data
      setValues({ ...values, animatedBanner, loading: false });

    }).catch(error => {
      error.response.data.errors.forEach((error) => {
        toast.error(error.message)
      })
    })
  }

  const handleSelect = (currentSlide, e) => {
    reloadEditableArea()
    setValues({ ...values, currentSlide });
  };

  const reloadEditableArea = () => {
    var areaContainer = document.querySelectorAll('.editableAreaContainerBanner');

    // use active class to find the current ckeditor instance
    var content
    if (animatedBanner.items[currentSlide].EditableArea) {
      content = animatedBanner.items[currentSlide].EditableArea.content
      for (var i = 0; i < areaContainer.length - 1; i++) {

        var ckeditorContainerDiv = areaContainer[currentSlide]
        if (ckeditorContainerDiv === undefined) {
          ckeditorContainerDiv = areaContainer[currentSlide - 1]
        }
        var ckeditorDiv = ckeditorContainerDiv.children[0]

        if (!isEdit() && content === ckeditorDiv.innerHTML) {
          ckeditorDiv.innerHTML = DOMPurify.sanitize(content);
        } else if (ckeditorDiv.ckeditorInstance && ckeditorDiv.ckeditorInstance.getData() === content) {
          ckeditorDiv.ckeditorInstance.setData(content)
        }

      }
    }
  }

  const onImageDrop = (media) => {

    // if new image is present, display new image on the slide
    if (media[0]) {
      animatedBanner.items[currentSlide].newImage = media[0]
      // get current slide
      setValues({ ...values, animatedBanner })
      updateAnimatedBanners(animatedBanner)
    }
  }

  useEffect(() => {
    // TODO: Remove api call to parent (DON'T call single element, call an array of elements and then spread them in code using map)
    loadBanner();

  }, [])

  const processAnimatedBannerSlides = () => {

    if (animatedBanner.items) {

      return (
        animatedBanner.items.map(function (item, i) {

          if (item) {
            var imageName = item.newImage ? item.newImage.name : item.image;
            var isVideo = hasExtension(['.mp4'], imageName);
            source = item.newImage ? URL.createObjectURL(item.newImage) : item.image;
          }
          return (
            <Carousel.Item style={{ height, width, minWidth, maxHeight }} key={`carouse-item${i}`}>
              {!isVideo && (
                <img
                  src={source}
                  style={{ height, width, minWidth, maxHeight, filter: "contrast(0.5)" }}
                  className="image-fluid"
                  alt={`item-${i}`}
                />
              )}

              {isVideo && (
                <video style={{ height: "100%", width: "100%", objectFit: "cover", filter: "contrast(1)" }} className="video-fluid image-fluid" autoPlay loop muted>
                  <source src={source} type="video/mp4" />
                </video>
              )}
              <Carousel.Caption>
                <div className="animated fadeInDown editableAreaContainerBanner">
                  {/* pathname = bannertitle, guid = index of banner item */}
                  {/*  */}
                  <EditableArea alwaysOn={alwaysOn} useloading={true} fade={false} size={{ width, height, maxHeight, minWidth }} pathname={title} guid={`${i}`} />
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          )
        }))
    }
  }

  const createBanner = () => {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
        minHeight: "275px"
      }}
        className={bigOrSmall ? "banner" : "bannerSmall"}
      >
        <Carousel
          keyboard={false}
          interval={30000}
          defaultActiveIndex={0}
          pause="hover"
          ref={dataSlideTo}
          indicators={true}
          activeIndex={currentSlide}
          onSelect={handleSelect}
          style={{ height, width, maxHeight, minWidth }}
          fade
        >
          {
            processAnimatedBannerSlides()
          }
        </Carousel>
        {
          ((isAdmin() && isEdit()) || isAdminArea() && alwaysOn) && (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", zIndex: 3 }}>
              {<div className={bigOrSmall ? "bannerEditorButtons" : "bannerEditorButtonsSmall"} >
                {/* <Button border={0} onClick={() => {
              setValues({ ...values, hideBannerToolbar: !hideBannerToolbar })
              }} className="" containedSizeSmall variant="contained">Upload Image</Button> */}
                <ImageUploader
                  className="imageUploader"
                  onClick={(e) => { e.preventDefault() }}
                  singleImage
                  onImageDrop={onImageDrop}
                  withPreview={false}
                  getURL={getURL}
                  buttonText={"Choose Image"}
                  withLabel={false}
                  withIcon={false} />
                <div>
                  <Button style={{ margin: "5px" }} onClick={addSlide} border={0} variant="contained" color="secondary"><PlusOneRoundedIcon /> Slide</Button>
                  <Button style={{ margin: "5px" }} onClick={removeCurrentSlide} border={0} variant="contained" color="primary"><DeleteSweepRoundedIcon /> Slide </Button>
                </div>
                {/* <Toggle labelPlacement="top" className={"BannerToggle"} label={"Hide Editable Area"} onToggle={onToggle} containedSizeSmall variant="contained" color="primary"></Toggle> */}
              </div>}

            </div>
          )
        }
      </div >
    )
  }

  if (animatedBanner) {
    return (
      <div>
        {createBanner()}
      </div>
    )
  } else {
    return (
      <p>Loading...</p>
    )
  }

}

Banner.propTypes = {
  title: PropTypes.string,
};


export default Banner