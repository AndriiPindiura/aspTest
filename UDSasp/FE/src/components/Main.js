// require('styles/App.css');

import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';

class MainComponent extends React.Component {
  render() {
    return (
        <section className="index">
          {this.props.filter ? (
            <div>
              <input readonly value={this.props.filter} />
              <button onClick={this.props.filterCallback}>Clear Filter</button>
            </div>
          ) : false}
          <Table>
            <TableHeader
              style={{ background: '#75a9f9' }}
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn style={{ color: '#000', padding: '0 24px' }} tooltip="name">name</TableHeaderColumn>
                <TableHeaderColumn style={{ color: '#000', padding: '0 24px' }} tooltip="company">company</TableHeaderColumn>
                <TableHeaderColumn style={{ color: '#000', padding: '0 24px' }} tooltip="email">email</TableHeaderColumn>
                <TableHeaderColumn style={{ color: '#000', padding: '0 24px' }} tooltip="phone">phone</TableHeaderColumn>
                <TableHeaderColumn style={{ color: '#000', padding: '0 24px', minWidth: '35%' }} tooltip="tags">tags</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway={false}
              showRowHover
              stripedRows
              // stripedRows={false}
            >
              {this.props.users ? this.props.users.map((user,index) =>
                (
                  <TableRow
                    key={index}
                    value={user.guid}
                    // value={row._id}
                  >
                    <TableRowColumn>
                      <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => this.props.userCallback(user.guid)}>{user.name}</a>
                    </TableRowColumn>
                    <TableRowColumn>{user.company}</TableRowColumn>
                    <TableRowColumn>{user.email}</TableRowColumn>
                    <TableRowColumn>{user.phone}</TableRowColumn>
                    <TableRowColumn style={{ minWidth: '35%'}}>
                      <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', padding: '0' }}>
                        {user.tags ? user.tags.map((tag,tagIndex) => (
                          <li style={{ margin: '0 5px' }} key={tag + tagIndex}>
                            <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => this.props.tagCallback(tag)}>{tag}</a>
                          </li>
                        )) : false}
                      </ul>
                    </TableRowColumn>
                  </TableRow>
              ))
              : false}
            </TableBody>
          </Table>
        </section>
    );
  }
}

MainComponent.defaultProps = {
};

MainComponent.propTypes = {
  userCallback: React.PropTypes.func.isRequired,
  tagCallback: React.PropTypes.func.isRequired,
  filterCallback: React.PropTypes.func.isRequired,
  users: React.PropTypes.object.isRequired,
  filter: React.PropTypes.object.isRequired,
}

export default MainComponent;
