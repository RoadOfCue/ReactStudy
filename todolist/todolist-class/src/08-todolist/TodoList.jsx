import React, { Component } from 'react';
import localStorage from 'localStorage'

import Form from './Form'
import DoingList from './DoingList'
import DoneList from './DoneList'
import Foot from './Foot'

import './index.css'

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            id: 0,
            doingCount: 0,
            doneCount: 0,
        }
        this.handleReceiveTask = this.handleReceiveTask.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleSelectTask = this.handleSelectTask.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.load = this.load.bind(this);
    }

    handleReceiveTask(props) {
        let taskObj = {
            id: this.state.id++,
            task: props,
            flag: false
        };
        this.state.list.push(taskObj);
        this.state.doingCount++;
        this.setState({});
        localStorage.setItem('list', JSON.stringify(this.state.list));
        localStorage.setItem('doingCount', this.state.doingCount);
        localStorage.setItem('id', this.state.id);
        if (!localStorage.getItem('doneCount')) {
            localStorage.setItem('doneCount', 0)
        }
    }

    handleDeleteTask(obj) {
        return () => {
            let newList = this.state.list.filter(value => value.id !== obj.id);
            if (obj.flag) {
                this.state.doneCount--;
                localStorage.setItem('doneCount', this.state.doneCount);
            } else {
                this.state.doingCount--;
                localStorage.setItem('doingCount', this.state.doingCount);
            }
            this.setState({
                list: newList,
            });
            localStorage.setItem('list', JSON.stringify(newList));
        }
    }

    handleSelectTask(obj) {
        return () => {
            if (obj.flag === true) {
                this.state.doneCount--;
                this.state.doingCount++;
            }
            else {
                this.state.doneCount++;
                this.state.doingCount--;
            }
            localStorage.setItem('doneCount', this.state.doneCount);
            localStorage.setItem('doingCount', this.state.doingCount);
            const index = this.state.list.findIndex(value => value.id === obj.id);
            this.state.list[index].flag = !this.state.list[index].flag;
            localStorage.setItem('list', JSON.stringify(this.state.list));
            this.setState({})
        }
    }

    handleEdit(obj) {
        return (e) => {
            let oldHtml = e.target.innerHTML;
            if (oldHtml.indexOf('type="text"') > 0) {
                return;
            }
            const inputId = "input-" + obj.id;
            e.target.innerHTML = `<input id=${inputId} type="text" value=` + oldHtml + " />";
            let input = document.getElementById('input-' + obj.id);
            input.setSelectionRange(0, oldHtml.length);
            input.onblur = () => {
                if (input.value === '') {
                    e.target.innerHTML = oldHtml;
                    alert('内容不能为空！');
                }
                else {
                    let newList = JSON.parse(localStorage.getItem("list"));
                    newList.forEach((value) => {
                        if (value.task === oldHtml) {
                            value.task = input.value;
                        }
                    })
                    localStorage.setItem('list', JSON.stringify(newList));
                    e.target.innerHTML = input.value;
                    obj.task = input.value;
                }
            }
            input.focus();
        }
    }

    handleClear() {
        localStorage.clear();
        this.setState({
            list: [],
            doingCount: 0,
            doneCount: 0,
            id: 0
        });
    }

    handleDragStart(obj) {
        return (e) => {
            // 设置或返回被拖动元素允许发生的拖放行为
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('dragTask', obj.task);
            e.dataTransfer.setData('dragId', obj.id);
        }
    }

    handleDragOver(e) {
        // 取消事件的默认动作 drop事件的默认行为是以链接形式打开
        if (e.preventDefault) {
            e.preventDefault();
        }
        // 设置或返回拖放目标上允许发生的拖放行为
        e.dataTransfer.dropEffect = 'move';
    }

    handleDrop(obj) {
        return (e) => {
            // 停止事件的传播，阻止它被分派到其他dom节点
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            let list = JSON.parse(localStorage.getItem("list"));
            const dragId = +e.dataTransfer.getData('dragId');
            let temp = e.dataTransfer.getData('dragTask');
            list[dragId].task = obj.task;
            list[obj.id].task = temp;
            localStorage.setItem('list', JSON.stringify(list));
            this.load();
        }
    }

    load() {
        if (localStorage.getItem("list")) {
            const list = JSON.parse(localStorage.getItem("list"));
            const doingCount = parseInt(localStorage.getItem("doingCount"));
            const doneCount = parseInt(localStorage.getItem("doneCount"));
            // 取出id为字符串类型
            const id = parseInt(localStorage.getItem("id"));
            this.setState({
                list: list,
                doingCount: doingCount,
                doneCount: doneCount,
                id: id
            })
        }
        else {
            this.setState({
                list: [],
                doingCount: 0,
                doneCount: 0,
                id: 0
            })
        }
    }

    componentDidMount() {
        this.load();
    }

    render() {
        return (
            <div>
                <Form onReceiveTask={this.handleReceiveTask}></Form>
                <div className="doing list-wrapper container">
                    <h2 className="doing">正在进行<span className="count">{this.state.doingCount}</span></h2>
                    <DoingList list={this.state.list} onDeleteTask={this.handleDeleteTask} onSelectTask={this.handleSelectTask} onEdit={this.handleEdit}
                        onDragStart={this.handleDragStart} onDragOver={this.handleDragOver} onDrop={this.handleDrop}
                    ></DoingList>
                </div>
                <div className="done list-wrapper container">
                    <h2 className="done">已经完成<span className="count">{this.state.doneCount}</span></h2>
                    <DoneList list={this.state.list} onDeleteTask={this.handleDeleteTask} onSelectTask={this.handleSelectTask} onEdit={this.handleEdit}></DoneList>
                </div>
                <Foot onClear={this.handleClear} />
            </div>
        );
    }
}

export default TodoList;