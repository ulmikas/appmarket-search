import React from 'react';
import {render} from 'react-dom';
import Application from './Application.js';

export default class SearchResults extends React.Component {

	renderApps() {
		if (!this.props.query) {
			return '';
		} else if ( this.props.appmarket.length ) {
			return (
				<div className="search-result">
					<header className="appmarket__main-header">
					<h1>Search results for «{this.props.query}»</h1>
					</header>
					<div className="apps-grid">
					{this.props.appmarket.map( (app, i) => <Application key={app.namespace} searchQuery={this.props.query} {...app} /> )}
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
					<button className="btn btn-primary btn-large btn-orange back-to-appmarket" onClick={this.props.onBackClick} >
						<span>Back to Appmarket</span>
					</button>
				</div>
			 );
		}
	}

	render() {
		return <div>{ this.renderApps() }</div>
	}
}
