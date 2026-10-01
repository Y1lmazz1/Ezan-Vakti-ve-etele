import { StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from './theme';

export const styles = StyleSheet.create({
  scrollContainer: {
    padding: SPACING.lg,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  retryButtonText: {
    color: COLORS.textLight,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  highlightCard: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  cardSubText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  historyButton: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  historyButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  cardTitleLight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: SPACING.xs,
  },
  nextPrayerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  timerText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#a5d6a7',
    letterSpacing: 2,
    marginVertical: SPACING.xs,
  },
  timerSubText: {
    fontSize: 12,
    color: '#c8e6c9',
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    marginTop: SPACING.xs,
  },
  timesList: {
    gap: 10,
    marginTop: SPACING.sm,
  },

  /* Modal Stilleri */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalContent: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    padding: 4,
  },
  dateSelectorContainer: {
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  dateSelectorLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginTop: 2,
  },
  modalLogsList: {
    marginTop: SPACING.xs,
  },
  modalLogRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalPrayerName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  badgeSuccess: {
    backgroundColor: COLORS.successLight,
  },
  badgePending: {
    backgroundColor: '#ffebee',
  },
  badgeTextSuccess: {
    color: COLORS.success,
    fontWeight: 'bold',
    fontSize: 12,
  },
  badgeTextPending: {
    color: '#c62828',
    fontWeight: 'bold',
    fontSize: 12,
  },
});