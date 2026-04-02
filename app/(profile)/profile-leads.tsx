import LeadsContent, {
  LeadsContentRef,
} from '@/components/screens/leads-content';
import { BrandColors } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileLeadsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const leadsRef = useRef<LeadsContentRef>(null);
  const [hasFilters, setHasFilters] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={BrandColors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leads</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => leadsRef.current?.openFilter()}
          >
            <Ionicons
              name="filter-outline"
              size={20}
              color={BrandColors.primary}
            />
          </TouchableOpacity>

          {hasFilters && (
            <TouchableOpacity onPress={() => leadsRef.current?.clearFilters()}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      <LeadsContent ref={leadsRef} onFiltersChange={setHasFilters} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: BrandColors.text,
    flex: 1,
    textAlign: 'center',
    marginLeft: -40,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${BrandColors.primary}15`,
    borderRadius: 20,
  },
  clearText: {
    color: BrandColors.danger,
    fontWeight: '600',
    fontSize: 14,
  },
});
