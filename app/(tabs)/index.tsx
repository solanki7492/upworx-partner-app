import { useAuth } from '@/contexts/auth-context';
import { BrandColors } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const homeOptions = [
  {
    id: '1',
    title: 'Leads',
    icon: 'briefcase-outline',
    route: '/(tabs)/leads',
    color: '#FF6F61',
  },
  {
    id: '2',
    title: 'Earnings',
    icon: 'wallet-outline',
    route: '/(tabs)/earnings',
    color: '#6B5B95',
  },
  {
    id: '3',
    title: 'Ledgers',
    icon: 'receipt-outline',
    route: '/(tabs)/ledgers',
    color: '#88B04B',
  },
  {
    id: '4',
    title: 'Edit Profile',
    icon: 'person-outline',
    route: '/(profile)/partner-edit-profile',
    color: '#F7CAC9',
  },
  {
    id: '5',
    title: 'My Addresses',
    icon: 'location-outline',
    route: '/(profile)/addresses',
    color: '#92A8D1',
  },
  {
    id: '6',
    title: 'My Services',
    icon: 'construct-outline',
    route: '/(profile)/services',
    color: '#955251',
  },
  {
    id: '7',
    title: 'Availability',
    icon: 'calendar-outline',
    route: '/(profile)/availability',
    color: '#B565A7',
  },
  {
    id: '8',
    title: 'My Banking Details',
    icon: 'card-outline',
    route: '/(profile)/banking',
    color: '#009B77',
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'Partner'}</Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.7}
          >
            <View style={styles.avatar}>
              {user?.image ? (
                <Image
                  source={{ uri: user.image }}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.avatarText}>
                  {getInitials(user?.name || 'P')}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Options Grid */}
        <View style={styles.grid}>
          {homeOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              activeOpacity={0.7}
              onPress={() => router.push(option.route as any)}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: `${option.color}20` },
                ]}
              >
                <Ionicons
                  name={option.icon as any}
                  size={32}
                  color={option.color}
                />
              </View>
              <Text style={styles.optionTitle}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: BrandColors.mutedText,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: BrandColors.text,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    color: BrandColors.card,
    fontWeight: 'bold',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  optionCard: {
    width: '47%',
    backgroundColor: BrandColors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: BrandColors.text,
    textAlign: 'center',
  },
});
