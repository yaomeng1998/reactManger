import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useImperativeHandle, useState } from 'react'
import React from 'react';
function RichEditor(props, ref) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    useEffect(() => {
      if(props.detail){
        console.log(111);
        const html = props.detail
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState)
        }
      }
    }, [])
    var onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }
    useImperativeHandle(ref, function detail() {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    })
    return (
        <div>
            <Editor
                editorStyle={{ border: '1px solid black', minHeight: 200 }}
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    )
}

export default React.forwardRef(RichEditor)