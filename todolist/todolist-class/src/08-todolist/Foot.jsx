import React, { Component } from 'react';

class Foot extends Component {
    render() {
        return (
            <div className="footer">
                <span>Copyright © 2014 todolist.cn </span>
                <span className="clearSpan" onClick={this.props.onClear}>clear</span>
            </div>
        );
    }
}

export default Foot;