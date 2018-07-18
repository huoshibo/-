import React, { Component } from 'react';
import echarts from 'echarts';
import $ from 'jquery'


class TopTwo extends Component {
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
                <div id="topTwo" ref='TopTwo' style={{ width:340, height: 200 }}></div>
            </div>
        );
    }

    componentDidMount() {
        let that = this;
        this.mycharts1 = echarts.init(document.getElementById("topTwo"));
        this.option = {
            color: ['#3398DB'],
            title: {
                x:'center',
                y:'top',
                text: '次要信息-药方',
                textStyle:{
                    fontSize:14
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
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
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
           //backgroundColor: '#000',
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
           title: {
               x:'center',
               y:'top',
               text: '次要信息-药方',
               textStyle:{
                   fontSize:14,
                   color:"#fff"
               }
           },
            legend: {
                orient: 'vertical',
                x: '6%',
                y:'center',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                textStyle:{
                    color:"#fff"
                }
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['45%', '65%'],
                    center:['60%','50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
                }
            ]
        };
        this.mycharts1.setOption(this.option2);
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

    handlebtnClick(e) {
        console.log("9999999999");
    }
    resizeContainer(){
        let win_width = $(window).width();
        let win_height = $(window).height();
        let top_left_width = win_width/4;
        let top_left_height = (win_height-50)/3;
        $("#topTwo").width (top_left_width);
        $("#topTwo").height (top_left_height);
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
export default TopTwo;