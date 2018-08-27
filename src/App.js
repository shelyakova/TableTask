import React, { Component } from 'react';
import './ag_netflow.json';
import './App.css';
import Modal from 'react-modal';

class App extends Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      data: [],
      breackdown: []
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }



  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }


  componentDidMount() {
    var data = require('./ag_netflow.json');
    var object = [];
    for(var i = 0; i < 25; i++) {
      object[object.length] = data[i];
    }
    this.setState({data: object});
  }

  render() {
    return (
      <div className="App">
        <div className="table">
          <table>
            <thead>
              <tr>
                <td>Source Address</td>
                <td>Destination Adress</td>
                <td>Bytes In</td>
                <td>Bytes Out</td>
                <td>Packets In</td>
                <td>Packets Out</td>
                <td>Application Breackdown</td>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item, key) => (
                <tr key={key}>
                  <td><label>{item.sourceAddress}</label></td>
                  <td><label>{item.destinationAddress}</label></td>
                  <td><label>{item.totalBytesIn}</label></td>
                  <td><label>{item.totalBytesOut}</label></td>
                  <td><label>{item.totalPacketsIn}</label></td>
                  <td><label>{item.totalPacketsOut}</label></td>
                  <td>
                    <button onClick={() => {
                      this.handleOpenModal();
                      var breackdown = this.state.data[key].applicationBreakdown;
                      console.log(breackdown);
                      this.setState({breackdown: breackdown});
                    }}>
                      i
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal isOpen={this.state.showModal}>
            <div className="modal">
              <div className="button">
                <button className="close" onClick={() => {
                  this.handleCloseModal();
                  this.setState({breackdown: []});
                }}>
                  X
                </button>
              </div>

              <div className="table">
              <h2>Application Info</h2>
                <table>
                  <thead>
                    <tr>
                      <td>Application Name</td>
                      <td>Port Number</td>
                      <td>Protocol</td>
                      <td>Bytes In</td>
                      <td>Bytes Out</td>
                      <td>Packets In</td>
                      <td>Packets Out</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.breackdown.map((name, key) => (
                      <tr key={key} className={key == 1 && 'secondTR'}>
                        <td><label>{name.applicationName}</label></td>
                        <td><label>{name.portNumber}</label></td>
                        <td><label>{name.protocol}</label></td>
                        <td><label>{name.bytesIn}</label></td>
                        <td><label>{name.bytesOut}</label></td>
                        <td><label>{name.packetsIn}</label></td>
                        <td><label>{name.packetsOut}</label></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
