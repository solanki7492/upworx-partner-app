import EarningsContent from '@/components/screens/earnings-content';
import { BrandColors } from '@/theme/colors';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EarningsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.headerTitle}>Earnings</Text>

      <EarningsContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: BrandColors.text,
  },
});
