import React from 'react';
import './common.css';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
import { update, updateInitial, unSelectedWeek } from '../actions/weektime_actions';

class WeektimeDetails extends React.Component {
    constructor(props, weekdays) {
        super(props);
        this.state = {
            dialogOpen: false,
            redirected: false,
            // updateWeektime: null,
            updateWeektime: this.props.weekTimes[this.props.match.params],
            total: 0,
            windex: this.props.match.params,
        };
        this.weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    }

    componentWillMount() {
        let { windex } = this.props.match.params;
        let { weekTimes, contracts } = this.props;
        if (weekTimes.length === 0 || contracts.length === 0) {
            return;
        }
        console.log("Week time details initializing...");

        let weektime = weekTimes[windex];
        this.setState({
            updateWeektime: weektime
        });
        if (!weektime.submitted) {
            this.props.updateInitial();
        }
        setTimeout(() => {
            this.sumHours();
        }, 50);
    }

    componentDidUpdate() {
        if (this.props.updated) {
            console.log("Redirecting back to timesheet");
            setTimeout(() => {
                this.setState({ redirected: true });
            }, 800);
        }
    }

    componentWillUnmount() {
        this.props.unSelectedWeek();
        this.props.updateInitial();
    }

    limit = (val, max) => {
        max = max.toString();
        if (max <= 0) {
            return '0';
        }

        if (val[0] === '-') {
            return '0';
        }

        if (val.length > max.length || Number(val) > Number(max)) {
            val = max;
        }

        return Number(val);
    }

    sumHours = () => {
        let { updateWeektime } = this.state;
        let total = 0;
        this.weekdays.forEach((weekday) => {
            total += updateWeektime[weekday.toLowerCase()];
        });
        this.setState({
            total: total
        });
    }

    onChangeHours = dayOfWeek => event => {
        let hours = this.limit(event.target.value, 24)
        console.log(dayOfWeek, hours);
        let updateWeektime = this.state.updateWeektime;
        let oldHours = updateWeektime[dayOfWeek];
        let oldTotal = this.state.total;
        // let newWeekTime = {...updateWeektime}
        // newWeekTime[dayOfWeek.toLowerCase()] = hours;
        this.setState({
            total: oldTotal - oldHours + hours,
            updateWeektime: { ...updateWeektime, [dayOfWeek]: hours }
        });
        setTimeout(() => {
            console.log(this.state.updateWeektime);
        }, 10);
    }

    onChangeNote = event => {
        let updateWeektime = this.state.updateWeektime;
        this.setState({
            updateWeektime: { ...updateWeektime, note: event.target.value }
        });
        setTimeout(() => {
            console.log(this.state.updateWeektime);
        }, 10);
    }

    update = () => {
        console.log(this.state.updateWeektime);
        this.props.update(this.state.updateWeektime);
    }

    submit = () => {
        console.log(this.state.updateWeektime);
        this.props.submit(this.state.updateWeektime);
    }

    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
    };

    handleCancel = () => {
        this.setState({ dialogOpen: false });
    };

    handleOK = () => {
        this.setState({ dialogOpen: false });
        this.submit();
    };

    render() {
        if (this.props.fetching) {
            return (
                <img src="../resource/loading.gif" alt="loading" />
            );
        }
        if (this.state.redirected) {
            console.log("Updated or submit successfully, redirecting back...")
            return (
                <Redirect to='/timesheet' />
            )
        }
        let { updateWeektime } = this.state;
        const { updated, classes, contracts } = this.props
        let contract = null;
        for (let i = 0; i < contracts.length; i++) {
            if (updateWeektime.contractId === contracts[i].id) {
                contract = contracts[i];
                break;
            }
        }

        let alertVisibility = (updated) ? "visible" : "hidden";
        let returnBack = (this.state.updateWeektime.submitted) ? "Back" : "Cancel";
        // let from = (this.state.updateWeektime.submitted) ? '/timesheet/history' : '/timesheet';

        return (
            <div>
                <div className="row justify-content-md-center">
                    <div className="col-sm-12 col-md-4">
                        <div className="alert alert-success" role="alert" style={{ visibility: alertVisibility }}>
                        {/* <div className="alert alert-success" role="alert"> */}
                            Successfully updated!
                        </div>
                        {/* <button type="button" class="btn btn-primary" onClick={this.approve}>Approve</button>
                        <button type="button" class="btn btn-primary" onClick={this.reject}>Reject</button> */}
                        <div className="card">
                            <div className="card-header">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fetching: state.weektime.fetching,
        updated: state.weektime.updated,
        weekTimes: state.weektime.weekTimes,
        contracts: state.weektime.contracts,
        selectWeek: state.weektime.selectedWeek,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: (weektime) => update(weektime, dispatch),
        submit: (weektime) => update(weektime, dispatch, true),
        updateInitial: () => updateInitial(dispatch),
        unSelectedWeek: () => unSelectedWeek(dispatch),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(WeektimeDetails);