import { Component } from 'react';
import evaluate from '../business/MessageParser';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      configuredMessage:
        'Hey @Aladdin and @Genie, you wanna help on your (nose)?! Know more accessing https://gist.github.com/willianantunes',
    };
  }

  sendForm = async event => {
    event.preventDefault();
    const value = await evaluate(this.state.configuredMessage);
    this.setState({
      messages: this.state.messages.concat({ original: this.state.configuredMessage, parsed: value })
    });
  };

  setConfiguredMessage = event => {
    this.setState({ configuredMessage: event.target.value });
  };

  render = () => {
    return (
      <div id={'root'}>
        <header>
          <h1>Next.JS Playground Project</h1>
          <nav>
            <a href={'#Home'}>Home</a>
            <a href={'#Batman'}>Batman shows</a>
          </nav>
        </header>
        <main>
          <h1>Challenge answer</h1>
          <form onSubmit={this.sendForm}>
            <section>
              <label htmlFor='chatMessage'>Tell us your story:</label>
              <textarea
                id='chatMessage'
                name='chatMessage'
                value={this.state.configuredMessage}
                onChange={this.setConfiguredMessage}
                rows='5'
                cols='33'
              />
            </section>
            <section>
              <p>
                <button type='submit'>See it parsed!</button>
              </p>
            </section>
          </form>
          <section>
            <ul>
              {this.state.messages.map(message => {
                return (
                  <li>
                    <article>
                      <h3>{message.original}</h3>
                      <p>{JSON.stringify(message.parsed)}</p>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>
      </div>
    );
  };
}

export default Index;
