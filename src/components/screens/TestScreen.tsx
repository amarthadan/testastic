import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {H1, ButtonGroup, Button, FormGroup, InputGroup, Intent} from '@blueprintjs/core'
import {useSelector, useDispatch} from 'react-redux'

import Working from '../common/Working'
import Exercise from '../exercises/test/Exercise'
import {exercisesSelector} from '../../redux/selectors/test'
import {useCollection} from '../../hooks/database'
import {setExercises} from '../../redux/reducers/test'
import {Collections, TestExerciseState} from '../../types'

import './TestScreen.scss'
import Toaster from '../common/Toaster'

const TestScreen = () => {
  const dispatch = useDispatch()
  const {push} = useHistory()
  const exercises = useSelector(exercisesSelector)
  const [working, setWorking] = useState(true)
  const [title, setTitle] = useState('')
  const [creator, setCreator] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const testsCollection = useCollection(Collections.Tests)
  const answersCollection = useCollection(Collections.Answers)
  const {id} = useParams()

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  useEffect(() => {
    setWorking(true)
    const fetchTest = async () => {
      const testDocumentRef = testsCollection.doc(id)
      const testDocument = await testDocumentRef.get()
      if (testDocument.exists) {
        const data = testDocument.data()
        if (data) {
          setTitle(data.title)
          setCreator(data.name)
        }

        const exerciseDocuments: Array<TestExerciseState> = []
        const querySnapshot = await testDocumentRef.collection(Collections.Exercises).get()
        querySnapshot.forEach((exerciseDocument) => {
          const data = exerciseDocument.data()
          const exercise = {
            id: exerciseDocument.id,
            type: data.type,
            description: data.description,
            assignment: data.assignment,
          }

          exerciseDocuments[data.order] = exercise
        })

        dispatch(setExercises(exerciseDocuments))
      } else {
        // TODO: No such test
      }

      setWorking(false)
    }

    try {
      fetchTest()
    } catch (error) {
      console.error(error)
      setWorking(false)
      // TODO: Add error toast
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const submit = async () => {
    setWorking(true)

    const answerDocument = {
      name,
      email,
      testId: id,
      timestamp: Date.now(),
    }

    try {
      const answerDocumentRef = await answersCollection.add(answerDocument)

      for (let i = 0; i < exercises.length; i++) {
        const exercise = exercises[i]
        const exerciseDocument = {
          answer: exercise.answer,
        }

        await answerDocumentRef.collection(Collections.Exercises).doc(exercise.id).set(exerciseDocument)
      }

      push(`/answers/${answerDocumentRef.id}`)
    } catch (error) {
      console.error(error)
      Toaster.show({
        intent: Intent.DANGER,
        message: `A problem occured during the test submission. Please, try again later. Error: ${error}`,
      })
    } finally {
      setWorking(false)
    }
  }

  return (
    <div className="test">
      <Working show={working} />
      {working ? (
        <></>
      ) : (
        <>
          <H1>{title}</H1>
          <p>Creator: {creator}</p>
          <div className="form-area">
            <FormGroup label="Name:" labelFor="name-input" inline>
              <InputGroup id="name-input" value={name} onChange={handleNameChange} />
            </FormGroup>
            <FormGroup label="Email:" labelFor="email-input" inline>
              <InputGroup id="email-input" value={email} onChange={handleEmailChange} />
            </FormGroup>
          </div>
          <div className="exercises">
            {exercises.map((exercise, index) => (
              <Exercise key={index} type={exercise.type} description={exercise.description} index={index} />
            ))}
          </div>
          <ButtonGroup className="submit-test">
            <Button large intent="success" icon="tick" text="Submit test" onClick={submit} />
          </ButtonGroup>
        </>
      )}
    </div>
  )
}

export default TestScreen
