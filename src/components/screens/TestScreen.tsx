import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {H1, ButtonGroup, Button, Intent} from '@blueprintjs/core'
import {useSelector, useDispatch} from 'react-redux'

import Working from '../common/Working'
import Exercise from '../exercises/test/Exercise'
import Toaster from '../common/Toaster'
import {firestore, auth} from '../../database'
import {exercisesSelector} from '../../redux/selectors/test'
import {setExercises} from '../../redux/reducers/test'
import {Collections, TestExerciseState} from '../../types'

import './TestScreen.scss'

const TestScreen = () => {
  const dispatch = useDispatch()
  const {push} = useHistory()
  const exercises = useSelector(exercisesSelector)
  const [working, setWorking] = useState(true)
  const [title, setTitle] = useState('')
  const [creator, setCreator] = useState('')
  const [notFound, setNotFound] = useState(false)
  const {id} = useParams()
  const currentUser = auth.currentUser

  useEffect(() => {
    setWorking(true)
    const fetchTest = async () => {
      const testsCollection = firestore.collection(Collections.Tests)

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
        setNotFound(true)
      }

      setWorking(false)
    }

    try {
      fetchTest()
    } catch (error) {
      console.error(error)
      Toaster.show({
        intent: Intent.DANGER,
        message: `A problem occured while loading the test. Please, try again later. Error: ${error}`,
      })
      setWorking(false)
    }
  }, [dispatch, id])

  const submit = async () => {
    if (!currentUser) {
      throw new Error('No user signed in! Should not happen!')
    }

    setWorking(true)
    const answersCollection = firestore.collection(Collections.Answers)

    const answerDocument = {
      name: currentUser.displayName,
      email: currentUser.email,
      testId: id,
      timestamp: Date.now(),
    }

    try {
      const answerDocumentRef = await answersCollection.add(answerDocument)

      for (let i = 0; i < exercises.length; i++) {
        const exercise = exercises[i]
        const exerciseDocument = {
          answer: exercise.answer || null,
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
      ) : notFound ? (
        <H1>Test not found</H1>
      ) : (
        <>
          <H1>{title}</H1>
          <p>Creator: {creator}</p>
          <form onSubmit={submit}>
            <div className="exercises">
              {exercises.map((exercise, index) => (
                <Exercise key={index} type={exercise.type} description={exercise.description} index={index} />
              ))}
            </div>
            <ButtonGroup className="submit-test">
              <Button large intent="success" icon="tick" text="Submit test" type="submit" />
            </ButtonGroup>
          </form>
        </>
      )}
    </div>
  )
}

export default TestScreen
