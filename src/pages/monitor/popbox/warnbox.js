import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../view.css';

class Warnbox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			
		};

		this.popbxClosebtnClick = this.popbxClosebtnClick.bind(this);
	}

	render() {
		return (
			<div className="Warnbox_wrapper" ref={(warnboxClose)=>{this.warnboxClose = warnboxClose;}}>
				<div className="glass_tem" ref={ (glass)=>{this.glass = glass} }></div>
				<div className="warnbox_tem">
					<h1><span>警告</span><b onClick={ this.popbxClosebtnClick }>X</b></h1>
				</div>
			</div>
		)
	}

	popbxClosebtnClick() {
		this.glass.style.display = 'none';
		this.warnboxClose.style.display = 'none';
	}
}

const mapStateToProps = (state)=>{
	return {

	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Warnbox);