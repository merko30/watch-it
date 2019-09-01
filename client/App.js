import React from "react";
import { Provider } from "react-redux";

import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Warning: componentWillUpdate", "Remote debugger"]);

import store from "./store";
import { Router, Switch, Route } from "react-router-native";

import {
  Container,
  View,
  Icon,
  Left,
  Header,
  Body,
  Title,
  Right,
  Root
} from "native-base";
import Axios from "axios";

import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DetailScreen from "./screens/DetailScreen";

import withTabs from "./utils/withTabs";

import history from "./config/history";

Axios.defaults.headers["Content-type"] = "application/json";

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <Router history={history}>
            <View style={{ flex: 1 }}>
              <Switch>
                <Route exact path="/" component={LandingScreen} />
                <Route
                  exact
                  path="/HomeScreen"
                  component={withTabs(HomeScreen)}
                />
                <Route
                  exact
                  path="/ProfileScreen"
                  component={withTabs(ProfileScreen)}
                />
                <Route
                  exact
                  path="/SearchScreen"
                  component={withTabs(SearchScreen)}
                />
                <Route path="/">
                  <Container style={{ marginVertical: 0, paddingTop: 0 }}>
                    <Header>
                      <Left>
                        <Icon
                          onPress={() => history.goBack()}
                          name="arrow-back"
                        />
                      </Left>
                      <Body>
                        <Title>booker</Title>
                      </Body>
                      <Right />
                    </Header>
                    <Switch>
                      <Route
                        exact
                        path="/LoginScreen"
                        component={LoginScreen}
                      />
                      <Route
                        exact
                        path="/DetailScreen"
                        component={DetailScreen}
                      />
                      <Route
                        exact
                        path="/RegisterScreen"
                        component={RegisterScreen}
                      />
                    </Switch>
                  </Container>
                </Route>
              </Switch>
            </View>
            <Switch />
          </Router>
        </Provider>
      </Root>
    );
  }
}
