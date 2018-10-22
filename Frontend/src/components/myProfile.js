import React from 'react';
import './common.css';
import myAvatar from '../resource/myportrait.jpg'
import { connect } from "react-redux";
import { updateProfile } from '../actions/user_actions';

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // show: false,
            history: false,
            user: {
                ...this.props.user,
                password: "",
                newPassword: "",
            },
            confirmPassword: "",
            showPassword: false,
        };
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.update = this.update.bind(this);
    }

    onChangeInfo = updateInfo => event => {
        this.setState({
            user: { ...this.state.user, [updateInfo]: event.target.value }
        });
    }

    update = () => {
        console.log(this.state.user);
        this.props.updateProfile(this.state.user);
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPasssword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    render() {
        let helperText;
        if (this.state.confirmPassword === "") {
            helperText = "enter your new password again to confirm";
        } else if (this.state.confirmPassword === this.state.user.newPassword) {
            helperText = "new password confirmed";
        } else {
            helperText = "WRONG new password";
        }

        const { classes } = this.props;
        return (
            <div className="myProfile">
                <div className="portrait row">
                    <div className="col col-6">
                        <img
                            alt="portrait"
                            src={myAvatar}
                            className="avatar"
                        />

                    </div>
                </div>

                <div id="nameBackground" className="nameBackground">
                    <div className="col col-12">
                        <div align="center" className="typography">
                            {this.props.user.firstName} {this.props.user.lastName}
                        </div>
                        <br />
                        <div align="center" className="typography">Title</div>
                        <br />
                        <div align="center" className="typography">Position</div>
                    </div>
                </div>

                <div className="nameBackground">
                    <div className="row">
                        <div className="col col-12">
    
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}


const mapStateToProps = (state) => {
    return {
        // user: state.user.user,
        user: state.user.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (user) => updateProfile(user, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);