import React from 'react';
// import 'react-dropdown/style.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { CSVLink } from 'react-csv';
import Axios from 'axios';
import { millisConverted } from '../utils';
import { Button } from 'reactstrap';

import DatePicker from 'react-datepicker';
// import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';
// import 'react-datepicker/dist/react-datepicker.css';
// import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import DayPicker from 'react-day-picker';

// import 'react-table/react-table.css';
// import 'react-dates/lib/css/_datepicker.css';

class TimeSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTime: '',
      tableproperties: {
        allData: []
      },
      dataToDownload: [],
      selectedDay: undefined,
      isEmpty: true,
      isDisabled: false
    };
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  async componentDidMount() {
    const { data } = await Axios.get(`/api/users/timesheet`);

    let tableproperties = { ...this.state.tableproperties };
    tableproperties.allData = data;
    await this.setState({ tableproperties });

    this.calcTotal();
  }

  calcTotal = () => {
    let totalTime;
    if (this.reactTable) {
      totalTime = millisConverted(
        this.reactTable
          .getResolvedState()
          .sortedData.reduce(
            (prev, curr) =>
              prev +
              new Date(curr.end).getTime() -
              new Date(curr.start).getTime(),
            0
          )
      );
    }
    this.setState({ totalTime });
  };

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    console.log(`data changed to ${selectedDay}`);
    const input = dayPickerInput.getInput();
    this.setState({
      selectedDay,
      isEmpty: !input.value.trim(),
      isDisabled: modifiers.disabled === true,
      startDate: null,
      endDate: null,
      ranges: null
    });
  }

  columns = () => {
    return [
      {
        id: 'name',
        Header: 'Project',
        accessor: d => d.ticket.project.name
      },
      {
        id: 'ticket',
        Header: 'Ticket',
        accessor: d => d.ticket.title
      },
      {
        id: 'start',
        Header: 'Start',
        accessor: d => moment(new Date(d.start)).format('MM/DD/YYYY HH:mm:ss'),
        // filterMethod: (filter, rows) =>
        //   matchSorter(rows, filter.value, { keys: ['Start'] }),
        filterAll: true,
        // Filter: ({ filter, onChange }) => (
        //   <div>
        //     <DateRangePicker
        //       startDate={this.state.startDate}
        //       endDate={this.state.endDate}
        //       ranges={this.state.ranges}
        //       onEvent={this.handleEvent}
        //     >
        //       <Button
        //         className="selected-date-range-btn"
        //         style={{ width: '100%' }}
        //       >
        //         <span>
        //           <input
        //             type="text"
        //             name="labrl"
        //             onChange={event => onChange(event.target.value)}
        //             readOnly
        //           />
        //         </span>
        //         <span className="caret" />
        //       </Button>
        //     </DateRangePicker>
        //   </div>
        // ),

        // Filter: ({ filter, onChange }) => (
        //   <DayPickerInput
        //     value={this.state.selectedDay}
        //     onDayChange={this.handleDayChange}
        //   />
        // ),
        filterMethod: (filter, row) => {
          console.log('hello');
          if (
            filter.value.startDate === null ||
            filter.value.endDate === null
          ) {
            // Incomplet or cleared date picker
            return true;
          }

          if (
            moment(row[filter.id]).isBetween(
              filter.value.startDate,
              filter.value.endDate
            )
          ) {
            // Found row matching filter
            return true;
          }
        }
      },
      // {
      //   id: 'start',
      //   Header: 'Start',
      //   accessor: d => new Date(d.start).toString().slice(0, 21),
      //   // filterMethod: (filter, rows) =>
      //   //   matchSorter(rows, filter.value, { keys: ['start'] }),
      //   // filterAll: true,
      //   Filter: ({ filter, onChange }) => (
      //     <DatePicker showTimeSelect withPortal />
      //   )
      // },
      // {
      //   id: 'start',
      //   Header: 'Start',
      //   accessor: d =>
      //     moment(new Date(d.start))
      //       .format('DD.MM.YYYY')
      //       .toString(),
      //   // filterMethod: (filter, rows) =>
      //   //   matchSorter(rows, filter.value, { keys: ['Start'] }),
      //   // filterAll: true,
      //   render: row => <div>{moment(row.value).format('DD.MM.YYYY')}</div>,
      //   filterRender: ({ filter, onFilterChange }) => <DateRangePicker />,
      //   filterMethod: (filter, row) => {
      //     if (
      //       filter.value.startDate === null ||
      //       filter.value.endDate === null
      //     ) {
      //       // Incomplet or cleared date picker
      //       return true;
      //     }

      //     if (
      //       moment(row[filter.id]).isBetween(
      //         filter.value.startDate,
      //         filter.value.endDate
      //       )
      //     ) {
      //       // Found row matching filter
      //       return true;
      //     }
      //   }
      // },
      {
        id: 'end',
        Header: 'End',
        accessor: d => new Date(d.end).toString().slice(0, 21)
      },
      {
        id: 'duration',
        Header: 'Duration',
        accessor: d =>
          millisConverted(
            new Date(d.end).getTime() - new Date(d.start).getTime()
          ),
        Footer: this.state.totalTime
      }
    ];
  };

  download = event => {
    const currentRecords = this.reactTable.getResolvedState().sortedData;
    const data_to_download = [];
    for (let index = 0; index < currentRecords.length; index++) {
      let record_to_download = {};
      for (let colIndex = 0; colIndex < this.columns().length; colIndex++) {
        record_to_download[this.columns()[colIndex].Header] =
          currentRecords[index][this.columns()[colIndex].id];
      }
      data_to_download.push(record_to_download);
    }
    this.setState({ dataToDownload: data_to_download }, () => {
      this.csvLink.link.click();
    });
  };

  // getTheadThProps = (state, rowInfo, column, instance) => ({
  //   onClick: () => {
  //     // Do whatever else you need to
  //     if (column.sortable !== false) {
  //       instance.sortColumn(column);
  //     }
  //   }
  // });

  getTheadFilterThProps = () => {
    return {
      style: {
        overflow: 'inherit',
        position: 'inherit'
      }
    };
  };

  render() {
    return (
      <div>
        <div>
          <Button onClick={this.download}>Download</Button>
        </div>
        <div>
          <CSVLink
            data={this.state.dataToDownload}
            filename="data.csv"
            className="hidden"
            ref={r => (this.csvLink = r)}
            target="_blank"
          />
        </div>
        <div>
          <ReactTable
            ref={r => (this.reactTable = r)}
            data={this.state.tableproperties.allData}
            columns={this.columns()}
            defaultPageSize={8}
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id])
                .toLowerCase()
                .includes(filter.value.toLowerCase())
            }
            onFilteredChange={() => {
              this.calcTotal();
            }}
            className="-striped -highlight"
            getTheadFilterThProps={this.getTheadFilterThProps}
          />
        </div>
      </div>
    );
  }
}

export default TimeSheet;
