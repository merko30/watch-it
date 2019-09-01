import React from "react";
import { View, StyleSheet } from "react-native";

import { Icon, ActionSheet, Button, Text } from "native-base";

import { deleteBook, changeStatus } from "../store/actions";
import history from "../config/history";
import { connect } from "react-redux";
import { statusesToShow } from "../utils/menu";
import { renderAuthors } from "../utils";

class BookItem extends React.Component {
  handleClick = (index, item) => {
    const { changeStatus, deleteBook } = this.props;
    const clicked = statusesToShow(item, true).options[index].key;

    if (clicked === "info") {
      history.push("/DetailScreen", { id: item.bookId });
    } else if (clicked == "remove") {
      deleteBook(item._id);
    } else if (clicked == "reading" || "read") {
      changeStatus(item._id, clicked);
    }
  };

  render() {
    const { status, item } = this.props;
    const { outer, itemStyle, titleStyle, authorsStyle, author } = styles;
    return (
      <View>
        <View style={outer}>
          <View style={itemStyle}>
            <Text style={titleStyle}>{item.title}</Text>
            {renderAuthors(item.authors, authorsStyle, author)}
          </View>
          <Button
            transparent
            style={{ alignSelf: "center" }}
            onPress={() =>
              ActionSheet.show(statusesToShow(item, true), buttonIndex =>
                this.handleClick(buttonIndex, item)
              )
            }
          >
            <Icon name="dots-three-vertical" type="Entypo" />
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.7,
    margin: 1
  },
  itemStyle: {
    padding: 8
  },
  authorsStyle: {
    flexDirection: "row"
  },
  author: {
    fontSize: 12,
    fontFamily: "Arial"
  }
});

export default connect(
  null,
  { changeStatus, deleteBook }
)(BookItem);
