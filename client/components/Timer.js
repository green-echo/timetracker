const React = require('react');

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      start: 0,
      isOn: false
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

  startTimer() {
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
  }
  stopTimer() {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <h3>{this.millisToMinutesAndSeconds(this.state.time)}</h3>
        <button onClick={this.startTimer}>start</button>
        <button onClick={this.stopTimer}>stop</button>
    
      </div>
    );
  }
}
module.exports = Timer;
