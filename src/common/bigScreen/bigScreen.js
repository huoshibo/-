import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { GetPreasureStatus } from './actionCreator.js';
/*import { ChangeStatus } from './actionCreator.js';*/
import './bigScreen.css';
/*import MainTop from './components/main_top.js';*/
import TopOne from './components/secondary_top_one.js';
import TopTwo from './components/secondary_top_two.js';
import TopThree from './components/secondary_top_three.js';
import TopOneRight from './components/secondary_top_one_right.js';
import TopTwoRight from './components/secondary_top_two_right.js';
import TopThreeRight from './components/secondary_top_three_right.js';

class CommonWrapper extends Component {

    render() {
        console.log(this.props.heatpra);
        return (
            <div style={{background:"#083f66"}}>
                <nav className="navbar title_box">
                    <span className="navbar-header title"><Link to="/extractor">中医药数据可视化</Link></span>
                </nav>
                <div className="content">
                    <div className="row">
                        <div className="col-md-3 left-show box">
                            <div className="item">
                                <h3 style={{display:"none"}}>各地区排名</h3>
                                    <TopOne/>
                            </div>
                            <div className="item">
                                <h3 style={{display:"none"}}>各地区排名</h3>
                                <TopTwo/>
                            </div>
                            <div className="item">
                                <h3 style={{display:"none"}}>各地区排名</h3>
                                <TopThree/>
                            </div>
                        </div>
                        <div className="col-md-6 common-show">
                            {/*主要信息*/}
                                {/*<MainTop/>*/}
                            {/*<div className="main_con" style={{display:"none"}}>*/}

                            {/*</div>*/}
                            <div className="col-md-12 back_box">
                                <div className="backheat">
                                    <Link to="/heat" className="gotoheat"></Link>
                                </div>
                            </div>
                            <div className="col-md-12 back_box" style={{display:"none"}}>
                                <div className="backph col-md-6">
                                    <Link to="/extractor" className="gotoph"></Link>
                                </div>
                                <div className="backpre col-md-6">
                                    <Link to="/extractor" className="gotopre"></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 right-show box">
                            <div className="item">
                                <h3 style={{display:"none"}}>各地区排名</h3>
                                <TopOneRight/>
                            </div>
                            <div className="item">
                                <h3 style={{display:"none"}}>各地区排名</h3>
                                <TopTwoRight/>
                            </div>
                            <div className="item">
                                <h3 style={{display:"none"}}>各地区排名</h3>
                                <TopThreeRight/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer" style={{display:"none"}}>footer</div>
            </div>
        );
    }

    componentDidMount() {
        axios.get("http://localhost:3000/mock/chart.json").then(function(data){
        })
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        );
    }

    routerWillLeave = (nextLocation)=>{
        if(nextLocation.pathname === "/pressure") {
            this.props.BigShowPreasureClick({status:true});
        }else if(nextLocation.pathname === "/heat") {
           this.props.BigShowPreasureClick({status:false});
        }
    }
}


const mapStateToProps = (state)=>({
    prasureStatus: state.bigscreen.PrasureNavStatus,
    heatpra:state.heat.PrasureNavStatus
})

const mapDispatchToProps = (dispatch)=>({
    BigShowPreasureClick: (status)=>{
        dispatch(GetPreasureStatus(status));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CommonWrapper);



