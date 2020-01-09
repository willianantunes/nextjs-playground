import { useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteMessage as excludeMessage, listMessages } from '../../redux/actions/challengeActions'

function ListOfMessages (props) {
  useEffect(() => {
    props.dispatch(listMessages())
  }, [])

  function deleteMessage (messageId) {
    props.dispatch(excludeMessage(messageId))
  }

  return (
    <div className='list-group pt-3'>
      {props.messages.map(message => {
        return (
          <div className='list-group-item list-group-item-action' key={message.id}>
            <p className='mb-1'>{message.original}</p>
            <small>{JSON.stringify(message.parsed)}</small>
            <button className='close' onClick={() => deleteMessage(message.id)}>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
        )
      })}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    messages: state.challengeReducer.messages
  }
}

export default connect(mapStateToProps)(ListOfMessages)
