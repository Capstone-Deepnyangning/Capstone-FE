import {Graph, MyRecord} from '@/component/report';
import {H} from '@/component/theme';
import {StyleSheet, ScrollView} from 'react-native';

const ReportScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <MyRecord />
      <H h={16} />
      <Graph />
    </ScrollView>
  );
};
export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F3',
    padding: 20,
  },
});
