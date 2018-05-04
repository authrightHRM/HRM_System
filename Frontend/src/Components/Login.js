import React from 'react';
import './common.css';
import logo from '../resource/authrightlogo.png';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            alertMessage: "",
            loginError: this.props.loginError
        };
        this.sendCredential = this.sendCredential.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showAlert = this.showAlert.bind(this);
    }

    // Use onSubmit() function pass from pageRouter to send credential to backend
    sendCredential = (event) => {
        if (this.state.username === "" || this.state.password === "") {
            this.showAlert("Please input username and password!");
        } else {
            this.props.onSubmit(this.state.username, this.state.password);
        }
        event.preventDefault();
    }

    // Show Alerts message
    showAlert(message) {
        this.setState({
            alertMessage: message,
            loginError: true
        })
    }

    // Get input value
    handleChange = prop => event => {
        this.setState({
            loginError: false,
            [prop]: event.target.value
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        /* If using visibility instead of hidden
         * let visibility = "";
         * visibility = (this.props.loginError || this.state.loginError) ? "visible" : "hidden";
        */

        // Redirect to private route if user already logged in
        if (this.props.loggedIn) {
            console.log("redirecting back")
            return (
                <Redirect to={from} />
            )
        }

        // Login failure
        if ((this.props.loginError === true) && (this.props.loginError !== this.state.loginError)) {
            this.showAlert("Invalid username or password!");
        }

        return (
            <div className="loginContainer">
                <div className="row justify-content-md-center">
                    <div className="col-sm-12 col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <div className="img">
                                    <img src={logo} alt="Authright" width="auto" height="70%" />
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="alert alert-danger" hidden={!this.state.loginError} role="alert">
                                {/* <div className="alert alert-danger" style={{visibility: this.state.loginError ? 'visible' : 'hidden' }}> */}
                                    {this.state.alertMessage}
                                </div>
                                <form onSubmit={this.sendCredential}>
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="Username"
                                            value={this.state.name}
                                            onChange={this.handleChange('username')}
                                        />
                                        <small id="nameHelp" className="form-text text-muted">Please input your name.</small>
                                    </div>
                                    <div className="form-group">
                                        <input type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            value={this.state.name}
                                            onChange={this.handleChange('password')}
                                        />
                                        <small id="passwordHelp" className="form-text text-muted">Please input your password.</small>
                                    </div>
                                    <button type="submit" className="btn btn-primary" id="login">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
