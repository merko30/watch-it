import React, { useState, useEffect } from 'react';
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
import { useQuery } from 'react-query';

import { getMovieOrShow } from '@/api/movies';

import { Movie, MovieStatus } from 'types/Movie';

import RoundedIcon from '@/components/RoundedIcon';

import theme from '@/theme';
import { AxiosError, AxiosResponse } from 'axios';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: theme.colors.background,
    width: width - 20,
    alignSelf: 'center',
    borderRadius: theme.borderRadii.lg,
  },
  container: {},
  button: {
    backgroundColor: 'white',
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

const STATUSES: Status[] = [
  { value: 'wishlist', label: 'Wishlist' },
  { value: 'watching', label: 'Watching' },
  { value: 'watched', label: 'Watched' },
  { value: 'watch-again', label: 'Watch again' },
  { value: 'delete', label: 'Delete' },
];

type StatusMenuProps = {
  movieId: number;
  onUpdateStatus: (key: MovieStatus | 'info' | 'delete') => void;
  showInfoItem?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
} & (
  | { visible: boolean; toggleVisible: () => void }
  | { visible?: never; toggleVisible?: never }
);

const StatusMenu = ({
  movieId,
  onUpdateStatus,
  showInfoItem,
  containerStyle,
  modalStyle,
  visible,
  toggleVisible,
}: StatusMenuProps) => {
  // const {colors} = useTheme<Theme>();
  const [isVisible, setIsVisible] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>([]);

  const toggleIsVisible = () => setIsVisible(!isVisible);

  const { data, isLoading } = useQuery<
    AxiosResponse<{ movie: Movie }>,
    AxiosError<{ message: string }>
  >(['movies', { id: movieId }], () => getMovieOrShow(movieId));

  const { data: { movie } = {} } = data || {};

  const movieStatus = movie?.status as MovieStatus | undefined;

  const showModal = visible ? visible : isVisible;
  const toggleModal = visible ? toggleVisible : toggleIsVisible;

  useEffect(() => {
    if (movieStatus) {
      setStatuses(STATUSES.filter(status => status.value !== movieStatus));
    } else {
      setStatuses(STATUSES.filter(status => status.value !== 'delete'));
    }
    if (showInfoItem) {
      setStatuses(prev => [{ value: 'info', label: 'Info' }, ...prev]);
    }
  }, [movieStatus, showInfoItem]);

  const paddingVertical = isLoading ? 20 : 0;
  return (
    <View style={[styles.container, containerStyle]}>
      <RoundedIcon
        onPress={toggleModal}
        icon="ellipsis-vertical"
        size={40}
        color="black"
      />
      <Modal
        style={[styles.modal, modalStyle, { paddingVertical }]}
        isVisible={showModal}
        onBackdropPress={toggleModal}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          statuses.map((status, i, arr) => {
            const isLast = arr.length - 1 === i;
            const borderBottomWidth = isLast ? 0 : 1;
            return (
              <TouchableOpacity
                style={[
                  styles.label,
                  {
                    borderBottomWidth,
                  },
                ]}
                key={status.value}
                onPress={() => {
                  onUpdateStatus(status.value);
                  toggleModal();
                }}>
                <Text style={styles.labelText}>{status.label}</Text>
              </TouchableOpacity>
            );
          })
        )}
      </Modal>
    </View>
  );
};

export default StatusMenu;
