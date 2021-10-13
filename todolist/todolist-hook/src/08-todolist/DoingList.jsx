import React, { Component } from 'react';

class DoingList extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.list.map(value => value.flag === false &&
                        <li draggable key={value.id} className="list" onDragStart={this.props.onDragStart(value)} onDragOver={this.props.onDragOver} onDrop={this.props.onDrop(value)}>
                            <input type="checkbox" className="checkInput" onClick={this.props.onSelectTask(value)} />
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

export default DoingList;

