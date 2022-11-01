import React, { useEffect } from 'react'
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from '../components/UI/LoadingSpinner'

// const DUMMY_QUOTES = [
//   { id: 'q1', author: 'Aisha', text: 'Learning React is fun!' },
//   { id: 'q2', author: 'Nurudeen', text: 'Learning NextJs is great!' },
// ]

const QuoteDetail = () => {
  const match = useRouteMatch()
  const params = useParams()

  // console.log(match)

  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId)

  const { quoteId } = params

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true)

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <p className='centered'>{error}</p>
  }
  // if (!quote) {
  //   return <p>No Quote found!</p>
  // }

  if (!loadedQuote.text) {
    return <p>No Quote found!</p>
  }
  return (
    <>
      {/* <HighlightedQuote text={quote.text} author={quote.author} /> */}
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/* <Route path={`/quotes/${params.quoteId}`}> */}
      <Route path={match.path} exact>
        <div className='centered'>
          {/* <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}> */}
          <Link className='btn--flat' to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  )
}

export default QuoteDetail
