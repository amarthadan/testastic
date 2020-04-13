import React, {useState, useRef} from 'react'
import {Editor as DraftEditor, EditorState, RichUtils, RawDraftContentState, convertFromRaw} from 'draft-js'

import './Editor.scss'
import {ButtonGroup, Button, Divider, Classes} from '@blueprintjs/core'

type EditorProps = {
  onChange?: (state: EditorState) => void
  rawInitialState?: RawDraftContentState
  readonly?: boolean
}

const Editor = ({onChange, rawInitialState, readonly}: EditorProps) => {
  const initialState = rawInitialState ? EditorState.createWithContent(convertFromRaw(rawInitialState)) : null
  const editorRef = useRef<DraftEditor>(null)
  const [editorState, setEditorState] = useState(initialState || EditorState.createEmpty())
  const currentStyle = editorState.getCurrentInlineStyle()
  const currentSelection = editorState.getSelection()
  const currentBlockType = editorState.getCurrentContent().getBlockForKey(currentSelection.getStartKey()).getType()

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command)
    if (newEditorState) {
      handleOnChange(newEditorState)
      return 'handled'
    }
    return 'not-handled'
  }

  const handleBoldClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleOnChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  const handleItalicClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleOnChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }

  const handleUnderlineClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleOnChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
  }

  const handleUnorderedListClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleOnChange(RichUtils.toggleBlockType(editorState, 'unordered-list-item'))
  }

  const handleOrderedListClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleOnChange(RichUtils.toggleBlockType(editorState, 'ordered-list-item'))
  }

  const handleHeaderOneClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleOnChange(RichUtils.toggleBlockType(editorState, 'header-one'))
  }

  const handleHeaderTwoClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleOnChange(RichUtils.toggleBlockType(editorState, 'header-two'))
  }

  const handleOnChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState)
    if (onChange) {
      onChange(newEditorState)
    }
  }

  return (
    <div className="editor">
      {readonly || (
        <div className="buttons">
          <ButtonGroup minimal>
            <Button icon="bold" onMouseDown={handleBoldClick} active={currentStyle.has('BOLD')} />
            <Button icon="italic" onMouseDown={handleItalicClick} active={currentStyle.has('ITALIC')} />
            <Button icon="underline" onMouseDown={handleUnderlineClick} active={currentStyle.has('UNDERLINE')} />
          </ButtonGroup>
          <Divider />
          <ButtonGroup minimal>
            <Button
              icon="properties"
              onMouseDown={handleUnorderedListClick}
              active={currentBlockType === 'unordered-list-item'}
            />
            <Button
              icon="numbered-list"
              onMouseDown={handleOrderedListClick}
              active={currentBlockType === 'ordered-list-item'}
            />
          </ButtonGroup>
          <Divider />
          <ButtonGroup minimal>
            <Button icon="header-one" onMouseDown={handleHeaderOneClick} active={currentBlockType === 'header-one'} />
            <Button icon="header-two" onMouseDown={handleHeaderTwoClick} active={currentBlockType === 'header-two'} />
          </ButtonGroup>
        </div>
      )}
      <div
        className={`textarea ${readonly ? `${Classes.CALLOUT} ${Classes.INTENT_PRIMARY} readonly` : ''}`}
        onClick={() => editorRef.current?.focus()}
      >
        <DraftEditor
          ref={editorRef}
          editorState={editorState}
          onChange={handleOnChange}
          handleKeyCommand={handleKeyCommand}
          readOnly={readonly}
        />
      </div>
    </div>
  )
}

export default Editor
