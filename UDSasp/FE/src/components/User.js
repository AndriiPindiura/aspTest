import React from 'react';

class UserComponent extends React.Component {
	render () {
		// require('reset-css/reset.css');
		require('normalize.css/normalize.css');
		require('./uds.css');
		const { user } = this.props.user;
		return (
			<section style={{ padding: '10px' }}>
				<a onClick={this.props.back} style={{ textDecoration: 'underline', cursor: 'pointer' }}>back</a>
				<h1>User name, {this.props.user.username}</h1>
				<div style={{ display: 'flex', alignItems: 'center', margin: '10px auto' }}>
					<img src={user.picture} style={{
						width: '120px',
						height: '120px',
						margin: 'auto 10px auto 0',
						border: '2px solid #000',
						borderRadius: '10px'
					}}/>
					<div>
						<h2>{user.name}, {user.gender}</h2>
						<h3>{user.company}</h3>
						<ul style={{ listStyle: 'none', padding: '0' }}>
							<li>{user.email}</li>
							<li>{user.phone}</li>
							<li>{user.address}</li>
							<li>{user.registered}</li>
						</ul>
					</div>
				</div>
				<p>{user.about}</p>
			</section>
		)
	}
}

UserComponent.propTypes = {
	user: React.PropTypes.object.isRequired,
	back: React.PropTypes.func.isRequired,
}

export default UserComponent;
