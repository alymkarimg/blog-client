import React, { setState, useState } from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import EditableArea from "../../core/components/EditableArea";
import MultipleSelect from '../../core/components/MultipleSelect'
import 'react-toastify/dist/ReactToastify.min.css';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import '../../assets/css/Style.css'
import ImageUploader from '../../core/components/ImageUploader'
import { arrayToObject, getFieldsFromPrototype, } from '../../helpers/Default'

const FullScreenDialog = ({ open, prototype, handleClose, handleCreateRow, getURL }) => {

  const handleChange = (name) => ((event) => {
      setValues({ ...values, [name]: event.target.value })
  })

  var textfieldsArray = getFieldsFromPrototype(prototype, true)
  const [values, setValues] = useState(arrayToObject(textfieldsArray.map(prop => ({ prop }))))

  const createForm = (arr) => {
    const form = [];
    arr.map((value) => {
      if (value == "title") {
        form.push(<div className="col-md-12" style={{ marginBottom: "10px" }}>
          <p>Title</p>
          <TextField id="blog_Title" onChange={handleChange(value)} fullWidth />
        </div>)
      }
      if (value == "author") {
        form.push(<div className="col-md-12" style={{ marginBottom: "10px" }}>
          <p>Author</p>
          <TextField id="blog_Author" onChange={handleChange(value)} fullWidth />
        </div>)
      }
      if (value == "categories") {
        form.push(<div className="col-md-12" style={{ marginLeft: "-10px", marginBottom: "10px" }}>
          <MultipleSelect value={values[value] == undefined ? [] : values[value]} onChange={handleChange(value)} title="Categories" menuitems={["Vegetarian", "Recipes", "Articles"]} />
        </div>)
      }
      if (value == "editableArea") {

        form.push(<div className="col-md-12" >
          <p>Content</p>
          <div style={{ marginBottom: "10px", marginLeft: "-10px" }}>
            <EditableArea alwaysOn={true} size={{ width: "100%", height: "100%" }} useloading={true} fade={false} pathname={`/admin/blog`} guid="create" />
          </div>
        </div>)
      }
    })

    return <div  className={`row ${values.image == undefined ? "col-md-8" : "col-md-12"}`} > {form} </div>;
  }

  const scroll = 'paper';
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  if (prototype.editableArea) {
    let editableAreaPathname = `${getURL}/${prototype.slug}`
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      fullWidth
      disableBackdropClick={true}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <h2 style={{ textAlign: "center", padding: "20px" }}> Add a blog </h2>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <div className="row">
            {createForm(textfieldsArray)}
            {values.image == undefined &&
              (
                <div className="row col-md-4" style={{ justifyContent: "center" }}>
                  <div>
                    <p>Image</p>
                    <ImageUploader></ImageUploader>
                  </div>
                </div>
              )
            }
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
            </Button>
        <Button onClick={
          handleCreateRow
        }
          color="primary">
          Create Blog
            </Button>
      </DialogActions>
    </Dialog>
  );
}

FullScreenDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCreateRow: PropTypes.func.isRequired,
  prototype: PropTypes.object.isRequired,
  getURL: PropTypes.string.isRequired
};

export default FullScreenDialog;