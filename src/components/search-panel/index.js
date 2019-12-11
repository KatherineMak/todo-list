import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        searchField: ''
    };

    onSearchFieldChange = (e) => {
        const searchField =  e.target.value;
        this.setState({ searchField });
        this.props.onChangeTerm(searchField);
    };

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   onChange={this.onSearchFieldChange}
                   value={this.state.searchField}
            />
        );
    }
};