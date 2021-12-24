/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, Fragment } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import { useLocation } from 'react-router';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { isEdit, isAdminArea, getCookie, trunc } from '../../helpers/Default'
import { EditableAreaContext } from '../../contexts/EditableAreaContext'
import '../../assets/css/Style.css'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline/build/ckeditor.js";
import { useRef } from 'react';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

// DOMPurify.setConfig({ ADD_ATTR: ['target'] });

var editorConfig = {
    toolbar: ['link', 'list', "alignment", "blockQuote", "bold", "code", "codeBlock", "selectAll", "undo", "redo", "fontBackgroundColor", "fontColor", "fontFamily", "fontSize", "heading", "highlight", "removeHighlight", "horizontalLine", "imageUpload", "indent", "outdent", "italic", "link", "numberedList", "bulletedList", "mediaEmbed", "pageBreak", "removeFormat", "specialCharacters", "strikethrough", "subscript", "superscript", "insertTable", "todoList", "underline"],
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    },
    allowedContent: true,
    link: {
        decorators: {
            openInNewTab: {
                mode: 'manual',
                label: 'Open in a new tab',
                attributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer'
                }
            }
        }
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            "tableCellProperties",
            "tableProperties"
        ]
    },
    // Pay to upgrade this??
    ckfinder: {
        uploadUrl: `${process.env.REACT_APP_API}/editable-area/upload-image?token=${getCookie('token')}`,
    },
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'paragraph', title: 'Paragraph 2', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        ]
    },
    removePlugins: ['Title'],
}

const EditableArea = ({ isEditablePage, link, onEditorChange, truncate = false, pathname, guid, size, fade = false, useloading = false, alwaysOn = false }) => {

    const { editableAreavalues, updateEditableAreas } = useContext(EditableAreaContext);
    const { publishEditableAreas } = editableAreavalues;
    const myRef = useRef()
    const location = useLocation();

    const [values, setValues] = useState({
        pathname,
        guid,
        data: '',
        loading: true,
        size,
        fade,
        pageError: false,
        isEditablePage: isEditablePage === "/:page" ? true : false,
        url: location.pathname
    })
    const { data, loading, pageError } = values

    // when the component mounts, set the state
    useEffect(() => {

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/editable-area`,
            data: values,
        }).then(response => {

            if (response.data.message) {
                setValues({ ...values, data: response.data.content, pageError: response.data.message, link: response.data.link });
            } else {
                setValues({ ...values, data: response.data.content, pageError: false, loading: false, link: response.data.link });
            }

        }).catch(error => {

            toast.error(error)

        })
    }, [])

    const handleChange = event => {
        setValues({ ...values, link: event.target.value })
    }


    // when the context changes (publish editable areas === true), update the context with new data
    useEffect(() => {
        if (publishEditableAreas) {
            updateEditableAreas({ guid, pathname, data, link })
        }
    }, [publishEditableAreas])

    const renderEditableArea = () => {

        const fadeVar = fade ? "fade-in" : ""
        if (!pageError) {
            // if the area is loading and is  in view mode
            if (loading && useloading) {
                return (
                    <div style={size} className={`editableAreaContainer loading loader`} >
                        <div className="loader-wheel"></div>
                        <div className="loader-text"></div>
                    </div>
                );
            }
            // if the area is not loading and is in edit mode and is focused
            else if (isEdit() || alwaysOn) {
                return (
                    <Fragment>
                        <TextField
                            onChange={handleChange}
                            label="URL"
                            value={link} name={"url"} size="small" variant="filled" style={{ position: "relative", right: "3px", padding: "0px 5px", marginBottom: "13px", width: "100px", maxHeight: "20px !important" }} />
                        <CKEditor
                            data-pathname={pathname}
                            id={guid}
                            className={`editableAreaContainer ${fadeVar}`}
                            editor={InlineEditor}
                            config={editorConfig}
                            data={data}
                            onChange={(evt, editor) => {
                                if ((isAdminArea() && alwaysOn) || !alwaysOn) {
                                    setValues({ ...values, data: editor.getData() })
                                    console.log(editor.getData())
                                }
                            }}
                            onReady={editor => {
                                editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                                    return new MyUploadAdapter(loader);
                                };
                            }}
                            onBlur={() => {
                            }}
                            onfocus={() => {
                            }}
                        />
                    </Fragment>
                )
            }
            // if the area is not loading and is in view mode or is in edit mode without being focused
            else if (truncate !== false) {
                return (
                    <Link to={link || "/"} ref={myRef}
                        className={`editableAreaContainer ${fadeVar}`} >
                        <div dangerouslySetInnerHTML={{ __html: trunc(data, truncate) }}>
                        </div>
                    </Link>
                )
            }
            else {
                return (
                    <Link to={link} ref={myRef}
                        className={`editableAreaContainer ${fadeVar}`} >
                        <div dangerouslySetInnerHTML={{ __html: data }}>
                        </div>
                    </Link>
                        // <div dangerouslySetInnerHTML={{ __html: data }}>
                        // </div>
                )
            }
        }
        else {
            return (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h1>404 Error</h1>
                    <p>{pageError}</p>
                </div>
            )
        }
    }

    return renderEditableArea()
}

class MyUploadAdapter {
    constructor(loader) {
        // CKEditor 5's FileLoader instance.
        this.loader = loader;

        // URL where to send files.
        this.url = `${process.env.REACT_APP_API}/editable-area/upload-image?token=${getCookie('token')}`;
    }

    // Starts the upload process.
    async upload() {

        return await new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
        });
    }

    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open('POST', this.url, true);
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${loader.file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    async _sendRequest() {
        const data = new FormData();

        data.append('upload', await Promise.resolve(this.loader.file));

        this.xhr.send(data);
    }
}

EditableArea.propTypes = {
    pathname: PropTypes.string,
    guid: PropTypes.string,
    size: PropTypes.shape({
        width: PropTypes.string,
        height: PropTypes.string
    })
};


export default EditableArea;