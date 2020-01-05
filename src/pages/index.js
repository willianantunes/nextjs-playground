import StandardLayout from '../components/StandardLayout';
import ListOfMessages from '../components/challenge/ListOfMessages';
import { Component } from 'react';
import { connect } from 'react-redux';
import { deleteAllMessages, addMessage } from '../redux/actions/challengeActions';

class Index extends Component {
  constructor() {
    super();
    this.state = this.initialState();
  }

  initialState = () => ({
    configuredMessage:
      'Hey @Aladdin and @Genie, you wanna help on your (nose)?! Know more accessing https://gist.github.com/willianantunes',
  });

  sendForm = async event => {
    event.preventDefault();
    const configuredMessage = this.state.configuredMessage;
    this.props.dispatch(
      addMessage(configuredMessage, () =>
        this.setState({
          ...this.state,
          configuredMessage: '',
        }),
      ),
    );
  };

  cleanAllMessages = event => {
    event.preventDefault();
    this.props.dispatch(deleteAllMessages());
  };

  setConfiguredMessage = event => {
    this.setState({ ...this.state, configuredMessage: event.target.value });
  };

  render = () => {
    return (
      <StandardLayout>
        <main className='container'>
          <div className='row justify-content-center'>
            <h1>Challenge answer</h1>
          </div>
          <form onSubmit={this.sendForm}>
            <div className='form-group'>
              <label htmlFor='chatMessage'>Type what you want to be translated:</label>
              <textarea
                className='form-control'
                id='chatMessage'
                rows='3'
                value={this.state.configuredMessage}
                onChange={this.setConfiguredMessage}
              />
            </div>
            <button className='btn btn-primary' type='submit'>
              See it parsed!
            </button>
            <button className='btn btn-secondary ml-2' onClick={this.cleanAllMessages}>
              Clear results
            </button>
            {this.props.challengeReducer.isError && (
              <div className='alert alert-danger m-3 text-center' role='alert'>
                A problem happened during your request. Try again later
              </div>
            )}
            {this.props.challengeReducer.isLoading && (
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
    );
  };
}

function mapStateToProps(state) {
  return {
    challengeReducer: state.challengeReducer,
  };
}

export default connect(mapStateToProps)(Index);
