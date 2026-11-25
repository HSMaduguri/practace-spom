import type { Chapter, CaseScenario } from '../scenariosData';
import type { GeneralMCQ } from '../generalMCQs';
import type { Flashcard } from '../flashcardData';
import type { FormulaDetail } from './setBFormulaDetails';

export interface SubjectDataset {
  chapters: Chapter[];
  caseScenarios: CaseScenario[];
  generalMCQs: GeneralMCQ[];
  flashcards: Flashcard[];
  formulaDetails: Record<string, FormulaDetail>;
}

const subjectCache: Partial<Record<'setA' | 'setB', SubjectDataset>> = {};

export async function loadSubjectDataset(subject: 'setA' | 'setB'): Promise<SubjectDataset> {
  const cached = subjectCache[subject];
  if (cached) {
    return cached;
  }

  if (subject === 'setA') {
    const [chapMod, casesMod, mcqsMod, flashMod, limitsMod] = await Promise.all([
      import('../setA/setAChapters'),
      import('../setA/setACases'),
      import('../setA/setAMcqs'),
      import('../setA/setAFlashcards'),
      import('../setA/setALegalLimits'),
    ]);
    const dataset: SubjectDataset = {
      chapters: chapMod.setAChapters,
      caseScenarios: casesMod.setACases,
      generalMCQs: mcqsMod.setAMCQs,
      flashcards: flashMod.setAFlashcards,
      formulaDetails: limitsMod.SET_A_LEGAL_LIMITS,
    };
    subjectCache.setA = dataset;
    return dataset;
  }

  const [scenMod, mcqsMod, flashMod, formulaMod] = await Promise.all([
    import('../scenariosData'),
    import('../generalMCQs'),
    import('../flashcardData'),
    import('./setBFormulaDetails'),
  ]);
  const dataset: SubjectDataset = {
    chapters: scenMod.chapters,
    caseScenarios: scenMod.caseScenarios,
    generalMCQs: mcqsMod.generalMCQs,
    flashcards: flashMod.flashcards,
    formulaDetails: formulaMod.SET_B_FORMULA_DETAILS,
  };
  subjectCache.setB = dataset;
  return dataset;
}
