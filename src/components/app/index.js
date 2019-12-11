import React, { Component } from 'react';

import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import TodoList from '../todo-list/';
import ItemStatusFilter from '../item-status-filter/';
import ItemAddForm from '../item-add-form/';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        status: 'all'
    };

    createTodoItem(label) {
       return {
           label: label,
           important: false,
           done: false,
           id: this.maxId++
       };
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id ===id);

        const oldItem = arr[idx];
        const newItem = {...oldItem,
            [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0,idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    addItem = (text) => {

        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {

            const newArray = [
                ...todoData,
                newItem
            ];

           return {
                 todoData: newArray
           };
        });
    };

    deleteItem = (id) => {

      this.setState(({ todoData }) => {

          const idx = todoData.findIndex((el) => el.id ===id);

          const newArray = [
              ...todoData.slice(0,idx),
              ...todoData.slice(idx + 1)
          ];

          return {
              todoData: newArray
          };
      });
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label
                    .toLowerCase().indexOf(term.toLowerCase()) > -1
        });
    }

    filter(items, filter) {
        if (filter === 'all') {
            return items;
        }
        if (filter === 'active') {
            return items.filter((item) => !item.done);
        } else {
            return items.filter((item) => item.done);
        }
    }

    onChangeTerm = (term) => {
        this.setState({ term });
    };

    onChangeFilter = (status) => {
        this.setState({ status });
    };

    render(){

        const { todoData, term, status } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), status);

        // const visibleItems = this.search(todoData, term);

        const doneCount = todoData.filter((el) => el.done).length;

        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onChangeTerm={this.onChangeTerm} />
                    <ItemStatusFilter
                        filter={status}
                        onChangeStatusFilter={this.onChangeFilter} />
                </div>

                <TodoList
                    todos={ visibleItems }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm
                    onItemAdded={ this.addItem }/>
            </div>
        );
    }
};