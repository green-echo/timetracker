import React from 'react';
// import 'react-dropdown/style.css';
// import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { CSVLink } from 'react-csv';
import Axios from 'axios';
import { millisConverted } from '../utils';
import { Button } from 'reactstrap';

const columnssss = [
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
    accessor: d => new Date(d.start).toString().slice(0, 21)
  },
  {
    id: 'end',
    Header: 'End',
    accessor: d => new Date(d.end).toString().slice(0, 21)
  },
  {
    id: 'duration',
    Header: 'Duration',
    accessor: d =>
      millisConverted(new Date(d.end).getTime() - new Date(d.start).getTime())
    // footer: 'Total: ' + totalTime
  }
];

class TimeSheet extends React.Component {
  constructor(props) {
    super(props);

    this.download = this.download.bind(this);
    this.state = {
      totalTime: 0,
      tableproperties: {
        allData: []
      },
      dataToDownload: []
    };
  }

  async componentDidMount() {
    const { data } = await Axios.get(`/api/users/timesheet`);
    // console.log('DATA', data);

    let tableproperties = { ...this.state.tableproperties };
    tableproperties.allData = data;
    await this.setState({ tableproperties });
    // this.setState({ tableproperties }, () => {
    //   debugger;
    // });
  }

  calcTotalTime = () => {
    const total = this.state.tableproperties.allData.reduce(
      (prev, curr) => prev + curr,
      0
    );
  };

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
        accessor: d => new Date(d.start).toString().slice(0, 21)
      },
      {
        id: 'end',
        Header: 'End',
        accessor: d => new Date(d.end).toString().slice(0, 21),
        Footer: 'Hello'
      },
      {
        id: 'duration',
        Header: 'Duration',
        accessor: d =>
          millisConverted(
            new Date(d.end).getTime() - new Date(d.start).getTime()
          ),
        footer: 'Total: ' + this.state.totalTime
      }
    ];
  };

  async download(event) {
    const currentRecords = await this.reactTable.getResolvedState().sortedData;
    const data_to_download = [];
    for (let index = 0; index < currentRecords.length; index++) {
      let record_to_download = {};
      for (let colIndex = 0; colIndex < this.columns().length; colIndex++) {
        record_to_download[this.columns()[colIndex].Header] =
          currentRecords[index][this.columns()[colIndex].id];
      }
      console.log('SINGLE RECORD', record_to_download);
      data_to_download.push(record_to_download);
    }
    console.log('DATATODOWNLOAD', data_to_download);
    this.setState({ dataToDownload: data_to_download }, () => {
      // click the CSVLink component to trigger the CSV download
      this.csvLink.link.click();
    });
  }

  //   render() {
  //     return <div>Hello</div>;
  //   }

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
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id])
                .toLowerCase()
                .includes(filter.value.toLowerCase())
            }
          />
        </div>
      </div>
    );
  }
}

export default TimeSheet;
