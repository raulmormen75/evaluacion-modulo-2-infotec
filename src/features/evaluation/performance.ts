import {
  allExercises,
  getThemeById,
  themes,
  totalExercises,
  type ActivityType,
  type EvaluationMetrics,
  type EvaluationSnapshot
} from '../../data';

export interface PerformanceFeedback {
  tone: 'success' | 'progress' | 'support';
  badge: string;
  title: string;
  strength: string;
  opportunity: string | null;
  reinforcementThemes: string[];
  reinforcementSituations: string[];
  hasReinforcement: boolean;
}

type ExerciseDefinition = (typeof allExercises)[number];

interface ThemeInsight {
  themeId: number;
  label: string;
  shortTitle: string;
  incorrectAttempts: number;
  weightedScore: number;
  topFocusAreas: string[];
}

interface SituationInsight {
  label: string;
  incorrectAttempts: number;
  weightedScore: number;
}

const activityWeights: Record<ActivityType, number> = {
  match: 1,
  mcq: 1.15,
  swipe: 1.08
};

const activityDifficultyClues: Record<ActivityType, string> = {
  match: 'relacionar conceptos con sus significados y aplicaciones',
  mcq: 'interpretar escenarios y aplicar criterios del módulo',
  swipe: 'validar enunciados y distinguir afirmaciones correctas o incorrectas'
};

const focusAreaLabels: Record<string, string> = {
  '1:concepto_base': 'operadores de facto, poder de mercado y control de acceso',
  '1:remedio': 'interoperabilidad, portabilidad y costos de cambio',
  '1:mercado': 'poder de mercado en servicios gratuitos',
  '2:concepto_base': 'registro distribuido y trazabilidad verificable',
  '2:automatizacion': 'contratos inteligentes y automatización verificable',
  '2:identidad': 'identidad digital, resguardo de datos y controles de acceso',
  '2:regulacion': 'privacidad y supervisión institucional en blockchain',
  '3:mexico': 'cobros digitales inmediatos y uso de SPEI',
  '3:convergencia': 'convergencia entre pagos móviles, red y autenticación',
  '3:coordinacion': 'coordinación entre regulación financiera y telecomunicaciones',
  '3:inclusion': 'inclusión financiera apoyada en conectividad móvil',
  '3:datos': 'finanzas abiertas, APIs y datos transaccionales',
  '4:trabajo': 'gestión algorítmica, tareas, ingresos y permanencia',
  '4:laboral': 'obligaciones laborales y seguridad social en plataformas',
  '4:regulacion': 'tarifas, reputaciones y reglas centrales del servicio',
  '5:competencia': 'autopreferencia y afectaciones a la competencia',
  '5:consumidor': 'portabilidad de datos, costos de cambio y encerramiento del usuario'
};

const situationLabels: Record<string, string> = {
  'match-t1-1': 'Mercado multilateral y valor de las interacciones entre usuarios',
  'match-t2-1': 'DLT y trazabilidad verificable entre participantes',
  'match-t3-1': 'CoDi y pagos inmediatos sobre SPEI',
  'match-t4-1': 'Gestión algorítmica para asignar tareas, incentivos y sanciones',
  'match-t5-1': 'Autopreferencia dentro de mercados controlados por plataformas',
  'match-t1-2': 'Portabilidad de datos entre proveedores',
  'match-t2-2': 'Identidad digital verificable con acceso controlado',
  'match-t3-2': 'Finanzas abiertas con consentimiento del usuario',
  'match-t4-2': 'Subordinación mediante TIC y condiciones de permanencia',
  'match-t5-2': 'Encerramiento del usuario por pérdida de datos o contactos',
  'mcq-t1-1': 'Plataformas digitales como operadores de facto y control de acceso o visibilidad',
  'mcq-t1-2': 'Integraciones de terceros, acceso e interoperabilidad',
  'mcq-t2-1': 'Contratos inteligentes y automatización de pagos o acciones',
  'mcq-t2-2': 'Blockchain para identidad digital y resguardo de datos sensibles',
  'mcq-t3-1': 'Billeteras digitales móviles y convergencia entre conectividad y pagos',
  'mcq-t3-2': 'Inclusión financiera apoyada en conectividad móvil',
  'mcq-t4-1': 'Plataformas de transporte o reparto que fijan tarifas, reputaciones y acceso',
  'mcq-t4-2': 'Subordinación, incentivos y sanciones en plataformas de reparto',
  'mcq-t5-1': 'Autopreferencia y afectación a la competencia entre vendedores',
  'mcq-t5-2': 'Portabilidad de datos y riesgo de encerramiento del usuario',
  'swipe-t1-1': 'Operación material de plataformas sin poseer la red física',
  'swipe-t1-2': 'Poder de mercado aunque el servicio sea gratuito',
  'swipe-t2-1': 'Automatización de pagos mediante contratos inteligentes',
  'swipe-t2-2': 'Privacidad y supervisión institucional en blockchain',
  'swipe-t3-1': 'Uso del móvil como autenticación, canal de pago y fuente de datos',
  'swipe-t3-2': 'Coordinación regulatoria entre fintech y telecomunicaciones',
  'swipe-t4-1': 'Gestión algorítmica y efectos en tareas, ingresos y permanencia',
  'swipe-t4-2': 'Obligaciones laborales y de seguridad social en apps',
  'swipe-t5-1': 'Autopreferencia de productos o servicios de la propia plataforma',
  'swipe-t5-2': 'Portabilidad de datos y cambio de proveedor'
};

function formatCount(value: number, singular: string, plural: string) {
  return `${value} ${value === 1 ? singular : plural}`;
}

function joinLabels(labels: string[]) {
  if (labels.length === 0) {
    return '';
  }

  if (labels.length === 1) {
    return labels[0];
  }

  if (labels.length === 2) {
    return `${labels[0]} y ${labels[1]}`;
  }

  return `${labels.slice(0, -1).join(', ')} y ${labels[labels.length - 1]}`;
}

function buildSituationLabel(exercise: ExerciseDefinition) {
  const mapped = situationLabels[exercise.id];

  if (mapped) {
    return mapped;
  }

  return exercise.prompt.replace(/[?¿]/g, '').trim();
}

function getFocusAreaLabel(exercise: ExerciseDefinition) {
  const specificKey = `${exercise.themeId}:${exercise.subtype}`;
  const mapped = focusAreaLabels[specificKey];

  if (mapped) {
    return mapped;
  }

  return exercise.prompt.replace(/[?¿.]/g, '').trim().toLowerCase();
}

function getFailureWeight(exercise: ExerciseDefinition, incorrectAttempts: number) {
  const repeatedPenalty = incorrectAttempts >= 3 ? 0.4 : incorrectAttempts >= 2 ? 0.2 : 0;
  return incorrectAttempts * activityWeights[exercise.activity] + repeatedPenalty;
}

function buildStrengthMessage(snapshot: EvaluationSnapshot, metrics: EvaluationMetrics) {
  const themePerformance = themes
    .map((theme) => {
      const themeExercises = allExercises.filter((exercise) => exercise.themeId === theme.id);
      const resolvedOnFirstAttempt = themeExercises.filter(
        (exercise) => snapshot.exercises[exercise.id]?.resolvedOnFirstAttempt
      ).length;
      const incorrectAttempts = themeExercises.reduce(
        (total, exercise) => total + (snapshot.exercises[exercise.id]?.incorrectAttempts ?? 0),
        0
      );

      return {
        theme,
        resolvedOnFirstAttempt,
        incorrectAttempts
      };
    })
    .sort(
      (left, right) =>
        right.resolvedOnFirstAttempt - left.resolvedOnFirstAttempt ||
        left.incorrectAttempts - right.incorrectAttempts ||
        left.theme.id - right.theme.id
    );

  const strongestThemes = themePerformance
    .filter((theme) => theme.incorrectAttempts === 0 && theme.resolvedOnFirstAttempt > 0)
    .slice(0, 2)
    .map((theme) => `${theme.theme.label}. ${theme.theme.shortTitle}`);

  if (metrics.scorePercent === 100) {
    return `Alcanzaste ${metrics.scorePercent} % con ${formatCount(
      metrics.firstAttemptCorrectCount,
      'ejercicio correcto al primer intento',
      'ejercicios correctos al primer intento'
    )} y sin intentos fallidos.`;
  }

  if (strongestThemes.length > 0) {
    return `Mostraste mayor solidez en ${joinLabels(strongestThemes)}, además de completar ${metrics.resolvedCount} de ${totalExercises} ejercicios.`;
  }

  return `Ya construiste una base firme: completaste ${metrics.resolvedCount} de ${totalExercises} ejercicios y lograste ${formatCount(
    metrics.firstAttemptCorrectCount,
    'ejercicio correcto al primer intento',
    'ejercicios correctos al primer intento'
  )}.`;
}

function buildDiagnosticProfile(snapshot: EvaluationSnapshot) {
  const failedExercises = allExercises
    .map((exercise) => ({
      exercise,
      progress: snapshot.exercises[exercise.id]
    }))
    .filter(({ progress }) => progress?.incorrectAttempts > 0);

  const themeMap = new Map<
    number,
    {
      themeId: number;
      label: string;
      shortTitle: string;
      incorrectAttempts: number;
      weightedScore: number;
      focusAreas: Map<string, number>;
    }
  >();

  const activityScores = new Map<ActivityType, number>();

  const situationInsights: SituationInsight[] = failedExercises
    .map(({ exercise, progress }) => {
      const weightedScore = getFailureWeight(exercise, progress.incorrectAttempts);
      const theme = getThemeById(exercise.themeId);
      const existing = themeMap.get(exercise.themeId);

      if (existing) {
        existing.incorrectAttempts += progress.incorrectAttempts;
        existing.weightedScore += weightedScore;
        existing.focusAreas.set(
          getFocusAreaLabel(exercise),
          (existing.focusAreas.get(getFocusAreaLabel(exercise)) ?? 0) + weightedScore
        );
      } else {
        themeMap.set(exercise.themeId, {
          themeId: exercise.themeId,
          label: theme.label,
          shortTitle: theme.shortTitle,
          incorrectAttempts: progress.incorrectAttempts,
          weightedScore,
          focusAreas: new Map([[getFocusAreaLabel(exercise), weightedScore]])
        });
      }

      activityScores.set(
        exercise.activity,
        (activityScores.get(exercise.activity) ?? 0) + weightedScore
      );

      return {
        label: `${buildSituationLabel(exercise)} (${formatCount(progress.incorrectAttempts, 'fallo', 'fallos')})`,
        incorrectAttempts: progress.incorrectAttempts,
        weightedScore
      };
    })
    .sort(
      (left, right) =>
        right.weightedScore - left.weightedScore || right.incorrectAttempts - left.incorrectAttempts
    );

  const themeInsights: ThemeInsight[] = [...themeMap.values()]
    .map((theme) => ({
      themeId: theme.themeId,
      label: theme.label,
      shortTitle: theme.shortTitle,
      incorrectAttempts: theme.incorrectAttempts,
      weightedScore: theme.weightedScore,
      topFocusAreas: [...theme.focusAreas.entries()]
        .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'es'))
        .slice(0, 2)
        .map(([focusArea]) => focusArea)
    }))
    .sort(
      (left, right) =>
        right.weightedScore - left.weightedScore ||
        right.incorrectAttempts - left.incorrectAttempts ||
        left.themeId - right.themeId
    );

  const totalWeightedScore = themeInsights.reduce((total, theme) => total + theme.weightedScore, 0);
  const dominantActivity = [...activityScores.entries()].sort((left, right) => right[1] - left[1])[0]?.[0] ?? 'mcq';

  return {
    themeInsights,
    situationInsights,
    totalWeightedScore,
    dominantActivity
  };
}

function getThemePriority(theme: ThemeInsight, totalWeightedScore: number) {
  const share = totalWeightedScore === 0 ? 0 : theme.weightedScore / totalWeightedScore;

  if (share >= 0.38 || theme.incorrectAttempts >= 4) {
    return 'prioridad alta';
  }

  if (share >= 0.2 || theme.incorrectAttempts >= 2) {
    return 'prioridad media';
  }

  return 'ajuste puntual';
}

function buildOpportunityMessage(
  themeInsights: ThemeInsight[],
  totalWeightedScore: number,
  dominantActivity: ActivityType
) {
  const primaryThemes = themeInsights.slice(0, 2);
  const topTheme = primaryThemes[0];

  if (!topTheme) {
    return null;
  }

  const topFocusSummary = joinLabels(topTheme.topFocusAreas);
  const twoThemeShare =
    totalWeightedScore === 0
      ? 0
      : primaryThemes.reduce((total, theme) => total + theme.weightedScore, 0) / totalWeightedScore;
  const oneThemeShare = totalWeightedScore === 0 ? 0 : topTheme.weightedScore / totalWeightedScore;

  if (oneThemeShare >= 0.52) {
    return `El análisis detecta que la mayor parte de los fallos se concentra en ${topTheme.label}. ${topTheme.shortTitle}, sobre todo al ${activityDifficultyClues[dominantActivity]} en ${topFocusSummary}.`;
  }

  if (primaryThemes.length > 1 && twoThemeShare >= 0.72) {
    return `El análisis detecta un patrón concentrado en ${primaryThemes[0].label}. ${primaryThemes[0].shortTitle} y ${primaryThemes[1].label}. ${primaryThemes[1].shortTitle}, especialmente al ${activityDifficultyClues[dominantActivity]}.`;
  }

  const topLabels = themeInsights.slice(0, 3).map((theme) => `${theme.label}. ${theme.shortTitle}`);
  return `El análisis detecta fallos distribuidos en varios temas; conviene empezar por ${joinLabels(topLabels)}, sobre todo al ${activityDifficultyClues[dominantActivity]}.`;
}

export function getPerformanceFeedback(
  snapshot: EvaluationSnapshot,
  metrics: EvaluationMetrics
): PerformanceFeedback {
  const diagnosticProfile = buildDiagnosticProfile(snapshot);
  const reinforcementThemes = diagnosticProfile.themeInsights.slice(0, 3).map((theme) => {
    const focusSummary = joinLabels(theme.topFocusAreas);
    const priority = getThemePriority(theme, diagnosticProfile.totalWeightedScore);
    return `${theme.label}. ${theme.shortTitle}: ${focusSummary} (${priority}, ${formatCount(theme.incorrectAttempts, 'fallo', 'fallos')})`;
  });

  const reinforcementSituations = diagnosticProfile.situationInsights
    .slice(0, 3)
    .map((situation) => situation.label);

  const opportunity =
    metrics.scorePercent === 100
      ? null
      : buildOpportunityMessage(
          diagnosticProfile.themeInsights,
          diagnosticProfile.totalWeightedScore,
          diagnosticProfile.dominantActivity
        );

  if (metrics.scorePercent === 100) {
    return {
      tone: 'success',
      badge: 'Resultado perfecto',
      title: 'Cerraste el repaso con dominio completo del módulo.',
      strength: buildStrengthMessage(snapshot, metrics),
      opportunity: null,
      reinforcementThemes: [],
      reinforcementSituations: [],
      hasReinforcement: false
    };
  }

  if (metrics.scorePercent >= 90) {
    return {
      tone: 'success',
      badge: 'Logro sólido',
      title: 'Cerraste el repaso con un dominio muy favorable del módulo.',
      strength: buildStrengthMessage(snapshot, metrics),
      opportunity,
      reinforcementThemes,
      reinforcementSituations,
      hasReinforcement: true
    };
  }

  if (metrics.scorePercent >= 70) {
    return {
      tone: 'progress',
      badge: 'Buen avance',
      title: 'Tu repaso muestra un avance consistente en el módulo.',
      strength: buildStrengthMessage(snapshot, metrics),
      opportunity,
      reinforcementThemes,
      reinforcementSituations,
      hasReinforcement: true
    };
  }

  return {
    tone: 'support',
    badge: 'Refuerzo necesario',
    title: 'Este resultado ya te muestra con claridad dónde concentrar el repaso.',
    strength: `Tu avance actual es útil para estudiar mejor: completaste ${metrics.resolvedCount} de ${totalExercises} ejercicios y ya puedes ubicar con precisión las áreas que requieren mayor atención.`,
    opportunity,
    reinforcementThemes,
    reinforcementSituations,
    hasReinforcement: true
  };
}
