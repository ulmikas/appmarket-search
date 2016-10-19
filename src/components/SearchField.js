import React from 'react';

export default class SearchField extends React.Component {
  render() {
    return (
      <div className="apps-search">
        <input
          type="text"
          className="apps-search__input"
          placeholder="Search Apps"
          onChange={this.props.onChange}
          value={this.props.query}
        />
        <button className="apps-search__button">
          <span className="apps-search__icon">
            <svg viewBox="0 0 291 290" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.62 32.567c-43.422 43.42-43.53 114.553-.106 157.975 36.79 36.79 93.523 42.396 136.39 16.824l76.607 74.49c10.544 10.234 27.18 9.856 37.246-.846 10.068-10.702 9.804-27.54-.74-37.774l-75.443-73.115c26.452-42.994 21.08-100.39-16.083-137.553-43.422-43.423-114.45-43.423-157.87 0zm31.848 31.848c26.193-26.192 67.98-26.192 94.172 0 26.192 26.192 26.192 67.98 0 94.172-26.192 26.192-67.98 26.192-94.172 0-26.192-26.192-26.192-67.98 0-94.172z" fill="currentColor"/>
            </svg>
          </span>
        </button>
      </div>
    );
  }
}