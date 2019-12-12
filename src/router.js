// src/router.js
import React from 'react';
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Admin from "./admin";
import Home from "./pages/home";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/loadings";
import Notice from "./pages/ui/notice";
import Messages from "./pages/ui/messages";
import Tabs1 from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousels from "./pages/ui/carousel";
import FormLogin from "./pages/form/login";
import FormRegister from "./pages/form/register";
import BasicTable from "./pages/table/basicTable";
import HighTable from "./pages/table/highTable";
import RichText from "./pages/rich";
import City from "./pages/city";
import Order from "./pages/order";
import User from "./pages/user";
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import Permission from './pages/permission';
import NoMatch from "./pages/nomatch";
import Common from "./common";
import OrderDetail from "./pages/order/detail";


import Add from "./pages/add";
import More from "./pages/textadd/more";
import Single from "./pages/textadd/single";
import Seepi from "./pages/textadd/seepi";
import Judge from "./pages/textadd/judge";
import Jianda from "./pages/textadd/jianda";
import Personal from "./pages/textadd/personal";
import Rules from "./pages/rules";
import Information from "./pages/information";
import Trecord from "./pages/trecord";
import Examlist from "./pages/examlist";
import Txiangqing from "./pages/examlist/txiangqing";
import Xiangqing from "./pages/kslist/xiangqing";
import Kaoshi from "./pages/sj/kaoshi";
import Mncz from "./pages/mncz";
import Analysis from "./pages/analysis";
import Sj from "./pages/sj";
import Kslist from "./pages/kslist";
export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/common" render={() => {
              return <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
              </Common>;
            }}
            />
            <Route
              path="/"
              render={() => (
                <Admin>
                  <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/ui/buttons" component={Buttons}/>
                    <Route path="/ui/modals" component={Modals}/>
                    <Route path="/ui/loadings" component={Loadings}/>
                    <Route path="/ui/notification" component={Notice}/>
                    <Route path="/ui/messages" component={Messages}/>
                    <Route path="/ui/tabs" component={Tabs1}/>
                    <Route path="/ui/gallery" component={Gallery}/>
                    <Route path="/ui/carousel" component={Carousels}/>
                    <Route path="/form/login" component={FormLogin}/>
                    <Route path="/form/reg" component={FormRegister}/>
                    <Route path="/table/basic" component={BasicTable}/>
                    <Route path="/table/high" component={HighTable}/>
                    <Route path="/rich" component={RichText}/>
                    <Route path="/city" component={City}/>
                    <Route path="/order" component={Order}/>
                    <Route path="/user" component={User}/>
                    <Route path="/bikeMap" component={BikeMap}/>
                    <Route path="/charts/bar" component={Bar}/>
                    <Route path="/charts/pie" component={Pie}/>
                    <Route path="/charts/line" component={Line}/>
                    <Route path="/permission" component={Permission}/>







                    <Route path="/add" component={Add}/>
                    <Route path="/textadd/more" component={More}/>
                    <Route path="/textadd/single" component={Single}/>
                    <Route path="/textadd/seepi" component={Seepi}/>
                    <Route path="/textadd/judge" component={Judge}/>
                    <Route path="/textadd/jianda" component={Jianda}/>
                    <Route path="/textadd/personal" component={Personal}/>
                    <Route path="/rules" component={Rules}/>
                    <Route path="/information" component={Information}/>
                    <Route path="/trecord" component={Trecord}/>
                    <Route path="/examlist" component={Examlist}/>
                    <Route path="/txiangqing" component={Txiangqing}/>
                    <Route path="/xiangqing" component={Xiangqing}/>
                    <Route path="/kaoshi" component={Kaoshi}/>
                    <Route path="/mncz" component={Mncz}/>
                    <Route path="/analysis" component={Analysis}/>
                    <Route path="/sj" component={Sj}/>
                    <Route path="/kslist" component={Kslist}/>
                    <Redirect to="/home"/>
                    {/*<Route component={NoMatch}/>*/}
                  </Switch>
                </Admin>
              )}
            />
            <Route path="/order/detail" component={Login}/>
          </Switch>
        </App>
      </HashRouter>
    );
  }
}
