// get the xhtml from "http://localhost:4000/parse/" and display it in a editable text box

import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./EditTool.css";
import PropTypes from "prop-types";
import { DefaultEditor } from "react-simple-wysiwyg";

export default function EditTool({ article }) {
  const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  return (
    <div className="ParentContainer">
      <DefaultEditor
        value={article}
        onChange={(value) => console.log(value)}
      />
    </div>

    // <div className="ParentContainer">
    //   <Editor
    //     apiKey="elrv3xvxslj1qyr9kyg5vccvu8lmkujc4igdrjzoe1gcr69b"
    //     onInit={(evt, editor) => (editorRef.current = editor)}
    //     content_style="../pages/Parser.css"
    //     initialValue={article}
    //     init={{
    //       height: "100%",
    //       menubar: false,
    //       plugins: [
    //         "advlist",
    //         "autolink",
    //         "lists",
    //         "link",
    //         "image",
    //         "charmap",
    //         "preview",
    //         "anchor",
    //         "searchreplace",
    //         "visualblocks",
    //         "code",
    //         "fullscreen",
    //         "insertdatetime",
    //         "media",
    //         "table",
    //         "code",
    //         "help",
    //         "wordcount",
    //       ],
    //       toolbar:
    //         "undo redo | blocks | " +
    //         "bold italic forecolor | alignleft aligncenter " +
    //         "alignright alignjustify | bullist numlist outdent indent | " +
    //         "removeformat | help",
    //       content_style:
    //         "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
    //     }}
    //   />
    //   <button onClick={log}>Log editor content</button>
    // </div>
  );
}

EditTool.propTypes = {
  article: PropTypes.string,
};
