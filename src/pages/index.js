import { Component } from 'react';
import evaluate from '../business/MessageParser';
import uuidv4 from 'uuid/v4';
import Link from 'next/link';
import 'bootstrap-css-only/css/bootstrap.min.css';

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

  sendForm = async event => {
    event.preventDefault();
    const value = await evaluate(this.state.configuredMessage);
    this.setState({
      messages: this.state.messages.concat({ id: uuidv4(), original: this.state.configuredMessage, parsed: value }),
      configuredMessage: '',
    });
  };

  setConfiguredMessage = event => {
    this.setState({ configuredMessage: event.target.value });
  };

  cleanAllMessages = event => {
    event.preventDefault();
    this.setState({ messages: [], configuredMessage: '' });
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
                <div className='list-group-item list-group-item-action' key={message.id}>
                  <p className='mb-1'>{message.original}</p>
                  <small>{JSON.stringify(message.parsed)}</small>
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
