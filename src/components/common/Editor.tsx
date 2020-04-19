import React, {useState, useRef, useEffect} from 'react'
import {
  Editor as DraftEditor,
  EditorState,
  RichUtils,
  RawDraftContentState,
  convertFromRaw,
  CompositeDecorator,
} from 'draft-js'
import {ButtonGroup, Button, Divider, IconName} from '@blueprintjs/core'

import './Editor.scss'

export type EditorButton = {
  text?: string
  icon?: IconName
  disabled?: boolean
  onMouseDown: (state: EditorState) => EditorState
  onStateChange?: (state: EditorState) => void
}

type EditorProps = {
  onChange?: (state: EditorState, answers?: Record<string, string>) => void
  rawInitialState?: RawDraftContentState
  readonly?: boolean
  result?: boolean
  decorator?: CompositeDecorator
  buttons?: Array<EditorButton>
}

const Editor = ({onChange, rawInitialState, readonly, result, decorator, buttons}: EditorProps) => {
  const initialState = rawInitialState
    ? EditorState.createWithContent(convertFromRaw(rawInitialState), decorator)
    : EditorState.createEmpty(decorator)
  const editorRef = useRef<DraftEditor>(null)
  const [editorState, setEditorState] = useState(initialState)
  const currentSelection = editorState.getSelection()
  const currentContentState = editorState.getCurrentContent()
  const currentStyle = editorState.getCurrentInlineStyle()
  const currentBlockType = currentContentState.getBlockForKey(currentSelection.getStartKey()).getType()

  useEffect(() => {
    if (buttons) {
      buttons.forEach((button) => {
        button.onStateChange && button.onStateChange(editorState)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState])

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command)
    if (newEditorState) {
      handleOnChange(newEditorState)
      return 'handled'
    }
    return 'not-handled'
  }

  // TODO: Refactor, this is ridiculous
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

  const handleAdditionalButtonClick = (onMouseDown: (editorState: EditorState) => EditorState) => (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    handleOnChange(onMouseDown(editorState))
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
          {buttons && (
            <>
              <Divider />
              <ButtonGroup minimal>
                {buttons.map((button) => (
                  <Button
                    key={button.icon}
                    icon={button.icon}
                    text={button.text}
                    onMouseDown={handleAdditionalButtonClick(button.onMouseDown)}
                    disabled={button.disabled}
                  />
                ))}
              </ButtonGroup>
            </>
          )}
        </div>
      )}
      <div
        className={`textarea ${readonly ? 'readonly' : ''} ${result ? 'done' : ''}`}
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
