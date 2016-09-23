import React from 'react';
import {render} from 'react-dom';
import apps from './data.json';
import Application from './components/Application.js';

class AppmarketSearch extends React.Component {
	constructor(props) {
		super(props);
		this.sfc = document.querySelector(props.fieldContainer);
		this.src = document.querySelector(props.resultContainer);
		this.state = {
			query: '',
			currApps: document.querySelector('.appmarket'),
			appmarket: apps,
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
			this.hideAppsBlocks();
		} else {
			this.showAppsBlocks();
		}
	}

	componentWillMount(){
		this.renderChildren();
	}

	componentDidUpdate() {
		this.renderChildren();
	}

	hideAppsBlocks(){
		[].slice.call(document.querySelectorAll('.appmarket__main .apps-block')).forEach( i => i.classList.add('apps-block--hidden')  )
	}

	showAppsBlocks(){
		[].slice.call(document.querySelectorAll('.appmarket__main .apps-block.apps-block--hidden')).forEach( i => i.classList.remove('apps-block--hidden')  )
	}

	renderApps() {
		if (!this.state.query) {
			return '';
		}
		return (
			<div className="apps-grid">
				{this.state.appmarket.map( (app, i) => <Application key={i} searchQuery={this.state.query} {...app} /> )}
			</div>
		);
	}

	renderChildren() {
		render(<input placeholder="search" value={this.state.query} onChange={this.onChange} />, this.sfc);
		render(<div>{this.renderApps()}</div>, this.src);
	}

	render () {
		return null;
	}
}

const inputContainer = document.createElement('div');
inputContainer.setAttribute('id', 'appmarket-search-field');
document.querySelector('.appmarket__navigation').appendChild(inputContainer);

const resultContainer = document.createElement('div');
resultContainer.setAttribute('id', 'appmarket-search-result');
document.querySelector('.appmarket__main').insertBefore(resultContainer, document.querySelector('.appmarket .apps-block'));

const amsContainer = document.createElement('div');
amsContainer.setAttribute('id', 'appmarket-search');
document.querySelector('.appmarket').append(amsContainer);
render(<AppmarketSearch fieldContainer="#appmarket-search-field" resultContainer="#appmarket-search-result"  />, amsContainer);
