import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DocumentPickerResponse} from 'react-native-document-picker';

import {RootStackParams} from '../../App';
import {useBookStore} from '../store/bookStore';
import {PickSingleDocument} from '../lib/documentHelper';

type ReaderScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'Reader'
>;

export default function HomeScreen() {
  const openBook = useBookStore(state => state.openBook);
  const booksOpened = useBookStore(state => state.booksOpened);
  const navigation = useNavigation<ReaderScreenNavigationProps>();

  const navigateToReaderScreen = (book: DocumentPickerResponse) =>
    navigation.navigate('Reader', {book});

  const pickBookToRead = async () => {
    const file = await PickSingleDocument();
    if (file) {
      openBook(file);
      navigateToReaderScreen(file);
    }
  };

  return (
    <View style={styles.screenStyle}>
      <Text style={styles.recendReadsTextStyle}>Recent Reads</Text>
      {booksOpened.map(book => (
        <TouchableOpacity
          key={book.name}
          onPress={() => navigateToReaderScreen(book)}
          style={styles.bookCardStyle}>
          <Text style={styles.bookTitleStyle}>{book.name}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.pickBookContainerStyle}>
        <TouchableOpacity style={styles.button} onPress={pickBookToRead}>
          <Text style={styles.buttonTextStyle}>Pick a book to read</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'purple',
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  recendReadsTextStyle: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 72,
    marginBottom: 32,
  },
  bookCardStyle: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 12,
  },
  bookTitleStyle: {
    fontSize: 16,
    fontWeight: '700',
  },
  pickBookContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 72,
  },
});
