import { Component } from 'react';
import { connect } from 'react-redux';
import { deleteMessage, listMessages } from '../../redux/actions/challengeActions';

class ListOfMessages extends Component {
  componentDidMount = () => {
    this.props.dispatch(listMessages());
  };

  deleteMessage = event => {
    event.preventDefault();
    const messageId = parseInt(event.currentTarget.parentNode.getAttribute('data-key'));
    this.props.dispatch(deleteMessage(messageId));
  };

  render = () => {
    return (
      <div className='list-group pt-3'>
        {this.props.messages.map(message => {
          return (
            <div className='list-group-item list-group-item-action' key={message.id} data-key={message.id}>
              <p className='mb-1'>{message.original}</p>
              <small>{JSON.stringify(message.parsed)}</small>
              <button className='close' onClick={this.deleteMessage}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
          );
        })}
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    messages: state.challengeReducer.messages,
  };
}

export default connect(mapStateToProps)(ListOfMessages);
