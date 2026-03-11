import {
  getMatchItemsByTheme,
  getMultipleChoiceItemsByTheme,
  getSwipeItemsByTheme,
  matchItems,
  multipleChoiceItems,
  swipeItems,
  themes
} from '../../data';
import type { ActivityType, EvaluationSnapshot, ThemeId } from '../../data';

export type ActiveSection = ActivityType | 'final';

export function getResolvedCount(snapshot: EvaluationSnapshot, ids: string[]) {
  return ids.filter((id) => snapshot.exercises[id]?.resolved).length;
}

export function getResolvedCountByActivity(snapshot: EvaluationSnapshot, activity: ActivityType) {
  if (activity === 'match') {
    return getResolvedCount(snapshot, matchItems.map((item) => item.id));
  }

  if (activity === 'mcq') {
    return getResolvedCount(snapshot, multipleChoiceItems.map((item) => item.id));
  }

  return getResolvedCount(snapshot, swipeItems.map((item) => item.id));
}

export function getActiveSection(snapshot: EvaluationSnapshot): ActiveSection {
  if (getResolvedCountByActivity(snapshot, 'match') < matchItems.length) {
    return 'match';
  }

  if (getResolvedCountByActivity(snapshot, 'mcq') < multipleChoiceItems.length) {
    return 'mcq';
  }

  if (getResolvedCountByActivity(snapshot, 'swipe') < swipeItems.length) {
    return 'swipe';
  }

  return 'final';
}

export function getMatchResolvedCountByTheme(snapshot: EvaluationSnapshot, themeId: ThemeId) {
  return getResolvedCount(snapshot, getMatchItemsByTheme(themeId).map((item) => item.id));
}

export function getMatchUnlockedTheme(snapshot: EvaluationSnapshot): ThemeId {
  for (const theme of themes) {
    if (getMatchResolvedCountByTheme(snapshot, theme.id) < 5) {
      return theme.id;
    }
  }

  return 5;
}

export function isMatchThemeUnlocked(snapshot: EvaluationSnapshot, themeId: ThemeId) {
  return getMatchUnlockedTheme(snapshot) >= themeId;
}

export function getCurrentMultipleChoiceItem(snapshot: EvaluationSnapshot) {
  return multipleChoiceItems.find((item) => !snapshot.exercises[item.id]?.resolved) ?? null;
}

export function getCurrentMultipleChoiceIndex(snapshot: EvaluationSnapshot) {
  const current = getCurrentMultipleChoiceItem(snapshot);
  return current ? multipleChoiceItems.findIndex((item) => item.id === current.id) : multipleChoiceItems.length - 1;
}

export function getCurrentSwipeItem(snapshot: EvaluationSnapshot) {
  return swipeItems.find((item) => !snapshot.exercises[item.id]?.resolved) ?? null;
}

export function getCurrentSwipeIndex(snapshot: EvaluationSnapshot) {
  const current = getCurrentSwipeItem(snapshot);
  return current ? swipeItems.findIndex((item) => item.id === current.id) : swipeItems.length - 1;
}

export function getCurrentThemeProgressForMcq(snapshot: EvaluationSnapshot) {
  const current = getCurrentMultipleChoiceItem(snapshot) ?? multipleChoiceItems[multipleChoiceItems.length - 1];
  const items = getMultipleChoiceItemsByTheme(current.themeId);
  return {
    themeId: current.themeId,
    resolved: getResolvedCount(snapshot, items.map((item) => item.id)),
    total: items.length
  };
}

export function getCurrentThemeProgressForSwipe(snapshot: EvaluationSnapshot) {
  const current = getCurrentSwipeItem(snapshot) ?? swipeItems[swipeItems.length - 1];
  const items = getSwipeItemsByTheme(current.themeId);
  return {
    themeId: current.themeId,
    resolved: getResolvedCount(snapshot, items.map((item) => item.id)),
    total: items.length
  };
}
