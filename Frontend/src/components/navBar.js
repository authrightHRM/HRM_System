import React from 'react';
import logo from '.././resource/authrightlogo.png';
import { Link, NavLink } from 'react-router-dom'
import './common.css';
import { store } from '../store';
import { logout } from '../actions/auth_actions';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth
        }
    }

    onLogout = () => {
        this.setState({
            auth: false
        });
        logout(store.dispatch);
        window.location.reload();
    }

    render() {

        return (
            <nav className="navbar navbar-dark">
                <div className="flexContainer">
                    <Link to={'/'}>
                        <img className="center" src={logo} alt="Authright" width="auto" />
                    </Link>
                    {this.props.roleUser && (
                        <NavLink
                            exact
                            to={'/timesheet'}
                            className='navLink'
                            activeClassName='selected'  // Or set activeStyle here
                        >
                            Timesheet
                        </NavLink>
                    )}
                    {/* {this.props.roleUser && (
                        <NavLink to={'/timesheet/history'}
                            className='navLink'
                            activeClassName='selected'
                        >
                            View History
                        </NavLink>
                    )} */}
                    {this.props.roleAdmin && (
                        <NavLink to={'/userManagement'}
                            className='navLink'
                            activeClassName='selected'
                        >
                            User Management
                        </NavLink>
                    )}
                    {this.props.roleAdmin && (
                        <NavLink to={'/timesheetManagement'}
                            className='navLink'
                            activeClassName='selected'
                        >
                            Timesheet Management
                        </NavLink>
                    )}
                    {this.props.roleAdmin && (
                        <NavLink to={'/clientManagement'}
                            className='navLink'
                            activeClassName='selected'
                        >
                            Client Management
                        </NavLink>
                    )}
                </div>
                <div className="flexContainer">
                    {this.props.user ? <div className="navText">Hello, {this.props.user.firstName} ! </div> : <div className="navText">Welcome!</div>}

                    <div className="dropdown">
                        <button className="dropbtn"><i className="fas fa-user-circle fa-lg"></i> </button>
                        <div className="dropdown-content">
                            {(!this.props.auth) && (
                                <Link to={'login'}>Login</Link>
                            )}

                            {(this.props.auth) && (
                                <div>
                                    <Link to={'/myProfile'}>
                                        <div onClick={this.onProfile}>My Profile</div>
                                    </Link>
                                    <Link to={'/'}>
                                        <div onClick={this.onLogout}>Logout</div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;