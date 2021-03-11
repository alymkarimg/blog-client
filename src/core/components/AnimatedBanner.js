import PropTypes from 'prop-types';
import EditableArea from '../../core/components/EditableArea'
import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { isAdmin, isEdit, isAdminArea } from '../../helpers/Default'
import Toggle from "./Toggle";
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom';
import '../assets/css/Style.css'
import '../assets/css/banner.css'
import { Button, TextField } from '@material-ui/core'
import ImageUploader from '../../core/components/ImageUploader'
import PlusOneRoundedIcon from '@material-ui/icons/PlusOneRounded';
import DeleteSweepRoundedIcon from '@material-ui/icons/DeleteSweepRounded';
import { getCookie } from '../../helpers/Default'
import ReactDOM from 'react-dom'
import { EditableAreaContext } from '../../contexts/EditableAreaContext'
import Carousel from 'react-bootstrap/Carousel'
import DOMPurify from 'dompurify';
import { CKEditor } from "@ckeditor/ckeditor5-react";

const Banner = ({ title, size, alwaysOn = false }) => {

  const { loadEditor } = useContext(EditableAreaContext);

  useEffect(() => { }, [animatedBanner])

  const [values, setValues] = useState({
    animatedBanner: null,
    loading: true,
    showEditableAreas: true,
    editBar: false,
    currentSlide: 0,
    slidesEdited: false
  })

  const getURL = `${process.env.REACT_APP_API}/animated-banner`;

  var { loading, animatedBanner, showEditableAreas, editBar, currentSlide, slidesEdited } = values

  const dataSlideTo = useRef(null);

  const removeCurrentSlide = () => {

    if (currentSlide == 0) {
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

      // var animatedBanner = response.data.banner
      // setValues({...values, animatedBanner})

      // loadBanner()

      // setValues({...values, currentSlide: 0})
      if (response.data) {
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

  const findEditableArea = () => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/editable-area`,
      data: values,
    }).then(response => {

      setValues({ ...values, data: DOMPurify.sanitize(response.data.content), loading: false });

    }).catch(error => {

      toast.error(error)

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
      // var animatedBanner = response.data.animatedBanner;
      // setValues({...values, animatedBanner})

      reloadEditableArea()
      loadBanner();
      // if length == 1, guid == 0
      // if length == 2, guid == 1
      // if length == 3, guid == 2

      handleSelect((animatedBanner.items.length - 1), undefined)
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
      setValues({ ...values, animatedBanner: response.data, loading: false, });
    }).catch(error => {
      error.response.data.errors.forEach((error) => {
        toast.error(error.message)
      })
    })
  }

  const onToggle = () => {
    setValues({ ...values, showEditableAreas: !showEditableAreas })
  }

  const handleSelect = (currentSlide, e) => {
    reloadEditableArea()
    setValues({ ...values, currentSlide });
  };

  const reloadEditableArea = () => {
    var areaContainer = document.querySelectorAll('.editableAreaContainerBanner');

    // const domEditableElement = document.querySelector( '.ck-editor__editable' );

    // // Get the editor instance from the editable element.
    // const editorInstance = domEditableElement.ckeditorInstance;

    // use active class to find the current ckeditor instance
    var areaToChangeContainer;
    var content
    if (animatedBanner.items[currentSlide].EditableArea) {
      content = animatedBanner.items[currentSlide].EditableArea.content
      for (var i = 0; i < areaContainer.length - 1; i++) {

        // if (areaContainer[i].children.classList.contains("active")) {
        //   areaToChangeContainer == areaContainer[i]
        //   console.log(areaToChangeContainer.children
        // }

        var ckeditorContainerDiv = areaContainer[currentSlide]
        var ckeditorDiv = ckeditorContainerDiv.children[0]

        if (!isEdit() && content == ckeditorDiv.innerHTML) {
          ckeditorDiv.innerHTML = DOMPurify.sanitize(content);
        } else if (ckeditorDiv.ckeditorInstance && ckeditorDiv.ckeditorInstance.getData() == content) {
          ckeditorDiv.ckeditorInstance.setData(content)
        }

      }
    }
  }

  const onImageDrop = (images) => {
    // get current slide
    // save image
  }


  useEffect(() => {
    loadBanner();
  }, [])


  var width = `${size.width}`
  var height = `${size.height}`
  var isPercent = width.charAt(width.length - 1) === "%" ? true : false //   is it a percent
  var threshold = isPercent ? 50 : 500 // the value that it must be > to be classed as "big"
  var bigOrSmall = parseInt(width, 10) > threshold
  var autoplay = isAdmin() && isEdit() || alwaysOn ? false : 10000

  const processAnimatedBannerSlides = () => {

    if (animatedBanner.items) {

      return (
        animatedBanner.items.map(function (item, i) {

          // get source
          "http://techslides.com/demos/sample-videos/small.mp4"

          var source = animatedBanner.items[i].image

          // discern beetween video and href
          var isImg = false;

          return (
            <Carousel.Item style={{ height, width }} >
              {isImg && (
                  <img src={source} style={{ maxWidth: "100%", maxHeight: "100%" }} className="image-fluid">
                  </img>
              )}

              {!isImg && (
                <video style={{ height: "100%", width: "100%", objectFit: "cover" }} className="video-fluid" autoPlay loop muted>
                  <source src={source} type="video/mp4" />
                </video>
              )}
              <Carousel.Caption>
                <div className="animated fadeInDown editableAreaContainerBanner">
                  {/* pathname = bannertitle, guid = index of banner item */}
                  {/*  */}
                  {showEditableAreas && (
                    <EditableArea alwaysOn={alwaysOn} useloading={true} fade={false} size={{ width, height }} pathname={title} guid={`${i}`}></EditableArea>
                  )}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          )
        }))
    }
  }

  const createBanner = () => {
    return (
      <div className={bigOrSmall ? "banner" : "bannerSmall"} >
        <Carousel interval={30000} defaultActiveIndex={0} pause="hover" ref={dataSlideTo} indicators={true} activeIndex={currentSlide} onSelect={handleSelect} style={{ height, width }} fade>
          {
            processAnimatedBannerSlides()
          }
        </Carousel>
        {
          (isAdmin() && isEdit() || alwaysOn) && (
            <React.Fragment>
              { bigOrSmall && (
                <Button onClick={() => {
                  setValues({ ...values, editBar: !editBar })
                }} className={bigOrSmall ? "bannerEditButton" : "bannerEditButton bannerEditBttonSmall"} border={0} containedSizeSmall variant="contained" color="secondary">EDIT</Button>

              )}
              {editBar || !bigOrSmall && isAdmin() && (
                <div className={bigOrSmall ? "bannerEditorButtons" : "bannerEditorButtonsSmall"} >
                  {/* <Button border={0} onClick={() => {
              setValues({ ...values, hideBannerToolbar: !hideBannerToolbar })
              }} className="" containedSizeSmall variant="contained">Upload Image</Button> */}
                  <ImageUploader onClick={(e) => { e.preventDefault() }} onImageDrop={(images) => {

                  }}
                    singleImage={true} withPreview={false} onImageDrop={onImageDrop} getURL={getURL} buttonText={"Choose Image"} withLabel={false} withIcon={false} ></ImageUploader>
                  <div style={{ position: "relative", top: "8px", margin: "5px" }}>
                    <TextField
                      label="Slide Interval"
                      InputProps={{
                        inputProps: {
                          max: 100, min: 0,
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={animatedBanner.interval} size="small" type="number" id="autoplayInterval" variant="outlined" style={{ position: "relative", right: "3px", padding: "0px 5px", marginBottom: "13px", width: "120px" }} />

                  </div>
                  <div>
                    <Button style={{ margin: "5px" }} onClick={addSlide} border={0} variant="contained" color="secondary"><PlusOneRoundedIcon /> Slide</Button>
                    <Button style={{ margin: "5px" }} onClick={removeCurrentSlide} border={0} variant="contained" color="primary"><DeleteSweepRoundedIcon /> Slide </Button>
                  </div>
                  {/* <Toggle labelPlacement="top" className={"BannerToggle"} label={"Hide Editable Area"} onToggle={onToggle} containedSizeSmall variant="contained" color="primary"></Toggle> */}
                </div>

              )}
            </React.Fragment>
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