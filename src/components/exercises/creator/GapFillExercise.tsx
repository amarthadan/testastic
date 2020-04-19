import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FormGroup} from '@blueprintjs/core'
import {
  EditorState,
  convertToRaw,
  ContentBlock,
  ContentState,
  CompositeDecorator,
  SelectionState,
  RichUtils,
  Modifier,
} from 'draft-js'

import Editor, {EditorButton} from '../../common/Editor'
import {exerciseSelector} from '../../../redux/selectors/creator'
import {updateExercise} from '../../../redux/reducers/creator'
import {generateIdentifier} from '../../../utils/common'
import {RootState} from '../../../redux/reducers/root'
import {CreatorSpecificExerciseComponentProps, CreatorGapFillExerciseState} from '../../../types'

const recognizeMark = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState,
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'INPUT'
  }, callback)
}

type MarkProps = {
  children?: Array<React.ReactNode>
}

const Mark = ({children}: MarkProps) => {
  return <span className="mark">{children}</span>
}

const decorator = new CompositeDecorator([
  {
    strategy: recognizeMark,
    component: Mark,
  },
])

const GapFillExercise = ({index}: CreatorSpecificExerciseComponentProps) => {
  const dispatch = useDispatch()
  // TODO: come up with better solution
  const exercise = useSelector((state: RootState) => exerciseSelector(state, index)) as CreatorGapFillExerciseState
  const [toggleInputButtonDisabled, setToggleInputButtonDisabled] = useState(true)
  const [entitySelection, setEntitySelection] = useState<SelectionState | null>(null)

  const handleToggleInputButtonClick = (currentState: EditorState) => {
    const currentContent = currentState.getCurrentContent()
    const currentSelection = currentState.getSelection()

    if (currentSelection.isCollapsed()) {
      if (entitySelection) {
        return EditorState.acceptSelection(RichUtils.toggleLink(currentState, entitySelection, null), currentSelection)
      }
    } else {
      const id = generateIdentifier()
      const contentStateWithEntity = currentContent.createEntity('INPUT', 'MUTABLE', {id})
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
      const newState = EditorState.set(currentState, {currentContent: contentStateWithEntity})

      return RichUtils.toggleLink(newState, newState.getSelection(), entityKey)
    }

    return currentState
  }

  const handleToggleInputButtonStateChange = (currentState: EditorState) => {
    const currentContent = currentState.getCurrentContent()
    const currentSelection = currentState.getSelection()

    const startKey = currentSelection.getStartKey()
    const endKey = currentSelection.getEndKey()
    const oneBlockSelection = startKey === endKey

    if (!oneBlockSelection) {
      setToggleInputButtonDisabled(true)
      setEntitySelection(null)
      return
    }

    const block = currentContent.getBlockForKey(startKey)
    let multipleEntities = false
    let tmpEntitySelection: SelectionState | null = null

    block.findEntityRanges(
      (characterMetadata) => {
        const rangeEntityKey = characterMetadata.getEntity()
        if (!rangeEntityKey) {
          return false
        }
        const entity = currentContent.getEntity(rangeEntityKey)
        return entity.getType() === 'INPUT'
      },
      (start, end) => {
        if (currentSelection.hasEdgeWithin(startKey, start, end)) {
          if (tmpEntitySelection) {
            multipleEntities = true
            return
          }
          tmpEntitySelection = new SelectionState({
            anchorKey: block.getKey(),
            focusKey: block.getKey(),
            anchorOffset: start,
            focusOffset: end,
          })
        }
      },
    )

    if (
      multipleEntities ||
      (currentSelection.isCollapsed() && !tmpEntitySelection) ||
      (!currentSelection.isCollapsed() && tmpEntitySelection)
    ) {
      setToggleInputButtonDisabled(true)
      setEntitySelection(null)
      return
    }

    setToggleInputButtonDisabled(false)
    setEntitySelection(tmpEntitySelection)
  }

  const toggleInputButton: EditorButton = {
    text: 'Toggle Input',
    icon: 'text-highlight',
    disabled: toggleInputButtonDisabled,
    onMouseDown: handleToggleInputButtonClick,
    onStateChange: handleToggleInputButtonStateChange,
  }

  const handleTextChange = (currentState: EditorState) => {
    let currentContent = currentState.getCurrentContent()
    const contentBlocks = currentContent.getBlocksAsArray()
    const entitySelections: Array<{
      start: number
      end: number
      blockKey: string
      entityKey: string
      entityId: string
    }> = []
    const answers: Record<string, string> = {}

    contentBlocks.forEach((contentBlock) => {
      let rangeEntityKey: string
      let rangeEntityId: string
      contentBlock.findEntityRanges(
        (characterMetadata) => {
          rangeEntityKey = characterMetadata.getEntity()
          if (!rangeEntityKey) {
            return false
          }
          const entity = currentContent.getEntity(rangeEntityKey)
          if (entity.getType() === 'INPUT') {
            rangeEntityId = entity.getData().id
            return true
          }
          return false
        },
        (start, end) => {
          entitySelections.push({
            start,
            end,
            blockKey: contentBlock.getKey(),
            entityKey: rangeEntityKey,
            entityId: rangeEntityId,
          })
        },
      )
    })

    entitySelections.sort((a, b) => b.start - a.start)

    entitySelections.forEach((entitySelection) => {
      const {entityKey, entityId, blockKey, start, end} = entitySelection
      answers[entityId] = currentContent.getBlockForKey(blockKey).getText().slice(start, end)
      currentContent = Modifier.replaceText(
        currentContent,
        new SelectionState({
          anchorKey: blockKey,
          focusKey: blockKey,
          anchorOffset: start,
          focusOffset: end,
        }),
        '__PLACEHOLDER__',
        undefined,
        entityKey,
      )
    })

    const newState = EditorState.set(currentState, {currentContent})

    const newExerciseState = {
      ...exercise,
      text: convertToRaw(newState.getCurrentContent()),
      answers,
    }

    dispatch(updateExercise({index, exercise: newExerciseState}))
  }

  return (
    <>
      <FormGroup label="Text:">
        <Editor onChange={handleTextChange} decorator={decorator} buttons={[toggleInputButton]} />
      </FormGroup>
    </>
  )
}

export default GapFillExercise
