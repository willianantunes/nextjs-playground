import StandardLayout from '../components/StandardLayout'
import ListOfMessages from '../components/challenge/ListOfMessages'
import { useState } from 'react'
import { connect } from 'react-redux'
import { addMessage, deleteAllMessages } from '../redux/actions/challengeActions'

function Index (props) {
  const initialState = 'Hey @Aladdin and @Genie, wanna help (omg)?! See https://gist.github.com/willianantunes'
  const [configuredMessage, setConfiguredMessage] = useState(initialState)

  async function sendForm (event) {
    event.preventDefault()
    props.dispatch(addMessage(configuredMessage, () => setConfiguredMessage('')))
  }

  function cleanAllMessages (event) {
    event.preventDefault()
    props.dispatch(deleteAllMessages())
  }

  return (
    <StandardLayout>
      <main className='container'>
        <div className='row justify-content-center'>
          <h1>Challenge answer</h1>
        </div>
        <form onSubmit={sendForm}>
          <div className='form-group'>
            <label htmlFor='chatMessage'>Type what you want to be translated:</label>
            <textarea
              className='form-control'
              id='chatMessage'
              rows='3'
              value={configuredMessage}
              onChange={e => setConfiguredMessage(e.target.value)}
            />
          </div>
          <button className='btn btn-primary' type='submit'>
            See it parsed!
          </button>
          <button className='btn btn-secondary ml-2' onClick={cleanAllMessages}>
            Clear results
          </button>
          {props.challengeReducer.isError && (
            <div className='alert alert-danger m-3 text-center' role='alert'>
              A problem happened during your request. Try again later
            </div>
          )}
          {props.challengeReducer.isLoading && (
            <div className='d-flex justify-content-center m-3'>
              <div className='spinner-border' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
        </form>
        <ListOfMessages />
      </main>
    </StandardLayout>
  )
}

function mapStateToProps (state) {
  return {
    challengeReducer: state.challengeReducer
  }
}

export default connect(mapStateToProps)(Index)
