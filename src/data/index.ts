import { matchItems } from './matchItems';
import { multipleChoiceItems } from './multipleChoiceItems';
import { swipeItems } from './swipeItems';
import { themes } from './themes';
import type { ActivityType, MatchBatch, MatchItem, MultipleChoiceItem, SwipeItem, ThemeId } from './types';

export { themes } from './themes';
export type * from './types';
export { matchItems } from './matchItems';
export { multipleChoiceItems } from './multipleChoiceItems';
export { swipeItems } from './swipeItems';

export const allExercises = [...matchItems, ...multipleChoiceItems, ...swipeItems];
export const allExerciseIds = allExercises.map((exercise) => exercise.id);
export const totalExercises = allExercises.length;
export const matchBatchSize = 5;
export const matchBatches: MatchBatch[] = [1, 2];

export function getThemeById(themeId: ThemeId) {
  return themes.find((theme) => theme.id === themeId)!;
}

export function getMatchItemsByTheme(themeId: ThemeId): MatchItem[] {
  return matchItems.filter((item) => item.themeId === themeId);
}

export function getMatchItemsByBatch(batch: MatchBatch): MatchItem[] {
  return matchItems.filter((item) => item.batch === batch);
}

export function getMultipleChoiceItemsByTheme(themeId: ThemeId): MultipleChoiceItem[] {
  return multipleChoiceItems.filter((item) => item.themeId === themeId);
}

export function getSwipeItemsByTheme(themeId: ThemeId): SwipeItem[] {
  return swipeItems.filter((item) => item.themeId === themeId);
}

export function getItemsByActivity(activity: ActivityType) {
  if (activity === 'match') {
    return matchItems;
  }

  if (activity === 'mcq') {
    return multipleChoiceItems;
  }

  return swipeItems;
}
