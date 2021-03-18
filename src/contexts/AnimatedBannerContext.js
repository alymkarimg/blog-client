import React, { createContext, Component, useEffect, useState } from 'react';
import { isEdit, getCookie } from '../helpers/Default'
import { toast } from 'react-toastify'
import axios from 'axios'
import { removeQuery } from '../helpers/Default';
import animatedBanner from '../core/components/AnimatedBanner';

export const AnimatedBannerContext = createContext(null);

const AnimatedBannerContextProvider = (props) => {
    const [animatedBannerValues, setValues] = useState({
        publishAnimatedBanners: false,
        animatedBanners: [],
    })

    var { publishAnimatedBanners, animatedBanners } = animatedBannerValues

    // add a value to the animated banner state
    const updateAnimatedBanners = (animatedBanner) => {

        if (!animatedBanners.find(q => q.title == animatedBanner.title)) {
            animatedBanners.push(animatedBanner)
        } else {
            var bannerToEdit = animatedBanners.find(q => q.title == animatedBanner.title)
            if (bannerToEdit) {
                bannerToEdit.title = animatedBanner.title;
                bannerToEdit.items = animatedBanner.items
            }
        }
        setValues({ ...animatedBannerValues, animatedBanners })
    }

    // when pubisheditableareas changes, update db if there are editable areas to update
    useEffect(() => {
        if (publishAnimatedBanners && isEdit() && animatedBanners.length > 0) {

            var bodyFormData = new FormData();

            animatedBanners.forEach((banner) => {
                for (var key in banner) {
                    if (key == "items") {
                        bodyFormData.append(key, banner[key])
                        for (var i = 0; i < banner.items.length; i++) {
                            if (banner.items[i].newImage) {
                                bodyFormData.append("guid", banner.items[i].guid)
                                bodyFormData.append(`${banner.title} ${banner.items[i].guid} ${banner.items[i].newImage.name}`, banner.items[i].newImage);
                            }
                            
                        }
                    } else {
                        bodyFormData.append(key, banner[key])
                    }
                }
            })




            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API}/animated-banner/save`,
                data: bodyFormData,
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`
                }
            }).then(response => {
                removeQuery('edit');
                var urlsObjects = response.data.urlsObjects;

                urlsObjects.forEach((urlObject, index) => {
                    var fileProps = urlObject.fileProps
                    var item;

                    var bannerToEdit = animatedBanners.find(q => q.title == fileProps[0])
                    if (bannerToEdit) {
                        bannerToEdit.items.forEach((item) => {
                            if (item.pathname == fileProps[0] && item.guid == fileProps[1]) {
                                item.image = urlObject.url
                            }
                        });
                    }
                })

                setValues({ ...animatedBannerValues, animatedBanners: [], publishAnimatedBanners: false })
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
        setValues({ ...animatedBannerValues, publishAnimatedBanners: true })
    }


    return (
        <AnimatedBannerContext.Provider value={{ animatedBannerValues, updateAnimatedBanners, updatePublishAnimatedBanners }}>
            {props.children}
        </AnimatedBannerContext.Provider>
    )

}

export default AnimatedBannerContextProvider;