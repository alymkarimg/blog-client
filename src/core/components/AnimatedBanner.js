import Carousel from 'bootstrap/'
import PropTypes from 'prop-types';
import EditableArea from '../../core/components/EditableArea'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { isAdmin } from '../../helpers/Default'
import Toggle from "./Toggle";
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom';
import '../assets/css/Style.css'

const Banner = ({ title, size }) => {

  const [values, setValues] = useState({
    title,
    animatedBannerItems: [],
    loading: true
  })

  var { title, loading, animatedBannerItems: items } = values

  // when the component mounts, set the state
  useEffect(() => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/animated-banner`,
      data: values,
    }).then(response => {
      if (response.data.errors && response.data.errors.length > 0) {
        response.data.errors.forEach((error) => {
          toast.error(error.message)
        })
      } else {
        setValues({ ...values, animatedBannerItems: response.data.items, loading: false });
      }
    }).catch(error => {
      error.response.data.errors.forEach((error) => {
        toast.error(error.message)
      })
    })
  }, [])

  const animatedBannerItem = (item) => {
    switch (item.columns.length) {
      case 1:
        return (
          <div className="row">
            <div className="col-md-12">
              {processAnimatedBannerSlides()}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="row">
            <div className="col-md-6">
              {processAnimatedBannerSlides()}
            </div>
            <div className="col-md-6">
              {processAnimatedBannerSlides()}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="row">
            <div className="col-md-4">
              {processAnimatedBannerSlides()}
            </div>
            <div className="col-md-4">
              {processAnimatedBannerSlides()}
            </div>
            <div className="col-md-4">
              {processAnimatedBannerSlides()}
            </div>
          </div>
        )
      case 5:
        return (
          <div className="row">
            <div className="col-md-2">
              {processAnimatedBannerSlides()}
            </div>
            <div className="col-md-2">
              {processAnimatedBannerSlides()}
            </div>
            <div className="col-md-2">
              {processAnimatedBannerSlides()}
            </div>
            <div className="col-md-2">
              {processAnimatedBannerSlides()}
            </div>
            <div className="col-md-2">
              {processAnimatedBannerSlides()}
            </div>
          </div>
        )
    }
  }

  const processAnimatedBannerSlides = (href, source) => {

    source = "https://mdbootstrap.com/img/video/Lines.mp4"

    if (href) {
      return (
        <Link to={href}>
          <video style={{ filter: "grayscale(100%)" }} className="video-fluid" autoPlay loop muted>
            <source src={source} type="video/mp4" />
          </video>
        </Link>
      )
    }
    else return (
      <div>
        <video style={{ filter: "grayscale(100%)" }} className="video-fluid" autoPlay loop muted>
          <source src={source} type="video/mp4" />
        </video>
      </div>
    )

  }

  const animatedBannerItemMask = (item) => {
    if (item.mask) {
      return (<div className={item.mask}>
      </div>)
    }
  }

  const bannerEditMode = () => {
    if (isAdmin()) {
      return (
        <div className="bannerColumnEditor">
          {/* Add a button to add an animated banner slide */}
          {/* Add a button to remove the current animated banner slide */}
          {/* Add a dropdown and toggle to control the mask property on the current banner slide */}
          {/* Add a toggle switch to control the editable area property on the current banner slide */}
          <Toggle color={"success"} label="Link" name="Link"></Toggle>
          <Toggle color="primary" label="Media" name="Link"></Toggle>
        </div>)
      // return (
      //   <div className="bannerSlideEditor">

      //   </div>
      // )
    }
  }

  return (
    <div className="">
      <div style={{ padding: "0", height: size.height }} id="video-carousel-example2" className="carousel slide carousel-fade" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#video-carousel-example2" data-slide-to="0" className="active"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
          {items.map(function (item, index) {
            return <div className="carousel-item active" style={{ height: size.height }} >
              <div className="view">
                {bannerEditMode()}
                {animatedBannerItem(item)}
                {animatedBannerItemMask(item)}
              </div>
              <div className="carousel-caption">
                <div className="animated fadeInDown">
                  {/* pathname = bannertitle, guid = index of banner item */}
                  <EditableArea useloading={true} fade={false} size={{ width: size.width, height: size.height }} pathname={title} guid={index}></EditableArea>
                </div>
              </div>
            </div>
          })}
        </div>
        <a className="carousel-control-prev" href="#video-carousel-example2" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#video-carousel-example2" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

    </div>
  )
}

Banner.propTypes = {
  title: PropTypes.string,
};


export default Banner