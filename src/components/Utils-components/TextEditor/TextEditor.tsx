"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { ClassicEditor } from "ckeditor5";
import "./textEditor.css";
import "ckeditor5/ckeditor5.css";
import { SetState } from "@/types/global.type";
import editorConfig from "@/utils/EditorConfig";
function TextEditor({
  onChange,
  label,
  required = true,
  value,
}: {
  onChange: SetState<string>;
  value: string;
  label?:string
  required?:boolean
}) {
  return (
    <div className=" flex flex-col gap-y-2">
       <div className="flex ">
        <label className=" font-Shabnam_B pr-1">{label}</label>
        <span className="text-red-500">{required && "*"}</span>
      </div>
      <CKEditor
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        data={value}
        editor={ClassicEditor}
        config={editorConfig}
      />
    </div>
  );
}

export default TextEditor;
