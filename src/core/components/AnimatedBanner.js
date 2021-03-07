import PropTypes from 'prop-types';
import EditableArea from '../../core/components/EditableArea'
import React, { useState, useEffect, useRef } from 'react'
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
import { AnimatedBannerContext } from '../../contexts/AnimatedBannerContext'
import Carousel from 'react-bootstrap/Carousel'

const Banner = ({ title, size, alwaysOn = false }) => {

  const [values, setValues] = useState({
    animatedBanner: null,
    loading: true,
    showEditableAreas: true,
    editBar: false,
    currentSlide: 0,
    slidesEdited: false
  })

  useEffect(() => {}, [animatedBanner])

  const getURL = `${process.env.REACT_APP_API}/animated-banner`;

  var { loading, animatedBanner, showEditableAreas, editBar, currentSlide, slidesEdited } = values

  const dataSlideTo = useRef(null);

  const removeCurrentSlide = () => {

    axios({
      method: 'POST',
      url: `${getURL}/delete`,
      data: { animatedBanner, slideNumber: currentSlide },
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    }).then(response => {
      if (response.data.errors && response.data.errors.length > 0) {
        response.data.errors.forEach((error) => {
          toast.error(error.message)
        })
      } else {
        if (currentSlide == 0) {
          setValues({ ...values, animatedBanner: response.data.banner, currentSlide:  0})
        }
        else {
          setValues({ ...values, animatedBanner: response.data.banner, currentSlide: currentSlide - 1 })
        }

        // var slides = dataSlideTo.current.children
        // setValues({...values, slidesEdited: true})
        // slides[currentSlide-1].classList.add("active")
        // var element =  $("#video-carousel-example2")
        // $("#video-carousel-example2").carousel(currentSlide - 1)

        toast.success(response.data.message)

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
      data: values.animatedBanner,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    }).then(response => {
      if (response.data.errors && response.data.errors.length > 0) {
        response.data.errors.forEach((error) => {
          toast.error(error.message)
        })
      } else {
        if(response.data.length < 2){
          setValues({ ...values, animatedBanner: response.data.animatedBanner, currentSlide: response.data.length})
        }else{
          setValues({ ...values, animatedBanner: response.data.animatedBanner, currentSlide: response.data.length - 1})
        }
        toast.success(response.data.message)
        // currentSlide: response.data.length
      }
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
    setValues({ ...values, currentSlide });
  };

  const onImageDrop = (images) => {
    // push all images (base64 object) to the images array
    // ensure src is available on the array items
  }

  useEffect(() => {
    axios({
      method: 'POST',
      url: `${getURL}/${title}`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    }).then(response => {
      if (response.data.errors && response.data.errors.length > 0) {
        response.data.errors.forEach((error) => {
          toast.error(error.message)
        })
      } else {
        setValues({ ...values, animatedBanner: response.data, loading: false });
      }
    }).catch(error => {
      error.response.data.errors.forEach((error) => {
        toast.error(error.message)
      })
    })
  }, [])

  var width = `${size.width}`
  var height = `${size.height}`
  var isPercent = width.charAt(width.length - 1) === "%" ? true : false //   is it a percent
  var threshold = isPercent ? 50 : 500 // the value that it must be > to be classed as "big"
  var bigOrSmall = parseInt(width, 10) > threshold
  var autoplay = isAdmin() && isEdit() || isAdminArea && alwaysOn ? false : 10000

  const processAnimatedBannerSlides = () => {

    if (animatedBanner.items) {

      return (
        animatedBanner.items.map(function (item, i) {

          // discern beetween video and href
          var source = "https://mdbootstrap.com/img/video/Lines.mp4"
          var isImg = false;

          return (
            <React.Fragment>
              <Carousel.Item className={i == currentSlide ? "carousel-item active" : "carousel-item"} style={{ height, width }} >
                {isImg && (
                  <Link to={source}>
                    <video style={{ maxWidth: "100%", maxHeight: "100%" }} className="video-fluid" autoPlay loop muted>
                      <source src={source} type="video/mp4" />
                    </video>
                  </Link>
                )}

                {!isImg && (
                  <video style={{ height: "100%", width: "100%", objectFit: "cover" }} className="video-fluid" autoPlay loop muted>
                    <source src={source} type="video/mp4" />
                  </video>
                )}
                <Carousel.Caption className="carousel-caption">
                  <div className="animated fadeInDown">
                    {/* pathname = bannertitle, guid = index of banner item */}
                    {showEditableAreas && (
                      <EditableArea alwaysOn={alwaysOn} useloading={true} fade={false} size={{ width, height }} pathname={title} guid={`${i}`}></EditableArea>
                    )}
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            </React.Fragment>
          )
        }))
    }
  }

  const createBanner = () => {
    return (
      <div className={bigOrSmall ? "banner" : "bannerSmall"} >
        <Carousel indicators={false} activeIndex={currentSlide} onSelect={handleSelect} style={{ height, width }} fade>
          {
            processAnimatedBannerSlides()
          }
        </Carousel>
        {
          (isAdmin() && isEdit() || alwaysOn) && (
            <React.Fragment>
              <Button onClick={() => {
                setValues({ ...values, editBar: !editBar })
              }} className="bannerEditButton" border={0} containedSizeSmall variant="contained" color="secondary">EDIT</Button>
              {editBar && (
                <div className={bigOrSmall ? "bannerEditorButtons" : "bannerEditorButtonsSmall"} >
                  {/* <Button border={0} onClick={() => {
              setValues({ ...values, hideBannerToolbar: !hideBannerToolbar })
              }} className="" containedSizeSmall variant="contained">Upload Image</Button> */}
                  <ImageUploader onClick={(e) => { e.preventDefault() }} onImageDrop={(images) => {

                  }}
                    singleImage={true} withPreview={false} onImageDrop={onImageDrop} getURL={getURL} buttonText={"Choose Image"} withLabel={false} withIcon={false} ></ImageUploader>
                  <div style={{ position: "relative", top: "8px" }}>
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
                    <Button onClick={addSlide} border={0} variant="contained" color="secondary"><PlusOneRoundedIcon /> Slide</Button>
                    <Button onClick={removeCurrentSlide} border={0} variant="contained" color="primary"><DeleteSweepRoundedIcon /> Slide </Button>
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
      <div ref={dataSlideTo}>
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