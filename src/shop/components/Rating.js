import React from 'react';
import { Fragment } from 'react';
import StarRatings from 'react-star-ratings';

const Rating = ({ value, text, color }) => {
  return (
    <Fragment>
      <StarRatings
        starDimension="20px"
        starSpacing="0px"
        rating={value}
        starRatedColor={color}
        numberOfStars={5}
        name='rating'
      />
      <span>{text}</span>
    </Fragment>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating