import React, { Component } from 'react';
import echarts from 'echarts';
import axios from 'axios';
import { DatePicker } from 'antd';
import moment from 'moment';
import '../view.css';

class Chart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			begintime: "",
			endtime: "",
			diagramData: [],
			lineData: [],
			tabledata: []
		}

		//绘制图表 折线图 仪表图
		this.drawAllLine = this.drawAllLine.bind(this);
		this.drawDiagram = this.drawDiagram.bind(this);

		//折线图日期查询按钮
		this.beginInpChange = this.beginInpChange.bind(this);
		this.endInpChange = this.endInpChange.bind(this);
		this.handleBtnClick = this.handleBtnClick.bind(this);

		//折线图请求成功
		this.handleGetDataSucc = this.handleGetDataSucc.bind(this);

		//仪表图请求成功
		this.handleGetPreDataSucc = this.handleGetPreDataSucc.bind(this);
	}
	render() {
		const lis = this.state.tabledata.map((item, index)=>{
			if(item.status === "偏高" || item.status === "偏低") {
				return (
					<li key={item.date} className="table_li table_li_warn" ref={(tables_lis)=>{this.tables_lis = tables_lis;}}>
						<span className="table_date">{ item.date }</span>
						<span className="table_value">{ item.value }</span>
						<span className="table_status">{ item.status }</span>
					</li>
				);
			}else if(item.status === "正常") {
				return (
					<li key={item.date} className="table_li table_li_normal" ref={(tables_lis)=>{this.tables_lis = tables_lis;}}>
						<span className="table_date">{ item.date }</span>
						<span className="table_value">{ item.value }</span>
						<span className="table_status">{ item.status }</span>
					</li>
				);
			}else {
				return (
					<li  key={item.date} className="table_li table_li_danger" ref={(tables_lis)=>{this.tables_lis = tables_lis;}}>
						<span className="table_date">{ item.date }</span>
						<span className="table_value">{ item.value }</span>
						<span className="table_status">{ item.status }</span>
					</li>
				);
			}
		});
		return (
			<div>
				<div className="extractor_preLineWrapper">
					<div className="extractor_preLine_SelectDate">
						<DatePicker  defaultValue={moment('2015-01-25', 'YYYY-MM-DD')} onChange={ this.beginInpChange } className="timeSelect" />
						<DatePicker  defaultValue={moment('2015-01-29', 'YYYY-MM-DD')} onChange={ this.endInpChange } className="timeSelect" />
						<input type="button" value="查询" onClick={ this.handleBtnClick } />
					</div>
					<div className="ChartAndTableWrap">
						<div>
							<div id="extractor_preline1" style={{width: 500, height: 500}} className="chartLine"></div>
						</div>
						<div className="showPreTable">
							<ul className="showTable_ul">
								<li className="li_title"><span className="table_date">日期</span><span className="table_value">压力值 ( pa )</span><span className="table_status">状态</span></li>
								{ lis }
							</ul>
						</div>
					</div>
				</div>
				<div className="extractor_preDiagramWrapper">
					<div className="diagramChartWrapper">						
						<h3>
							<span ref={(preSelectdate)=>{this.preSelectdate = preSelectdate;}}></span>
							<span ref={(valuetip)=>{this.valuetip = valuetip;}}></span>
							<span ref={(warntip)=>{this.warntip = warntip;}}></span>
						</h3>
						<h4>提示：气压大小在80~10 pa之间为正常状态</h4>
						<div className="extractor_presureDiagram">
							<div id="extractor_prediagram1" style={{ width: 500, height: 415 }}></div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	componentDidMount() {
		var startDate = '2018-01-25';
		var endDate = '2018-01-29';
		axios.get("http://10.100.121.116:8087/elk/pressure/queryPressureByDateInterval?startDate="+startDate+"&endDate="+endDate)
			.then(this.handleGetDataSucc)
			
		this.timer1 = setInterval(()=>{
			axios.get("http://10.100.121.116:8087/elk/pressure/queryPressureRealime")
			.then(this.handleGetPreDataSucc)	
		}, 1000);
	}

	drawAllLine() {
		this.myechartLine = echarts.init(document.getElementById("extractor_preline1"));
		var data = this.state.lineData;
		var i, len = data.length, xData=[], yData=[], TableData=[];

		
		for( i=0; i<len; i++ ) {
			TableData.push(data[i]);
			xData.push(data[i].date);
			yData.push(data[i].value);
		}

		this.setState({
			tabledata: TableData
		});	

		var option = {
		    title: {
		        text: '压力值监控'
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross'
		        },
		        enterable: true,
		        transitionDuration: 0.5,
		        pormatter: '{a} <br /> {b}:{c} pa'
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
		            formatter: '{value} pa'
		        },
		        axisPointer: {
		            snap: true
		        }
		    },
		    series: [
		        {
		            name:'压力值',
		            type:'line',
		            smooth: true,
		            data: yData,
		        }
		    ]
		};
		this.myechartLine.setOption(option); 	
	}

	handleGetDataSucc(res) {
		const diagramData = res.data;
		this.setState({
			lineData: diagramData
		});

		this.drawAllLine();
	}

	drawDiagram(value) {
		var myChart = echarts.init(document.getElementById("extractor_prediagram1"));
		var option = {
			tooltip : {
		        formatter: "{b} : {c}pa"
		    },
		    toolbox: {
		        feature: {
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    series: [
		        {
		            name: '压力变化',
		            type: 'gauge',
		            min:0,
		            max: 100,
		            splitNumber: 10,
		            detail: {formatter:'{value}pa'},
		            data: [{value: value, name: '压力值'}]
		        }
		    ]
		}
		myChart.setOption(option);
	}

	handleGetPreDataSucc(res) {
		if(res.data.length>0) {
			var preValue = res.data[0].value;
			this.drawDiagram(preValue);
			this.preSelectdate.innerHTML = "日期："+ res.data[0].date;
			this.valuetip.innerHTML = "值："+ res.data[0].value+ "pa";
			if(preValue < 60 || preValue > 100) {
				this.warntip.innerHTML ="状态: 警告, 气压异常";
				this.warntip.style.color = "red";
			}else {
				this.warntip.innerHTML ="状态: 正常";
				this.warntip.style.color = "green";
			}
		}else {
			this.warntip.innerHTML ="暂时没有该项数据";
			this.preSelectdate.innerHTML = "日期：没有该日期的数据";
			this.drawDiagram(0);
		}
	}

	beginInpChange(value, dateString) {
		this.setState({
			begintime: dateString
		});
	}

	endInpChange(value, dateString) {
		this.setState({
			endtime: dateString
		});
	}

	handleBtnClick() {
		var begin = this.state.begintime;
		var end = this.state.endtime;
		var mmbegin = Date.parse(begin);
		var mmend = Date.parse(end);
		if(begin!=="" && end!=="" && mmbegin <= mmend) {
			axios.get("http://10.100.121.116:8087/elk/pressure/queryPressureByDateInterval?startDate="+begin+"&endDate="+end)
				.then(this.handleGetDataSucc)
		}else {
			alert("时间选择不正确，请重新选择");
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer1);
	}
}

export default Chart;