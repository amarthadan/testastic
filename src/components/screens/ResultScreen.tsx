import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {H1} from '@blueprintjs/core'

import Working from '../common/Working'
import {useCollection} from '../../hooks/database'
import {Collections, ResultExerciseState} from '../../types'

import './ResultScreen.scss'

const ResultScreen = () => {
  const [working, setWorking] = useState(true)
  const [title, setTitle] = useState('')
  const [creator, setCreator] = useState('')
  const [tested, setTested] = useState('')
  const [exercises, setExercises] = useState<Array<ResultExerciseState>>([])
  const testsCollection = useCollection(Collections.Tests)
  const answersCollection = useCollection(Collections.Answers)
  const correctAnswersCollection = useCollection(Collections.CorrectAnswers)
  const {id} = useParams()

  useEffect(() => {
    setWorking(true)
    const fetchResults = async () => {
      const answerDocumentRef = answersCollection.doc(id)
      const answerDocument = await answerDocumentRef.get()
      if (answerDocument.exists) {
        const answerData = answerDocument.data()
        if (answerData) {
          setTested(answerData.name)

          const testId = answerData.testId
          const testDocumentRef = testsCollection.doc(testId)
          const testDocument = await testDocumentRef.get()

          if (testDocument.exists) {
            const testData = testDocument.data()
            if (testData) {
              setTitle(testData.title)
              setCreator(testData.name)
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
        // TODO: No such answer
      }

      setWorking(false)
    }

    try {
      fetchResults()
    } catch (error) {
      console.error(error)
      setWorking(false)
      // TODO: Add error toast
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className="result">
      <Working show={working} />
      {working ? (
        <></>
      ) : (
        <>
          <H1>{title}</H1>
          <p>Creator: {creator}</p>
          <p>Tested: {tested}</p>
          <div className="exercises">
            {exercises.map((_, index) => (
              <div key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ResultScreen
