import React, { Component } from 'react';
import { Link } from 'react-router';
import Temperature from './temperature/components/line.js';
import { connect } from 'react-redux';
/*import { GetPreasureStatus } from './actionCreator.js';*/
import { ChangeStatus } from './actionCreator.js';
import '../view.css';

class Heat extends Component {
	constructor(props) {
		super(props);
		this.state={
                       status:"" 
		};
		this.handlenavClick = this.handlenavClick.bind(this);
	}
	
	render() {
		return (
			<div>
				<div className="monitor_right_header">
					<ul className="monitor_right_header_ul" ref={(Tabnav)=>{this.Tabnav = Tabnav}}>
						<li id="temperature" className="monitor_rnav_active"><Link to="temperature">温度</Link></li>
						<li id="pressure"><Link to="pressure">压力</Link></li>
					</ul>
				</div>
				<div>
					{ this.props.children || <Temperature /> }
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.handlenavClick();
	}

	handlenavClick() {
		var that  = this;
		var btns = this.Tabnav.children;
		var len = btns.length, i;
		Array.from(btns).map((item, index)=>{
			item.onclick = function() {
				for(i=0; i<len; i++) {
					btns[i].className="";
				}
				this.className = "monitor_rnav_active";
				if(this.id.indexOf("temperature")!==-1){
                        that.props.changestatus({status:false});
				}else{
					that.props.changestatus({status:true});
				}
			}
			return "";
		})

		/*for(i=0; i<len; i++) {
			if(this.props.status) {
				btns[0].className = "";
				btns[1].className = "monitor_rnav_active";
			}
		}*/
	}
}

const mapStateToProps = (state)=>({
	status: state.bigscreen.PrasureNavStatus
})
const mapDispatchToProps = (dispatch)=>({
	changestatus: (Status)=>{
		dispatch(ChangeStatus(Status));
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(Heat);