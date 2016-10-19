import React from 'react';
import { render } from 'react-dom';
import Application from './Application';

export default class SearchResults extends React.Component {

  renderApps() {
    if (!this.props.query) {
      return '';
    } else if (this.props.appmarket.length) {
      return (
        <div className="search-result">
          <header className="appmarket__main-header">
            <h1>Search results for «{this.props.query}»</h1>
          </header>
          <div className="apps-grid">
            {this.props.appmarket.map((app, i) =>
              <Application key={app.namespace} searchQuery={this.props.query} {...app} />)}
          </div>
        </div>
      );
    } else {
      return (
        <div className="search-result search-result--empty">
          <header className="appmarket__main-header">
            <h1>Nothing found :(</h1>
            <h2>Your search for «{this.props.query}» did not match any items.</h2>
          </header>
          <a
            href="https://my.ecwid.com/cp/CP.html#appmarket:cat=all-apps"
            className="btn btn-primary btn-large btn-orange back-to-appmarket"
            onClick={e => {
              e.preventDefault();
              const mc = document.querySelector('.main-container');
              if (!mc) {
                let query_string = {};
                const query = window.location.search.substring(1);
                const vars = query.split("&");
                for (let i=0; i < vars.length; i++) {
                  const pair = vars[i].split("=");
                  if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                  } else if (typeof query_string[pair[0]] === "string") {
                    const arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                    query_string[pair[0]] = arr;
                  } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                  }
                }
                const storeid = query_string.storeid || '';
                window.location = 'all-apps.html?storeid=' + storeid;
              }
            }}
          >Show all applications</a>
        </div>
      );
    }
  }

  render() {
    return <div>{ this.renderApps() }</div>
  }
}
