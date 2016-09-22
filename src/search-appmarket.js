import React from 'react';
import {render} from 'react-dom';
import apps from './data.json';
import Application from './components/Application.js';

class AppmarketSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			currApps: document.querySelector('.appmarket'),
			appmarket: apps
		}
		this.onChange = this.onChange.bind(this);
	}

	isContains(obj, key, val) {
		let pattern = new RegExp(val, "i");
		if (key && obj.hasOwnProperty(key)) {
			return pattern.test(obj[key]);
		}
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				if (pattern.test(obj[i])) {
					return true;
				}
			}
		}
		return false;
	}

	escapeRegExp(str) {
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}

	filterApps(value, key) {
		return apps.filter( item => this.isContains(item, key || '', value) )
	}

	onChange(e) {
		this.setState({
			query: this.escapeRegExp(e.target.value),
			appmarket: this.filterApps(this.escapeRegExp(e.target.value))
		});
		if (e.target.value !== '') {
			document.querySelector('.appmarket').style.display = 'none';
		} else {
			document.querySelector('.appmarket').style.display = 'block';
		}
	}

	componentWillMount(){
	}

	render () {
		console.log(this.state.appmarket)
		return (
			<div className="appmarket">
				<input placeholder="search" value={this.state.query} onChange={this.onChange} />
				<div className="apps-grid">
					{this.state.appmarket.map( (app, i) => <Application key={i} searchQuery={this.state.query} {...app} /> )}
				</div>
			</div>
		);
	}
}

render(<AppmarketSearch/>, document.getElementById('appmarket-search'));
