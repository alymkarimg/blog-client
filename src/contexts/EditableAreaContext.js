/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { getCookie } from "../helpers/Default";
import { toast } from "react-toastify";
import axios from "axios";
import { removeQuery } from "../helpers/Default";
import { useLocation } from "react-router";

export const EditableAreaContext = createContext(null);

const EditableAreaContextProvider = (props) => {
  const [editableAreavalues, setValues] = useState({
    publishEditableAreas: false,
    editableAreas: [],
  });

  const location = useLocation();

  var { publishEditableAreas, editableAreas } = editableAreavalues;

  const [editableAreaModelsValues, setEditableAreaModelsValues] = useState({
    editableAreaModels: [],
  });

  let { editableAreaModels } = editableAreaModelsValues;

  // add a value to the editable area state
  const updateEditableAreas = (editableArea) => {
    if (
      !editableAreas.find(
        (q) =>
          q.guid === editableArea.guid && q.pathname == editableArea.pathname
      )
    ) {
      editableAreas.push(editableArea);
    } else {
      var areaToEdit = editableAreas.find(
        (q) =>
          q.guid === editableArea.guid && q.pathname == editableArea.pathname
      );
      if (areaToEdit) {
        areaToEdit.guid = editableArea.guid;
        areaToEdit.pathname = editableArea.pathname;
        areaToEdit.data = editableArea.data;
        areaToEdit.loading = editableArea.loading;
        areaToEdit.size = editableArea.size;
        areaToEdit.fade = editableArea.fade;
        areaToEdit.pageError = editableArea.pageError;
        areaToEdit.isEditablePage = editableArea.isEditablePage;
        areaToEdit.url = editableArea.url;
      }
    }
    setValues({
      ...editableAreavalues,
      editableAreas: [...editableAreas],
    });
  };

  const updateEditableAreaModels = (editableArea) => {
    // editableAreas = editableAreas.concat([editableArea])
    // setValues({ ...editableAreavalues, editableAreas })
    if (
      !editableAreaModels.find(
        (q) =>
          q.guid === editableArea.guid && q.pathname == editableArea.pathname
      )
    ) {
      editableAreaModels.push(editableArea);
    } else {
      var areaToEdit = editableAreaModels.find(
        (q) =>
          q.guid === editableArea.guid && q.pathname == editableArea.pathname
      );
      if (areaToEdit) {
        areaToEdit.guid = editableArea.guid;
        areaToEdit.pathname = editableArea.pathname;
        areaToEdit.content = editableArea.content;
        areaToEdit.loading = editableArea.loading;
        areaToEdit.size = editableArea.size;
        areaToEdit.fade = editableArea.fade;
        areaToEdit.pageError = editableArea.pageError;
        areaToEdit.isEditablePage = editableArea.isEditablePage;
        areaToEdit.url = editableArea.url;
      }
    }
    setEditableAreaModelsValues({
      ...editableAreaModelsValues,
      editableAreaModels: [...editableAreaModels],
    });
  };

  const getURL = `${process.env.REACT_APP_API}/editable-area`;

  useEffect(() => {
    // if editable areas have finished loading -- need to implement this!
    // filter all editable areas that are not already models

    const controller = new AbortController();

    const areasToUpdate = editableAreas.filter(
      (o1) =>
        !editableAreaModels.some(
          (o2) => o1.guid === o2.guid && o1.pathname === o2.pathname
        )
    );
    if (areasToUpdate.length > 0) {
      axios({
        method: "POST",
        url: `${getURL}/loadAllEditableAreas`,
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
        signal: controller.signal,
        data: { editableAreas: areasToUpdate, url: location.pathname },
      })
        .then((response) => {
          response.data.map((q) => updateEditableAreaModels(q));
        })
        .catch((error) => {
          if (axios.isCancel(error)) return;
          error.response.data.errors.forEach((error) => {
            toast.error(error.message);
          });
        });

      return controller.abort();
    }
  }, [editableAreas]);

  // for a button in the navigation to update publish editable area state
  const updatePublishEditableAreas = () => {
    setValues({ ...editableAreavalues, publishEditableAreas: true });
  };

  // when pubisheditableareas changes, update db if there are editable areas to update
  useEffect(() => {
    if (
      publishEditableAreas &&
      editableAreaModels.length > 0
    ) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/editable-area/save`,
        data: { editableAreas },
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
        .then(() => {
          removeQuery("edit");
          setValues({
            ...editableAreavalues,
            editableAreas: [],
            publishEditableAreas: false,
          });
          toast.success("Editable areas saved");
        })
        .catch((error) => {
          console.log("Error saving to the database", error.response.data);

          error.response.data.errors.forEach((error) => {
            toast.error(error.message);
          });
        });
    }
  }, [publishEditableAreas]);

  return (
    <EditableAreaContext.Provider
      value={{
        editableAreavalues,
        editableAreaModelsValues,
        updateEditableAreas,
        updateEditableAreaModels,
        updatePublishEditableAreas,
      }}
    >
      {props.children}
      {/* {JSON.stringify(editableAreaModels)} */}
    </EditableAreaContext.Provider>
  );
};

export default EditableAreaContextProvider;
