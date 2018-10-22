import React from 'react';
import './common.css';
import timesheetIcon from '../resource/property-time.png';
import userIcon from '../resource/users.png';
import TimesheetManagementIcon from '../resource/TimesheetManagement.png';
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <div className="contentContainer">
                {this.props.roleUser && (
                    <Link to="/timesheet">
                        <div className="card dashboardContent">
                            <div className="card-body">
                                <img src={timesheetIcon} alt="Timesheet" className="icon" />
                            </div>
                            <div className="card-body">
                                <h5 align="center" className="text-secondary">Timesheet</h5>
                            </div>
                        </div>
                    </Link>
                )}
                {this.props.roleAdmin && (
                    <Link to="/UserManagement">
                        <div className="card dashboardContent">
                            <div className="card-body">
                                <img src={userIcon} alt="UserManagement" className="icon" />
                            </div>
                            <div className="card-body">
                                <h5 align="center" className="text-secondary">User Management</h5>
                            </div>
                        </div>
                    </Link>
                )}
                {this.props.roleAdmin && (
                    <Link to="/timesheetManagement">
                        <div className="card dashboardContent">
                            <div className="card-body">
                                <img src={TimesheetManagementIcon} alt="TimesheetManagement" className="icon" />
                            </div>
                            <div className="card-body">
                                <h5 align="center" className="text-secondary">Timesheet Management</h5>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        );
    }
}

export default Dashboard;