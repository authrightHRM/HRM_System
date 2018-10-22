import React from 'react';
import NavBar from './navBar';
import Dashboard from './dashboard';
import Login from './login';
import TimeSheet from './timesheet';
import ClientList from './clientList';
import ClientDetail from './clientDetail';
import MyProfile from './myProfile';
import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom'
import { login, logout, checkSession } from '../actions/auth_actions';
import { connect } from 'react-redux';

class PageRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // auth: true,
            anchorEl: null,
            roleUser: false,
            roleAdmin: false,
        };
        this.changeUserAuth = this.changeUserAuth.bind(this);
        this.changeAdminAuth = this.changeAdminAuth.bind(this);
    }

    changeUserAuth() {
        this.setState({
            roleUser: true,
        })
    }

    changeAdminAuth() {
        this.setState({
            roleAdmin: true,
        })
    }

    componentWillMount() {
        console.log("App Initializing...");
        this.props.checkSession();
    }

    render() {
        // Check the role of current user
        if (this.props.user) {
            this.props.user.authorities.forEach((role) => {
                if (this.state.roleUser === false && role.authority === "ROLE_USER") {
                    this.changeUserAuth();
                }

                if (this.state.roleAdmin === false && role.authority === "ROLE_ADMIN") {
                    this.changeAdminAuth();
                }
            });
        }

        // Private Route for auth user
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route{...rest} render={props => (
                this.props.loggedIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            )}
            />
        );

        // Private Route for admin
        const AdminRoute = ({ component: Component, ...rest }) => (
            <Route{...rest} render={props => (
                (this.props.loggedIn) ? (
                    this.state.roleAdmin ? (
                        <Component {...props} />
                    ) : (
                            <Redirect to={{             // Or give a alert?
                                pathname: '/',
                                state: { from: props.location }
                            }} />
                        )
                ) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                    )
            )} />
        );

        return (
            <div className="pages">
                <NavBar
                    auth={this.props.loggedIn}
                    roleUser={this.state.roleUser}
                    roleAdmin={this.state.roleAdmin}
                    user={this.props.user}
                />
                <Switch>
                    <Route exact path="/" render={(props) =>
                        <Dashboard {...props}
                            roleUser={this.state.roleUser}
                            roleAdmin={this.state.roleAdmin}
                        />}
                    />
                    <Route path="/login" render={
                        (props) => <Login {...props}
                            onSubmit={this.props.onSubmit}
                            loggedIn={this.props.loggedIn}
                            loginError={this.props.loginError}
                        />}
                    />
                    <PrivateRoute path="/timesheet" component={TimeSheet} />
                    <AdminRoute exact path="/clientManagement" component={ClientList} />
                    <AdminRoute exact strict path="/clientManagement/clientDetail/" component={ClientDetail} />
                    {/* <PrivateRoute path="/myProfile" component={MyProfile} />
                    <AdminRoute exact path="/userManagement" component={UserList} />
                    <AdminRoute path="/timesheetManagement" component={TimesheetManagement} />
                    <AdminRoute strict path="/userManagement/" component={UserDetail} />
                    <AdminRoute path="/userManagement/user:uindex" component={UserDetail} />
                    <AdminRoute path="/userManagement/addUser" component={AddUser} /> */}
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        loggingIn: state.user.loggingIn,
        loggedIn: state.user.loggedIn,
        loginError: state.user.loginError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (username, password) => login(username, password, dispatch),  // for login credential submit
        checkSession: () => checkSession(dispatch),
        logout: () => logout(dispatch)
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageRouter));