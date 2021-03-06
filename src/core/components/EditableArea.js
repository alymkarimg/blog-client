import React, { useState, useEffect, useContext, Fragment } from 'react'
import PropTypes from 'prop-types';
import { ReactDOM, render } from "react-dom";
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DOMPurify from 'dompurify';
import { isAdmin, isEdit, isAdminArea, getCookie, trunc } from '../../helpers/Default'
import { EditableAreaContext } from '../../contexts/EditableAreaContext'
import '../../assets/css/Style.css'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline/build/ckeditor.js";
import { useRef } from 'react';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

DOMPurify.setConfig({ ADD_ATTR: ['target'] });

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
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading3' },

        ]
    },
    removePlugins: ['Title'],
}

const EditableArea = ({ link, onEditorChange, truncate = false, pathname, guid, size, fade = false, useloading = false, alwaysOn = false }) => {

    const { editableAreavalues, updateEditableAreas } = useContext(EditableAreaContext);
    const { publishEditableAreas } = editableAreavalues;
    const myRef = useRef()

    const [values, setValues] = useState({
        pathname,
        guid,
        data: '',
        loading: true,
        size,
        fade,
        pageError: false,
        link
    })

    var { data, loading, pageError, link } = values

    // when the component mounts, set the state
    useEffect(() => {
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/editable-area`,
            data: values,
        }).then(response => {

            if (response.data.message) {
                setValues({ ...values, data: DOMPurify.sanitize(response.data.content), pageError: response.data.message, link: response.data.link });
            } else {
                setValues({ ...values, data: DOMPurify.sanitize(response.data.content), loading: false, link: response.data.link });
            }

        }).catch(error => {

            toast.error(error)

        })
    }, [])

    var { link } = values;

    const handleChange = event => {
        setValues({ ...values, link: event.target.value })
    }


    // when the context changes (publish editable areas == true), update the context with new data
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
                        <div class="loader-wheel"></div>
                        <div class="loader-text"></div>
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
                            value={link} name={"url"} size="small" variant="outlined" style={{ position: "relative", right: "3px", padding: "0px 5px", marginBottom: "13px", width: "120px" }} />
                        <CKEditor
                            data-pathname={pathname}
                            id={guid}
                            className={`editableAreaContainer ${fadeVar}`}
                            editor={InlineEditor}
                            config={editorConfig}
                            data={data}
                            onChange={(evt, editor) => {
                                if (isAdminArea() && alwaysOn || !alwaysOn) {
                                    setValues({ ...values, data: editor.getData() })
                                }
                            }}
                            onReady={editor => {
                                console.log(Array.from(editor.ui.componentFactory.names()));
                                // editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                                //     return new UploadAdapter(loader);
                                // };
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
            else if (truncate != false) {
                return (
                    <Link to={link} ref={myRef}
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

const UploadAdapter = () => {

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