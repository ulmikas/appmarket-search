import React from 'react';
import {render} from 'react-dom';

export default class Application extends React.Component {

	render() {
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
				<div className="apps-grid__title">{this.props.title}</div>
				<div className="apps-grid__category">{this.props.categories.join(', ')}</div>
				<div className="apps-grid__cost ">{this.props.pricing}</div>
			</a>
		)
	}
}
