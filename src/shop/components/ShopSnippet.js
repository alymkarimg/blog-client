import React, { useState, useEffect, useContext } from 'react';
import Card from '@material-ui/core/Card';
import EditableArea from '../../core/components/EditableArea'
import { makeStyles } from '@material-ui/core/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import ShopCard from './ShopCard'

// Import Swiper styles
import 'swiper/swiper.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function ShopSnippet({title}) {

    const [values, setValues] = useState({
        products: [1, 2, 3, 4],
    });
    
     const { products } = values
    

    const classes = useStyles();

    // add a button that is only visible in admin mode, the button allows you to add and remove banner items on the page
    var offerNumber = 1

    const options = {
        items: 4,
        nav: true,
        rewind: true,
        autoplay: false,
        loop: true
    };

    const events = {
        onDragged: function (event) {

        },
        onChanged: function (event) {

        }
    };

    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                products.map((product, index) => {
                    return (<SwiperSlide>
                                <ShopCard title={title} index={index} ></ShopCard>
                            </SwiperSlide>)
                })
            }

        </Swiper>
    )


}

export default ShopSnippet
