import { useState } from 'react';
import parse from "html-react-parser";
import "./Preview.css";
import "../pages/Wiki.css"

const Preview = (props) => {
  const closeCommentModal = () => {
    props.setContent("");
  }
  return (
    <>
      {props.content ? (
        <>
      <div className="preview-modal-background" onClick={closeCommentModal}>       
        <div className="preview-modal">
          <div className="preview-modal-content">
            <div className="preview-modal-box">
                <p>{parse(props.content)}</p>
              <div className="buttons-container">
                <button onClick={closeCommentModal} className="cancel-button">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>  
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Preview;