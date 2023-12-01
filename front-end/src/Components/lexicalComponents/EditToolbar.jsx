import "./EditToolbar.css";
import PropTypes from "prop-types";
import { $getSelection } from "lexical";

export default function Toolbar({ editorState, editor }) {
  const handlePreviewClick = () => {
    console.log("preview clicked");
    console.log(editorState.editorState);
  };

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
    </div>
  );
}

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  editor: PropTypes.object.isRequired,
};
