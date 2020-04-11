import React, {useState} from 'react'
import {H1, FormGroup, InputGroup, Button, ButtonGroup, Intent, H2} from '@blueprintjs/core'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useForm, Controller} from 'react-hook-form'
import * as yup from 'yup'

import {exercisesSelector} from '../../redux/selectors/creator'
import {addExercise} from '../../redux/reducers/creator'
import {generateIdentifier} from '../../utils/common'
import {buildAnswer, buildAssignment} from '../../utils/creator'
import {useCollection} from '../../hooks/database'
import {Collections} from '../../types'

import Exercise from '../exercises/creator/Exercise'
import Toaster from '../common/Toaster'
import Working from '../common/Working'

import './NewTestScreen.scss'
import {Link} from 'react-router-dom'

const schema = yup.object().shape({
  title: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required().email(),
})

type FormData = {
  title: string
  name: string
  email: string
}

const NewTestScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const exercises = useSelector(exercisesSelector)
  const [working, setWorking] = useState(false)
  const [created, setCreated] = useState(false)
  const [resultsId, setResultsId] = useState<string>()
  const [testId, setTestId] = useState<string>()
  const testsCollection = useCollection(Collections.Tests)
  const correctAnswersCollection = useCollection(Collections.CorrectAnswers)
  const {handleSubmit, control, errors, formState} = useForm<FormData>({
    validationSchema: schema,
    mode: 'onChange',
  })

  const add = () => {
    dispatch(addExercise())
  }

  const onSubmit = handleSubmit(({title, name, email}) => {
    build(title, name, email)
  })

  const build = async (title: string, name: string, email: string) => {
    setWorking(true)

    const testDocument = {
      title,
      name,
      email,
      resultsId: generateIdentifier(),
    }

    const exerciseDocuments = exercises.map((exercise) => ({
      type: exercise.type,
      description: exercise.description,
      assignment: buildAssignment(exercise),
    }))

    const answers = exercises.map((exercise) => buildAnswer(exercise))

    // TODO: Run as a transaction
    try {
      const testDocumentRef = await testsCollection.add(testDocument)
      const exerciseDocumentIds: Array<string> = []

      for (let i = 0; i < exerciseDocuments.length; i++) {
        exerciseDocumentIds.push(
          (await testDocumentRef.collection(Collections.Exercises).add({order: i, ...exerciseDocuments[i]})).id,
        )
      }

      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i]
        answer && correctAnswersCollection.doc(exerciseDocumentIds[i]).set({answer})
      }

      setTestId(testDocumentRef.id)
      setResultsId(testDocument.resultsId)
      setCreated(true)
    } catch (error) {
      console.error(error)
      Toaster.show({
        intent: Intent.DANGER,
        message: `A problem occured during the test creation. Please, try again later. Error: ${error}`,
      })
    } finally {
      setWorking(false)
    }
  }

  return (
    <div className="new-test">
      {created ? (
        <>
          <H1>Congratulation!</H1>
          <H2>Your test is ready</H2>
          <p>
            {/* TODO: Add copy button for link */}
            You can access your test here:
            <Link to={`/tests/${testId}`} target="_blank">{`${window.location.origin}/tests/${testId}`}</Link>
          </p>
          <p>
            {/* TODO: Add copy button for link */}
            You can access the results here:
            <Link to={`/results/${resultsId}`} target="_blank">{`${window.location.origin}/results/${resultsId}`}</Link>
          </p>
          <div className="add-button">
            <Button large intent="primary" icon="add" onClick={() => history.go(0)}>
              New test
            </Button>
          </div>
        </>
      ) : (
        <>
          <H1>New Test</H1>
          {/* TODO: Form validation for exercise inputs */}
          <form onSubmit={onSubmit}>
            <div className="form-area">
              <FormGroup label="Title:" labelFor="title" inline>
                <Controller
                  as={InputGroup}
                  name="title"
                  control={control}
                  id="title"
                  intent={errors.title && Intent.DANGER}
                />
              </FormGroup>
              <FormGroup label="Name:" labelFor="name" inline>
                <Controller
                  as={InputGroup}
                  name="name"
                  control={control}
                  id="name"
                  intent={errors.name && Intent.DANGER}
                />
              </FormGroup>
              <FormGroup label="Email:" labelFor="email" inline>
                <Controller
                  as={InputGroup}
                  name="email"
                  control={control}
                  id="email"
                  intent={errors.email && Intent.DANGER}
                />
              </FormGroup>
            </div>
            <div className="exercises">
              {exercises.map((exercise, index) => (
                <Exercise key={index} index={index} type={exercise.type} description={exercise.description} />
              ))}
              <ButtonGroup className="add-exercise" onClick={add}>
                <Button large intent="primary" icon="add" text="Add exercise" />
              </ButtonGroup>
            </div>
            <ButtonGroup className="build-test">
              <Button
                large
                intent="success"
                icon="build"
                text="Build test"
                type="submit"
                disabled={!formState.isValid}
              />
            </ButtonGroup>
          </form>
          <Working show={working} />
        </>
      )}
    </div>
  )
}

export default NewTestScreen
