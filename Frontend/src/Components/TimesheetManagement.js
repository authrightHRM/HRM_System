import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Redirect from 'react-router-dom/Redirect';
import { Link } from 'react-router-dom';

const styles = {
}

class TimesheetManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
                <div>
                    <p>Timesheet Management</p>
                </div>
        );
    }
}

TimesheetManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimesheetManagement);