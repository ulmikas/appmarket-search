import React from 'react';
import {render} from 'react-dom';
import apps from './data.json';

class AppmarketSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			currApps: document.querySelector('.appmarket')
		}
		this.onChange = this.onChange.bind(this);
	}

	isContains(obj, key, val) {
		let pattern = new RegExp(this.escapeRegExp(val), "i");
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
		this.setState({query: e.target.value});
		if (e.target.value !== '') {
			document.querySelector('.appmarket').style.display = 'none';
		} else {
			document.querySelector('.appmarket').style.display = 'block';
		}
		console.log( this.filterApps(this.state.query));
	}

	componentWillMount(){
		console.log(apps);
		4h
	}

	render () {
		return (
			<div>
				<p> Hello React!</p>
				<input placeholder="search" value={this.state.query} onChange={this.onChange} />
			</div>
		);
	}
}

render(<AppmarketSearch/>, document.getElementById('appmarket-search'));
