import React, { Component } from 'react';
import { Link } from 'react-router';
import './view.css';

export default class Medicine extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.headerNavClick = this.headerNavClick.bind(this);

	}	
	render() {
		return (
			<div className="medicineWrapper">
				<div className="medicine_left">
					<ul>
						<li>药方图谱</li>
					</ul>
				</div>
				<div className="medicine_right">
					<div className="medicine_header">
						<div className="medicine_header_nav" ref={(mh_nav)=>{this.mh_nav = mh_nav;}}>
							<Link to="variety" className="me_aActive"><span>按品种查询</span></Link>
							<Link to="mid_medicine"><span>按中成药查询</span></Link>
						</div>
					</div>
					<div className="chartWrapper">
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.headerNavClick();
	}

	headerNavClick() {
		var navs = this.mh_nav.children;
		var len = navs.length;
		Array.from(navs).map((item, index)=>{
			item.onclick = function() {
				for(var i=0; i<len; i++) {
					navs[i].className = "";
				}
				this.className="me_aActive";
			}
			return "";
		});
	}
}