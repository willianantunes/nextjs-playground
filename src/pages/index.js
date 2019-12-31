import { Component } from 'react';
import evaluate from '../business/MessageParser';
import uuidv4 from 'uuid/v4';
import Link from 'next/link';
import 'bootstrap-css-only/css/bootstrap.min.css';
import * as messageDao from '../domain/MessageDao';
import { Message } from '../domain/Message';

class Index extends Component {
  constructor() {
    super();
    this.state = this.initialState();
  }

  initialState = () => ({
    messages: [],
    configuredMessage:
      'Hey @Aladdin and @Genie, you wanna help on your (nose)?! Know more accessing https://gist.github.com/willianantunes',
  });

  componentDidMount = () => {
    messageDao.findAll().then(messages =>
      this.setState({
        messages,
      }),
    );
  };

  sendForm = async event => {
    event.preventDefault();
    const configuredMessage = this.state.configuredMessage;
    const parsedMessaged = await evaluate(configuredMessage);
    messageDao.save(new Message(null, configuredMessage, parsedMessaged)).then(persistedMessage => {
      this.setState({
        messages: this.state.messages.concat(persistedMessage),
        configuredMessage: '',
      });
    });
  };

  setConfiguredMessage = event => {
    this.setState({ configuredMessage: event.target.value });
  };

  cleanAllMessages = event => {
    event.preventDefault();
    messageDao.deleteAll().then(() => this.setState(this.initialState()));
  };

  deleteMessage = event => {
    event.preventDefault();
    const messageId = parseInt(event.currentTarget.parentNode.getAttribute('data-key'));
    messageDao.deleteById(messageId).then(result => {
      this.setState({
        messages: this.state.messages.filter(message => message.id !== messageId),
      });
    });
  };

  render = () => {
    return (
      <div>
        <header>
          <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
            <Link href='/'>
              <a className='navbar-brand'>Next.JS Playground Project</a>
            </Link>
            <div className='collapse navbar-collapse' id='navbarCollapse'>
              <ul className='navbar-nav mr-auto'>
                <Link href='/'>
                  <a className='nav-item active nav-link'>
                    Home <span className='sr-only'>(current)</span>
                  </a>
                </Link>
                <Link href='/batman'>
                  <a className='nav-item nav-link'>Batman shows</a>
                </Link>
              </ul>
            </div>
          </nav>
        </header>
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
          </form>
          <div className='list-group pt-3'>
            {this.state.messages.map(message => {
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
        </main>
      </div>
    );
  };
}

export default Index;
