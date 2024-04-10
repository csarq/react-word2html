import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function App() {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleEditorChange = (content, editor) => {
    const contentWithBAndITags = content
      .replace(/<strong>/g, "<b>")
      .replace(/<\/strong>/g, "</b>")
      .replace(/<em>/g, "<i>")
      .replace(/<\/em>/g, "</i>")
      .replace(/ style="[^"]*"/g, "")
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "<br><br>")
      .replace(/<span>/g, "")
      .replace(/<\/span>/g, "");
    setEditorContent(contentWithBAndITags);
  };

  return (
    <>
      <div
        className="editor-container"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <Editor
          className="wordEditor"
          tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          onEditorChange={handleEditorChange}
          init={{
            license_key: "gpl",
            height: 500,
            menubar: false,
            selector: "textarea",
            pad_empty_with_br: false,
            skin: "oxide-dark",

            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "charmap",
              "anchor",
              "code",
              "fullscreen",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | code | " +
              "bold italic | " +
              "bullist numlist | " +
              "removeformat | help",
            content_style:
              "@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap'); \
      body { font-family:'Fira Sans', sans-serif; font-size:14px }",
          }}
        />
        <br></br>
        <textarea className="outputTextArea" value={editorContent} readOnly />
      </div>
    </>
  );
}
