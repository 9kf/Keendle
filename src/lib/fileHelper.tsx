import RNFS from 'react-native-fs';

export const readFile = async (filePath: string) => {
  try {
    const formattedFilePath = filePath.replace('%20', ' '); //files saved from the document directory replaces spaces with %20, thus it cannot find the file unless we replace those characters with a space

    const content = await RNFS.readFile(formattedFilePath);
    return content;
  } catch (error) {
    console.log(error);
  }
};
