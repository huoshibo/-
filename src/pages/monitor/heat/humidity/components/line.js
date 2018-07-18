import React, { Component } from 'react';
import echarts from  'echarts';
import axios from 'axios';
import '../../view.css';

class Line extends Component {

	constructor(props) {
		super(props);
		this.state = {
			"ydata1": []
		};

		this.handleGetLineSucc = this.handleGetLineSucc.bind(this);
		
		this.drawline1 = this.drawline1.bind(this);
	}

	render() {
		return (
			<div>	
				<div id="line" style={{ width: 600, height: 600 }}></div>
			</div>
		);
	}

	drawline1(ydata1, ydata2) {
		var myChart = echarts.init(document.getElementById("line"));
		var option = {

			tooltip: {
		        trigger: 'axis'
		    },
		    
		    legend: {
		        data:['2017-1-16','2017-1-17']
		    },

		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },

			xAxis: {
				name: '时间',
				nameLocation: 'end',
				boundaryGap: ['20%', '20%'],
		        type: 'category',
		        data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
		    },

		    yAxis: {
		    	name: '压力/pa',
		    	nameLocation: 'end',
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} pa'
		        }
		    },

		    series: [{
	            name:'2018-1-16',
	            type:'line',
	            data:ydata1
		    }]
		}

		myChart.setOption(option);
	}


	componentDidMount() {
		axios.get("api/line2.json")
			.then(this.handleGetLineSucc)	
	}

	handleGetLineSucc(res) {
		const { ydata1, ydata2 } = res.data.data;
		this.setState({
			ydata1: ydata1,
			ydata2: ydata2
		});
		this.drawline1(this.state.ydata1, this.state.ydata2);
	}
} 
export default Line;