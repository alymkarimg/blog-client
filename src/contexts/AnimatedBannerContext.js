import React, { createContext, Component, useEffect, useState } from 'react';
import { isEdit, getCookie } from '../helpers/Default'
import { toast } from 'react-toastify'
import axios from 'axios'
import { removeQuery } from '../helpers/Default';
import animatedBanner from '../core/components/AnimatedBanner';

export const AnimatedBannerContext = createContext(null);

const AnimatedBannerContextProvider = (props) => {
    const [animatedBannerAreavalues, setValues] = useState({
        publishAnimatedBanners: false,
        animatedBanners: [],
    })

    var {publishAnimatedBanners, animatedBanners } = animatedBannerAreavalues

    // add a value to the editable area state
    const updateAnimatedBanners = (animatedBanner) => {
        animatedBanners = animatedBanners.concat([animatedBanner])
        setValues({ ...animatedBannerAreavalues, animatedBanners })
    }

    // when pubisheditableareas changes, update db if there are editable areas to update
    useEffect(() => {
        if (publishAnimatedBanners && isEdit() && animatedBanners.length > 0) {
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API}/animated-banner/save`,
                data: { animatedBanners },
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`
                }
            }).then(response => {
                removeQuery('edit');
                setValues({ ...animatedBannerAreavalues, animatedBanners: [], publishAnimatedBanners: false })
                toast.success(response.data.message)
            }).catch(error => {
                console.log('Error saving to the database', error.response.data);

                error.response.data.errors.forEach((error) => {
                    toast.error(error.message)
                })
            })
        }
    }, [publishAnimatedBanners])


    // for a button in the navigation to update publish editable area state
    const updatePublishAnimatedBanners = () => {
        setValues({ ...animatedBannerAreavalues, publishAnimatedBanners: true })
    }

    
    return (
        <AnimatedBannerContext.Provider value={{ animatedBannerAreavalues, updateAnimatedBanners, updatePublishAnimatedBanners }}>
            {props.children}
        </AnimatedBannerContext.Provider>
    )

}

export default AnimatedBannerContextProvider;