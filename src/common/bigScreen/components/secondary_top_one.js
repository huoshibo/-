import React, { Component } from 'react';
import echarts from 'echarts';
import $ from 'jquery'


class TopOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mycharts1: "",
            option1: "",
            option2: ""
        };
        this.handlebtnClick = this.handlebtnClick.bind(this);
        this.handleChangeBtn = this.handleChangeBtn.bind(this);
        this.resizeContainer = this.resizeContainer.bind(this);
    }
    render() {
        return (
            <div>
                <div id="top" ref='TopOne' style={{ width:340, height: 200 }}></div>
            </div>
        );
    }

    componentDidMount() {
        let that = this;
        this.mycharts1 = echarts.init(document.getElementById("top"));
        this.option = {
           // backgroundColor: 'red',
            color: ['#20b2AA'],
            title: {
                x:'center',
                y:'top',
                text: '次要信息-温度',
                textStyle:{
                    fontSize:14,
                    color:"#fffff0"
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                top:'20%',
                left: '6%',
                right: '6%',
                bottom: '10%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    splitLine:{
                      show:false,
                    },
                    axisLine:{
                      lineStyle:{
                          // type: 'solid',
                          color: '#fff',//左边线的颜色
                          width:'1'//坐标线的宽度
                      }
                    },
                    axisLabel:{
                        textStyle:{
                            color: '#fff',//坐标值得具体的颜色
                        }
                    },
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    splitLine:{
                        show:false,
                    },
                    axisLine:{
                        lineStyle:{
                            // type: 'solid',
                            color: '#fff',//左边线的颜色
                            width:'1'//坐标线的宽度
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            color: '#fff',//坐标值得具体的颜色
                        }
                    }
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };

        this.option2 = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[' ',' ']
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none',
                        show:false
                    },
                    dataView: {readOnly: false,show:false},
                    magicType: {type: ['line', 'bar'],show:false},
                    restore: {show:false},
                    saveAsImage: {show:false}
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                }
            },
            series: [
                {
                    name:'最高气温',
                    type:'bar',
                    data:[11, 11, 15, 13, 12, 13, 10],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'最低气温',
                    type:'bar',
                    data:[1, -2, 2, 5, 3, 2, 0],
                    markPoint: {
                        data: [
                            {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'},
                            [{
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            }, {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最大值'
                                    }
                                },
                                type: 'max',
                                name: '最高点'
                            }]
                        ]
                    }
                }
            ]
        };
        this.mycharts1.setOption(this.option);
        //初始化重置容器大小
        this.resizeContainer();
        //重置容器高宽
        that.mycharts1.resize();
        $(window).resize(function(){
            that.resizeContainer();
            //重置容器高宽
            that.mycharts1.resize();
        });
        this.mycharts1.on("click", function(params) {
            console.log(params);
        });
    }

    resizeContainer(){
        let win_width = $(window).width();
        let win_height = $(window).height();
        let top_left_width = win_width/4;
        let top_left_height = (win_height-50)/3;
        $("#top").width (top_left_width);
        $("#top").height (top_left_height);
        console.log("width="+$("#top").width()+"height==="+$("#top").height());
    }

    handlebtnClick(e) {
        console.log("9999999999");
    }

    handleChangeBtn(e) {
        if(e.target.value === "柱状图") {
            this.mycharts1.setOption(this.option2);
            e.target.value = "折线图";
        }else if(e.target.value === "折线图") {
            this.mycharts1.setOption(this.option1);
            e.target.value = "柱状图";
        }

    }
}
export default TopOne;