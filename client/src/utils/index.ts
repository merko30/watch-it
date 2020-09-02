import React, {Component} from 'react';

import {View, Text, StyleProp, ViewStyle} from 'react-native';
import {ImagePickerResponse} from 'react-native-image-picker';

export const formatName = (authorName: string) => {
  const splited = authorName.split(' ');
  const initials = splited.slice(0, splited.length - 1).map((s) => {
    return s.substr(0, 1) + '.';
  });
  const name = `${initials} ${splited[splited.length - 1]}`;
  return name.replace(/\,/g, '');
};

// export const renderAuthors = (
//   authors: string[],
//   authorsStyle: StyleProp<ViewStyle>,
//   authorStyle: StyleProp<ViewStyle>,
// ) => {
//   return (
//     <View style={authorsStyle}>
//       {authors &&
//         authors.map((a, i) => {
//           if (a == authors[authors.length - 1]) {
//             return (
//               <Text style={authorStyle} key={i}>
//                 {`${formatName(a)}`}
//               </Text>
//             );
//           } else if (a == authors[0]) {
//             return (
//               <Text style={authorStyle} key={i}>
//                 {`${formatName(a)} | `}
//               </Text>
//             );
//           } else {
//             return (
//               <Text style={authorStyle} key={i}>
//                 {` ${formatName(a)} | `}
//               </Text>
//             );
//           }
//         })}
//     </View>
//   );
// };

var ImagePicker = require('react-native-image-picker');

// export const setAvatar = (Component:Component) => {
//   // More info on all the options is below in the README...just some common use cases shown here
//   var options = {
//     title: 'Select Avatar',
//     storageOptions: {
//       skipBackup: true,
//       path: 'images',
//     },
//   };

//   /**
//    * The first arg is the options object for customization (it can also be null or omitted for default options),
//    * The second arg is the callback which sends object: response (more info below in README)
//    */
//   ImagePicker.showImagePicker(options, (response:ImagePickerResponse) => {
//     // You can also display the image using data:
//     // let source = { uri: 'data:image/jpeg;base64,' + response.data };
//     Component.setState({
//       data: {
//         ...Component.state.data,
//         avatar: {
//           uri: response.uri,
//           type: response.type,
//           name: response.fileName,
//         },
//       },
//     });
//   });
// };
