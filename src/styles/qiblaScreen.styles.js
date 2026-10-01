import { StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from './theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  compassContainer: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: COLORS.primary,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  compassDegree: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  compassSubtext: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  infoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});