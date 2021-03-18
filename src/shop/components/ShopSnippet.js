import React from 'react'
import Card from '@material-ui/core/Card';
import EditableArea from '../../core/components/EditableArea'
import { makeStyles } from '@material-ui/core/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';

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

function ShopSnippet() {
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
            <SwiperSlide><Card className={classes.root
            } raised={true} >
                <div className={classes.details}>
                    <CardContent>
                        <h2 style={{ textAlign: "center" }}  >Categories</h2>
                        <div style={{ display: "flex", textAlign: "centre", justifyContent: "center" }} className="">
                            <p><Avatar style={{ alignSelf: 'right' }} aria-label={"avatar icon"} className={classes.avatar}></Avatar><span>Recipes</span></p>
                        </div>
                    </CardContent>
                </div>
            </Card></SwiperSlide>
            <SwiperSlide><Card className={classes.root
            } raised={true} >
                <div className={classes.details}>
                    <CardContent>
                        <h2 style={{ textAlign: "center" }}  >Categories</h2>
                        <div style={{ display: "flex", textAlign: "centre", justifyContent: "center" }} className="">
                            <p><Avatar style={{ alignSelf: 'right' }} aria-label={"avatar icon"} className={classes.avatar}></Avatar><span>Recipes</span></p>
                        </div>
                    </CardContent>
                </div>
            </Card></SwiperSlide>
            <SwiperSlide><Card className={classes.root
            } raised={true} >
                <div className={classes.details}>
                    <CardContent>
                        <h2 style={{ textAlign: "center" }}  >Categories</h2>
                        <div style={{ display: "flex", textAlign: "centre", justifyContent: "center" }} className="">
                            <p><Avatar style={{ alignSelf: 'right' }} aria-label={"avatar icon"} className={classes.avatar}></Avatar><span>Recipes</span></p>
                        </div>
                    </CardContent>
                </div>
            </Card></SwiperSlide>
            <SwiperSlide><Card className={classes.root
            } raised={true} >
                <div className={classes.details}>
                    <CardContent>
                        <h2 style={{ textAlign: "center" }}  >Categories</h2>
                        <div style={{ display: "flex", textAlign: "centre", justifyContent: "center" }} className="">
                            <p><Avatar style={{ alignSelf: 'right' }} aria-label={"avatar icon"} className={classes.avatar}></Avatar><span>Recipes</span></p>
                        </div>
                    </CardContent>
                </div>
            </Card></SwiperSlide>
        </Swiper>
    )


}

export default ShopSnippet
