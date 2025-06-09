import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Refresh, SmallArrowRight} from '@/assets/svgs';
import {W} from '../theme';

interface AdminHeaderProps {
  title: string;
  onPressRefresh: () => void;
  pressable?: boolean; //헤더 눌림 가능
  onPressTitle?: () => void;
}

const AdminHeader = ({title, onPressRefresh, pressable, onPressTitle}: AdminHeaderProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={{paddingTop: top || 20, backgroundColor: 'white', paddingBottom: 20}}>
      <Pressable style={{flexDirection: 'row', alignSelf: 'center', marginLeft: pressable ? 20 : 0}} disabled={!pressable} onPress={onPressTitle}>
        <Text style={{fontFamily: 'Pretendard-Medium', color: '#000000', fontSize: 18}}>{title}</Text>
        {pressable && <SmallArrowRight style={{transform: [{rotate: '90deg'}]}} />}
      </Pressable>

      <Pressable onPress={onPressRefresh} style={{position: 'absolute', right: 16, top: top || 20}}>
        <Refresh />
      </Pressable>
    </View>
  );
};
export default AdminHeader;
const styles = StyleSheet.create({});
