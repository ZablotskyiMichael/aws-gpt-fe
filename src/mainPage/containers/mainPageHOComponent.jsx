import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startProcess, fetchResponse, setIntervalId } from '../actions/responseActions';

class HOC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.processComplete && this.props.processComplete) {
      clearInterval(this.props.intervalId);
    }
    if (prevProps.error === null && this.props.error !== null) {
      clearInterval(this.props.intervalId);
    }
  }

  handleChange = (e) => {
    this.setState({ inputText: e.target.value });
  }

  handleSubmit = () => {
    const { inputText } = this.state;
    this.props.startProcess(inputText);
    const intervalId = setInterval(() => this.props.fetchResponse(this.props.responseId), 100);
    this.props.setIntervalId(intervalId);
    this.setState({ inputText: '' });
  }

  componentWillUnmount() {
    if (this.props.intervalId) {
      clearInterval(this.props.intervalId);
    }
  }

  render() {
    const { inputText } = this.state;
    const { response, isFetching, error } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          background: '#f0f2f5',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1 style={{ marginBottom: '40px', color: '#333' }}>GPT API</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#fff',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={this.handleChange}
            placeholder="Введіть запит..."
            style={{
              padding: '10px',
              width: '300px',
              marginBottom: '20px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
            }}
            disabled={isFetching}
          />
          <button
            onClick={this.handleSubmit}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              background: isFetching ? '#ccc' : '#007bff',
              color: '#fff',
              fontSize: '16px',
              cursor: isFetching ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s ease',
            }}
            disabled={isFetching}
          >
            Відправити
          </button>
        </div>
        {response && (
          <div
            style={{
              marginTop: '20px',
              padding: '20px',
              borderRadius: '8px',
              background: '#fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '320px',
              color: '#333',
              fontSize: '16px',
            }}
          >
            {response}
          </div>
        )}
        {error && (
          <div
            style={{
              marginTop: '20px',
              padding: '20px',
              borderRadius: '8px',
              background: '#ffdddd',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '320px',
              color: '#d00',
              fontSize: '16px',
            }}
          >
            {error.message}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.response.response,
  isFetching: state.response.isFetching,
  processComplete: state.response.processComplete,
  error: state.response.error,
  intervalId: state.response.intervalId,
  responseId: state.response.responseId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  startProcess,
  fetchResponse,
  setIntervalId,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HOC);