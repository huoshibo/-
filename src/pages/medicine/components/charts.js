import React, { Component } from 'react';
import echarts from 'echarts';

export default class Charts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BoxData: {}
		}
	}

	render() {
		return (
			<div>
				<h2>{ this.props.boxdata.name } 出自于 { this.props.boxdata.resource }</h2>
				<div id="chartWrapper" style={{ width: 500, height: 500 }}></div>
			</div>
		)
	}

	componentDidmount() {
		
	}

	componentWillReceiveProps(nextProps) {
		this.drawChart(nextProps.boxdata);
	}
		

	drawChart(data) {
			var name = data.name;
			var origindata = data.part;
			if(origindata && name) {
				var myChart = echarts.init(document.getElementById("chartWrapper"));
				var option = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{b}"
				    },
				    series: [
				        {
				            name: name,
				            type:'pie',
				            selectedMode: 'single',
				            radius: ['0', '25%'],

				            label: {
				            	normal: {
				                	position: 'center',
				                	 color: "#fff",
				                	 fontSize: 22,
				                	 fontWeight: "bold"
				            	},
				                formatter: "{a}",
				               
				            },
				            labelLine: {
				                normal: {
				                    show: true
				                }
				            },
				            data: [{"name": name, "value": 100}]
				        },
				        {
				            name:name+"成分",
				            type:'pie',
				            radius: ['40%', '55%'],
				            label: {
				                normal: {
				                    formatter: '{b|{b}：}{c}g ',
				                    backgroundColor: '#eee',
				                    borderColor: '#aaa',
				                    borderWidth: 1,
				                    borderRadius: 4,
				                    rich: {
				                        b: {
				                            fontSize: 12
				                        }
				                    }
				                }
				            },
				            data:origindata
				        }
				    ]
				};
			        
				myChart.setOption(option);
			}				
	}
}