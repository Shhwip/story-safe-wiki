import { useState } from 'react';
import parse from "html-react-parser";

const Preview = (props) => {
  const closeCommentModal = () => {
    props.setContent("");
  }
  return (
    <>
      {props.content ? (
        <div className="modal">
          <div className="modal-background" onClick={closeCommentModal}></div>
          <div className="modal-content">
            <div className="modal-box">
                <p>{props.content}</p>
              <div className="buttons-container">
                <button onClick={closeCommentModal} className="cancel-button">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Preview;