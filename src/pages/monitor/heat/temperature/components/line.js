import React, { Component } from 'react';
import echarts from 'echarts';
import axios from 'axios';
import { DatePicker } from 'antd';
import moment from 'moment';

import '../view.css';

class Line extends Component {

	constructor(props) {
		super(props);
		this.state = {
			"line3data": [],
			"begintime": "",
			"endtime": "",
			"byDateValue": "",
			"xAxisData": [],
			"yAxisData": []
		};
		
		this.drawline1 = this.drawline1.bind(this);
		this.drawdiagram1 = this.drawdiagram1.bind(this);
		this.drawdiagram2 = this.drawdiagram2.bind(this);
   		
   		this.beginInpChange = this.beginInpChange.bind(this);
   		this.endInpChange = this.endInpChange.bind(this);

   		this.byDatediagramInpChange = this.byDatediagramInpChange.bind(this);

		this.handleBtnClick = this.handleBtnClick.bind(this);

		this.handleGetChartdataSucc = this.handleGetChartdataSucc.bind(this);

		this.handleGetTemDataSucc = this.handleGetTemDataSucc.bind(this);
		this.handlebyDateBtnClick = this.handlebyDateBtnClick.bind(this);
		this.handleGetTemBydateSucc = this.handleGetTemBydateSucc.bind(this);
	}

	render() {
		return (
			<div>
				<div className="tem_chartWrapper">
					<div>
						<div className="tem_date_select">
							<DatePicker  defaultValue={moment('2015-01-25', 'YYYY-MM-DD')} onChange={ this.beginInpChange } />
							<DatePicker  defaultValue={moment('2015-01-29', 'YYYY-MM-DD')} onChange={ this.endInpChange } />
							<input type="button" value="查询" onClick={ this.handleBtnClick } />
						</div>
						<div id="tem_line1Chart" style={{ width: 500, height: 500 }}  className="tem_line1Chart"></div>
					</div>
					<div>
						<h3 className="tem_diagram1_tip">
							<span ref={(temSelectdate)=>{this.temSelectdate = temSelectdate;}}></span>
							<span ref={(temvalue)=>{this.temvalue = temvalue;}}></span>
							<span ref={(warntip)=>{this.warntip = warntip;}}></span>
						</h3>
						<h4 className="tem_diagram1_tip">提示：温度在60~100℃之间为正常状态</h4>
						<div id="tem_diagram1Chart" className="tem_diagram1Chart" style={{ width: 500, height: 500 }}></div>
					</div>
					<div>
						<h3 className="tem_diagram2_tip">
							<DatePicker defaultValue={moment('2015-02-11', 'YYYY-MM-DD')} onChange={ this.byDatediagramInpChange } />
							<input type="button" value="查询" onClick={ this.handlebyDateBtnClick }/>
						</h3>
						<div id="tem_diagram2Chart" style={{ width: 500, height: 500 }} className="tem_diagram2Chart"></div>
					</div>
				</div>
			</div>
		);
	}

	drawline1() {
		this.myechart1 = echarts.init(document.getElementById("tem_line1Chart"));
		var data = this.state.line3data;
		var  i, len = data.length, xData=[], yData=[];

		for( i=0; i<len; i++ ) {
			xData.push(data[i].time);
			yData.push(data[i].tem);
		}

		var option = {
		    title: {
		        text: '温度监控'
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross'
		        },
		        enterable: true,
		        transitionDuration: 0.5,
		        pormatter: '{a} <br /> {b}:{c} 度'
		    },
		    toolbox: {
		        show: true,
		        orient: 'vertical',
		        showTitle: true,

		        feature: {
		        	magicType: {
		        		type: ['bar', 'line']
		        	},
		            saveAsImage: {
		            	show: false
		            }
		        }
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: xData
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} ℃'
		        },
		        axisPointer: {
		            snap: true
		        }
		    },
		    series: [
		        {
		            name:'温度',
		            type:'line',
		            smooth: true,
		            data: yData,
		        }
		    ]
		};

		this.myechart1.setOption(option); 	
	}

	drawdiagram1(value) {
		var data = value || 0;
		this.myechart2 = echarts.init(document.getElementById("tem_diagram1Chart"));
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
		            name: '温度变化',
		            type: 'gauge',
		            radius: '60%',
		            min: 0,
		            max: 120,
		            splitNumber: 6,
		            detail: {formatter:'{value}℃'},
		            data: [{value: data, name: '温度'}]
		        }
		    ]
		}
		this.myechart2.setOption(option);
	}

	drawdiagram2(value) {
		var data = value || 0;
		this.myechart3 = echarts.init(document.getElementById("tem_diagram2Chart"));
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
		            name: '温度变化',
		            type: 'gauge',
		            radius: '60%',
		            min: 0,
		            max: 120,
		            splitNumber: 6,
		            detail: {formatter:'{value}℃'},
		            data: [{value: data, name: '温度'}]
		        }
		    ]
		}
		this.myechart3.setOption(option);
	}

	componentDidMount() {
		axios.get("http://10.100.121.116:8087/elk/temperature/queryTemperatureByDateInterval?startDate=2018-01-25&endDate=2018-01-29")
			.then(this.handleGetChartdataSucc)
			
		this.timer1 = setInterval(()=>{
			axios.get("http://10.100.121.116:8087/elk/temperature/queryTemperatureRealime")
			.then(this.handleGetTemDataSucc)
		}, 1000);

		axios.get("http://10.100.121.116:8087/elk/temperature/queryTemperatureByDate?date=2018-01-25")
			.then(this.handleGetTemBydateSucc)


		this.drawdiagram1();
		
	}

	handleGetChartdataSucc(res) {
		const line3 = res.data;
		this.setState({
			line3data: line3
		});

		this.drawline1();
	}

	beginInpChange(value, dateString) {
		this.setState({
			begintime: dateString
		})
	}	

	endInpChange(value, dateString) {
		this.setState({
			endtime: dateString
		})
	}

	handleBtnClick() {
		console.log();
		var begin = this.state.begintime;
		var end = this.state.endtime;
		var mmbegin = Date.parse(begin);
		var mmend = Date.parse(end);
		if(mmbegin <= mmend) {
			axios.get("http://10.100.121.116:8087/elk/temperature/queryTemperatureByDateInterval?startDate="+begin+"&endDate="+end)
				.then(this.handleGetChartdataSucc)
		}else {
			alert("时间选择不正确，请重新选择");
		}
	}

	handleGetTemDataSucc(res) {
		if(res.data.length > 0) {
			var temValue = res.data[0].tem;
			this.drawdiagram1(temValue);
			this.temSelectdate.innerHTML = "日期："+ res.data[0].time;
			this.temvalue.innerHTML = "温度："+temValue+"℃";
			if(temValue<60 || temValue>100) {
				this.warntip.innerHTML ="状态: 警告, 温度异常";
				this.warntip.style.color = "red";
			}else {
				this.warntip.innerHTML ="状态: 正常";
				this.warntip.style.color = "green";
			}
		}else {
			this.warntip.innerHTML ="暂时没有该项数据";
			this.temSelectdate.innerHTML = "日期：暂时没有该日期下的数据";
			this.drawdiagram1(0);
		}
	}

	handleGetTemBydateSucc(res) {
		if(res.data.time!=="") {
			var Temvalue = res.data.tem;
			this.drawdiagram2(Temvalue);
		}else {
			console.log("not have Data!");
		}
		
	}

	byDatediagramInpChange(value, dateString) {
		this.setState({
			"byDateValue": dateString
		});
	}

	handlebyDateBtnClick() {
		var Selectdate = this.state.byDateValue;
		axios.get("http://10.100.121.116:8087/elk/temperature/queryTemperatureByDate?date="+Selectdate)
			.then(this.handleGetTemBydateSucc)
	}
	
	componentWillUnmount() {
		clearInterval(this.timer1);
		this.drawline1 = null;
		this.drawdiagram1 = null;
		this.drawdiagram2 = null;

		this.handleBtnClick = null;
		this.handleGetChartdataSucc = null;
		this.handleGetTemDataSucc = null;
	}
} 

export default Line;