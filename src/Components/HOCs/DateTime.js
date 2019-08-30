import React from "react";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DateTimePicker } from "material-ui-pickers";
// import { InlineDateTimePicker } from 'material-ui-pickers';

import HiddenField from "uniforms-material/HiddenField";

export default class DateTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: this.props.value || new Date()
    };
  }

  handleDateChange = date => {
    // console.log(date)
    this.setState({ selectedDate: date });
  };

  render() {
    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <HiddenField name="date" value={this.state.selectedDate} />
          <DateTimePicker
            style={{ width: "100%" }}
            value={this.state.selectedDate}
            label="Select a date"
            openTo="date"
            disablePast
            autoOk
            autoSubmit
            onChange={this.handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
}
