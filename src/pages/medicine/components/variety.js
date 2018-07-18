import React, { Component } from 'react';
import echarts from 'echarts';
import axios from 'axios';
import '../view.css';

export default class Variety extends Component {
	constructor(props) {
		super(props);
		this.state = {
			medicineData: [],
			listMeArr: []
		};

		this.drawpie1 = this.drawpie1.bind(this);
		this.searchBtnClick = this.searchBtnClick.bind(this);
		this.getMedicineDataSucc = this.getMedicineDataSucc.bind(this);

		this.handlelisClick = this.handlelisClick.bind(this);
	}
	render() {
		return (
			<div>
				<div className="searchInp">
					<input type="text" placeholder="请输入药名" ref={(medicineInp)=>{this.medicineInp=medicineInp;}} />
					<input type="button" value="查询" onClick={this.searchBtnClick} />
					<ul className="listTip" ref={(listTip)=>{this.listTip=listTip;}}></ul>
				</div>
				
				<div id="pie_one" style={{ width: 500, height: 500 }}></div>
			</div>
		)
	}

	componentDidMount() {
		axios.get("http://10.100.121.116:8087/elk/formula/queryFormulaNameList")
			.then(this.getMedicineDataSucc)
	}

	drawpie1() {
		var data = this.state.medicineData;
		this.myChart1 = echarts.init(document.getElementById("pie_one"));
		this.option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}"
		    },
		    series: [
		        {
		            name:data[0].name,
		            type:'pie',
		            selectedMode: 'single',
		            radius: ['0', '25%'],

		            label: {
		            	normal: {
		                	position: 'center',
		                	 color: "#fff",
		                	 fontSize: 16
		            	},
		                formatter: "{a}",
		               
		            },
		            labelLine: {
		                normal: {
		                    show: true
		                }
		            },
		            data: [{"name": data[0].name, "value": 100}]
		        },
		        {
		            name:data[0].name+"成分",
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
		            data:data[0].part
		        }
		    ]
		};
	        

		this.myChart1.setOption(this.option);
	}

	getMedicineDataSucc(res) {
		this.setState({
			medicineData: res.data
		});

		this.drawpie1();
	}

	/*handleKeyUp() {
		var meArr = [];
		this.state.medicineData.map((item, index)=>{
			var arr = item.name.split("");
			for(var i=0; i<arr.length; i++) {
				if(this.medicineInp.value.indexOf(arr[i]) !== -1) {
					meArr.push(arr.join(""));
				}
			}
			return "";
		})

		meArr.forEach((item, index)=>{
			console.log(item);
			var li = document.createElement("li");
			li.innerHTML = item;
			li.onclick = this.handlelisClick;
			this.listTip.append(li);
		});
		
		this.setState({
			listMeArr: meArr
		});
	}*/

	handlelisClick(e) {
		this.medicineInp.value = e.target.innerHTML;
		this.listTip.style.display = "none";
	}

	searchBtnClick() {
		if(this.medicineInp.value !== "") {
			var data = this.state.medicineData;
			data.map((item, index)=>{
				if(item.name === this.medicineInp.value) {
					this.option={
							tooltip: {
				        trigger: 'item',
				        formatter: "{b}"
					    },
					    series: [
				        {
			            name:item.name,
			            type:'pie',
			            selectedMode: 'single',
			            radius: ['0', '25%'],

			            label: {
			            	normal: {
			                	position: 'center',
			                	 color: "#fff",
			                	 fontSize: 16
			            	},
			              formatter: "{a}", 
			            },
				          labelLine: {
				                normal: {
				                    show: true
				                }
				          },
				          data: [{"name": item.name, "value": 100}]
				        },
					      {
					        name:item.name+"成分",
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
					        data:item.part
					      }]
					}
					this.myChart1.setOption(this.option);
				}

				return "";
			});
		}else {
			alert("输入框不能为空");
		}
	}
}