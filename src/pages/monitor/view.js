import React, { Component } from 'react';
import { Link } from 'react-router';
import { View as Heat } from './heat/';
 
import './view.css';

class Monitor extends Component {

	render() { 
		return (
			<div className="monitor_content">
				<div className="monitor_left">
					<ul className="monitor_left_ul">
						<li><Link to="/heat">萃取设备</Link></li>
						<li><Link to="/extractor">分离设备</Link></li>
					</ul>
				</div>
				<div className="monitor_right_main">
					{ this.props.children || <Heat />}
				</div>
			</div>
		);
	}

} 
export default Monitor;