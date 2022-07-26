import DocumentPicker from 'react-native-document-picker';

export const PickSingleDocument = async () => {
  try {
    const pickerResult = await DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
      type: DocumentPicker.types.plainText,
    });

    return pickerResult;
  } catch (e) {
    console.log(e);
  }
};
