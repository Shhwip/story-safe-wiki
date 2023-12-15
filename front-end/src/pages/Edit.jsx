import { $getRoot } from "lexical";
import { useEffect, useState, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { $createParagraphNode, $createTextNode } from "lexical";
import Toolbar from "../components/lexicalComponents/EditToolbar";
import { root } from "lexical";
import Header from "../components/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import "./Edit.css";

const theme = {};

function onError(error) {
  console.error(error);
}

function ToolbarPlugin({ editorState }) {
  const [editor] = useLexicalComposerContext();

  return <Toolbar editorState={editorState} editor={editor} />;
}

ToolbarPlugin.propTypes = {
  editorState: PropTypes.object.isRequired,
};

export default function Editor() {
  const { title } = useParams();
  const [article, setArticle] = useState("");
  const [articleLoaded, setArticleLoaded] = useState(false);
  const [isCommentModalActive, setIsCommentModalActive] = useState(false);
  const [comment, setComment] = useState("");
  const [ip, setIP] = useState("");
  const editorRef = useRef();

  useEffect(() => {
    const getIPAddress = async () => {
      const res = await axios.get("https:/.ipify.org/?format=json");
      console.log(res.data);
      setIP(res.data.ip);
    };
    getIPAddress();
  }, []);

  useEffect(() => {
    const getMessage = async () => {
      await axios
        .get("/edit/" + title)
        .then((response) => {
          response.data ? setArticle(response.data.text) : setArticle("empty");
          editorRef.current = response.data.text;
          setArticleLoaded(true);
          console.log("success");
        })
        .catch((error) => {
          console.log("error: ");
          console.log(error);
        });
    };
    getMessage();
  }, []);

  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    editorState: () => {
      const paragraph = $createParagraphNode();
      const text = $createTextNode(article);
      paragraph.append(text);
      $getRoot().append(paragraph);
    },
    initialEditorState: () => {
      const paragraph = $createParagraphNode();
      const text = $createTextNode("test");
      paragraph.append(text);
      $getRoot().append(paragraph);
      root.selectEnd();
    },
  };

  const handleSubmit = async () => {
    const text = editorRef.current;
    setArticle(text);

    if (!comment) {
      alert("Please enter a comment.");
      return;
    }

    const username = localStorage.getItem("userSession") || ip;
    await axios
      .post("/edit/" + title, {
        title: title,
        text: text,
        ip: ip,
        username: username,
        comment: comment,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error: ");
        console.log(error.response.data);
        alert(error.response.data);
      });
    openCloseCommentModal();
  };

  const openCloseCommentModal = () => {
    if (!editorRef.current) {
      alert("No changes have been made.");
      return;
    }
    console.log(editorRef.current);
    setIsCommentModalActive(!isCommentModalActive);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className={`container ${isCommentModalActive ? "modalIsOpen" : ""}`}>
        {articleLoaded ? (
          <div>
            <LexicalComposer initialConfig={initialConfig}>
              <ToolbarPlugin editorState={editorRef} />
              <PlainTextPlugin
                contentEditable={
                  <div className="content-container">
                    <ContentEditable className="content-editable" />
                  </div>
                }
                placeholder={
                  <div className="placeholder">Enter some text...</div>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <OnChangePlugin
                onChange={(editorState) =>
                  (editorRef.current =
                    editorState.toJSON().root.children[0].children[0].text)
                }
              />
              <button className="submit-button" onClick={openCloseCommentModal}>
                Submit
              </button>
            </LexicalComposer>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
      {isCommentModalActive ? (
        <div className="modal">
          <div
            className="modal-background"
            onClick={openCloseCommentModal}
          ></div>
          <div className="modal-content">
            <div className="modal-box">
              <textarea
                className="comment-textarea"
                placeholder="Please enter a description of your changes."
                onChange={handleCommentChange}
              ></textarea>
              <div className="buttons-container">
                <button className="submit-button" onClick={handleSubmit}>
                  Submit
                </button>
                <button
                  onClick={openCloseCommentModal}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
              <div>
                {localStorage.getItem("userSession") ? (
                  <div></div>
                ) : (
                  <div className="modal-warning">
                    You are not logged in. Your IP address will be used to
                    identify you.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
