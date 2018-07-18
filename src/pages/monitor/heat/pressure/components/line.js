import React, { Component } from 'react';
import echarts from  'echarts';
import axios from 'axios';
import { DatePicker } from 'antd';
import moment from 'moment';
import '../view.css';

class Line extends Component {

	constructor(props) {
		super(props);
		this.state = {
			"selectDate": "",
			"line1data": [],
			"line2data": [],

		};
		
		this.drawDiagram1 = this.drawDiagram1.bind(this);

		this.prasureDateInpChange = this.prasureDateInpChange.bind(this);

		this.getpreByDateSucc = this.getpreByDateSucc.bind(this);
		this.handlebyDateBtnClick = this.handlebyDateBtnClick.bind(this);
	}

	render() {
		return (
			<div>
				<h3 className="SelectByDate">
					<DatePicker  defaultValue={moment('2015-01-25', 'YYYY-MM-DD')} onChange={ this.prasureDateInpChange } className="timeSelect" />
					<input type="button" value="查询" onClick={ this.handlebyDateBtnClick }/>
				</h3>
				<div className="heat_preasure_diagram">
					<h3 className="heat_preasure_tip">
						<span ref={(SelectShowdate)=>{this.SelectShowdate = SelectShowdate;}}></span>
						<span ref={(SelectShowvalue)=>{this.SelectShowvalue = SelectShowvalue;}}></span>
						<span ref={(SelectShowstatus)=>{this.SelectShowstatus = SelectShowstatus;}}></span>
					</h3>
					<div id="heat_presure_diagram1Chart" style={{ width: 500, height: 500 }}></div>
				</div>
				
			</div>
		);
	}

	drawDiagram1(predata) {
		var data = predata.value || 0;
		var myChart = echarts.init(document.getElementById("heat_presure_diagram1Chart"));
		var option = {
			tooltip : {
		        formatter: "{b} : {c}%"
		    },
		    toolbox: {
		        feature: {
		            restore: {show: false},
		            saveAsImage: {show: false}
		        }
		    },
		    series: [
		        {
		            name: '气压变化',
		            type: 'gauge',
		            radius: '60%',
		            min: 0,
		            max: 120,
		            splitNumber: 6,
		            detail: {formatter:'{value}pa'},
		            data: [{value: data, name: '气压'}]
		        }
		    ]
		}
		myChart.setOption(option);
	}

	componentDidMount() {
		axios.get("http://10.100.121.116:8087/elk/pressure/queryPressureByDate?date=2018-01-25")
			.then(this.getpreByDateSucc)
	}

	prasureDateInpChange(value, dateString) {
		this.setState({
			selectDate: dateString
		});
	}

	getpreByDateSucc(res) {
		if(res.data.date!=="") {
			var preData = res.data ;
			this.drawDiagram1(preData);
			this.SelectShowdate.innerHTML = "Date: "+ preData.date;
			this.SelectShowvalue.innerHTML = "Value: "+preData.value;
			if(preData.date) {
				this.SelectShowstatus.innerHTML = "Status: "+preData.status;
			}else {
				this.SelectShowstatus.innerHTML = "Status: Not have Data!";
			}
		}else {
			console.log("not have Data!");
		}
	}

	handlebyDateBtnClick() {
		var date = this.state.selectDate;
		axios.get("http://10.100.121.116:8087/elk/pressure/queryPressureByDate?date="+date)
			.then(this.getpreByDateSucc)
	}



	componentWillUnmount(){
		this.drawDiagram1 = null;
		this.getpreByDateSucc = null;
		this.handlebyDateBtnClick = null;
	}
} 
export default Line;