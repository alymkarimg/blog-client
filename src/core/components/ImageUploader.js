import React, { useState } from 'react'
import ImageUploader from "react-images-upload";

const Uploader = (props) => {

    const [pictures, setPictures] = useState([]);

    const onDrop = picture => {
        setPictures([...pictures, picture]);
    };
    return (
        <ImageUploader
            {...props}
            withIcon={true}
            withPreview={true}
            singleImage={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
        />
    );
}

Uploader.propTypes = {
};


export default Uploader;