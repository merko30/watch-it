import ImagePicker from "react-native-image-picker";

const pickImage = (title, callback) => {
  var options = {
    title,
    storageOptions: {
      skipBackup: true,
      path: "images"
    }
  };

  ImagePicker.showImagePicker(options, response => {
    console.log(response);
    if (response) {
      callback({
        uri: response.uri,
        type: response.type,
        id: response.fileid
      });
    }
  });
};

export default pickImage;
