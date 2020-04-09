import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {H1, ButtonGroup, Button, FormGroup, InputGroup} from '@blueprintjs/core'
import {useSelector, useDispatch} from 'react-redux'

import Working from '../common/Working'
import Exercise from '../exercises/test/Exercise'
import {exercisesSelector} from '../../redux/selectors/test'
import {useCollection} from '../../hooks/database'
import {setExercises} from '../../redux/reducers/test'
import {Collections, TestExerciseState} from '../../types'

import './TestScreen.scss'

const TestScreen = () => {
  const dispatch = useDispatch()
  const exercises = useSelector(exercisesSelector)
  const [working, setWorking] = useState(true)
  const [title, setTitle] = useState('')
  const [creator, setCreator] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const testsCollection = useCollection(Collections.Tests)
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
    } finally {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
            <Button large intent="success" icon="tick" text="Submit test" />
          </ButtonGroup>
        </>
      )}
    </div>
  )
}

export default TestScreen
