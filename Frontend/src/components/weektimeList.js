import React from "react";
import './common.css';
import { selectWeek } from "../actions/weektime_actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const options = ["Unsubmit", "Pending", "Reject", "All"];

class WeekTimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            selectedIndex: 0,
            filterWeektimes: this.props.weekTimes
        };
    }

    sumHours = weektime => {
        let weekdays = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ];
        let total = 0;
        weekdays.forEach(weekday => {
            total += weektime[weekday.toLowerCase()];
        });
        return total;
    };

    //modify filter
    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const {
            classes,
            weekTimes,
            contracts,
            history,
            selectedMonday
        } = this.props;

        // console.log(this.state.filterWeektimes);

        let renderWeekTimes = this.state.filterWeektimes
            //   .filter(
            //     weektime =>
            //       history
            //         ? weektime.submitted && weektime.viewed
            //         : !(weektime.submitted && weektime.viewed)
            //   )
            .map(weektime => {
                let goalContract = null;
                for (let i = 0; i < contracts.length; i++) {
                    if (contracts[i].id === weektime.contractId) {
                        goalContract = { ...contracts[i] };
                        break;
                    }
                }
                let newWeekTime = { ...weektime, contract: goalContract };
                return newWeekTime;
            })
            .sort((wa, wb) => wb.mondayDate.getTime() - wa.mondayDate.getTime());
        if (selectedMonday != null) {
            renderWeekTimes = renderWeekTimes.filter(weektime =>
                // weektime.mondayDate.getTime() === selectedMonday.getTime()
                weektime.mondayDate.toLocaleDateString() === selectedMonday.toLocaleDateString()
            );
        }

        let map = new Map();
        renderWeekTimes.forEach((weektime, index) => {
            for (let i = 0; i < weekTimes.length; i++) {
                if (weektime.weekId === weekTimes[i].weekId) {
                    map.set(index, i);
                }
            }
        });
        console.log(map);

        // let alertVisibility = !history ? "visible" : "hidden";
        return (
            <div className="WeektimeList">
                <div className="row justify-content-md-center ">
                    <h3 className="weektimeList-margin">WeektimeList</h3>
                    <button className="btn btn-sm" onClick={this.props.selectInitial}>
                        <i className="fas fa-redo-alt"></i>
                    </button>
                </div>
                <div className="row justify-content-md-center ">
                    {renderWeekTimes.map((weektime, index) => (
                        <div className="weektimeList-margin" key={index}>
                            <Link to={"/timesheet/weektime" + map.get(index)}>
                                <div
                                    className="card Weektime"
                                    onClick={() => this.props.selectWeek(weektime)}
                                >
                                    <div align="center" className="cardtitle">Week{" "}
                                        {weektime.mondayDate
                                            .toLocaleDateString()
                                            .slice(0, 10)}{" "}
                                        -{" "}
                                        {new Date(
                                            weektime.mondayDate.getTime() + 6 * 24 * 3600 * 1000
                                        )
                                            .toLocaleDateString()
                                            .slice(0, 10)}
                                    </div>
                                    <div className="flexContainer">
                                        <div className="project">
                                            Project: {weektime.contract.projectName}
                                        </div>
                                        <div className="hour">
                                            Hour: {this.sumHours(weektime)}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return {
        selectWeek: weektime => selectWeek(dispatch, weektime)
    };
}

export default connect(null, matchDispatchToProps)(WeekTimeList);
