import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  Dimensions
} from "react-native";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";

import { checkBook } from "../store/actions";

import { COLORS } from "../theme/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "white",
    width: width - 20,
    alignSelf: "center",
    borderRadius: 15
  },
  container: {
    position: "relative"
  },
  button: {
    backgroundColor: COLORS.lightBrown,
    padding: 10
  },
  label: {
    borderBottomColor: "#ededed",
    paddingVertical: 12
  },
  labelText: {
    fontSize: 20,
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: 1.8
  }
});

const STATUSES = [
  { value: "wishlist", label: "Wishlist" },
  { value: "reading", label: "Reading" },
  { value: "read", label: "Read" },
  { value: "delete", label: "Delete" }
];

const BookMenu = ({
  bookId,
  onPress,
  showInfoItem,
  containerStyle,
  modalStyle
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [statuses, setStatuses] = useState([]);

  const dispatch = useDispatch();
  const { bookStatus, loading } = useSelector(
    ({ book: { bookStatus, statusLoading: loading } }) => ({
      bookStatus,
      loading
    })
  );

  useEffect(() => {
    if (bookId) {
      dispatch(checkBook(bookId));
    }
  }, [bookId, isVisible]);

  useEffect(() => {
    if (bookStatus) {
      setStatuses(STATUSES.filter(status => status.value !== bookStatus));
    } else {
      setStatuses(STATUSES.filter(status => status.value !== "delete"));
    }
    if (showInfoItem) {
      setStatuses(prev => [{ value: "info", label: "Info" }, ...prev]);
    }
  }, [bookStatus]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.button}
      >
        <Icon name="kebab-vertical" type="octicon" />
        <Modal
          style={[
            styles.modal,
            modalStyle,
            { paddingVertical: loading ? 20 : 0 }
          ]}
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            statuses.map((status, i) => {
              const last = statuses.length - 1 === i;
              return (
                <TouchableOpacity
                  style={[
                    styles.label,
                    {
                      borderBottomWidth: last ? 0 : 1
                    }
                  ]}
                  key={status.value}
                  onPress={() => {
                    onPress(status.value);
                    setIsVisible(false);
                  }}
                >
                  <Text style={styles.labelText}>{status.label}</Text>
                </TouchableOpacity>
              );
            })
          )}
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

export default BookMenu;
