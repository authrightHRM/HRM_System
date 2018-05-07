import React from 'react';
import './common.css';
import {
    Link,
    Route,
    Switch
} from 'react-router-dom'
import { fetchContracts, selectInitial, select } from '../actions/weektime_actions';
import { connect } from "react-redux";
import SideBar from "./sideBar";
import WeekTimeList from "./weektimeList";
import WeektimeDetails from "./weektimeDetails";
import loading from '../resource/loading2.gif';

class Timesheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // history: false
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
                <img src={loading} alt="loading" className="loading"/>
                // <div className="progress progress-striped active">
                //     <div className="bar" style={{width:"100%"}}></div>
                // </div>
            );
        }

        return (
            <div className="timesheetContainer">
                <div className="row justify-content-md-center">
                    <div className="col col-md-9">
                        <Switch>
                            <Route
                                exact
                                path={this.props.match.url}
                                render={(props) => (<WeekTimeList {...props}
                                    weekTimes={this.props.weekTimes}
                                    contracts={this.props.contracts}
                                    selectedMonday={this.props.selectedMonday}
                                    selectInitial={this.props.selectInitial}
                                />
                                )}
                            />
                            <Route
                                path={this.props.match.url + '/weektime:windex'}
                                // render={(props) => (<Detail {...props} weekTimes={this.props.weekTimes} />)} 
                                component={WeektimeDetails}
                            />
                        </Switch>
                    </div>

                    <div className="col col-md-3">
                        <SideBar selectedMonday={this.props.selectedMonday} select={this.props.select} />
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