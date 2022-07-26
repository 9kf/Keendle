import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PagerView from 'react-native-pager-view';

import {RootStackParams} from '../../App';
import {readFile} from '../lib/fileHelper';
import {CHARACTERS_PER_PAGE} from '../constants';

type ReaderScreenProps = NativeStackScreenProps<RootStackParams, 'Reader'>;

const sliceContent = (content: string) => {
  const pages = [];

  for (let i = 0; i <= content.length; i += CHARACTERS_PER_PAGE) {
    pages.push(content.substring(i, i + CHARACTERS_PER_PAGE));
  }

  return pages;
};

export default function ReaderScreen({route}: ReaderScreenProps) {
  const [pages, setPages] = useState<string[]>([]);

  const getFileContents = async () => {
    const file = route.params.book;
    if (file && file.fileCopyUri) {
      const contents = await readFile(file.fileCopyUri);
      if (contents) {
        const newPages = sliceContent(contents);
        setPages(newPages);
      }
    }
  };

  useEffect(() => {
    getFileContents();
  }, [route]);

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      {pages.map((content, index) => {
        return (
          <ScrollView key={index} style={styles.pageStyle}>
            <Text style={styles.contentStyle}>{content}</Text>
            <Text style={styles.pageNumberStyle}>{`page ${index + 1}`}</Text>
          </ScrollView>
        );
      })}
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  pageStyle: {
    padding: 10,
  },
  contentStyle: {
    fontSize: 16,
  },
  pageNumberStyle: {
    alignSelf: 'flex-end',
    marginTop: 24,
    marginRight: 16,
    fontSize: 12,
  },
});
