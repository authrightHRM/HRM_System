import React from 'react';

export default class StickFooter extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        this.year = date.getFullYear();
    }
    render() {
        return (
            <footer>
                <div className="row justify-content-center">
                    <div className="col-6 copyright">
                        Copyright ©{this.year} Authright Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        );
    }
}
