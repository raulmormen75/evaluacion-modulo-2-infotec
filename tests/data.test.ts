import { describe, expect, it } from 'vitest';
import { allExercises, matchItems, multipleChoiceItems, swipeItems, themes } from '../src/data';

describe('Banco de reactivos', () => {
  it('contiene exactamente 100 ejercicios', () => {
    expect(allExercises).toHaveLength(100);
  });

  it('respeta la distribución 25 + 50 + 25', () => {
    expect(matchItems).toHaveLength(25);
    expect(multipleChoiceItems).toHaveLength(50);
    expect(swipeItems).toHaveLength(25);
  });

  it('tiene la misma distribución por tema en las tres actividades', () => {
    for (const theme of themes) {
      expect(matchItems.filter((item) => item.themeId === theme.id)).toHaveLength(5);
      expect(multipleChoiceItems.filter((item) => item.themeId === theme.id)).toHaveLength(10);
      expect(swipeItems.filter((item) => item.themeId === theme.id)).toHaveLength(5);
    }
  });

  it('cumple con 12 verdaderos y 13 falsos en la actividad de deslizamiento', () => {
    const trueCount = swipeItems.filter((item) => item.correctAnswer).length;
    const falseCount = swipeItems.filter((item) => !item.correctAnswer).length;

    expect(trueCount).toBe(12);
    expect(falseCount).toBe(13);
  });

  it('mantiene 5 opciones en cada pregunta de opción múltiple', () => {
    for (const item of multipleChoiceItems) {
      expect(item.options).toHaveLength(5);
    }
  });
});
