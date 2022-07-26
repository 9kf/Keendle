import create from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DocumentPickerResponse} from 'react-native-document-picker';

interface BookStoreState {
  booksOpened: DocumentPickerResponse[];
  openBook: (book: DocumentPickerResponse) => void;
  removeBook: (book: DocumentPickerResponse) => void;
}

export const useBookStore = create<BookStoreState>()(
  persist(
    set => ({
      booksOpened: [],
      openBook: book =>
        set(state => {
          const isBookOpenedBefore = state.booksOpened.find(
            oldBook => oldBook.name === book.name,
          );

          if (isBookOpenedBefore) {
            return {
              booksOpened: state.booksOpened,
            };
          }

          return {
            booksOpened: [...state.booksOpened, book],
          };
        }),
      removeBook: book =>
        set(state => {
          const newBooks = state.booksOpened.filter(
            oldBook => oldBook.name === book.name,
          );
          return {
            booksOpened: newBooks,
          };
        }),
    }),
    {name: 'bookstore', getStorage: () => AsyncStorage},
  ),
);
