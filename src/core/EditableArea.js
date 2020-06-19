import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import DOMPurify from 'dompurify';
import RingLoader from "react-spinners/RingLoader";
import { isEdit, getCookie } from '../auth/Helpers'
import { EditableAreaContext } from '../contexts/EditableAreaContext'
import '../assets/css/Style.css' 

import CKEditor from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline/build/ckeditor.js";

DOMPurify.setConfig({ ADD_ATTR: ['target'] });

//import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor.js';
// import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
// import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder.js';
// import CKFinderUploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js';
// import Code from '@ckeditor/ckeditor5-basic-styles/src/code.js';
// import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock.js';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
// import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
// import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
// import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
// import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
// import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
// import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js';
// import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
// import Image from '@ckeditor/ckeditor5-image/src/image.js';
// import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
// import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
// import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
// import Link from '@ckeditor/ckeditor5-link/src/link.js';
// import List from '@ckeditor/ckeditor5-list/src/list.js';
// import MathType from '@wiris/mathtype-ckeditor5';
// import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
// import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar.js';
// import Mention from '@ckeditor/ckeditor5-mention/src/mention.js';
// import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak.js';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
// import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
// import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat.js';
// import RestrictedEditingMode from '@ckeditor/ckeditor5-restricted-editing/src/restrictededitingmode.js';
// import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js';
// import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js';
// import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js';
// import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js';
// import SpecialCharactersLatin from '@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin.js';
// import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical.js';
// import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js';
// import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
// import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript.js';
// import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript.js';
// import Table from '@ckeditor/ckeditor5-table/src/table.js';
// import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
// import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
// import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
// import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
// import Title from '@ckeditor/ckeditor5-heading/src/title.js';
// import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
// import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
// import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount.js';

var editorConfig = {
    placeholder: undefined,
    toolbar: ['link', 'list', "alignment", "blockQuote", "bold", "code", "codeBlock", "selectAll", "undo", "redo", "fontBackgroundColor", "fontColor", "fontFamily", "fontSize", "heading",  "highlight", "removeHighlight", "horizontalLine", "imageUpload", "indent", "outdent", "italic", "link", "numberedList", "bulletedList", "mediaEmbed", "pageBreak", "removeFormat", "specialCharacters", "strikethrough", "subscript", "superscript", "insertTable", "todoList", "underline"],
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
    }
}

const EditableArea = (props) => {

    const { editableAreavalues, updateEditableAreas } = useContext(EditableAreaContext);
    const { publishEditableAreas } = editableAreavalues;

    const [values, setValues] = useState({
        isFocus: false,
        pathname: props.pathname,
        guid: props.guid,
        data: '',
        loading: true
    })

    var { isFocus, guid, data, loading, pathname } = values

    // when the component mounts, set the state
    useEffect(() => {
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/editable-area`,
            data: values,
        }).then(response => {
            setValues({ ...values, data: DOMPurify.sanitize(response.data.content), loading: false });
        }).catch(error => {

            error.response.data.errors.forEach((error) => {
                toast.error(error.message)
            })
        })
    }, [])

    // when the context changes (publish editable areas == true), update the context with new data
    useEffect(() => {
        if (publishEditableAreas) {
            updateEditableAreas({ guid, pathname, data })
        }
    }, [publishEditableAreas])

    // update state when editor changes
    const onEditorChange = (evt, editor) => {
        setValues({ ...values, data: editor.getData() })
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
    else if (isEdit()) {
        return (
            <div data-pathname={pathname} id={guid}  >
                <CKEditor
                    className={`editableAreaContainer ${isFocus ? "isFocus" : ""} `}
                    editor={InlineEditor}
                    config={editorConfig}
                    data={data}
                    onChange={onEditorChange}
                    onInit={editor => {
                        console.log(Array.from(editor.ui.componentFactory.names()));
                        // editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                        //     return new UploadAdapter(loader);
                        // };
                    }}
                    onBlur={(event, editor) => {
                        setValues({ ...values, isFocus: false })

                    }}
                    onFocus={(event, editor) => {
                        setValues({ ...values, isFocus: true })
                    }}
                />
            </div>
        )
    }
    else {
        return (
            <div className="editableAreaContainer" >
                <div dangerouslySetInnerHTML={{ __html:  DOMPurify.sanitize(data)  }}>
                </div>
            </div>
        )
    }

};

const UploadAdapter = () => {

}

export default EditableArea;