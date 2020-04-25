import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {H1, Intent} from '@blueprintjs/core'

import Working from '../common/Working'
import Toaster from '../common/Toaster'
import Exercise from '../exercises/result/Exercise'
import {firestore} from '../../database'
import {Collections, ResultExerciseState} from '../../types'

import './ResultScreen.scss'

const ResultScreen = () => {
  const [working, setWorking] = useState(true)
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState(0)
  const [exercises, setExercises] = useState<Array<ResultExerciseState>>([])
  const [notFound, setNotFound] = useState(false)
  const {id} = useParams()

  useEffect(() => {
    setWorking(true)
    const fetchResults = async () => {
      const testsCollection = firestore.collection(Collections.Tests)
      const answersCollection = firestore.collection(Collections.Answers)
      const correctAnswersCollection = firestore.collection(Collections.CorrectAnswers)

      const answerDocumentRef = answersCollection.doc(id)
      const answerDocument = await answerDocumentRef.get()
      if (answerDocument.exists) {
        const answerData = answerDocument.data()
        if (answerData) {
          setName(answerData.name)
          setEmail(answerData.email)
          setDate(answerData.timestamp)

          const testId = answerData.testId
          const testDocumentRef = testsCollection.doc(testId)
          const testDocument = await testDocumentRef.get()

          if (testDocument.exists) {
            const testData = testDocument.data()
            if (testData) {
              setTitle(testData.title)
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const exerciseDocuments: Record<string, any> = {}
            const querySnapshot = await testDocumentRef.collection(Collections.Exercises).get()
            querySnapshot.forEach((exerciseDocument) => {
              const exerciseData = exerciseDocument.data()
              const exerciseId = exerciseDocument.id

              const exercise = {
                order: exerciseData.order,
                type: exerciseData.type,
                description: exerciseData.description,
                assignment: exerciseData.assignment,
              }
              exerciseDocuments[exerciseId] = exercise
            })

            for (let i = 0; i < Object.keys(exerciseDocuments).length; i++) {
              const exerciseId = Object.keys(exerciseDocuments)[i]
              const exerciseDocument = await answerDocumentRef.collection(Collections.Exercises).doc(exerciseId).get()
              if (exerciseDocument.exists) {
                const exerciseData = exerciseDocument.data()
                if (exerciseData) {
                  exerciseDocuments[exerciseId]['answer'] = exerciseData.answer
                }
              }

              const correctAnswerDocument = await correctAnswersCollection.doc(exerciseId).get()
              if (correctAnswerDocument.exists) {
                const correctAnswerData = correctAnswerDocument.data()
                if (correctAnswerData) {
                  exerciseDocuments[exerciseId]['correctAnswer'] = correctAnswerData.answer
                }
              }
            }

            const exercises = []
            for (let i = 0; i < Object.keys(exerciseDocuments).length; i++) {
              const exerciseDocument = Object.values(exerciseDocuments)[i]
              const exercise = Object.assign({}, exerciseDocument)
              delete exercise.order
              exercises[exerciseDocument.order] = exercise
            }

            setExercises(exercises)
          }
        }
      } else {
        setNotFound(true)
      }

      setWorking(false)
    }

    try {
      fetchResults()
    } catch (error) {
      console.error(error)
      Toaster.show({
        intent: Intent.DANGER,
        message: `A problem occured while loading the results. Please, try again later. Error: ${error}`,
      })
      setWorking(false)
    }
  }, [id])

  return (
    <div className="result">
      <Working show={working} />
      {working ? (
        <></>
      ) : notFound ? (
        <H1>Results not found</H1>
      ) : (
        <>
          <H1>{title}</H1>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Date: {new Date(date).toUTCString()}</p>
          <div className="exercises">
            {exercises.map((exercise, index) => (
              <Exercise key={index} exercise={exercise} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ResultScreen
