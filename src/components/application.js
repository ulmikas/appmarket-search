import React from 'react';
import {render} from 'react-dom';

export default class Application extends React.Component {
/*	static defaultProps = {
		namespace: '',
		title: '',
		description : '',
		author: '',
		thumb: '',
		pricing: '',
		categories: '',
		url: ''
	}
*/

	highlightQuery(str) {
		const pattern = new RegExp(`(${this.props.searchQuery})`, 'i');
		console.log(pattern, str.replace(pattern,'<span>$1<span>') );
		return str.replace(pattern,'<span>$1<span>');
	}

	renderHighlight(str, clsName) {
		const pattern = new RegExp(`(.*)(${this.props.searchQuery})+(.*)`, 'i');
		return (
			<div className={"apps-grid__"+clsName}>
				{str.replace(pattern, '<span>$2</span>')}
				{str.replace(pattern,'$1')}
				<span className="search-highlight">{str.replace(pattern,'$2')}</span>
				{str.replace(pattern,'$3')}
			</div>
		)
	}

	render() {
//		console.log(this.props);
		let descr;
		if (this.props.description) {
			  descr = (
					<div className="apps-grid__description">
						<span>{this.props.description}</span>
					</div>
				)
		}
		return (
			<a data-app_name="{this.props.namespace}" href="{this.props.url}" target="" className="apps-grid__item">
				<div className="apps-grid__thumb" style={{ backgroundImage: (this.props.logoUrl)? 'url(' + this.props.logoUrl + ')' : 'none' }}>
				{descr}
				</div>
				{this.renderHighlight(this.props.title, 'name')}
				<div className="apps-grid__category">{this.props.categories}</div>
				<div className="apps-grid__cost ">{this.props.pricing}</div>
			</a>
		)
	}
}
