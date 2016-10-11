import React from 'react';
import {render} from 'react-dom';
import Application from './components/Application.js';
import SearchField from './components/SearchField.js';
import SearchResults from './components/SearchResults.js';

class AppmarketSearch extends React.Component {
	constructor(props) {
		super(props);
		this.fieldContainer = document.querySelector(props.fieldContainer);
		this.resultContainer = document.querySelector(props.resultContainer);
		this.allApps = ecwidAppmarket || [],
			this.state = {
			query: '',
			appmarket: [],
		}
		this.onChange = this.onChange.bind(this);
	}

	/* eventHandlers */
	onChange(e) {
		this.setState({
			query: e.target.value,
			appmarket: this._filterApps(this._escapeRegExp(e.target.value))
		});
		if (e.target.value !== '') {
			this._hideAppsBlocks();
		} else {
			this._showAppsBlocks();
		}
	}

	componentWillMount() {
		this.renderChildren();
	}

	componentDidUpdate() {
		this.renderChildren();
	}

	renderChildren() {
		render(<SearchField onChange={this.onChange} query={this.state.query} />, this.fieldContainer);
		render(<SearchResults 
			appmarket={this.state.appmarket} 
			query={this.state.query} 
			onBackClick={() => { this.setState({query: '', appmarket: []});	this._showAppsBlocks(); }} />, this.resultContainer);
	}

	render () {
		return null;
	}

	_hideAppsBlocks(){
		[].slice.apply(document.querySelectorAll('.appmarket__main .apps-block, .appmarket__main .mobile-navigation, .appmarket__main .appmarket__main-header'))
			.forEach( i => i.classList.add('appmarket--hidden') );
	}

	_showAppsBlocks(){
		[].slice.apply(document.querySelectorAll('.appmarket__main .apps-block, .appmarket__main .mobile-navigation, .appmarket__main .appmarket__main-header'))
			.forEach( i => i.classList.remove('appmarket--hidden') )
	}

	/* utils */	
	_isContains(obj, key, val) {
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

	_escapeRegExp(str) {
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}

	_filterApps(value, key) {
		return this.allApps.filter( item => this._isContains(item, key || '', value) )
	}
}


const inputContainer = document.querySelector('.appmarket-search-field');
const resultContainer = document.createElement('div');
const amsContainer = document.createElement('div');
resultContainer.setAttribute('id', 'appmarket-search-result');
amsContainer.setAttribute('id', 'appmarket-search');
document.querySelector('.appmarket__main').insertBefore(resultContainer, document.querySelector('.appmarket .apps-block'));
document.querySelector('.appmarket').append(amsContainer);

render(<AppmarketSearch fieldContainer="#appmarket-search-field" resultContainer="#appmarket-search-result"  />, amsContainer);
