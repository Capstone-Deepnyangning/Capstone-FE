import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SmallArrowRight} from '@/assets/svgs';
import {Text as ThemeText} from '@/component/theme';
import {width} from '@/utils/dimensions';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPageChange(Math.max(0, currentPage - 1))} disabled={currentPage === 0} style={{transform: [{rotate: '180deg'}]}}>
        <SmallArrowRight />
      </TouchableOpacity>
      {[...Array(totalPages)].map((_, idx) => (
        <TouchableOpacity key={idx} onPress={() => onPageChange(idx)} style={[styles.pageButton, currentPage === idx && styles.activePageButton]}>
          <ThemeText style={[styles.pageText, currentPage === idx && styles.activePageText]}>{idx + 1}</ThemeText>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))} disabled={currentPage === totalPages - 1}>
        <SmallArrowRight />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    alignItems: 'center',
    gap: 4,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width,
    paddingTop: 8,
  },
  pageButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePageButton: {
    borderWidth: 1,
    borderColor: 'black',
  },
  pageText: {
    marginHorizontal: 4,
    color: '#999999',
  },
  activePageText: {
    fontWeight: 'bold',
    color: 'black',
  },
});
