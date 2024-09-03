import { SetState } from "../global.type"

export type TextEditorType ={
    setEditorContent :SetState<string>
    editorContent :any,
    label:string,
    required?:boolean
}