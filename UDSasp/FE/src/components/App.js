import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './Main';
import User from './User';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedUser: null,
		};
		this.selectUser = this.selectUser.bind(this);
		this.clearUser = this.clearUser.bind(this);
		this.handleTagClick = this.handleTagClick.bind(this);
		this.clearFilter = this.clearFilter.bind(this);
	}
	componentDidMount() {
    fetch('/api/users', {
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(json => this.setState({
            allUsers: JSON.parse(json),
            users: JSON.parse(json),
          })).catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }
  handleTagClick(currentTag) {
    const filteredUsers = [...this.state.users]
      .filter(user => user.tags
        .filter(tag => tag.toLowerCase().includes(currentTag.toLowerCase())).length > 0 );
    this.setState({ 
      users: filteredUsers,
      filter: this.state.filter ? `${this.state.filter}, ${currentTag}` : currentTag
    });
  }
	selectUser(id) {
		fetch(`/api/users/${id}`, {
      credentials: 'same-origin'
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(selectedUser => this.setState({ selectedUser: JSON.parse(selectedUser) })).catch(error => console.log(error))
        }
      })
      .catch(error => console.log(error));

	}
	clearUser() {
		this.setState({ selectedUser: null });
	}
	clearFilter() {
		this.setState({ filter: null, users: this.state.allUsers })
	}
	render() {
		const content = this.state.selectedUser
			? <User
					user={this.state.selectedUser}
				/> :
				<Main
					userCallback={this.selectUser}
					tagCallback={this.handleTagClick}
					users={this.state.users}
					filter={this.state.filter}
					filterCallback={this.clearFilter}
				/>
		return (
			<MuiThemeProvider>
				{content}
      </MuiThemeProvider>
		)
	}
}

export default App;
