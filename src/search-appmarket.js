import React from 'react';
import {render} from 'react-dom';

class AppmarketSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			currApps: document.querySelector('.appmarket')
		}
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({query: e.target.value});
		if (e.target.value !== '') {
			document.querySelector('.appmarket').style.display = 'none';
		} else {
			document.querySelector('.appmarket').style.display = 'block';
		}
	}


	componentWillMount(){

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
