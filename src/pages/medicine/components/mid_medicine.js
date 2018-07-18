import React, { Component } from 'react';
import axios from 'axios';
import Chart from './charts.js';
import '../view.css';

export default class Mid_medicine extends Component {
	constructor(props) {
		super(props);

		this.state = {
			"medicineData": [],
			"boxdata": {}
		}

		this.showData = this.showData.bind(this);
		this.handleGetSucc = this.handleGetSucc.bind(this);
		this.ShowChart = this.ShowChart.bind(this);
		this.handleCloseBox = this.handleCloseBox.bind(this);
	}
	render() {
		const lis = this.state.medicineData.map((item, index)=>{
			return (
				<li key={ item.id } className="tablecontent">
					<span className="medicineName">{ item.name }</span>
					<span className="Hasthings Hasthings_con">{item.part.map((v, ind)=>{
						var m = v.name +":" + v.value + "g";
						return (
							<span key={ind} className="HasMed">{m}</span>
						)
					})}</span>
					<span className="resource">{ item.resource }</span>
					<span className="readmore"><button id={ item.name } onClick={ this.ShowChart }>图示</button></span>
				</li>
			)
			
		});
		return (
			<div>
				<div className="showtableData">
					<ul className="showtableData_ul">
						<li className="tableheader">
							<span className="medicineName">药方名</span>
							<span className="Hasthings">成分</span>
							<span className="resource">来源</span>
							<span className="readmore">查看</span>
						</li>
						{lis}
					</ul>
				</div>
				<div>
					<div className="glass" ref={(glass)=>{this.glass = glass; }}></div>
					<div className="ShowChart" ref={(chart_status)=>{this.chart_status = chart_status; }}>
						<h1><span>图表展示</span><b onClick={this.handleCloseBox}>X</b></h1>
						<Chart boxdata={this.state.boxdata}/>
					</div>
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.showData();
	}

	showData() {
		axios.get("http://10.100.121.116:8087/elk/formula/queryFormulaNameList")
			.then(this.handleGetSucc)
	}

	handleGetSucc(res) {
		this.setState({
			medicineData: res.data
		});
	}

	ShowChart(e) {
		this.glass.style.display = "block";
		this.chart_status.style.display = "block";
		var name = e.target.id;
		this.state.medicineData.map((item, index)=>{
			if(name === item.name){
				this.setState({
					boxdata: item
				});
			}
			return "";
		});
		
	}

	handleCloseBox() {
		this.glass.style.display = "none";
		this.chart_status.style.display = "none";
	}
}