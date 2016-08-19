// require('normalize.css/normalize.css');
// require('styles/App.css');

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { peoples: [] };
  }
  componentDidMount() {
    fetch('/people', {
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.status === 200) {
          // console.log(response.body);
          // response.text().then(text => console.log(text)).catch(error => console.log(error));
          response.json().then(json => this.setState({
            rawPeoples: JSON.parse(json).peoples,
            peoples: JSON.parse(json).peoples,
          })).catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }
  handleTagClick(currentTag) {
    console.log(currentTag);
    const filteredPeople = [...this.state.peoples]
      .filter(human => human.tags
        .filter(tag => tag.toLowerCase().includes(currentTag.toLowerCase())).length > 0 );
    console.log(filteredPeople);
    this.setState({ 
      peoples: filteredPeople,
      filter: this.state.filter ? `${this.state.filter}, ${currentTag}` : currentTag
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <section className="index">
          {this.state.filter ? (
            <div>
              <input readonly value={this.state.filter} />
              <button onClick={() => this.setState({ filter: null, peoples: this.state.rawPeoples })}>Clear Filter</button>
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
              {this.state.peoples ? this.state.peoples.map((human,index) =>
                (
                  <TableRow
                    key={index}
                    value={human.guid}
                    // value={row._id}
                  >
                    <TableRowColumn>{human.name}</TableRowColumn>
                    <TableRowColumn>{human.company}</TableRowColumn>
                    <TableRowColumn>{human.email}</TableRowColumn>
                    <TableRowColumn>{human.phone}</TableRowColumn>
                    <TableRowColumn style={{ minWidth: '35%'}}>
                      <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', padding: '0' }}>
                        {human.tags ? human.tags.map((tag,tagIndex) => (
                          <li style={{ margin: '0 5px' }} key={tag + tagIndex}>
                            <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => this.handleTagClick(tag)}>{tag}</a>
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
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
