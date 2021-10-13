import React, { Component } from 'react';

class DoneList extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.list.map(value => value.flag === true &&
                        <li draggable key={value.id} className="list list-done">
                            <input checked readOnly type="checkbox" className="checkInput" onDoubleClick={this.props.onSelectTask(value)} />
                            <p className="content">
                                <span className="taskSpan" onClick={this.props.onEdit(value)}>{value.task}</span>
                                <span className="deleteSpan" onClick={this.props.onDeleteTask(value)}>-</span>
                            </p>
                        </li>
                    )
                }
            </ul>
        );
    }
}

export default DoneList;

