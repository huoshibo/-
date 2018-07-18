import React, { Component } from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import './reset.css';
import { Provider } from 'react-redux';
import store from './store';

import { View as Common } from '../common/index/index.js';


//大屏展示
import {View as BigScreen} from '../common/bigScreen/index.js';
//设备
import { View as  Monitor } from '../pages/monitor/index.js';

import { View as  Heat } from '../pages/monitor/heat/index.js';
import { View as  Temperature } from '../pages/monitor/heat/temperature/index.js';
import { View as  Pressure } from '../pages/monitor/heat/pressure/index.js';

import { View as  Extractor } from '../pages/monitor/extractor/index.js';

//光谱
import { View as  Spectrum } from '../pages/spectrum/index.js';
import Redline from '../pages/spectrum/components/redline.js';
import Purpleline from '../pages/spectrum/components/purpleline.js';

//药
import { View as  Medicine } from '../pages/medicine/index.js';
import Variety from '../pages/medicine/components/variety.js';
import Mid_medicine from '../pages/medicine/components/mid_medicine.js';




class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <div>
                    <Router history={browserHistory}>
                        <Route path="/" component={Common}>
                            <IndexRoute component={Monitor} />
                            <Route path='monitor' component={Monitor}>
                                <Route path='/heat' component={Heat}>
                                    <Route path='/temperature' component={Temperature}></Route>
                                    <Route path='/pressure' component={Pressure}></Route>
                                </Route>
                                <Route path='/extractor' component={Extractor}></Route>
                            </Route>

                            <Route path='/spectrum' component={Spectrum}>
                                <IndexRoute component={Redline}/>
                                <Route path="/redline" component={Redline} />
                                <Route path="/purpleline" component={Purpleline} />
                            </Route>

                            <Route path='/medicine' component={Medicine}>
                                <IndexRoute component={Variety} />
                                <Route path="/variety" component={ Variety }></Route>
                                <Route path="/mid_medicine" component={ Mid_medicine }></Route>
                            </Route>

                        </Route>
                        <Route path="/bigScreen" component={BigScreen}></Route>         
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default App;
