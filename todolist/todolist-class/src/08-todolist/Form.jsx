import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    handleKeyUp(e) {
        if (e.keyCode === 13) {
            if (this.state.value === '') {
                alert('内容不能为空')
            }
            else {
                this.props.onReceiveTask(this.state.value);
                this.setState({
                    value: ''
                })
            }
        }
    }
    render() {
        return (
            <div className="bg">
                <div className="form-wrapper container">
                    <label className="logo" htmlFor="addInput">ToDoList</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} onKeyUp={this.handleKeyUp} id="addInput" placeholder="添加ToDo" autoComplete="off" />
                </div>
            </div>
        );
    }
}

export default Form;