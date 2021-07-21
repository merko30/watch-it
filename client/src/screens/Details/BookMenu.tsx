import React, {
  useState,
  // useEffect
} from 'react';
import {
  StyleSheet,
  // TouchableOpacity,
  View,
  // Text,
  // ActivityIndicator,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';

import {MovieStatus} from 'types/Movie';

import {RoundedIcon} from '../../../components';

import theme from '../../../theme';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: theme.colors.background,
    width: width - 20,
    alignSelf: 'center',
    borderRadius: theme.borderRadii.lg,
  },
  container: {
    position: 'relative',
  },
  button: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  label: {
    borderBottomColor: '#ededed',
    paddingVertical: 12,
  },
  labelText: {
    fontSize: theme.fontSizes.textLg,
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 1.8,
  },
});

interface Status {
  label: string;
  value: MovieStatus | 'info' | 'delete';
}

// const STATUSES: Status[] = [
//   {value: 'wishlist', label: 'Wishlist'},
//   {value: 'watching', label: 'Watching'},
//   {value: 'watched', label: 'Watched'},
//   {value: 'watch-again', label: 'Watch again'},
//   {value: 'delete', label: 'Delete'},
// ];

type BookMenuProps = {
  bookId: string;
  onPress: (key: MovieStatus | 'info' | 'delete') => void;
  showInfoItem?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
} & (
  | {visible: boolean; toggleVisible: () => void}
  | {visible?: never; toggleVisible?: never}
);

const BookMenu = ({
  // bookId,
  // onPress,
  // showInfoItem,
  containerStyle,
  modalStyle,
  visible,
  toggleVisible,
}: BookMenuProps) => {
  // const {colors} = useTheme<Theme>();
  const [isVisible, setIsVisible] = useState(false);
  // const [statuses,setStatuses] = useState<Status[]>([]);

  const toggleIsVisible = () => {
    return setIsVisible(!isVisible);
  };

  const showModal = visible ? visible : isVisible;
  const toggleModal =
    visible && toggleVisible ? toggleVisible : toggleIsVisible;

  // useEffect(() => {
  //   if (bookId) {
  //     dispatch(checkBook(bookId));
  //   }
  // }, [bookId, showModal]);

  // useEffect(() => {
  //   if (MovieStatus) {
  //     setStatuses(STATUSES.filter(status => status.value !== MovieStatus));
  //   } else {
  //     setStatuses(STATUSES.filter(status => status.value !== 'delete'));
  //   }
  //   if (showInfoItem) {
  //     setStatuses(prev => [{value: 'info', label: 'Info'}, ...prev]);
  //   }
  // }, [MovieStatus]);

  return (
    <View style={[styles.container, containerStyle]}>
      {!visible && !toggleVisible && (
        <RoundedIcon
          color="secondary"
          onPress={() => toggleModal()}
          icon="ellipsis-vertical"
          size={48}
        />
      )}
      <Modal
        style={[
          styles.modal,
          modalStyle,
          // {paddingVertical: loadings.status ? 20 : 0},
        ]}
        isVisible={showModal}
        onBackdropPress={() => toggleModal()}>
        {/* {loadings.status ? (
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
                  toggleModal();
                }}>
                <Text style={styles.labelText}>{status.label}</Text>
              </TouchableOpacity>
            );
          })
        )} */}
        hello
      </Modal>
    </View>
  );
};

export default BookMenu;
