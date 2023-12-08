import "./EditToolbar.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { $getSelection } from "lexical";
import Preview from "../../components/Preview";
import axios from "axios";

export default function Toolbar({ editorState, editor }) {
  const [preview, setPreview] = useState("");
  const [editorLoaded, setEditorLoaded] = useState(true);

  const handlePreviewClick = async() => {
    setEditorLoaded(false);
    await axios
    .post("http://localhost:4000/edit/parse", {
      text: editorState.current,
    })
    .then((response) => {
      console.log(response);
      setPreview(response.data);
    })
    .catch((error) => {
      console.log("error: ");
      console.log(error.response.data);
      alert(error.response.data);
    });
    setEditorLoaded(true);
  };

  if (!editorLoaded) {
    return (
      <div> Loading... </div>
    );
  }



  const insertSpoilTag = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection) {
        selection.insertText("<em class=spoil_[insert spoil level here]></em>");
      }
    });
  };


  return (
    <div className="toolbar">
      <button className="toolbar-button" onClick={insertSpoilTag}>
        Spoil tag
      </button>
      <button className="toolbar-button" onClick={handlePreviewClick}>
        Preview
      </button>
      <Preview content={preview} setContent={setPreview} />
    </div>
  );
}

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  editor: PropTypes.object.isRequired,
};
