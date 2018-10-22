import React from 'react';
import './common.css';
import { updateClient } from '../actions/client_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class ClientDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			client: null,
			redirect: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		const { client } = this.props.location.state;
		this.setState({ client: client });
	}

	handleChange = prop => event => {
		let client = { ...this.state.client };
		client[prop] = event.target.value;
		this.setState({ client: client });
	};

	handleCheckboxChange = prop => event => {
		let client = { ...this.state.client };
		client[prop] = event.target.checked;
		this.setState({ client: client });
	};

	handleSubmit(event) {
		this.props.updateClient(this.state.client);
		this.setState({ redirect: true });
		event.preventDefault();
	}

	render() {
		if (this.state.redirect) {
			return <Redirect push to="/clientManagement" />;
		}

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label>Company: </label>
						<input
							value={this.state.client.companyName}
							onChange={this.handleChange('companyName')}
							type="text"
							className="form-control"
							id="companyName"
							placeholder="Enter Company Name"
						/>
					</div>
					<div className="form-group">
						<label>Contact Name: </label>
						<input
							value={this.state.client.contactName}
							onChange={this.handleChange('contactName')}
							type="text"
							className="form-control"
							id="contactName"
							placeholder="Enter Contact Name"
						/>
					</div>
					<div className="form-group">
						<label>Phone Number: </label>
						<input
							value={this.state.client.contactPhoneNumber}
							type="text"
							onChange={this.handleChange('contactPhoneNumber')}
							className="form-control"
							id="contactPhoneNumber"
							placeholder="Enter Phone Number"
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							value={this.state.client.contactEmail}
							type="email"
							onChange={this.handleChange('contactEmail')}
							className="form-control"
							id="contactEmail"
							aria-describedby="emailHelp"
							placeholder="Enter email"
						/>
					</div>
					<div className="form-group form-check">
						<input
							checked={this.state.client.enabled}
							onChange={this.handleCheckboxChange('enabled')}
							type="checkbox"
							className="form-check-input"
							id="enabled"
						/>
						<label className="form-check-label" >
							Enabled
						</label>
					</div>
					<button type="submit" className="btn btn-primary">
						Save
					</button>
				</form>
				<Link to="/clientManagement">Back to list</Link>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateClient: client => updateClient(client, dispatch),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(ClientDetail);
