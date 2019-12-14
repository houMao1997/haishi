// src/router.js
import React from 'react';
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Admin from "./admin";
import Home from "./pages/home";
import Buttons from "./pages/ui/buttons";


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
          
            <Route
              path="/"
              render={() => (
                <Admin>
                  <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/ui/buttons" component={Buttons}/>
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
