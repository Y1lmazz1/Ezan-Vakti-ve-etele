import { StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../../styles/theme';

export const styles = StyleSheet.create({
  timeRowCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeRowCardActive: {
    borderColor: COLORS.borderActive,
    borderWidth: 1.5,
    backgroundColor: COLORS.activeCardBg,
  },
  timeInfo: {
    flexDirection: 'column',
  },
  timeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e35',
  },
  timeValue: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  activeText: {
    color: COLORS.primaryDark,
  },
  checkButton: {
    backgroundColor: '#f0f4f3',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.sm + 2,
  },
  checkButtonCompleted: {
    backgroundColor: COLORS.successLight,
  },
  checkButtonDisabled: {
    opacity: 0.5,
  },
  checkButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#52665e',
  },
  checkButtonTextCompleted: {
    color: COLORS.success,
  },
});