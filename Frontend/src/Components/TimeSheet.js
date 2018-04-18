import React from 'react';
import {
    Link,
    Route,
    Switch
} from 'react-router-dom'
import { fetchContracts, selectInitial, select } from '../actions/weektime_actions';
import { connect } from "react-redux";
import SideBar from"./sideBar";

class Timesheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: false
        };
    }

    componentWillMount() {
        if (this.props.contracts.length > 0 || this.props.weekTimes.length > 0)
            return;
        this.props.fetchContracts();
    }

    render() {
        if (this.props.fetching) {
            return (
                <img src="../resource/loading.gif" alt="loading" />
            );
        }

        return (
            <div className="timesheetContainer">
                <div className="row">
                    <div className="col col-md-9">Timesheet</div>
                    <div className="col col-md-3">
                    <SideBar></SideBar>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contracts: state.weektime.contracts,
        weekTimes: state.weektime.weekTimes,
        fetching: state.weektime.fetching,
        selectedMonday: state.weektime.selectedMonday
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchContracts: () => fetchContracts(dispatch),
        selectInitial: () => selectInitial(dispatch),
        select: (mondayDate) => select(dispatch, mondayDate)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Timesheet);