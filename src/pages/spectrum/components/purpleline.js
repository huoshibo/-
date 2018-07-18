import React, { Component } from 'react';
import echarts from 'echarts';

class Purpleline extends Component {
	render() {
		return (
			<div>
				<div id="purplechart" style={{width:500, height: 500}}></div>
			</div>
		)
	}

	componentDidMount() {
		var myChart2 = echarts.init(document.getElementById("purplechart"));
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
		            data : ['1-1','1-2','1-3','1-4','1-5','1-6','1-7','1-8','1-9','1-10','1-11','1-12']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            name : '光强',
		            axisLabel : {
		                formatter: '{value} cd'
		            }
		        },
		        {
		            type : 'value',
		            name : '吸光度',
		            axisLabel : {
		                formatter: '{value} %'
		            }
		        }
		    ],
		    series : [
		        {
		            name:'光强',
		            type:'bar',
		            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
		        },{
		            name:'吸光度',
		            type:'line',
		            yAxisIndex: 1,
		            data:[10, 15, 35, 45, 100, 56, 68, 78, 89, 96, 87, 85]
		        }
		    ]
		};
                    
		myChart2.setOption(option);
	}
}

export default Purpleline;
