import React, { Component } from 'react';
import { Link } from 'react-router';
import './view.css';

export default class CommonWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.handlenavClick = this.handlenavClick.bind(this);
	}

	render() {
		return (
			<div>
				<div className="common_header">
					<h1 className="common_header_title"><Link to="/">Medicine Data Management</Link></h1>
				</div>
				<div className="common_content">
					<div className="common_listNav">
						<ul className="common_listNav_ul" ref={ (comnav)=>{ this.comnav = comnav } }>
						  <li className="common_active"><Link to="monitor">设备</Link></li>
						  <li><Link to="medicine">药方</Link></li>
						  <li><Link to="spectrum">光谱</Link></li>
						  <li><Link to="bigScreen">大屏展示</Link></li>
						</ul>
					</div>
					<div className="showchart">{ this.props.children }</div>
				</div>
				<div style={{display:"none"}}>footer</div>
			</div>
		);
	}

	componentDidMount() {
		this.handlenavClick();
	}

	handlenavClick() {
		var btns = this.comnav.children;
		var len = btns.length;
		Array.from(btns).map((item, index)=>{
			item.onclick = function() {
				for(var i=0; i<len; i++) {
					btns[i].className = "";
				}
				this.className = "common_active";
			}
			return "";
		})	
	}
}