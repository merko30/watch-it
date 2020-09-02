import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';

import {checkBook} from '../store/reducers/books';
import {RootState} from '../store/reducers';

import {BookStatus} from '../types/Book';

import theme from '../theme';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'white',
    width: width - 20,
    alignSelf: 'center',
    borderRadius: 15,
  },
  container: {
    position: 'relative',
  },
  button: {
    backgroundColor: theme.colors.light,
    padding: 10,
  },
  label: {
    borderBottomColor: '#ededed',
    paddingVertical: 12,
  },
  labelText: {
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 1.8,
  },
});

interface Status {
  label: string;
  value: BookStatus | 'info' | 'delete';
}

const STATUSES: Status[] = [
  {value: 'wishlist', label: 'Wishlist'},
  {value: 'reading', label: 'Reading'},
  {value: 'read', label: 'Read'},
  {value: 'delete', label: 'Delete'},
];

interface BookMenuProps {
  bookId: string;
  onPress: (key: BookStatus | 'info' | 'delete') => void;
  showInfoItem?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
}

const BookMenu = ({
  bookId,
  onPress,
  showInfoItem,
  containerStyle,
  modalStyle,
}: BookMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>([]);

  const dispatch = useDispatch();
  const {bookStatus, loading} = useSelector(
    ({books: {bookStatus, statusLoading: loading}}: RootState) => ({
      bookStatus,
      loading,
    }),
  );

  useEffect(() => {
    if (bookId) {
      dispatch(checkBook(bookId));
    }
  }, [bookId, isVisible]);

  useEffect(() => {
    if (bookStatus) {
      setStatuses(STATUSES.filter((status) => status.value !== bookStatus));
    } else {
      setStatuses(STATUSES.filter((status) => status.value !== 'delete'));
    }
    if (showInfoItem) {
      setStatuses((prev) => [{value: 'info', label: 'Info'}, ...prev]);
    }
  }, [bookStatus]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.button}>
        <Icon name="ellipsis-vertical" size={32} />
        <Modal
          style={[
            styles.modal,
            modalStyle,
            {paddingVertical: loading ? 20 : 0},
          ]}
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}>
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
                      borderBottomWidth: last ? 0 : 1,
                    },
                  ]}
                  key={status.value}
                  onPress={() => {
                    onPress(status.value);
                    setIsVisible(false);
                  }}>
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
