import React from 'react';
import './common.css';
import { fetchClients } from '../actions/client_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const options = ['Unsubmit', 'Pending', 'Reject', 'All'];

class ClientList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount(){
		this.props.fetchClients();
	}

	// componentWillMount() {
	// 	// if (this.props.clients)
	// 	//     return;

	// 	this.props.fetchClients();
	// }

	render() {
		return (
			<div>
				<h2>Client List</h2>

				<div className="container">
					<div className="row">
						<div className="col">Company Name</div>
						<div className="col">Contact Name</div>
						<div className="col">Email</div>
						<div className="col">Phone Number</div>
						<div className="col">Enabled</div>
						<div className="col" />
					</div>

					{this.props.clients.map(client => (
						<div className="row" key={client.clientId}>
							<div className="col">{client.companyName}</div>
							<div className="col">{client.contactName}</div>
							<div className="col">{client.contactEmail}</div>
							<div className="col">{client.contactPhoneNumber}</div>
							<div className="col">{client.enabled ? 'Yes' : 'No'}</div>
							<div className="col">
								<Link
									to={{
										pathname: '/clientManagement/clientDetail/',
										state: { client: client },
									}}
								>
									Edit
								</Link>
							</div>
						</div>
					))}
				</div>
				<Link
					to={{
						pathname: '/clientManagement/clientDetail/',
						state: {
							client: {
								clientId: 0,
								companyName: '',
								contactName: '',
								contactPhoneNumber: '',
								enabled: true,
							},
						},
					}}
				>
					New Client
				</Link>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log('test here:', state.client.clientList);
	return {
		clients: state.client.clientList,
	};
};

function matchDispatchToProps(dispatch) {
	return {
		fetchClients: () => fetchClients(dispatch),
	};
}

export default connect(mapStateToProps, matchDispatchToProps)(ClientList);
