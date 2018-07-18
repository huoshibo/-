import React, { Component } from 'react';
import axios from 'axios';
import echarts from 'echarts';
import '../view.css';

class Redline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"medicineName": [],
			"showData": []
		}

		this.drawChart = this.drawChart.bind(this);
		this.handleGetDataSucc = this.handleGetDataSucc.bind(this);

		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	render() {
		const options = this.state.medicineName.map((item, index)=>{
			return (
				<option key={item}>{ item }</option>
			)
		});

		return (
			<div>
				<div className="SelectMedicine">
					<select onChange={ this.handleSelectChange }>{ options }</select>
				</div>
				<div className="redWrapper_chart">
					<div id="redchart" style={{width:1000, height: 500}}></div>
				</div>
			</div>
		)
	}

	componentDidMount() {
		axios.get("http://localhost:3000/mock/light.json")
			.then(this.handleGetDataSucc);
	}

	handleGetDataSucc(res) {
		const data = res.data.data;
		var medicineName = [], showData=[];
		data.map((item, index)=>{
			medicineName.push(item.name);
			showData.push(item.data);
			return "";
		});

		this.setState({
			"medicineName": medicineName,
			"showData": showData
		});

		this.drawChart();
	}

	drawChart(data) {
		const chartshowdata = data || this.state.showData[0];
		const xData = [], yData1 = [], yData2 = [];
		chartshowdata.map((value, index)=>{
			xData.push(value.date);
			yData1.push(value.light_intensity);
			yData2.push(value.absorbancy);
			return "";
		});
		var myChart1 = echarts.init(document.getElementById("redchart"));
		var option = {
		    tooltip : {
		        trigger: 'axis'
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: false, readOnly: false},
		            magicType: {show: false, type: ['line', 'bar']},
		            restore : {show: false},
		            saveAsImage : {show: false}
		        }
		    },
		    calculable : true,
		    legend: {
		        data:['光强','吸光度']
		    },
		    xAxis : [
		        {
		            type : 'category',
		            axisTick: {
		            	alignWithLabel: true,
		            	interval: 0
		            },
		            data : (function() {
		            	var now = new Date();
		            	var res = [];
		            	var len = 10
		            	while(len--) {
		            		res.unshift(now.toLocaleTimeString().replace(/^\D/, ''));
		            		now = new Date(now-2000);
		            	}
		            	return res;
		            })()
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            name : '光强',
		            position: 'left',
		            axisLabel : {
		                formatter: '{value} cd'
		            }
		        },
		        {
		            type : 'value',
		            name : '吸光度',
		            position: 'right',
		            axisLabel : {
		                formatter: '{value} %'
		            }
		        }
		    ],
		    series : [
		        {
		            name:'光强',
		            type:'bar',
		            data:yData1
		        },{
		            name:'吸光度',
		            type:'line',
		            yAxisIndex: 1,
		            data:yData2
		        }
		    ]
		};
		this.timer1 = setInterval(()=>{
			var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
			var data0 = option.series[0].data;
			var data1 = option.series[1].data;
			data0.shift();
			data0.push(Math.round(Math.random()*1000));
			data1.shift();
			data1.push((Math.random()*10+5).toFixed(1)-0);

			option.xAxis[0].data.shift();
			option.xAxis[0].data.push(axisData);
			myChart1.setOption(option);

		}, 1500);       
	}

	handleSelectChange(e) {
		clearInterval(this.timer1);
		const name = e.target.value;
		this.state.medicineName.map((value, index)=>{
			if(value === name) {
				const chartData = this.state.showData[index];
				this.drawChart(chartData);
			}
			return "";
		});
	}

	componentWillUnmount() {
		clearInterval(this.timer1);
	}
}

export default Redline;
