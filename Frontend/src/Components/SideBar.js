import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import { connect } from "react-redux";

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onCalenderSelect = (date) => {
        let offset = (date.getDay() - 1) % 7;
        date.setDate(date.getDate() - offset);
        this.props.select(date);
    }

    render() {
        /* Decide the content of contact info */

        let contactInfo = null;
        // console.log(this.props.selectWeek);
        if (this.props.selectWeek) {
            contactInfo = (
                <div>
                    <p className="contactName">
                        {/* Contact Name: {this.props.selectWeek.contract.contactName} */}
                        {this.props.selectWeek.contract.contactName}
                    </p>
                    <i>{this.props.selectWeek.contract.companyName}</i>
                    <p>
                        ProjectName: {this.props.selectWeek.contract.projectName}
                    </p>
                    <p>
                        Email: {this.props.selectWeek.contract.contactEmail}
                    </p>
                    <p>
                        PhoneNumber: {this.props.selectWeek.contract.contactPhoneNumber}
                    </p>
                    <p className="pos">
                        {this.props.selectWeek.contract.content}
                    </p>
                </div>
            )
        } else {
            contactInfo = (
                <div>
                    <p className="text-secondary">If you have any question, please contact</p>
                    <h4 className="contactName">
                        Admin
                    </h4>
                    <p>
                        Email: Admin@test.com
                    </p>
                </div>
            )
        }
        return (
            <div>
                <InfiniteCalendar
                    className="card"
                    theme={{
                        headerColor: '#2196f3',
                        weekdayColor: 'rgba(33, 150, 243, 0.90)',
                    }}
                    width={"100%"}
                    height={window.innerWidth * 0.15}
                    selected={this.props.selectedMonday == null ? new Date() : this.props.selectedMonday}
                    onSelect={this.onCalenderSelect}
                    locale={{
                        weekStartsOn: 1
                    }}
                />

                <div className="card contact">
                    <div className="card-body">
                        <h3 align="center">
                            Contact Info
                        </h3>
                        {contactInfo}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contracts: state.weektime.contracts,
        selectWeek: state.weektime.selectedWeek,
    }
}

export default connect(mapStateToProps)(SideBar);