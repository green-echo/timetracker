const React = require('react');
import axios from 'axios';
//import { Button } from 'reactstrap';
import Button from '@material-ui/core/Button';
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      start: 0,
      isOn: false,
      status: false
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.millisToMinutesAndSeconds = this.millisToMinutesAndSeconds.bind(this);
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  async startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time
    });
    this.timer = setInterval(
      () =>
        this.setState({
          time: Date.now() - this.state.start
        }),
      1
    );
    this.setState({ status: true });
    const id = this.props.ticket.id;
    //console.log(this.state.time)
    await axios.post(`/api/userTickets/${id}`);
  }
  async stopTimer() {
    this.setState({ isOn: false });
    clearInterval(this.timer);
    const id = this.props.ticket.id;
    this.setState({ status: false });
    await axios.put(`/api/userTickets/${id}`);
  }

  render() {
    // console.log('ticket', this.props.ticket)
    return (
      <div id="timer">
        <div>{this.millisToMinutesAndSeconds(this.state.time)}</div>
        <div>
          {this.state.status === true ? (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={this.stopTimer}
            >
              stop
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={this.startTimer}
            >
              start
            </Button>
          )}
        </div>
      </div>
    );
  }
}
export default Timer;
