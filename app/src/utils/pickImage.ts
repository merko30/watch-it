import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

interface Options {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
}

const pickImage = (title: string, callback: (options: Options) => void) => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
    includeBase64: false,
    presentationStyle: 'fullScreen',
    quality: 0.5,
  };

  launchImageLibrary(options, response => {
    const source = response.assets?.[0];
    if (!source) {
      console.log('No image selected');
      return;
    }
    const file = {
      uri: source.uri,
      type: source.type,
      name: source.fileName,
    };
    callback(file);
  });
};

export default pickImage;
