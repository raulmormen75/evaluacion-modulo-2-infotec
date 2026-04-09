import { describe, expect, it } from 'vitest';
import { allExercises, matchBatches, matchItems, multipleChoiceItems, swipeItems, themes } from '../src/data';

function countWords(text: string) {
  return text.trim().split(/\s+/).length;
}

describe('Banco de reactivos', () => {
  it('contiene exactamente 30 ejercicios', () => {
    expect(allExercises).toHaveLength(30);
  });

  it('respeta la distribución 10 + 10 + 10', () => {
    expect(matchItems).toHaveLength(10);
    expect(multipleChoiceItems).toHaveLength(10);
    expect(swipeItems).toHaveLength(10);
  });

  it('mantiene dos reactivos por tema en las tres actividades', () => {
    for (const theme of themes) {
      expect(matchItems.filter((item) => item.themeId === theme.id)).toHaveLength(2);
      expect(multipleChoiceItems.filter((item) => item.themeId === theme.id)).toHaveLength(2);
      expect(swipeItems.filter((item) => item.themeId === theme.id)).toHaveLength(2);
    }
  });

  it('divide la actividad de relacionar conceptos en dos bloques de 5', () => {
    for (const batch of matchBatches) {
      expect(matchItems.filter((item) => item.batch === batch)).toHaveLength(5);
    }
  });

  it('equilibra verdadero y falso en la actividad de deslizamiento', () => {
    const trueCount = swipeItems.filter((item) => item.correctAnswer).length;
    const falseCount = swipeItems.filter((item) => !item.correctAnswer).length;

    expect(trueCount).toBe(5);
    expect(falseCount).toBe(5);
  });

  it('mantiene 5 opciones por pregunta y longitudes parejas', () => {
    for (const item of multipleChoiceItems) {
      expect(item.options).toHaveLength(5);

      const lengths = item.options.map((option) => countWords(option.text));
      const spread = Math.max(...lengths) - Math.min(...lengths);

      expect(spread).toBeLessThanOrEqual(4);
    }
  });

  it('distribuye las respuestas correctas entre todos los incisos', () => {
    const counts = new Map<'a' | 'b' | 'c' | 'd' | 'e', number>([
      ['a', 0],
      ['b', 0],
      ['c', 0],
      ['d', 0],
      ['e', 0]
    ]);

    for (const item of multipleChoiceItems) {
      counts.set(item.correctAnswer, (counts.get(item.correctAnswer) ?? 0) + 1);
    }

    expect([...counts.values()]).toEqual([2, 2, 2, 2, 2]);
  });
});
