import React from "react";
import { Container, Icon, Footer, FooterTab, Button, Text } from "native-base";

import history from "../config/history";

export default function withTabs(Component) {
  return class extends React.Component {
    render() {
      return (
        <Container style={{ paddingTop: 35 }}>
          <Component />
          <Footer>
            <FooterTab>
              <Button onPress={() => history.push("/HomeScreen")}>
                <Icon name="home" />
                <Text>Home</Text>
              </Button>
              <Button onPress={() => history.push("/SearchScreen")}>
                <Icon name="search" />
                <Text>Search</Text>
              </Button>
              <Button onPress={() => history.push("/ProfileScreen")}>
                <Icon name="user" type="Entypo" />
                <Text>Profile</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  };
}
