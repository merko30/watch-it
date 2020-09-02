import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';
import {Platform} from 'react-native';

interface Options {
  uri: string;
  type: string | undefined;
  name: string | undefined;
}

const pickImage = (title: string, callback: (options: Options) => void) => {
  var options = {
    title,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  return ImagePicker.showImagePicker(
    options,
    (response: ImagePickerResponse) => {
      let path = response.uri;
      if (Platform.OS === 'ios') {
        path = '~' + path.substring(path.indexOf('/Documents'));
      }
      if (!response.fileName) response.fileName = path.split('/').pop();

      if (response) {
        callback({
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });
      }
    },
  );
};

export default pickImage;
