import React, { useState, } from 'react'
import ImageUploader from "react-images-upload";
import axios from "axios";
import { getCookie } from '../../helpers/Default'
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify'
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css'


const Uploader = (props) => {

    const { getURL, onImageDrop } = props

    return (
        <form>
            <ImageUploader
                {...props}
                name={"imageFile"}
                withIcon={false}
                withPreview={true}
                singleImage={false}
                onChange={(picture) => {
                    onImageDrop(picture)
                }}
                imgExtension={[".jpg", ".gif", ".png"]}
                maxFileSize={5242880}
            />
        </form>
    );
}

Uploader.propTypes = {

};


export default Uploader;