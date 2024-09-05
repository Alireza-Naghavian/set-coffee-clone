import { TextEditorType } from "@/types/global/texteditor.type";
import { Editor } from "@tinymce/tinymce-react";
import "./texteditor.css";
function TextEditor({
  setEditorContent,
  editorContent,
  label,
  required = true,
}: TextEditorType) {
  const handleEditorChange = (content: any, editor: any) => {
    setEditorContent(content);
  };
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex ">
        <label className=" font-Shabnam_B pr-1">{label}</label>
        <span className="text-red-500">{required && "*"}</span>
      </div>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TEXT_EDITOR}
        id="tiny-react_82864994311723119370649"
        init={{
          language: "fa",
          plugins: `anchor   codesample 
             image link lists     
               mediaembed casechange  
              pageembed linkchecker    
              powerpaste advtable   advtemplate   
                footnotes mergetags 
               typography inlinecss  `,
               
        }}
        value={editorContent}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}

export default TextEditor;
