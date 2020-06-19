import Carousel from 'bootstrap/'
import EditableArea from './EditableArea'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getCookie } from '../auth/Helpers'
import 'react-toastify/dist/ReactToastify.min.css'
import RingLoader from "react-spinners/RingLoader";

const Banner = (props) => {

  const [values, setValues] = useState({
    title: props.title,
    items: [],
    mask: props.mask,
    loading: true
  })

  var { title, loading, items, mask } = values

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
        setValues({ ...values, items: response.data.items, loading: false });
      }
    }).catch(error => {
      error.response.data.errors.forEach((error) => {
        toast.error(error.message)
      })
    })
  }, [])

  const carouselItem = (item) => {
    if (item.format == "video") {
      return (<video className="video-fluid" autoPlay loop muted>
        <source src="https://mdbootstrap.com/img/video/Lines.mp4" type="video/mp4" />
      </video>)
    } else {
      return (
        null
      )
    }
  }

  const carouselItemMask = () => {
    if (mask) {
      return (<div className={mask}>
      </div>)
    }
  }

  if (loading) {
    return (
      <div className="editableAreaContainer" >
        <RingLoader
          size={42}
          color={"#b8f4b8"}
          loading
        />
      </div>
    );
  }
  else {
    return (
      <div style={{ padding: "0", height: "250px" }} id="video-carousel-example2" className="carousel slide carousel-fade" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#video-carousel-example2" data-slide-to="0" className="active"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
          {items.map(function (item, index) {
            return <div className="carousel-item active" style={{ height: "250px" }} >
              <div className="view">
                {carouselItem(item)}
                {carouselItemMask()}
              </div>
              <div className="carousel-caption">
                <div className="animated fadeInDown">
                  <EditableArea pathname={title} guid={index}></EditableArea>
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
    )
  }
}

export default Banner