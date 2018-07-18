import React, { Component } from 'react';
import { Link } from 'react-router';
import './view.css';



class Spectrum extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<div className="Sepctrum_navleft">
					<div><Link to="redline">红外光谱</Link></div>
					<div><Link to="purpleline">紫外光谱</Link></div>
				</div>
				<div className="Sepctrum_chartright">
					{this.props.children}
				</div>
			</div>
		);
	}
} 
export default Spectrum;