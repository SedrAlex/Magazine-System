
// Importing helper modules
import { useCallback, useMemo, useRef, useState } from "react";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";
import { useEffect } from "react";

const Editor = ({fid, onChange }) => {
  // Editor state
  const [value, setValue] = useState("");
  
  useEffect(() => {
    if(fid.content){
      setValue(fid.content)

    }

},[]) 
  // Editor ref
  const quill = useRef();

  // Handler to handle button clicked
  function handler() {
    console.log(value);
  }
  const handleChange = (content, delta, source, editor) => {
    console.log(editor.getHTML()); // html 사용시
    const htmlContent = editor.getHTML();
    setValue(htmlContent);
    onChange(htmlContent); // Call the passed callback function    setValue(editor.getHTML());
  };

  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      // Read the selected file as a data URL
      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();

        // Get the current selection range and insert the image at that index
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];
  

  return (
    <div className={styles.wrapper}>
      <QuillEditor
        ref={(el) => (quill.current = el)}
        className={styles.editor}
        style={{ height: "230px", width:"1000px", display:"absolute" }}
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        // onChange={(value) => setValue(value)}
        onChange={handleChange}

      />
     
    </div>
  );
};

export default Editor;