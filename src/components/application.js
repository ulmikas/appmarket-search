import React from 'react';
import {render} from 'react-dom';

export default class Application extends React.Component {

	render() {
		let descr;
		let priceCls = (this.props.pricing.toLowerCase() === 'free')? ' apps-grid__cost--free' : '';
		if (this.props.description) {
			  descr = (
					<div className="apps-grid__description">
						<span>{this.props.description}</span>
					</div>
				)
		}
		return (
			<a data-app_name={this.props.namespace} href={this.props.url} target="_blank" className="apps-grid__item">
				<div className="apps-grid__thumb" style={{ backgroundImage: 'url(' + this.props.thumb + ')' }}>
				{descr}
				</div>
				<div className="apps-grid__title">{this.props.title}</div>
				<div className="apps-grid__category">{this.props.categories}</div>
				<div className={"apps-grid__cost" + priceCls}>{this.props.pricing}</div>
			</a>
		)
	}
}
