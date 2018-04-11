import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Refresh from 'material-ui-icons/Refresh';
import Grid from 'material-ui/Grid';

import { selectWeek } from '../Actions/weektime_actions';
import { connect } from "react-redux";

import {
    Link
} from 'react-router-dom'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    card: {
        marginBottom: 10,
        borderRadius: 5,
        // backgroundColor: "rgba(255, 255, 255, 0.85)",
        '&:hover': {
            boxShadow: '2px 3px 5px 0px rgba(158,158,158, 1)',
            backgroundColor: "white",
        }
    },
    title: {
        // marginBottom: 16,
        // color: theme.palette.text.secondary,
    },
    pos: {
        margin: 12,
        color: theme.palette.text.secondary,
    },
    cardtitle: {
        padding: 10,
        background: "radial-gradient(white, rgba(240,240,240, 0.85))",
        // boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    },
    flexContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        padding: 0,
        '&:last-child': {
            paddingBottom: "0px",
        },
    },
    cardhour: {
        padding: 12,
        // background: "linear-gradient(rgba(33, 150, 243,0.50), rgba(33, 150, 243,0.90))",
        background: "radial-gradient(rgba(255, 183, 77, 0.55), rgba(255, 183, 77, 0.75))",
        color: "white",
    },
});

class WeekTimeList extends React.Component {
    constructor(props) {
        super(props);
    }

    sumHours = (weektime) => {
        let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let total = 0;
        weekdays.forEach((weekday) => {
            total += weektime[weekday.toLowerCase()];
        });
        return total;
    }

    render() {
        const { classes, weekTimes, contracts, history, selectedMonday } = this.props;
        let renderWeekTimes = weekTimes
            .filter(weektime => history ? weektime.submitted : !weektime.submitted)
            .map(weektime => {
                let goalContract = null;
                for (let i = 0; i < contracts.length; i++) {
                    if (contracts[i].id === weektime.contractId) {
                        goalContract = { ...contracts[i] };
                        break;
                    }
                };
                let newWeekTime = { ...weektime, contract: goalContract };
                // console.log(newWeekTime);
                return newWeekTime;
            })
            .sort((wa, wb) => (wb.mondayDate.getTime() - wa.mondayDate.getTime()));
        if (selectedMonday != null) {
            {console.log(renderWeekTimes)}
            renderWeekTimes = renderWeekTimes.filter(weektime => 
                weektime.mondayDate.toLocaleDateString() === selectedMonday.toLocaleDateString()
                // {console.log(weektime.mondayDate.toLocaleDateString() === selectedMonday.toLocaleDateString())}
            );
            {console.log(renderWeekTimes)}
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


        return (
            <div>
                {history ? (
                    <div style={{ fontSize: "30px", textAlign: "center" }}>Timesheet History
                        {/* <h2 style={{ textAlign: "center"}}>Timesheet History</h2> */}
                        <IconButton
                            onClick={this.props.selectInitial}
                            color="primary"
                        >
                            <Refresh />
                        </IconButton>
                    </div>
                ) : (
                        <div style={{ fontSize: "30px", textAlign: "center" }}>Timesheet
                            {/* <h2 style={{ textAlign: "center" }}>Timesheet to be filled</h2> */}
                            <IconButton
                                onClick={this.props.selectInitial}
                                color="primary"
                            >
                                <Refresh />
                            </IconButton>
                        </div>
                    )}

                <div className={classes.root}>
                    <Grid container spacing={24}>
                        {renderWeekTimes.map((weektime, index) => (
                            <Grid item xs={6} key={index}>
                                <Card className={classes.card} onClick={() => this.props.selectWeek(weektime)}>
                                    <Link to={'/timesheet/weektime' + map.get(index)}>
                                        <CardContent className={this.props.classes.cardtitle}>
                                            <Typography align="center" type="subheading" className={classes.title}>
                                                Week <em>{weektime.mondayDate.toLocaleDateString().slice(0, 10)} - {new Date(weektime.mondayDate.getTime() + 6 * 24 * 3600 * 1000).toLocaleDateString().slice(0, 10)}</em>
                                            </Typography>
                                        </CardContent>
                                        <CardContent className={classes.flexContainer}>
                                            <Typography className={classes.pos}>Project: {weektime.contract.projectName}</Typography>
                                            <div className={this.props.classes.cardhour}>
                                                Hour: {this.sumHours(weektime)}
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return {
        selectWeek: (weektime) => selectWeek(dispatch, weektime)
    }
}

WeekTimeList.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(WeekTimeList);
WeekTimeList = withStyles(styles)(WeekTimeList);
export default connect(null, matchDispatchToProps)(WeekTimeList);