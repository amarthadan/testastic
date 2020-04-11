import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {useCollection} from '../../hooks/database'
import {Collections} from '../../types'
import Working from '../common/Working'
import {H1, HTMLTable, Intent} from '@blueprintjs/core'

import './ResultsScreen.scss'
import Toaster from '../common/Toaster'

type Result = {
  id: string
  name: string
  email: string
  timestamp: number
}

const ResultsScreen = () => {
  const [results, setResults] = useState<Array<Result>>([])
  const [title, setTitle] = useState('')
  const [working, setWorking] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const {push} = useHistory()
  const testsCollection = useCollection(Collections.Tests)
  const answersCollection = useCollection(Collections.Answers)
  const {id} = useParams()

  useEffect(() => {
    setWorking(true)
    const fetchResults = async () => {
      let testId
      let querySnapshot = await testsCollection.where('resultsId', '==', id).get()
      querySnapshot.forEach((testDocument) => {
        testId = testDocument.id
        setTitle(testDocument.data().title)
      })

      if (!testId) {
        setNotFound(true)
        setWorking(false)
        return
      }

      const results: Array<Result> = []
      querySnapshot = await answersCollection.where('testId', '==', testId).orderBy('timestamp').get()
      querySnapshot.forEach((answerDocument) => {
        const data = answerDocument.data()
        const result = {
          id: answerDocument.id,
          name: data.name,
          email: data.email,
          timestamp: data.timestamp,
        }

        results.push(result)
      })

      setResults(results)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleRowClick = (answerId: string) => {
    push(`/answers/${answerId}`)
  }

  return (
    <div className="results">
      <Working show={working} />
      {working ? (
        <></>
      ) : notFound ? (
        <H1>Results not found</H1>
      ) : (
        <>
          <H1>{title}</H1>
          <HTMLTable striped interactive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                // TODO: Make link visible on hover
                <tr key={index} onClick={() => handleRowClick(result.id)}>
                  <td>{result.name}</td>
                  <td>{result.email}</td>
                  <td>{new Date(result.timestamp).toUTCString()}</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>
        </>
      )}
    </div>
  )
}

export default ResultsScreen
