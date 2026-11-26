import { useState, useEffect, useRef, lazy, Suspense, type FormEvent } from 'react';
import {
  BookOpen,
  Award,
  Trophy,
  Timer,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  RefreshCw,
  Play,
  ArrowRight,
  ChevronRight,
  ClipboardList,
  BarChart2,
  Calculator,
  Bookmark,
  BookmarkCheck,
  Filter,
  Clock,
  ChevronLeft,
  Lightbulb,
  Check,
  AlertTriangle,
  HelpCircle,
  LayoutDashboard,
  FileText,
  Save,
  Search,
  ExternalLink,
  Sun,
  Moon,
  Download,
  StickyNote,
  Trash2,
  X,
  Copy,
  Users,
  Linkedin,
  Instagram,
  Mail,
  Lock,
  Menu,
  CloudLightning,
  Scale,
  Sparkles,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import type { CaseScenario, Question, Chapter } from './scenariosData';
import type { GeneralMCQ } from './generalMCQs';
import type { Flashcard } from './flashcardData';
import type { FormulaDetail } from './data/setBFormulaDetails';
import { loadSubjectDataset, type SubjectDataset } from './data/subjectLoader';
// practACE official brand logo asset (subtitle-free, high-contrast 2x Retina WebP, 772x200)
const practAceLogoImg = `${import.meta.env.BASE_URL}assets/aistudio/PractACE_Logo_336x112.webp?v=3`;
const ChapterVisualizer = lazy(() => import('./components/ChapterVisualizer'));
const SetATimeLimitsChart = lazy(() =>
  import('./components/ChapterVisualizer').then((m) => ({ default: m.SetATimeLimitsChart }))
);
const SetAMonetaryLimitsChart = lazy(() =>
  import('./components/ChapterVisualizer').then((m) => ({ default: m.SetAMonetaryLimitsChart }))
);
import { HighlightedText, getPlainChapterName } from './components/HighlightedText';
const SetALegalCalculators = lazy(() => import('./components/SetALegalCalculators'));

export interface BookmarkedQuestion {
  id: string; // composite key: `${caseId}-${qId}` or `general-${qId}`
  subject: 'setA' | 'setB';
  type: 'case' | 'general';
  chapterId: number;
  chapterName: string;
  caseId?: string;
  caseTitle?: string;
  questionId: string;
  questionText: string;
  options: { A: string; B: string; C: string; D: string };
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  examinerWarning?: string;
  savedAt: number;
}

// Supabase core configuration
import {
  supabase,
  supabaseUrl,
  supabaseKey,
  isSupabaseConfigured,
  toAppUser,
  initialUrlAuthSnapshot,
  setPasswordRecoveryActive,
  clearInitialAuthError,
  isRecoverySession,
  type AppUser,
  type ProgressSection
} from './supabase';


const getFormulaDetails = (name: string, formulaMap: Record<string, FormulaDetail>): FormulaDetail => {
  const normalizedKey = Object.keys(formulaMap).find(
    k => k.toLowerCase() === name.toLowerCase() || name.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(name.toLowerCase())
  );
  if (normalizedKey && formulaMap[normalizedKey]) {
    return formulaMap[normalizedKey];
  }
  return {
    context: "Core statutory provision or strategic formula mapped to the official ICAI CA Final SPOM curriculum.",
    derivation: "Derived from the applicable section, rule, or operational baseline to evaluate compliance and decision thresholds.",
    trigger: "Apply the statutory threshold, proviso, or performance benchmark to the facts of the case scenario."
  };
};

// Complete static chapter directory for both SPOM Set A (14 Chapters) and Set B (10 Chapters)
// so the Interactive Site Map & URL Router always have full syllabus metadata even before lazy chunks load.
const SITEMAP_SET_A_CHAPTERS: Array<{ id: number; code: string; title: string }> = [
  { id: 101, code: 'M1 – Ch 1', title: 'Appointment and Qualifications of Directors (Sec 149–172)' },
  { id: 102, code: 'M1 – Ch 2', title: 'Appointment and Remuneration of Managerial Personnel (Sec 196–205)' },
  { id: 103, code: 'M1 – Ch 3', title: 'Meetings of Board and its Powers (Sec 173–195)' },
  { id: 104, code: 'M1 – Ch 4', title: 'Inspection, Inquiry and Investigation (Sec 206–229)' },
  { id: 105, code: 'M1 – Ch 5', title: 'Compromises, Arrangements and Amalgamations (Sec 230–240)' },
  { id: 106, code: 'M1 – Ch 6', title: 'Prevention of Oppression and Mismanagement (Sec 241–246)' },
  { id: 107, code: 'M1 – Ch 7', title: 'Winding Up (Sec 270–365)' },
  { id: 108, code: 'M1 – Ch 8', title: 'Miscellaneous Provisions (Registered Valuer, Strike Off, Govt/Nidhi/Dormant Co & Sec 447)' },
  { id: 109, code: 'M1 – Ch 9', title: 'Adjudication, Special Courts, NCLT & NCLAT (Sec 407–454A)' },
  { id: 110, code: 'M1 – Ch 10', title: 'e-Filing, MCA21 Version 3.0 & Case Studies Relating to Ethics (Sec 396–404)' },
  { id: 111, code: 'M2 (Sec B) – Ch 1', title: 'SEBI Act 1992, SEBI (LODR) 2015, ICDR 2018, SAST 2011 & PIT 2015' },
  { id: 112, code: 'M2 (Part II) – Ch 1', title: 'The Foreign Exchange Management Act (FEMA), 1999' },
  { id: 113, code: 'M2 (Part II) – Ch 2', title: 'The Foreign Contribution (Regulation) Act (FCRA), 2010' },
  { id: 114, code: 'M2 (Part II) – Ch 3', title: 'The Insolvency and Bankruptcy Code (IBC), 2016 (Up to Sec 33)' }
];

const SITEMAP_SET_B_CHAPTERS: Array<{ id: number; code: string; title: string }> = [
  { id: 1, code: 'Part 01', title: 'An Introduction to Strategic Cost Management' },
  { id: 2, code: 'Part 02', title: 'Modern Business Environment & Cost of Quality (COQ / TQM)' },
  { id: 3, code: 'Part 03', title: 'Lean System and Innovation (JIT, TPM, OEE, 5S, Six Sigma)' },
  { id: 4, code: 'Part 04', title: 'Specialist Cost Management Techniques (Target, Life Cycle, TPAR, EMA)' },
  { id: 5, code: 'Part 05', title: 'Strategic Decision Making & Relevant Costing Analysis' },
  { id: 6, code: 'Part 06', title: 'Pricing Decisions & Strategic Pricing Models' },
  { id: 7, code: 'Part 07', title: 'Performance Evaluation & Control (Balanced Scorecard, Building Blocks, Triple Bottom Line)' },
  { id: 8, code: 'Part 08', title: 'Divisional Transfer Pricing & Goal Congruence' },
  { id: 9, code: 'Part 09', title: 'Strategic Analysis of Operating Income & Budgetary Control (ABB / ZBB)' },
  { id: 10, code: 'Part 10', title: 'Standard Costing & Advanced Planning / Operational Variances' }
];

export default function App() {
  // Theme State (light / dark — defaults to light mode)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('practace_theme');
      return saved === 'dark' || saved === 'light' ? saved : 'light';
    } catch (e) {
      return 'light';
    }
  });

  // Sync theme to HTML root element for tailwind v4 class-based dark mode
  useEffect(() => {
    try {
      localStorage.setItem('practace_theme', theme);
      localStorage.setItem('theme', theme);
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } catch (e) {
      console.error("Failed to sync theme class to document element", e);
    }
  }, [theme]);

  // Navigation State
  const [activeSubject, setActiveSubject] = useState<'setA' | 'setB'>(() => {
    try {
      return (localStorage.getItem('spom_active_subject') as 'setA' | 'setB') || 'setB';
    } catch (e) {
      return 'setB';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('spom_active_subject', activeSubject);
    } catch (e) {
      console.error("Failed to persist activeSubject", e);
    }
  }, [activeSubject]);

  // Supabase Authentication & Synchronization States
  const [sessionUser, setSessionUser] = useState<AppUser | null>(null);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [cloudSyncing, setCloudSyncing] = useState<boolean>(false);
  const [isSavingCloud, setIsSavingCloud] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');
  const [fullNameInput, setFullNameInput] = useState<string>('');
  const [recoveryLinkOrCodeInput, setRecoveryLinkOrCodeInput] = useState<string>('');
  const [isPasswordRecovery, setIsPasswordRecovery] = useState<boolean>(() => initialUrlAuthSnapshot.isRecovery);
  const [isAuthErrorGate, setIsAuthErrorGate] = useState<boolean>(() => Boolean(initialUrlAuthSnapshot.errorDescription));
  const [isGoogleProviderEnabled, setIsGoogleProviderEnabled] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true);
  const [landingCurriculumTab, setLandingCurriculumTab] = useState<'setA' | 'setB'>('setA');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeLegalDoc, setActiveLegalDoc] = useState<
    'sitemap' | 'security' | 'privacy' | 'terms' | 'disclaimer' | 'cookies' | null
  >(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const authPortalRef = useRef<HTMLDivElement>(null);

  const scrollToAuthPortal = (mode?: 'signin' | 'signup' | 'forgot') => {
    if (mode) {
      setAuthMode(mode);
      setAuthError(null);
      setAuthMessage(null);
    }
    if (authPortalRef.current) {
      authPortalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (initialUrlAuthSnapshot.errorDescription) {
      const friendlyError =
        initialUrlAuthSnapshot.errorCode === 'otp_expired'
          ? 'This password reset link has expired or has already been used. Please request a fresh reset link below, or paste your reset link/code.'
          : initialUrlAuthSnapshot.errorDescription;
      setAuthError(friendlyError);
      setAuthMode('forgot');
      setIsAuthErrorGate(true);
      clearInitialAuthError();
      window.history.replaceState(null, '', `${window.location.origin}${window.location.pathname}`);
    }
  }, []);

  useEffect(() => {
    if (!supabase || !initialUrlAuthSnapshot.tokenHash) return;
    const tokenHash = initialUrlAuthSnapshot.tokenHash;
    const verifyType = (initialUrlAuthSnapshot.verifyType as 'recovery' | 'email' | 'invite' | 'email_change') || 'recovery';
    initialUrlAuthSnapshot.tokenHash = null;
    if (verifyType === 'recovery') {
      setPasswordRecoveryActive(true);
      setIsPasswordRecovery(true);
    }
    supabase.auth
      .verifyOtp({ token_hash: tokenHash, type: verifyType })
      .then(({ data, error }) => {
        if (error) {
          setPasswordRecoveryActive(false);
          setIsPasswordRecovery(false);
          setIsAuthErrorGate(true);
          setAuthMode('forgot');
          setAuthError(error.message || 'This password reset link is invalid or has expired. Please request a new one.');
        } else if (verifyType === 'recovery' || isRecoverySession(data.session)) {
          setPasswordRecoveryActive(true);
          setIsPasswordRecovery(true);
          setIsAuthErrorGate(false);
          setAuthError(null);
        }
        window.history.replaceState(null, '', `${window.location.origin}${window.location.pathname}`);
      })
      .catch((err: any) => {
        setPasswordRecoveryActive(false);
        setIsPasswordRecovery(false);
        setIsAuthErrorGate(true);
        setAuthMode('forgot');
        setAuthError(err?.message || 'Unable to verify password reset link.');
      });
  }, []);

  useEffect(() => {
    if (currentUser || !isSupabaseConfigured || !supabaseUrl || !supabaseKey) return;
    let cancelled = false;
    fetch(`${supabaseUrl}/auth/v1/settings`, {
      headers: { apikey: supabaseKey }
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.external) {
          setIsGoogleProviderEnabled(Boolean(data.external.google));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  useEffect(() => {
    if (!showProfileMenu) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showProfileMenu]);

  // Dynamically loaded Curriculum Dataset for active subject (code-split & gated by authentication)
  const [subjectDatasets, setSubjectDatasets] = useState<Partial<Record<'setA' | 'setB', SubjectDataset>>>({});

  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;
    if (!subjectDatasets[activeSubject]) {
      loadSubjectDataset(activeSubject).then((data) => {
        if (!cancelled) {
          setSubjectDatasets((prev) => ({ ...prev, [activeSubject]: data }));
        }
      });
    }
    return () => {
      cancelled = true;
    };
  }, [activeSubject, subjectDatasets, currentUser]);

  const activeDataset = subjectDatasets[activeSubject];
  const currentChapters: Chapter[] = activeDataset?.chapters ?? [];
  const currentCaseScenarios: CaseScenario[] = activeDataset?.caseScenarios ?? [];
  const currentGeneralMCQs: GeneralMCQ[] = activeDataset?.generalMCQs ?? [];
  const currentFlashcards: Flashcard[] = activeDataset?.flashcards ?? [];
  const currentFormulaDetails: Record<string, FormulaDetail> = activeDataset?.formulaDetails ?? {};

  const [activeTab, setActiveTab] = useState<'dashboard' | 'practice' | 'mock' | 'sandbox' | 'revision'>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [mcqProgressAnimate, setMcqProgressAnimate] = useState<number>(0);

  // What's New (practACE Rebrand + Set A) Opening Modal State:
  // Appears every time the user enters the app on initial load, and stays closed while running.
  const [showSetAAnnouncement, setShowSetAAnnouncement] = useState<boolean>(true);

  const handleCloseSetAAnnouncement = (switchToSetA = false) => {
    setShowSetAAnnouncement(false);
    if (switchToSetA) {
      setActiveSubject('setA');
    }
    setActiveTab('dashboard');
  };

  const handleOpenPracticeForChapter = (chapterId: number, preferredSubTab?: 'cases' | 'general') => {
    setSelectedChapterId(chapterId);
    const chapCases = currentCaseScenarios.filter(cs => cs.chapterId === chapterId);
    const chapMcqs = currentGeneralMCQs.filter(q => q.chapterId === chapterId);
    const targetSubTab: 'cases' | 'general' =
      preferredSubTab === 'general' && chapMcqs.length > 0
        ? 'general'
        : chapCases.length > 0
        ? 'cases'
        : 'general';
    if (chapCases.length > 0) {
      setSelectedCaseId(chapCases[0].id);
      setCurrentQuestionIndex(0);
    }
    setSelectedOption(null);
    setHasSubmittedPractice(false);
    setShowExplanation(false);
    setCurrentGeneralIndex(0);
    setSelectedGeneralOption(null);
    setHasSubmittedGeneral(false);
    setPracticeSubTab(targetSubTab);
    setActiveTab('practice');
  };

  // Revision Tab State
  const [selectedRevisionChapterId, setSelectedRevisionChapterId] = useState<number>(1);
  const [revisionSearchQuery, setRevisionSearchQuery] = useState<string>("");
  const [copiedFormulaName, setCopiedFormulaName] = useState<string | null>(null);

  // Formula Flashcard States
  const [revisionSubView, setRevisionSubView] = useState<'study' | 'flashcards' | 'frameworks'>('study');
  const [flashcardMode, setFlashcardMode] = useState<'drill' | 'quiz'>('drill');
  const [currentFlashcardKey, setCurrentFlashcardKey] = useState<string>("");
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [flashcardPerformance, setFlashcardPerformance] = useState<Record<string, 'known' | 'learning'>>(() => {
    try {
      const saved = localStorage.getItem('flashcardPerformance');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Theoretical Framework Flashcard States
  const [currentFrameworkCardIndex, setCurrentFrameworkCardIndex] = useState<number>(0);
  const [isFrameworkCardFlipped, setIsFrameworkCardFlipped] = useState<boolean>(false);
  const [frameworkCardAssessments, setFrameworkCardAssessments] = useState<Record<string, 'Hard' | 'Medium' | 'Mastered'>>(() => {
    try {
      const saved = localStorage.getItem('framework_card_assessments');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Persist framework card assessments to local storage only for authenticated user
  useEffect(() => {
    if (!currentUser) return;
    try {
      localStorage.setItem('framework_card_assessments', JSON.stringify(frameworkCardAssessments));
    } catch (e) {
      console.error("Failed to save framework assessments to localStorage", e);
    }
  }, [frameworkCardAssessments, currentUser]);

  const [quizQuestionType, setQuizQuestionType] = useState<'name-to-details' | 'details-to-name'>('details-to-name');
  const [quizTargetKey, setQuizTargetKey] = useState<string>("");
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizIsSubmitted, setQuizIsSubmitted] = useState<boolean>(false);
  const [quizCorrectOptionIndex, setQuizCorrectOptionIndex] = useState<number>(-1);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  // Set initial random flashcard key and reset when subject switches
  useEffect(() => {
    const keys = Object.keys(currentFormulaDetails);
    if (keys.length > 0) {
      if (!currentFlashcardKey || !currentFormulaDetails[currentFlashcardKey]) {
        setCurrentFlashcardKey(keys[0]);
        setIsCardFlipped(false);
      }
      if (!quizTargetKey || !currentFormulaDetails[quizTargetKey]) {
        handleGenerateQuizQuestion();
      }
    }
  }, [activeSubject, currentFlashcardKey, quizTargetKey, currentFormulaDetails]);

  useEffect(() => {
    if (!currentUser) return;
    try {
      localStorage.setItem('flashcardPerformance', JSON.stringify(flashcardPerformance));
    } catch (e) {
      console.error("Failed to save flashcard performance to localStorage", e);
    }
  }, [flashcardPerformance, currentUser]);

  const handleGenerateQuizQuestion = (type?: 'name-to-details' | 'details-to-name') => {
    const keys = Object.keys(currentFormulaDetails);
    if (keys.length === 0) return;
    
    // Pick question type
    const chosenType = type || (Math.random() > 0.5 ? 'name-to-details' : 'details-to-name');
    
    // Pick random target formula key
    const targetKey = keys[Math.floor(Math.random() * keys.length)];
    
    // Generate 3 unique distractors
    const otherKeys = keys.filter(k => k !== targetKey);
    const shuffledOtherKeys = [...otherKeys].sort(() => 0.5 - Math.random());
    const selectedOtherKeys = shuffledOtherKeys.slice(0, 3);
    
    let optionsList: string[] = [];
    if (chosenType === 'details-to-name') {
      optionsList = [targetKey, ...selectedOtherKeys];
    } else {
      const targetDetails = currentFormulaDetails[targetKey];
      const targetText = `Context: ${targetDetails.context}\nDerivation: ${targetDetails.derivation}\nDecision Rule: ${targetDetails.trigger}`;
      
      const distractorTexts = selectedOtherKeys.map(k => {
        const d = currentFormulaDetails[k];
        return `Context: ${d.context}\nDerivation: ${d.derivation}\nDecision Rule: ${d.trigger}`;
      });
      optionsList = [targetText, ...distractorTexts];
    }
    
    // Shuffle options list
    const shuffled = optionsList
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
      
    // Find correct index
    let correctIdx = -1;
    if (chosenType === 'details-to-name') {
      correctIdx = shuffled.indexOf(targetKey);
    } else {
      const targetDetails = currentFormulaDetails[targetKey];
      const targetText = `Context: ${targetDetails.context}\nDerivation: ${targetDetails.derivation}\nDecision Rule: ${targetDetails.trigger}`;
      correctIdx = shuffled.indexOf(targetText);
    }
    
    setQuizQuestionType(chosenType);
    setQuizTargetKey(targetKey);
    setQuizOptions(shuffled);
    setQuizSelectedOption(null);
    setQuizIsSubmitted(false);
    setQuizCorrectOptionIndex(correctIdx);
  };

  // Generate quiz on revision sub-view activation
  useEffect(() => {
    if (revisionSubView === 'flashcards' && flashcardMode === 'quiz' && !quizTargetKey) {
      handleGenerateQuizQuestion();
    }
  }, [revisionSubView, flashcardMode, quizTargetKey]);

  // Disable right-click context menu across the entire application
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu, true);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true);
    };
  }, []);

  // Study Practice State
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-01");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [hasSubmittedPractice, setHasSubmittedPractice] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Practice Sub-tab State: Cases, Standalone General MCQs, or Saved Questions Vault
  const [practiceSubTab, setPracticeSubTab] = useState<'cases' | 'general' | 'saved'>('cases');
  const [currentGeneralIndex, setCurrentGeneralIndex] = useState<number>(0);
  const [selectedGeneralOption, setSelectedGeneralOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [hasSubmittedGeneral, setHasSubmittedGeneral] = useState<boolean>(false);

  // Saved / Bookmarked Questions State & Filters
  const [savedFilterType, setSavedFilterType] = useState<'all' | 'case' | 'general'>('all');
  const [savedFilterStatus, setSavedFilterStatus] = useState<'all' | 'solved' | 'pending'>('all');
  const [savedSearchQuery, setSavedSearchQuery] = useState<string>("");
  const [expandedBookmarkKey, setExpandedBookmarkKey] = useState<string | null>(null);
  
  // Sticky Notes / Study Annotations State
  const [caseNotes, setCaseNotes] = useState<Record<string, { text: string; color: string; lastUpdated: string }>>(() => {
    try {
      const saved = localStorage.getItem('caseNotes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Automatically save notes to localStorage only for authenticated user
  useEffect(() => {
    if (!currentUser) return;
    try {
      localStorage.setItem('caseNotes', JSON.stringify(caseNotes));
    } catch (e) {
      console.error("Failed to save case annotations to localStorage", e);
    }
  }, [caseNotes, currentUser]);

  // Toggle state to collapse or expand sticky note pane in high-contrast practice view
  const [showNotesPane, setShowNotesPane] = useState<boolean>(true);

  // Persistent Global study notepad state
  const [showGlobalNotepad, setShowGlobalNotepad] = useState<boolean>(() => {
    return localStorage.getItem('show_global_notepad') === 'true';
  });
  const [globalNotepadText, setGlobalNotepadText] = useState<string>(() => {
    return localStorage.getItem('global_notepad_text') || "";
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('show_global_notepad', String(showGlobalNotepad));
  }, [showGlobalNotepad]);

  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem('global_notepad_text', globalNotepadText);
  }, [globalNotepadText, currentUser]);

  const handleInsertTemplate = (template: string) => {
    setGlobalNotepadText(prev => prev ? prev + "\n" + template : template);
  };

  // Quick Reference Floating Widget State
  const [showQuickRef, setShowQuickRef] = useState<boolean>(false);
  const [quickRefSearch, setQuickRefSearch] = useState<string>("");
  const [quickRefCopiedName, setQuickRefCopiedName] = useState<string | null>(null);

  const [practiceProgress, setPracticeProgress] = useState<Record<string, { answered: boolean; correct: boolean; score: number; selectedOption?: 'A' | 'B' | 'C' | 'D' }>>(() => {
    try {
      const saved = localStorage.getItem('practiceProgress');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Persist progress changes to localStorage only for authenticated user
  useEffect(() => {
    if (!currentUser) return;
    try {
      localStorage.setItem('practiceProgress', JSON.stringify(practiceProgress));
    } catch (e) {
      console.error("Failed to save practice progress to localStorage", e);
    }
  }, [practiceProgress, currentUser]);

  // Saved / Bookmarked Practice Questions State
  const [savedBookmarks, setSavedBookmarks] = useState<Record<string, BookmarkedQuestion>>(() => {
    try {
      const saved = localStorage.getItem('spom_saved_bookmarks_v1');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    if (!currentUser) return;
    try {
      localStorage.setItem('spom_saved_bookmarks_v1', JSON.stringify(savedBookmarks));
    } catch (e) {
      console.error("Failed to save bookmarks to localStorage", e);
    }
  }, [savedBookmarks, currentUser]);

  const toggleBookmarkQuestion = (item: {
    key?: string;
    id?: string;
    subject: 'setA' | 'setB';
    type: 'case' | 'general';
    chapterId: number;
    chapterName: string;
    caseId?: string;
    caseTitle?: string;
    questionId: string;
    questionText: string;
    options: { A: string; B: string; C: string; D: string };
    correctOption: 'A' | 'B' | 'C' | 'D';
    explanation: string;
    examinerWarning?: string;
  }) => {
    const bookmarkKey = item.key || item.id || '';
    if (!bookmarkKey) return;
    setSavedBookmarks(prev => {
      const next = { ...prev };
      if (next[bookmarkKey]) {
        delete next[bookmarkKey];
      } else {
        next[bookmarkKey] = {
          id: bookmarkKey,
          subject: item.subject,
          type: item.type,
          chapterId: item.chapterId,
          chapterName: item.chapterName,
          caseId: item.caseId,
          caseTitle: item.caseTitle,
          questionId: item.questionId,
          questionText: item.questionText,
          options: item.options,
          correctOption: item.correctOption,
          explanation: item.explanation,
          examinerWarning: item.examinerWarning,
          savedAt: Date.now()
        };
      }
      return next;
    });
  };

  const isQuestionBookmarked = (key: string) => !!savedBookmarks[key];

  const latestProgressRef = useRef({
    practiceProgress,
    savedBookmarks,
    flashcardPerformance,
    frameworkCardAssessments,
    caseNotes,
    globalNotepadText
  });

  useEffect(() => {
    latestProgressRef.current = {
      practiceProgress,
      savedBookmarks,
      flashcardPerformance,
      frameworkCardAssessments,
      caseNotes,
      globalNotepadText
    };
  }, [practiceProgress, savedBookmarks, flashcardPerformance, frameworkCardAssessments, caseNotes, globalNotepadText]);

  const hydratedUidRef = useRef<string | null>(null);
  const lastSyncedJsonRef = useRef<{ practice: string; flashcards: string; notes: string }>({
    practice: '',
    flashcards: '',
    notes: ''
  });

  const upsertProgressSection = async (
    userId: string,
    section: ProgressSection,
    payload: Record<string, unknown>
  ) => {
    if (!supabase) return;
    const { error } = await supabase
      .from('user_progress')
      .upsert({ user_id: userId, section, payload }, { onConflict: 'user_id,section' });
    if (error) throw error;
  };

  // Listen for Supabase Authentication state changes (synchronous callback to avoid auth lock contention)
  useEffect(() => {
    if (!supabase) {
      setIsAuthLoading(false);
      return;
    }

    let mounted = true;
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) {
          console.error('Failed to read Supabase session:', error);
        }
        if (isRecoverySession(data.session)) {
          setPasswordRecoveryActive(true);
          setIsPasswordRecovery(true);
          setIsAuthErrorGate(false);
        }
        setSessionUser(data.session?.user ? toAppUser(data.session.user) : null);
        setIsAuthLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error('Unexpected session check error:', err);
        setIsAuthLoading(false);
      });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === 'PASSWORD_RECOVERY' || isRecoverySession(session)) {
        setPasswordRecoveryActive(true);
        setIsPasswordRecovery(true);
        setIsAuthErrorGate(false);
        setAuthError(null);
        setAuthMessage(null);
        setPasswordInput('');
        setConfirmPasswordInput('');
      } else if (event === 'SIGNED_OUT') {
        setPasswordRecoveryActive(false);
        setIsPasswordRecovery(false);
      }
      setSessionUser(session?.user ? toAppUser(session.user) : null);
      setIsAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Hydrate or initialize cloud profile & progress whenever authenticated sessionUser changes
  useEffect(() => {
    if (!supabase || !sessionUser || isPasswordRecovery || isAuthErrorGate) {
      hydratedUidRef.current = null;
      lastSyncedJsonRef.current = { practice: '', flashcards: '', notes: '' };
      setCurrentUser(null);
      setCloudSyncing(false);
      return;
    }

    const client = supabase;
    let cancelled = false;

    const hydrateCloudState = async () => {
      hydratedUidRef.current = null;
      setCloudSyncing(true);
      setAuthError(null);
      setAuthMessage(null);
      setSyncError(null);

      try {
        const { error: profileError } = await client.from('profiles').upsert(
          {
            id: sessionUser.id,
            email: sessionUser.email,
            display_name: sessionUser.displayName,
            photo_url: sessionUser.photoURL
          },
          { onConflict: 'id' }
        );
        if (profileError) throw profileError;

        const { data: rows, error: progressError } = await client
          .from('user_progress')
          .select('section, payload')
          .eq('user_id', sessionUser.id);
        if (progressError) throw progressError;
        if (cancelled) return;

        if (!rows || rows.length === 0) {
          // New cloud account: initialize 3 progress buckets from current client snapshot
          const snapshot = latestProgressRef.current;
          const practicePayload = {
            practiceProgress: snapshot.practiceProgress,
            savedBookmarks: snapshot.savedBookmarks
          };
          const flashcardsPayload = {
            flashcardPerformance: snapshot.flashcardPerformance,
            frameworkCardAssessments: snapshot.frameworkCardAssessments
          };
          const notesPayload = {
            caseNotes: snapshot.caseNotes,
            globalNotepadText: snapshot.globalNotepadText
          };

          const { error: seedError } = await client.from('user_progress').upsert(
            [
              { user_id: sessionUser.id, section: 'practice', payload: practicePayload },
              { user_id: sessionUser.id, section: 'flashcards', payload: flashcardsPayload },
              { user_id: sessionUser.id, section: 'notes', payload: notesPayload }
            ],
            { onConflict: 'user_id,section' }
          );
          if (seedError) throw seedError;

          lastSyncedJsonRef.current = {
            practice: JSON.stringify(practicePayload),
            flashcards: JSON.stringify(flashcardsPayload),
            notes: JSON.stringify(notesPayload)
          };
          hydratedUidRef.current = sessionUser.id;
        } else {
          // Existing cloud account: apply server progress buckets
          const sectionMap = new Map<string, any>();
          rows.forEach((row) => {
            sectionMap.set(row.section, row.payload ?? {});
          });

          const practiceData = sectionMap.get('practice') ?? {};
          const nextPractice = practiceData?.practiceProgress ?? {};
          const nextBookmarks = practiceData?.savedBookmarks ?? {};
          lastSyncedJsonRef.current.practice = JSON.stringify({
            practiceProgress: nextPractice,
            savedBookmarks: nextBookmarks
          });
          setPracticeProgress(nextPractice);
          setSavedBookmarks(nextBookmarks);

          const flashcardsData = sectionMap.get('flashcards') ?? {};
          const nextFlashcards = flashcardsData?.flashcardPerformance ?? {};
          const nextFrameworks = flashcardsData?.frameworkCardAssessments ?? {};
          lastSyncedJsonRef.current.flashcards = JSON.stringify({
            flashcardPerformance: nextFlashcards,
            frameworkCardAssessments: nextFrameworks
          });
          setFlashcardPerformance(nextFlashcards);
          setFrameworkCardAssessments(nextFrameworks);

          const notesData = sectionMap.get('notes') ?? {};
          const nextCaseNotes = notesData?.caseNotes ?? {};
          const nextGlobalNotepad = notesData?.globalNotepadText ?? '';
          lastSyncedJsonRef.current.notes = JSON.stringify({
            caseNotes: nextCaseNotes,
            globalNotepadText: nextGlobalNotepad
          });
          setCaseNotes(nextCaseNotes);
          setGlobalNotepadText(nextGlobalNotepad);

          hydratedUidRef.current = sessionUser.id;
        }

        if (!cancelled) {
          setCurrentUser(sessionUser);
        }
      } catch (error) {
        console.error('Supabase cloud synchronisation failure:', error);
        if (!cancelled) {
          setSyncError('Could not load saved cloud progress. Please check your connection or retry.');
          setCurrentUser(sessionUser);
        }
      } finally {
        if (!cancelled) {
          setCloudSyncing(false);
        }
      }
    };

    hydrateCloudState();
    return () => {
      cancelled = true;
    };
  }, [sessionUser, isPasswordRecovery, isAuthErrorGate]);

  // Real-time cross-device cloud listeners via Supabase Realtime (keeps mobile & desktop synchronized live while signed in)
  useEffect(() => {
    if (!supabase || !currentUser || cloudSyncing || hydratedUidRef.current !== currentUser.id) {
      return;
    }
    const client = supabase;
    const uid = currentUser.id;

    const channel = client
      .channel(`user-progress-${uid}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_progress',
          filter: `user_id=eq.${uid}`
        },
        (change) => {
          const row = change.new as { section?: string; payload?: any } | null;
          if (!row || !row.section) return;
          const data = row.payload ?? {};

          if (row.section === 'practice') {
            const nextPractice = data?.practiceProgress ?? {};
            const nextBookmarks = data?.savedBookmarks ?? {};
            const incomingJson = JSON.stringify({
              practiceProgress: nextPractice,
              savedBookmarks: nextBookmarks
            });
            if (incomingJson !== lastSyncedJsonRef.current.practice) {
              lastSyncedJsonRef.current.practice = incomingJson;
              setPracticeProgress(nextPractice);
              setSavedBookmarks(nextBookmarks);
            }
          } else if (row.section === 'flashcards') {
            const nextFlashcards = data?.flashcardPerformance ?? {};
            const nextFrameworks = data?.frameworkCardAssessments ?? {};
            const incomingJson = JSON.stringify({
              flashcardPerformance: nextFlashcards,
              frameworkCardAssessments: nextFrameworks
            });
            if (incomingJson !== lastSyncedJsonRef.current.flashcards) {
              lastSyncedJsonRef.current.flashcards = incomingJson;
              setFlashcardPerformance(nextFlashcards);
              setFrameworkCardAssessments(nextFrameworks);
            }
          } else if (row.section === 'notes') {
            const nextCaseNotes = data?.caseNotes ?? {};
            const nextGlobalNotepad = data?.globalNotepadText ?? '';
            const incomingJson = JSON.stringify({
              caseNotes: nextCaseNotes,
              globalNotepadText: nextGlobalNotepad
            });
            if (incomingJson !== lastSyncedJsonRef.current.notes) {
              lastSyncedJsonRef.current.notes = incomingJson;
              setCaseNotes(nextCaseNotes);
              setGlobalNotepadText(nextGlobalNotepad);
            }
          }
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [currentUser, cloudSyncing]);

  const hasPendingCloudWriteRef = useRef<{ practice: boolean; flashcards: boolean; notes: boolean }>({
    practice: false,
    flashcards: false,
    notes: false
  });

  // Immediate flush helper used before Sign Out, tab hide, or manual retry
  const flushAllProgressToCloud = async (userToFlush: AppUser | null) => {
    if (!supabase || !userToFlush || hydratedUidRef.current !== userToFlush.id) return;
    const snapshot = latestProgressRef.current;
    setIsSavingCloud(true);
    setSyncError(null);
    const practicePayload = {
      practiceProgress: snapshot.practiceProgress,
      savedBookmarks: snapshot.savedBookmarks
    };
    const flashcardsPayload = {
      flashcardPerformance: snapshot.flashcardPerformance,
      frameworkCardAssessments: snapshot.frameworkCardAssessments
    };
    const notesPayload = {
      caseNotes: snapshot.caseNotes,
      globalNotepadText: snapshot.globalNotepadText
    };
    try {
      const { error } = await supabase.from('user_progress').upsert(
        [
          { user_id: userToFlush.id, section: 'practice', payload: practicePayload },
          { user_id: userToFlush.id, section: 'flashcards', payload: flashcardsPayload },
          { user_id: userToFlush.id, section: 'notes', payload: notesPayload }
        ],
        { onConflict: 'user_id,section' }
      );
      if (error) throw error;
      lastSyncedJsonRef.current = {
        practice: JSON.stringify(practicePayload),
        flashcards: JSON.stringify(flashcardsPayload),
        notes: JSON.stringify(notesPayload)
      };
      hasPendingCloudWriteRef.current = { practice: false, flashcards: false, notes: false };
    } catch (error) {
      console.error('Supabase flushAllProgressToCloud error:', error);
      setSyncError('Progress sync interrupted.');
    } finally {
      setIsSavingCloud(false);
    }
  };

  useEffect(() => {
    if (!supabase || !currentUser || cloudSyncing || hydratedUidRef.current !== currentUser.id) return;
    const client = supabase;
    const flushPendingOnLeave = () => {
      if (hydratedUidRef.current !== currentUser.id) return;
      const pending = hasPendingCloudWriteRef.current;
      if (!pending.practice && !pending.flashcards && !pending.notes) return;
      const snapshot = latestProgressRef.current;
      const rowsToUpsert: { user_id: string; section: ProgressSection; payload: Record<string, unknown> }[] = [];

      if (pending.practice) {
        hasPendingCloudWriteRef.current.practice = false;
        const payload = { practiceProgress: snapshot.practiceProgress, savedBookmarks: snapshot.savedBookmarks };
        lastSyncedJsonRef.current.practice = JSON.stringify(payload);
        rowsToUpsert.push({ user_id: currentUser.id, section: 'practice', payload });
      }
      if (pending.flashcards) {
        hasPendingCloudWriteRef.current.flashcards = false;
        const payload = {
          flashcardPerformance: snapshot.flashcardPerformance,
          frameworkCardAssessments: snapshot.frameworkCardAssessments
        };
        lastSyncedJsonRef.current.flashcards = JSON.stringify(payload);
        rowsToUpsert.push({ user_id: currentUser.id, section: 'flashcards', payload });
      }
      if (pending.notes) {
        hasPendingCloudWriteRef.current.notes = false;
        const payload = { caseNotes: snapshot.caseNotes, globalNotepadText: snapshot.globalNotepadText };
        lastSyncedJsonRef.current.notes = JSON.stringify(payload);
        rowsToUpsert.push({ user_id: currentUser.id, section: 'notes', payload });
      }

      if (rowsToUpsert.length > 0) {
        client
          .from('user_progress')
          .upsert(rowsToUpsert, { onConflict: 'user_id,section' })
          .then(({ error }) => {
            if (error) console.warn('Leave flush failed:', error);
          });
      }
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushPendingOnLeave();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', flushPendingOnLeave);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', flushPendingOnLeave);
    };
  }, [currentUser, cloudSyncing]);

  useEffect(() => {
    if (!currentUser) {
      hasPendingCloudWriteRef.current = { practice: false, flashcards: false, notes: false };
    }
  }, [currentUser]);

  // Sync state changes back up to Supabase (using 800ms debounces + hash check to prevent echo loops)
  // Practice Progress & Saved Bookmarks synchronization
  useEffect(() => {
    if (supabase && currentUser && !cloudSyncing && hydratedUidRef.current === currentUser.id) {
      const payload = { practiceProgress, savedBookmarks };
      const nextJson = JSON.stringify(payload);
      if (nextJson === lastSyncedJsonRef.current.practice) return;
      hasPendingCloudWriteRef.current.practice = true;
      const upload = async () => {
        setIsSavingCloud(true);
        try {
          lastSyncedJsonRef.current.practice = nextJson;
          await upsertProgressSection(currentUser.id, 'practice', payload);
          hasPendingCloudWriteRef.current.practice = false;
          setSyncError(null);
        } catch (error) {
          console.error('Could not sync practice progress:', error);
          setSyncError('Could not sync practice progress.');
        } finally {
          setIsSavingCloud(false);
        }
      };
      const timer = setTimeout(upload, 800);
      return () => clearTimeout(timer);
    }
  }, [practiceProgress, savedBookmarks, currentUser, cloudSyncing]);

  // Flashcards progress synchronization
  useEffect(() => {
    if (supabase && currentUser && !cloudSyncing && hydratedUidRef.current === currentUser.id) {
      const payload = { flashcardPerformance, frameworkCardAssessments };
      const nextJson = JSON.stringify(payload);
      if (nextJson === lastSyncedJsonRef.current.flashcards) return;
      hasPendingCloudWriteRef.current.flashcards = true;
      const upload = async () => {
        setIsSavingCloud(true);
        try {
          lastSyncedJsonRef.current.flashcards = nextJson;
          await upsertProgressSection(currentUser.id, 'flashcards', payload);
          hasPendingCloudWriteRef.current.flashcards = false;
          setSyncError(null);
        } catch (error) {
          console.error('Could not sync flashcard progress:', error);
          setSyncError('Could not sync flashcard progress.');
        } finally {
          setIsSavingCloud(false);
        }
      };
      const timer = setTimeout(upload, 800);
      return () => clearTimeout(timer);
    }
  }, [flashcardPerformance, frameworkCardAssessments, currentUser, cloudSyncing]);

  // User Notes & Notebook synchronization
  useEffect(() => {
    if (supabase && currentUser && !cloudSyncing && hydratedUidRef.current === currentUser.id) {
      const payload = { caseNotes, globalNotepadText };
      const nextJson = JSON.stringify(payload);
      if (nextJson === lastSyncedJsonRef.current.notes) return;
      hasPendingCloudWriteRef.current.notes = true;
      const upload = async () => {
        setIsSavingCloud(true);
        try {
          lastSyncedJsonRef.current.notes = nextJson;
          await upsertProgressSection(currentUser.id, 'notes', payload);
          hasPendingCloudWriteRef.current.notes = false;
          setSyncError(null);
        } catch (error) {
          console.error('Could not sync study notes:', error);
          setSyncError('Could not sync study notes.');
        } finally {
          setIsSavingCloud(false);
        }
      };
      const timer = setTimeout(upload, 800);
      return () => clearTimeout(timer);
    }
  }, [caseNotes, globalNotepadText, currentUser, cloudSyncing]);

  // Sign in and out handlers
  const handleGoogleSignIn = async () => {
    if (!supabase) {
      setAuthError('Authentication service is not configured for this environment.');
      return;
    }
    setIsSigningIn(true);
    setAuthError(null);
    setAuthMessage(null);
    try {
      const redirectTo = `${window.location.origin}${window.location.pathname}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo }
      });
      if (error) {
        setAuthError(error.message || 'Unable to sign in with Google right now. Please try again.');
        setIsSigningIn(false);
      }
    } catch (error: any) {
      console.error('Google sign in failed:', error);
      setAuthError(error?.message || 'Unable to sign in with Google right now. Please try again.');
      setIsSigningIn(false);
    }
  };

  const validatePasswordPolicy = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[a-z]/.test(pwd) || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd) || !/[^A-Za-z0-9]/.test(pwd)) {
      return 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g. @, #, !, $).';
    }
    return null;
  };

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setAuthError('Authentication service is not configured for this environment.');
      return;
    }
    const email = emailInput.trim();
    const password = passwordInput;
    if (!email || !email.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (authMode === 'signup') {
      const policyErr = validatePasswordPolicy(password);
      if (policyErr) {
        setAuthError(policyErr);
        return;
      }
    } else if (password.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return;
    }

    setIsSigningIn(true);
    setAuthError(null);
    setAuthMessage(null);
    setIsAuthErrorGate(false);
    try {
      if (authMode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setAuthError(error.message || 'Invalid email or password.');
        } else {
          setShowLandingPage(false);
        }
      } else {
        const redirectTo = `${window.location.origin}${window.location.pathname}`;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullNameInput.trim() },
            emailRedirectTo: redirectTo
          }
        });
        if (error) {
          setAuthError(error.message || 'Could not create your account. Please try again.');
        } else if (!data.session) {
          setAuthMessage(
            'Account created! Please check your email inbox to confirm your address before signing in.'
          );
          setAuthMode('signin');
          setPasswordInput('');
        } else {
          setShowLandingPage(false);
        }
      }
    } catch (error: any) {
      console.error('Email authentication failed:', error);
      setAuthError(error?.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handlePasswordResetRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setAuthError('Authentication service is not configured for this environment.');
      return;
    }
    const email = emailInput.trim();
    if (!email || !email.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }

    setIsSigningIn(true);
    setAuthError(null);
    setAuthMessage(null);
    try {
      const redirectTo = `${window.location.origin}${window.location.pathname}`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) {
        setAuthError(error.message || 'Unable to send password reset email. Please try again.');
      } else {
        setAuthMessage(
          'Password reset email sent! Click the link in your email to open the password reset screen—or if the link fails to open on your device, copy and paste the email link below.'
        );
      }
    } catch (error: any) {
      console.error('Password reset request failed:', error);
      setAuthError(error?.message || 'Unable to send password reset email. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleManualRecoveryVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setAuthError('Authentication service is not configured for this environment.');
      return;
    }
    const raw = recoveryLinkOrCodeInput.trim();
    if (!raw) {
      setAuthError('Please paste the reset link from your email or enter your 6-digit recovery code.');
      return;
    }

    setIsSigningIn(true);
    setAuthError(null);
    setAuthMessage(null);
    try {
      // Case 1: User pasted a full URL (either the Supabase /auth/v1/verify?token=... link or the redirected #access_token=... URL)
      if (raw.includes('http://') || raw.includes('https://') || raw.includes('access_token=') || raw.includes('token=')) {
        let parsedSearch = new URLSearchParams();
        let parsedHash = new URLSearchParams();
        try {
          const urlObj = new URL(raw.startsWith('http') ? raw : `https://placeholder.local/${raw.startsWith('?') || raw.startsWith('#') ? raw : `?${raw}`}`);
          parsedSearch = new URLSearchParams(urlObj.search);
          parsedHash = new URLSearchParams(urlObj.hash.replace(/^#/, ''));
        } catch {
          parsedHash = new URLSearchParams(raw.replace(/^#/, ''));
        }

        const errDesc = parsedHash.get('error_description') || parsedSearch.get('error_description');
        if (errDesc) {
          setAuthError(`${errDesc.replace(/\+/g, ' ')}. Please click "Send Reset Link" above to request a fresh email.`);
          return;
        }

        const accessToken = parsedHash.get('access_token') || parsedSearch.get('access_token');
        const refreshToken = parsedHash.get('refresh_token') || parsedSearch.get('refresh_token');
        if (accessToken && refreshToken) {
          setPasswordRecoveryActive(true);
          setIsPasswordRecovery(true);
          setIsAuthErrorGate(false);
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          if (error) {
            setPasswordRecoveryActive(false);
            setIsPasswordRecovery(false);
            setAuthError(error.message || 'This reset link has expired. Please request a new reset link.');
          } else {
            setRecoveryLinkOrCodeInput('');
          }
          return;
        }

        const tokenHash =
          parsedSearch.get('token_hash') ||
          parsedSearch.get('token') ||
          parsedHash.get('token_hash') ||
          parsedHash.get('token');
        if (tokenHash) {
          setPasswordRecoveryActive(true);
          setIsPasswordRecovery(true);
          setIsAuthErrorGate(false);
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'recovery'
          });
          if (error) {
            setPasswordRecoveryActive(false);
            setIsPasswordRecovery(false);
            setAuthError(error.message || 'This reset link has already been used or expired. Please request a new reset link.');
          } else {
            setRecoveryLinkOrCodeInput('');
          }
          return;
        }
      }

      // Case 2: User entered a 6-digit OTP code or raw token hash
      if (/^\d{6}$/.test(raw)) {
        const email = emailInput.trim();
        if (!email || !email.includes('@')) {
          setAuthError('Please enter your email address above along with the 6-digit recovery code.');
          return;
        }
        setPasswordRecoveryActive(true);
        setIsPasswordRecovery(true);
        setIsAuthErrorGate(false);
        const { error } = await supabase.auth.verifyOtp({
          email,
          token: raw,
          type: 'recovery'
        });
        if (error) {
          setPasswordRecoveryActive(false);
          setIsPasswordRecovery(false);
          setAuthError(error.message || 'Invalid or expired 6-digit recovery code.');
        } else {
          setRecoveryLinkOrCodeInput('');
        }
      } else {
        setPasswordRecoveryActive(true);
        setIsPasswordRecovery(true);
        setIsAuthErrorGate(false);
        const { error } = await supabase.auth.verifyOtp({
          token_hash: raw,
          type: 'recovery'
        });
        if (error) {
          setPasswordRecoveryActive(false);
          setIsPasswordRecovery(false);
          setAuthError(error.message || 'Invalid or expired reset link/token. Please request a new reset link.');
        } else {
          setRecoveryLinkOrCodeInput('');
        }
      }
    } catch (error: any) {
      setPasswordRecoveryActive(false);
      setIsPasswordRecovery(false);
      setAuthError(error?.message || 'Could not verify the reset link or code. Please request a fresh link.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setAuthError('Authentication service is not configured for this environment.');
      return;
    }
    const policyErr = validatePasswordPolicy(passwordInput);
    if (policyErr) {
      setAuthError(policyErr);
      return;
    }
    if (passwordInput !== confirmPasswordInput) {
      setAuthError('Passwords do not match. Please re-enter them.');
      return;
    }

    setIsSigningIn(true);
    setAuthError(null);
    setAuthMessage(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const { error } = await supabase.auth.updateUser({ password: passwordInput });
      if (error) {
        setAuthError(error.message || 'Could not update your password. Please request a new reset link.');
      } else {
        setPasswordInput('');
        setConfirmPasswordInput('');
        setAuthError(null);
        setPasswordRecoveryActive(false, sessionData?.session);
        setIsAuthErrorGate(false);
        window.history.replaceState(null, '', `${window.location.origin}${window.location.pathname}`);
        setIsPasswordRecovery(false);
        if (!sessionUser) {
          setAuthMode('signin');
          setAuthMessage('Password updated successfully! You can now sign in with your new password.');
        }
      }
    } catch (error: any) {
      console.error('Password update failed:', error);
      setAuthError(error?.message || 'Could not update your password. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleCancelPasswordRecovery = async () => {
    if (supabase) {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        setPasswordRecoveryActive(false, sessionData?.session);
        if (!currentUser) {
          await supabase.auth.signOut();
        }
      } catch (error) {
        console.error('Recovery sign out error:', error);
      }
    } else {
      setPasswordRecoveryActive(false);
    }
    setIsPasswordRecovery(false);
    setIsAuthErrorGate(false);
    setAuthMode('signin');
    setPasswordInput('');
    setConfirmPasswordInput('');
    setAuthError(null);
    setAuthMessage(null);
    window.history.replaceState(null, '', `${window.location.origin}${window.location.pathname}`);
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    try {
      if (currentUser && !cloudSyncing) {
        await flushAllProgressToCloud(currentUser);
      }
    } catch (error) {
      console.error('Pre-signout progress flush failed:', error);
    }
    try {
      hydratedUidRef.current = null;
      lastSyncedJsonRef.current = { practice: '', flashcards: '', notes: '' };
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
      setSessionUser(null);
      setCurrentUser(null);
      // Clear local user progress & session state so next student starts cleanly
      setPracticeProgress({});
      setSavedBookmarks({});
      setFlashcardPerformance({});
      setFrameworkCardAssessments({});
      setCaseNotes({});
      setGlobalNotepadText('');
      setQuizScore({ correct: 0, total: 0 });
      setExamStarted(false);
      setExamFinished(false);
      setMockScoreCard(null);
      setActiveTab('dashboard');
      setShowMobileMenu(false);
      setShowProfileMenu(false);
      try {
        localStorage.removeItem('practiceProgress');
        localStorage.removeItem('spom_saved_bookmarks_v1');
        localStorage.removeItem('flashcardPerformance');
        localStorage.removeItem('framework_card_assessments');
        localStorage.removeItem('caseNotes');
        localStorage.removeItem('global_notepad_text');
      } catch (e) {
        console.error('Failed to clear local progress cache on sign-out', e);
      }
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  // Dynamic Progress Measurements for Current Subject
  const currentQuestionIdSet = new Set<string>();
  currentCaseScenarios.forEach(cs => cs.questions.forEach(q => currentQuestionIdSet.add(`${cs.id}-${q.id}`)));
  currentGeneralMCQs.forEach(q => currentQuestionIdSet.add(`general-${q.id}`));

  const totalCaseScenariosCount = currentCaseScenarios.length;
  const totalCaseQuestionsCount = currentCaseScenarios.reduce((sum, cs) => sum + cs.questions.length, 0);
  const totalGeneralMCQsCount = currentGeneralMCQs.length;
  const totalAllQuestionsCount = totalCaseQuestionsCount + totalGeneralMCQsCount;

  // Solved vs Pending breakdowns
  const solvedCaseQuestionsCount = currentCaseScenarios.reduce((sum, cs) => 
    sum + cs.questions.filter(q => practiceProgress[`${cs.id}-${q.id}`]?.answered).length, 0);
  const pendingCaseQuestionsCount = Math.max(0, totalCaseQuestionsCount - solvedCaseQuestionsCount);

  const solvedGeneralMCQsCount = currentGeneralMCQs.filter(q => practiceProgress[`general-${q.id}`]?.answered).length;
  const pendingGeneralMCQsCount = Math.max(0, totalGeneralMCQsCount - solvedGeneralMCQsCount);

  const totalSolvedCount = solvedCaseQuestionsCount + solvedGeneralMCQsCount;
  const totalPendingCount = Math.max(0, totalAllQuestionsCount - totalSolvedCount);

  const completedCaseScenariosCount = currentCaseScenarios.filter(cs => 
    cs.questions.length > 0 && cs.questions.every(q => practiceProgress[`${cs.id}-${q.id}`]?.answered)).length;
  const pendingCaseScenariosCount = Math.max(0, totalCaseScenariosCount - completedCaseScenariosCount);

  const totalPracticeQuestions = totalAllQuestionsCount;
  const answeredPracticeQuestions = totalSolvedCount;
  const practiceCompletionPercentage = totalAllQuestionsCount > 0 
    ? Math.round((totalSolvedCount / totalAllQuestionsCount) * 100) 
    : 0;

  const totalCorrectPractice = Object.entries(practiceProgress)
    .filter(([k, p]: any) => currentQuestionIdSet.has(k) && p && p.correct).length;
  const totalIncorrectPractice = Math.max(0, totalSolvedCount - totalCorrectPractice);
  const practiceAccuracyPercentage = totalSolvedCount > 0
    ? Math.round((totalCorrectPractice / totalSolvedCount) * 100)
    : 0;

  const activeChaptersCount = currentChapters.filter(chap => {
    const chapCases = currentCaseScenarios.filter(cs => cs.chapterId === chap.id);
    return chapCases.some(cs => 
      cs.questions.some(q => practiceProgress[`${cs.id}-${q.id}`]?.answered)
    ) || currentGeneralMCQs.filter(q => q.chapterId === chap.id).some(q => practiceProgress[`general-${q.id}`]?.answered);
  }).length;

  const activeSubjectBookmarks: BookmarkedQuestion[] = (Object.values(savedBookmarks) as BookmarkedQuestion[]).filter(b => b.subject === activeSubject);
  const activeSubjectBookmarksCount = activeSubjectBookmarks.length;

  useEffect(() => {
    if (activeTab === 'dashboard') {
      setMcqProgressAnimate(0);
      const timer = setTimeout(() => {
        setMcqProgressAnimate(practiceCompletionPercentage);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeTab, practiceCompletionPercentage]);

  // PDF Export Function for Study Companion Notes & Scenarios
  const exportCaseToPDF = async (caseObj: CaseScenario) => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Page parameters
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      let yPosition = 20;

      // Helper function to add space and handle new pages
      const checkPageBreak = (neededHeight: number) => {
        if (yPosition + neededHeight > pageHeight - margin) {
          doc.addPage();
          yPosition = 25; // Reset position with standard margin
          // Draw standard small running header on later pages
          doc.setFont("Helvetica", "oblique");
          doc.setFontSize(8);
          doc.setTextColor(148, 163, 184); // light Gray
          doc.text("practACE — Plan Revise Analyse Correct Track | ICAI SPOM Study Companion", margin, 12);
          doc.setDrawColor(241, 245, 249);
          doc.line(margin, 14, pageWidth - margin, 14);
        }
      };

      // Draw main header (Page 1)
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(79, 70, 229); // indigo (600)
      doc.text(`practACE — ICAI SPOM ${activeSubject === 'setA' ? 'Set A (Laws)' : 'Set B (SCMPE)'} Companion`, margin, yPosition);
      yPosition += 8;

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139); // Slate-500
      doc.text(`Generated on ${new Date().toLocaleDateString()} — Personal Study Notes & Analysis`, margin, yPosition);
      
      // Header rule
      yPosition += 4;
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      // TITLE OF CASE
      checkPageBreak(15);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42); // slate-900
      const titleText = doc.splitTextToSize(caseObj.title, contentWidth);
      doc.text(titleText, margin, yPosition);
      yPosition += (titleText.length * 6) + 4;

      // CHAPTER DETAILS
      checkPageBreak(8);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(16, 185, 129); // emerald
      doc.text(`CHAPTER: ${caseObj.chapterName}`, margin, yPosition);
      yPosition += 8;

      // SECTION 1: SCENARIO TEXT
      checkPageBreak(15);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(71, 85, 105); // slate-600
      doc.text("CASE SCENARIO DETAILS", margin, yPosition);
      yPosition += 6;

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85); // slate-700
      const splitScenarioLines = doc.splitTextToSize(caseObj.scenarioText, contentWidth);
      
      // Render scenario text lines
      for (const line of splitScenarioLines) {
        checkPageBreak(6);
        doc.text(line, margin, yPosition);
        yPosition += 5;
      }
      yPosition += 10;

      // SECTION 2: PERSONAL STUDY ANNOTATIONS (GLOBAL STUDY NOTEPAD)
      const userNotes = globalNotepadText || "";
      const notesTextToPrint = userNotes.trim() ? userNotes : "No study annotations added yet. Write your key formulas and exam strategies in the general Study Notepad panel!";
      const splitNotes = doc.splitTextToSize(notesTextToPrint, contentWidth - 10);
      
      // Box height calculation
      const neededBoxHeight = (splitNotes.length * 5) + 16;
      checkPageBreak(neededBoxHeight + 10);
      
      doc.setDrawColor(253, 240, 185); // soft gold border
      doc.setFillColor(255, 253, 241); // soft gold bg
      doc.rect(margin - 2, yPosition - 4, contentWidth + 4, neededBoxHeight, "FD"); // Draw background

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(180, 83, 9); // gold dark
      doc.text("📝 PERSONAL STUDY ANNOTATIONS & NOTES", margin, yPosition + 3);
      yPosition += 10;

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(69, 26, 3); // brown dark
      
      for (const line of splitNotes) {
        checkPageBreak(6);
        doc.text(line, margin + 2, yPosition);
        yPosition += 5;
      }
      yPosition += 15;

      // SECTION 3: QUESTIONS & ANSWERS RECAP
      checkPageBreak(20);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text("CASE STUDY MULTIPLE CHOICE QUESTIONS & RECONCILIATIONS", margin, yPosition);
      yPosition += 8;

      caseObj.questions.forEach((q, idx) => {
        checkPageBreak(25);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        const qTextLines = doc.splitTextToSize(`Q${idx + 1}: ${q.questionText}`, contentWidth);
        doc.text(qTextLines, margin, yPosition);
        yPosition += (qTextLines.length * 5) + 3;

        // Print options
        Object.entries(q.options).forEach(([optKey, optVal]) => {
          checkPageBreak(8);
          doc.setFont("Helvetica", optKey === q.correctOption ? "bold" : "normal");
          doc.setTextColor(optKey === q.correctOption ? 16 : 100, optKey === q.correctOption ? 185 : 116, optKey === q.correctOption ? 129 : 139); // emerald index vs slate
          const optTextLines = doc.splitTextToSize(`[${optKey}] ${optVal}`, contentWidth - 6);
          doc.text(optTextLines, margin + 4, yPosition);
          yPosition += (optTextLines.length * 5) + 1;
        });
        yPosition += 3;

        // Print Explanation
        checkPageBreak(15);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text("CORRECT ANSWER & EXPLANATION DETAILS:", margin + 4, yPosition);
        yPosition += 4;

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        const expLines = doc.splitTextToSize(q.explanation, contentWidth - 10);
        for (const line of expLines) {
          checkPageBreak(5);
          doc.text(line, margin + 6, yPosition);
          yPosition += 4.5;
        }
        yPosition += 8;
      });

      // SAVE FILE
      doc.save(`ICAI_SPOM_${caseObj.id.toUpperCase()}_Study_Module.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please verify and try again.");
    }
  };

  // PDF Export for Revision summary notes & formula materials
  const exportRevisionToPDF = async (targetChapters: Chapter | Chapter[]) => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      let yPosition = 20;

      const checkPageBreak = (neededHeight: number) => {
        if (yPosition + neededHeight > pageHeight - margin) {
          doc.addPage();
          yPosition = 25; // Reset position
          doc.setFont("Helvetica", "oblique");
          doc.setFontSize(8);
          doc.setTextColor(148, 163, 184); // light slate-400
          doc.text("practACE — Plan Revise Analyse Correct Track | Concept & Formula Revision", margin, 12);
          doc.setDrawColor(241, 245, 249);
          doc.line(margin, 14, pageWidth - margin, 14);
        }
      };

      // Draw Main Header (Page 1)
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      if (activeSubject === 'setA') {
        doc.setTextColor(37, 99, 235); // Blue (600)
        doc.text("practACE — ICAI SPOM Set A: Corporate & Economic Laws Revision", margin, yPosition);
      } else {
        doc.setTextColor(16, 185, 129); // emerald (500)
        doc.text("practACE — ICAI SPOM Set B: Revision Study Materials", margin, yPosition);
      }
      yPosition += 8;

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139); // slate-500
      const descStr = Array.isArray(targetChapters) 
        ? "Comprehensive Continuous Revision Deck of Formulas & Core Case Frameworks"
        : `Topic Revision Compendium for ${targetChapters.name}`;
      doc.text(`${descStr} — Created on ${new Date().toLocaleDateString()}`, margin, yPosition);

      // Header rule
      yPosition += 4;
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      const items = Array.isArray(targetChapters) ? targetChapters : [targetChapters];

      items.forEach((chap, idx) => {
        if (idx > 0) {
          // If exporting multiple chapters, start each on a new page
          doc.addPage();
          yPosition = 25;
          doc.setFont("Helvetica", "oblique");
          doc.setFontSize(8);
          doc.setTextColor(148, 163, 184);
          const subWatermark = activeSubject === 'setA' 
            ? "practACE — ICAI SPOM Set-A Corporate & Economic Laws Revision"
            : "practACE — ICAI SPOM Set-B Concept & Formula Revision";
          doc.text(subWatermark, margin, 12);
          doc.setDrawColor(241, 245, 249);
          doc.line(margin, 14, pageWidth - margin, 14);
        }

        // CHAPTER TITLE CARD
        checkPageBreak(25);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42); // slate-950
        const chNameText = doc.splitTextToSize(chap.name, contentWidth);
        doc.text(chNameText, margin, yPosition);
        yPosition += (chNameText.length * 6) + 3;

        // DESCRIPTION
        checkPageBreak(15);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(100, 116, 139); // slate-500
        const chDescText = doc.splitTextToSize(chap.description, contentWidth);
        doc.text(chDescText, margin, yPosition);
        yPosition += (chDescText.length * 5) + 8;

        // SECTION 1: STUDY BULLETINS
        if (chap.summaryNotes && chap.summaryNotes.length > 0) {
          checkPageBreak(15);
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(79, 70, 229); // Indigo
          doc.text("📖 CONCEPT SUMMARY & REVISION BULLETINS", margin, yPosition);
          yPosition += 7;

          chap.summaryNotes.forEach((sect) => {
            checkPageBreak(12);
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(51, 65, 85); // Slate-700
            const secTitleLines = doc.splitTextToSize(`• ${sect.title}`, contentWidth);
            doc.text(secTitleLines, margin, yPosition);
            yPosition += (secTitleLines.length * 5) + 2;

            doc.setFont("Helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(71, 85, 105); // Slate-600
            sect.bullets.forEach((bullet) => {
              checkPageBreak(12);
              const bLines = doc.splitTextToSize(`- ${bullet}`, contentWidth - 8);
              for (const line of bLines) {
                checkPageBreak(5);
                doc.text(line, margin + 4, yPosition);
                yPosition += 4.5;
              }
              yPosition += 1.5;
            });
            yPosition += 2;
          });
          yPosition += 4;
        }

        // SECTION 2: THE FORMULA BOOK
        if (chap.formulas && chap.formulas.length > 0) {
          checkPageBreak(15);
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(16, 185, 129); // Emerald
          doc.text("🧮 PRACTICAL EXAM FORMULA MODULES", margin, yPosition);
          yPosition += 7;

          chap.formulas.forEach((item) => {
            const fNameLines = doc.splitTextToSize(`Formula Name: ${item.name}`, contentWidth - 6);
            const fExprLines = doc.splitTextToSize(`Equation: ${item.formula}`, contentWidth - 12);
            const fDescLines = doc.splitTextToSize(`Audit Notes: ${item.description}`, contentWidth - 12);

            const blockHeight = (fNameLines.length * 5) + (fExprLines.length * 5) + (fDescLines.length * 5) + 12;
            checkPageBreak(blockHeight + 5);

            // Shaded card back
            doc.setFillColor(248, 250, 252); // slate 50
            doc.setDrawColor(226, 232, 240); // slate 200
            doc.rect(margin - 2, yPosition - 4, contentWidth + 4, blockHeight - 2, "FD");

            doc.setFont("Helvetica", "bold");
            doc.setFontSize(9.5);
            doc.setTextColor(15, 23, 42);
            doc.text(fNameLines, margin, yPosition);
            yPosition += (fNameLines.length * 5) + 1.5;

            doc.setFont("Courier-Bold", "bold");
            doc.setFontSize(9);
            doc.setTextColor(79, 70, 229); // Indigo for the formula
            doc.text(fExprLines, margin + 4, yPosition);
            yPosition += (fExprLines.length * 5) + 1.5;

            doc.setFont("Helvetica", "normal");
            doc.setFontSize(8.5);
            doc.setTextColor(71, 85, 105);
            doc.text(fDescLines, margin + 4, yPosition);
            yPosition += (fDescLines.length * 5) + 6;
          });
        }
      });

      // SAVE FILE
      const nameSuffix = Array.isArray(targetChapters) ? "FULL_DECK" : `CHAP_${targetChapters.id}`;
      const subjectPrefix = activeSubject === 'setA' ? 'ICAI_SPOM_SET_A_LAWS' : 'ICAI_SPOM_SET_B_SCMPE';
      doc.save(`${subjectPrefix}_REVISION_${nameSuffix}.pdf`);
    } catch (error) {
      console.error("Revision PDF generation failed:", error);
      alert("Failed to generate PDF. Please verify and try again.");
    }
  };

  // Mock Exam State
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [mockQuestions, setMockQuestions] = useState<(Question & { caseTitle: string; caseText: string; chapterId: number; chapterName: string })[]>([]);
  const [currentMockIndex, setCurrentMockIndex] = useState<number>(0);
  const [mockAnswers, setMockAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | null>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(1200); // 25 minutes default
  const [totalMockQuestionsCount, setTotalMockQuestionsCount] = useState<number>(15);
  const [mockScoreCard, setMockScoreCard] = useState<{ score: number; pct: number; categoryBreakdown: Record<string, { correct: number; total: number; chapterId: number }> } | null>(null);

  // Sandbox Calculators State
  const [sandboxType, setSandboxType] = useState<'pareto' | 'oee' | 'relevant' | 'target'>('pareto');
  const [setACalcType, setSetACalcType] = useState<'csr' | 'board' | 'remuneration' | 'cirp'>('csr');
  const isApplyingUrlRef = useRef<boolean>(false);
  const skipSubjectResetRef = useRef<boolean>(false);

  // Sandbox 1: Pareto Data (Precision Motors Case 32)
  const [paretoDefects, setParetoDefects] = useState([
    { id: "def-1", name: "Surface scratches", count: 110 },
    { id: "def-2", name: "Rough edges (milling)", count: 70 },
    { id: "def-3", name: "Uneven grinding", count: 60 },
    { id: "def-4", name: "Color mismatch", count: 25 },
    { id: "def-5", name: "Incorrect machining", count: 20 },
    { id: "def-6", name: "Bolt hole misalignment", count: 10 },
    { id: "def-7", name: "Oil stains", count: 5 }
  ]);

  // Sandbox 2: OEE Data (Sigma Manufacturing Case 46)
  const [oeeParams, setOeeParams] = useState({
    shiftHours: 9,
    plannedBreaks: 75,
    unplannedDowntime: 30,
    idealSpeedPPM: 30,
    totalOutput: 12240,
    rejections: 240
  });

  // Sandbox 3: Relevant Costing Data (National Airlines Case 9)
  const [airlineParams, setAirlineParams] = useState({
    occupancy: 75,
    ticketPrice: 25000,
    variablePassengerCost: 15000,
    crewSalaryFixed: 200000,
    assistantCostPerFlight: 150000,
    fuelCost: 250000,
    overnightLayoverCost: 100000,
    flightPromotion: 50000,
    attributableInsuranceThird: 70000,
    fixedInsuranceTwoThird: 140000,
    groundHandlingAllocated: 70000,
    aircraftDepreciationSunk: 75000,
    hangarLeaseUnavoidable: 50000
  });

  // Sandbox 4: Target Costing Data (Cellwell Technologies Case 4)
  const [targetParams, setTargetParams] = useState({
    sellingPrice: 30000,
    targetProfitPct: 25,
    componentCost: 15000,
    laborHours: 0.6,
    laborRate: 5000,
    toolingOverhead: 2500,
    customMaterialNetKG: 0.45,
    specialPlasticPricePerKG: 5000,
    normalWastagePct: 10
  });

  // Select first case when chapter changes
  useEffect(() => {
    const chapterCases = currentCaseScenarios.filter(cs => cs.chapterId === selectedChapterId);
    if (chapterCases.length > 0) {
      setSelectedCaseId(chapterCases[0].id);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setHasSubmittedPractice(false);
      setShowExplanation(false);
    }
    setCurrentGeneralIndex(0);
    setSelectedGeneralOption(null);
    setHasSubmittedGeneral(false);
  }, [selectedChapterId, activeSubject]);

  // Reset chapter selection when activeSubject switches (unless driven by deep-link URL hydration)
  useEffect(() => {
    if (skipSubjectResetRef.current) {
      skipSubjectResetRef.current = false;
      return;
    }
    const defaultChap = activeSubject === 'setA' ? 101 : 1;
    setSelectedChapterId(prev => {
      const isValidForSubject = activeSubject === 'setA' ? (prev >= 101 && prev <= 114) : (prev >= 1 && prev <= 10);
      return isValidForSubject ? prev : defaultChap;
    });
    setSelectedRevisionChapterId(prev => {
      if (prev === -1) return -1;
      if (activeSubject === 'setA' && (prev === -101 || prev === -102 || (prev >= 101 && prev <= 114))) return prev;
      if (activeSubject === 'setB' && prev >= 1 && prev <= 10) return prev;
      return defaultChap;
    });
    const firstCase = currentCaseScenarios.find(cs => cs.chapterId === defaultChap);
    if (firstCase) {
      setSelectedCaseId(firstCase.id);
    }
    setCurrentQuestionIndex(0);
    setCurrentFrameworkCardIndex(0);
    setIsFrameworkCardFlipped(false);
    setSelectedOption(null);
    setHasSubmittedPractice(false);
    setShowExplanation(false);
    setCurrentGeneralIndex(0);
    setSelectedGeneralOption(null);
    setHasSubmittedGeneral(false);
  }, [activeSubject]);

  // ============================================================================
  // LIVE BROWSER URL SITEMAP ROUTER (HYDRATION + POPSTATE + REAL-TIME URL SYNC)
  // Updates the browser address bar URL for every page, tab, revision sub-view,
  // chapter change, practice case/question, mock exam state, simulator, & modal.
  // ============================================================================
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const applyUrlParamsToState = () => {
      const params = new URLSearchParams(window.location.search);
      // Do not interfere with Supabase OAuth / recovery callback parameters
      if (
        params.has('token_hash') ||
        params.has('token') ||
        params.has('code') ||
        params.has('error_description') ||
        window.location.hash.includes('access_token=')
      ) {
        return;
      }

      const hasRouteParams =
        params.has('page') ||
        params.has('subject') ||
        params.has('tab') ||
        params.has('view') ||
        params.has('chapter') ||
        params.has('subtab') ||
        params.has('case') ||
        params.has('pool') ||
        params.has('sim') ||
        params.has('calc') ||
        params.has('doc');

      if (!hasRouteParams) return;

      isApplyingUrlRef.current = true;

      const docParam = params.get('doc') as
        | 'sitemap'
        | 'security'
        | 'privacy'
        | 'terms'
        | 'disclaimer'
        | 'cookies'
        | null;
      if (
        docParam &&
        ['sitemap', 'security', 'privacy', 'terms', 'disclaimer', 'cookies'].includes(docParam)
      ) {
        setActiveLegalDoc(docParam);
      }

      const subjParam = params.get('subject');
      if (subjParam === 'setA' || subjParam === 'setB') {
        skipSubjectResetRef.current = true;
        setActiveSubject(subjParam);
        setLandingCurriculumTab(subjParam);
      }

      const pageParam = params.get('page');
      const tabParam = params.get('tab') as
        | 'dashboard'
        | 'revision'
        | 'practice'
        | 'mock'
        | 'sandbox'
        | null;

      if (pageParam === 'landing' && !tabParam) {
        setShowLandingPage(true);
      } else if (
        tabParam &&
        ['dashboard', 'revision', 'practice', 'mock', 'sandbox'].includes(tabParam)
      ) {
        setActiveTab(tabParam);
        setShowLandingPage(false);
        setShowSetAAnnouncement(false);
      }

      const chapParam = params.get('chapter');
      const parsedChap = chapParam !== null ? parseInt(chapParam, 10) : NaN;

      if (tabParam === 'revision') {
        const viewParam = params.get('view') as 'study' | 'flashcards' | 'frameworks' | null;
        if (viewParam && ['study', 'flashcards', 'frameworks'].includes(viewParam)) {
          setRevisionSubView(viewParam);
        }
        if (!Number.isNaN(parsedChap)) {
          setSelectedRevisionChapterId(parsedChap);
        }
        const modeParam = params.get('mode') as 'drill' | 'quiz' | null;
        if (modeParam === 'drill' || modeParam === 'quiz') {
          setFlashcardMode(modeParam);
        }
        const cardParam = params.get('card');
        if (cardParam) {
          if (viewParam === 'frameworks') {
            const idx = parseInt(cardParam, 10);
            if (!Number.isNaN(idx) && idx >= 1) {
              setCurrentFrameworkCardIndex(idx - 1);
            }
          } else {
            setCurrentFlashcardKey(cardParam);
          }
        }
      } else if (tabParam === 'practice') {
        const subtabParam = params.get('subtab') as 'cases' | 'general' | 'saved' | null;
        if (subtabParam && ['cases', 'general', 'saved'].includes(subtabParam)) {
          setPracticeSubTab(subtabParam);
        }
        if (!Number.isNaN(parsedChap) && parsedChap > 0) {
          setSelectedChapterId(parsedChap);
        }
        const caseParam = params.get('case');
        if (caseParam) {
          setSelectedCaseId(caseParam);
        }
        const qParam = params.get('q');
        const parsedQ = qParam !== null ? parseInt(qParam, 10) : NaN;
        if (!Number.isNaN(parsedQ) && parsedQ >= 1) {
          if (subtabParam === 'general') {
            setCurrentGeneralIndex(parsedQ - 1);
          } else {
            setCurrentQuestionIndex(parsedQ - 1);
          }
        }
        const topicParam = params.get('topic');
        if (topicParam) {
          setSelectedGeneralTopic(topicParam);
        }
        const filterParam = params.get('filter') as 'all' | 'case' | 'general' | null;
        if (filterParam && ['all', 'case', 'general'].includes(filterParam)) {
          setSavedFilterType(filterParam);
        }
        const statusParam = params.get('status') as 'all' | 'solved' | 'pending' | null;
        if (statusParam && ['all', 'solved', 'pending'].includes(statusParam)) {
          setSavedFilterStatus(statusParam);
        }
      } else if (tabParam === 'mock') {
        const poolParam = params.get('pool');
        const parsedPool = poolParam !== null ? parseInt(poolParam, 10) : NaN;
        if (parsedPool === 10 || parsedPool === 15 || parsedPool === 25) {
          setTotalMockQuestionsCount(parsedPool);
        }
      } else if (tabParam === 'sandbox') {
        const calcParam = params.get('calc') as 'csr' | 'board' | 'remuneration' | 'cirp' | null;
        if (calcParam && ['csr', 'board', 'remuneration', 'cirp'].includes(calcParam)) {
          setSetACalcType(calcParam);
        }
        const simParam = params.get('sim') as 'pareto' | 'oee' | 'relevant' | 'target' | null;
        if (simParam && ['pareto', 'oee', 'relevant', 'target'].includes(simParam)) {
          setSandboxType(simParam);
        }
      }

      setTimeout(() => {
        isApplyingUrlRef.current = false;
      }, 0);
    };

    applyUrlParamsToState();
    window.addEventListener('popstate', applyUrlParamsToState);
    return () => {
      window.removeEventListener('popstate', applyUrlParamsToState);
    };
  }, []);

  // Build canonical query string & document title for the current active route
  const buildCurrentSitemapSearch = () => {
    const params = new URLSearchParams();
    const isOnLanding = showLandingPage || !currentUser || isPasswordRecovery || isAuthErrorGate;

    if (isOnLanding) {
      params.set('page', 'landing');
      params.set('subject', landingCurriculumTab);
    } else {
      params.set('subject', activeSubject);
      params.set('tab', activeTab);

      if (activeTab === 'revision') {
        params.set('view', revisionSubView);
        if (revisionSubView === 'study') {
          params.set('chapter', String(selectedRevisionChapterId));
          if (revisionSearchQuery.trim()) {
            params.set('q', revisionSearchQuery.trim());
          }
        } else if (revisionSubView === 'flashcards') {
          params.set('mode', flashcardMode);
          if (flashcardMode === 'drill' && currentFlashcardKey) {
            params.set('card', currentFlashcardKey);
          }
        } else if (revisionSubView === 'frameworks') {
          params.set('card', String(currentFrameworkCardIndex + 1));
        }
      } else if (activeTab === 'practice') {
        params.set('subtab', practiceSubTab);
        if (practiceSubTab === 'cases') {
          params.set('chapter', String(selectedChapterId));
          if (selectedCaseId) {
            params.set('case', selectedCaseId);
          }
          params.set('q', String(currentQuestionIndex + 1));
        } else if (practiceSubTab === 'general') {
          params.set('chapter', String(selectedChapterId));
          if (selectedGeneralTopic && selectedGeneralTopic !== 'ALL') {
            params.set('topic', selectedGeneralTopic);
          }
          params.set('q', String(currentGeneralIndex + 1));
        } else if (practiceSubTab === 'saved') {
          if (savedFilterType !== 'all') params.set('filter', savedFilterType);
          if (savedFilterStatus !== 'all') params.set('status', savedFilterStatus);
        }
      } else if (activeTab === 'mock') {
        params.set('pool', String(totalMockQuestionsCount));
        params.set('state', !examStarted ? 'setup' : examFinished ? 'results' : 'active');
        if (examStarted && !examFinished) {
          params.set('q', String(currentMockIndex + 1));
        }
      } else if (activeTab === 'sandbox') {
        if (activeSubject === 'setA') {
          params.set('calc', setACalcType);
        } else {
          params.set('sim', sandboxType);
        }
      }
    }

    if (activeLegalDoc) {
      params.set('doc', activeLegalDoc);
    }

    return `?${params.toString()}`;
  };

  const currentSitemapSearch = buildCurrentSitemapSearch();

  // Synchronize browser address bar URL & document.title on every route/chapter/sub-tab change
  useEffect(() => {
    if (typeof window === 'undefined' || isAuthLoading || isApplyingUrlRef.current) return;

    const currentParams = new URLSearchParams(window.location.search);
    if (
      currentParams.has('token_hash') ||
      currentParams.has('token') ||
      currentParams.has('code') ||
      currentParams.has('error_description') ||
      window.location.hash.includes('access_token=')
    ) {
      return;
    }

    const nextUrl = `${window.location.pathname}${currentSitemapSearch}${window.location.hash}`;
    const currentRelUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextUrl !== currentRelUrl) {
      const prevParams = new URLSearchParams(window.location.search);
      const nextParams = new URLSearchParams(currentSitemapSearch);
      const isMajorNavigation =
        prevParams.get('page') !== nextParams.get('page') ||
        prevParams.get('subject') !== nextParams.get('subject') ||
        prevParams.get('tab') !== nextParams.get('tab') ||
        prevParams.get('view') !== nextParams.get('view') ||
        prevParams.get('subtab') !== nextParams.get('subtab') ||
        prevParams.get('chapter') !== nextParams.get('chapter') ||
        prevParams.get('sim') !== nextParams.get('sim') ||
        prevParams.get('calc') !== nextParams.get('calc');

      if (isMajorNavigation) {
        window.history.pushState(null, '', nextUrl);
      } else {
        window.history.replaceState(null, '', nextUrl);
      }
    }

    // Update browser tab title dynamically to reflect the exact active section & chapter
    const isOnLanding = showLandingPage || !currentUser || isPasswordRecovery || isAuthErrorGate;
    const subjLabel = activeSubject === 'setA' ? 'SPOM Set A (Laws)' : 'SPOM Set B (SCMPE)';
    const allStaticChapters = activeSubject === 'setA' ? SITEMAP_SET_A_CHAPTERS : SITEMAP_SET_B_CHAPTERS;

    if (activeLegalDoc === 'sitemap') {
      document.title = `Interactive Site Map & URL Directory | practACE`;
    } else if (isOnLanding) {
      document.title = `practACE — CA Final SPOM Set A (Laws) & Set B (SCMPE) Study Suite`;
    } else if (activeTab === 'dashboard') {
      document.title = `Dashboard • ${subjLabel} | practACE`;
    } else if (activeTab === 'revision') {
      if (revisionSubView === 'study') {
        const chapMeta = allStaticChapters.find(c => c.id === selectedRevisionChapterId);
        const chapTitle =
          selectedRevisionChapterId === -1
            ? 'Continuous Full Syllabus Deck'
            : selectedRevisionChapterId === -101
            ? 'Set A Statutory Time Limits Chart'
            : selectedRevisionChapterId === -102
            ? 'Set A Monetary & Penalty Limits Chart'
            : chapMeta
            ? `${chapMeta.code}: ${chapMeta.title}`
            : `Chapter ${selectedRevisionChapterId}`;
        document.title = `Revision: ${chapTitle} • ${subjLabel} | practACE`;
      } else if (revisionSubView === 'flashcards') {
        document.title = `${flashcardMode === 'quiz' ? 'Formula & Statutory Quiz' : '3D Active-Recall Flashcards'} • ${subjLabel} | practACE`;
      } else {
        document.title = `${activeSubject === 'setA' ? 'Case Law Precedents Deck' : 'Theoretical Frameworks Deck'} (Card ${currentFrameworkCardIndex + 1}) • ${subjLabel} | practACE`;
      }
    } else if (activeTab === 'practice') {
      const chapMeta = allStaticChapters.find(c => c.id === selectedChapterId);
      const chapCode = chapMeta ? chapMeta.code : `Ch ${selectedChapterId}`;
      if (practiceSubTab === 'cases') {
        document.title = `Practice Cases (${chapCode} • Q${currentQuestionIndex + 1}) • ${subjLabel} | practACE`;
      } else if (practiceSubTab === 'general') {
        document.title = `Practice MCQs (${chapCode} • Q${currentGeneralIndex + 1}) • ${subjLabel} | practACE`;
      } else {
        document.title = `Saved Questions Vault • ${subjLabel} | practACE`;
      }
    } else if (activeTab === 'mock') {
      document.title = `Timed SPOM Mock (${totalMockQuestionsCount} Qs • ${!examStarted ? 'Setup' : examFinished ? 'Scorecard' : `Q${currentMockIndex + 1}`}) • ${subjLabel} | practACE`;
    } else if (activeTab === 'sandbox') {
      const toolName =
        activeSubject === 'setA'
          ? setACalcType.toUpperCase()
          : sandboxType.toUpperCase();
      document.title = `Simulator (${toolName}) • ${subjLabel} | practACE`;
    }
  }, [
    isAuthLoading,
    currentSitemapSearch,
    showLandingPage,
    currentUser,
    isPasswordRecovery,
    isAuthErrorGate,
    activeSubject,
    activeTab,
    revisionSubView,
    selectedRevisionChapterId,
    flashcardMode,
    currentFrameworkCardIndex,
    practiceSubTab,
    selectedChapterId,
    currentQuestionIndex,
    currentGeneralIndex,
    totalMockQuestionsCount,
    examStarted,
    examFinished,
    currentMockIndex,
    sandboxType,
    setACalcType,
    activeLegalDoc
  ]);

  // Handle Mock Exam Timer
  useEffect(() => {
    let timer: any;
    if (examStarted && !examFinished && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinishMockExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examFinished, timeRemaining]);

  // Format Timer
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start Mock Exam
  const handleStartMockExam = () => {
    // Collect all questions from current active curriculum pool
    const pool: (Question & { caseTitle: string; caseText: string; chapterId: number; chapterName: string })[] = [];
    currentCaseScenarios.forEach(cs => {
      cs.questions.forEach(q => {
        pool.push({
          ...q,
          caseTitle: cs.title,
          caseText: cs.scenarioText,
          chapterId: cs.chapterId,
          chapterName: cs.chapterName
        });
      });
    });

    // Randomize and slice
    const randomized = [...pool].sort(() => 0.5 - Math.random()).slice(0, Math.min(totalMockQuestionsCount, pool.length));
    setMockQuestions(randomized);
    setCurrentMockIndex(0);
    const initialAnswers: Record<number, 'A' | 'B' | 'C' | 'D' | null> = {};
    randomized.forEach((_, idx) => {
      initialAnswers[idx] = null;
    });
    setMockAnswers(initialAnswers);
    setFlaggedQuestions({});
    setTimeRemaining(totalMockQuestionsCount * 60 + 300); // 1 minute per question + 5 minutes buffer
    setExamStarted(true);
    setExamFinished(false);
    setMockScoreCard(null);
  };

  // Submit Mock Exam
  const handleFinishMockExam = () => {
    setExamFinished(true);
    let correctCount = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number; chapterId: number }> = {};

    mockQuestions.forEach((q, idx) => {
      const userAnswer = mockAnswers[idx];
      const isCorrect = userAnswer === q.correctOption;
      if (isCorrect) correctCount++;

      const partName = q.chapterName || `Chapter ${q.chapterId}`;
      if (!categoryBreakdown[partName]) {
        categoryBreakdown[partName] = {
          correct: 0,
          total: 0,
          chapterId: q.chapterId || 1
        };
      }
      categoryBreakdown[partName].total += 1;
      if (isCorrect) {
        categoryBreakdown[partName].correct += 1;
      }
    });

    const scorePct = Math.round((correctCount / mockQuestions.length) * 100);
    setMockScoreCard({
      score: correctCount,
      pct: scorePct,
      categoryBreakdown
    });
  };

  const selectedCase = currentCaseScenarios.find(cs => cs.id === selectedCaseId) || currentCaseScenarios[0];
  const selectedChapterObj = currentChapters.find(chap => chap.id === selectedChapterId);
  const currentQuestion = selectedCase?.questions[currentQuestionIndex];
  const currentCaseIdx = selectedCase ? currentCaseScenarios.findIndex(cs => cs.id === selectedCase.id) : 0;

  // General MCQ helpers
  const [selectedGeneralTopic, setSelectedGeneralTopic] = useState<string>('ALL');
  const allChapterMCQs = currentGeneralMCQs.filter(q => q.chapterId === selectedChapterId);
  const chapterTopics = Array.from(new Set(allChapterMCQs.map(q => q.topic)));
  const effectiveGeneralTopic = selectedGeneralTopic === 'ALL' || chapterTopics.includes(selectedGeneralTopic) ? selectedGeneralTopic : 'ALL';
  const chapterMCQs = effectiveGeneralTopic === 'ALL'
    ? allChapterMCQs
    : allChapterMCQs.filter(q => q.topic === effectiveGeneralTopic);
  const currentMCQ = chapterMCQs[currentGeneralIndex];

  // Restore user answered state from practiceProgress upon switching question or case scenario
  useEffect(() => {
    if (selectedCase && currentQuestion) {
      const progressKey = `${selectedCase.id}-${currentQuestion.id}`;
      const saved = practiceProgress[progressKey];
      if (saved && saved.answered) {
        setSelectedOption(saved.selectedOption || null);
        setHasSubmittedPractice(true);
        setShowExplanation(true);
      } else {
        setSelectedOption(null);
        setHasSubmittedPractice(false);
        setShowExplanation(false);
      }
    }
  }, [selectedCaseId, currentQuestionIndex]);

  // Restore user answered state from practiceProgress upon switching general question
  useEffect(() => {
    if (currentMCQ) {
      const progressKey = `general-${currentMCQ.id}`;
      const saved = practiceProgress[progressKey];
      if (saved && saved.answered) {
        setSelectedGeneralOption(saved.selectedOption || null);
        setHasSubmittedGeneral(true);
      } else {
        setSelectedGeneralOption(null);
        setHasSubmittedGeneral(false);
      }
    }
  }, [selectedChapterId, currentGeneralIndex, practiceSubTab, effectiveGeneralTopic]);

  // Practice Mode Option Click to Validate Automatically
  const handleOptionSelect = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (hasSubmittedPractice || !currentQuestion || !selectedCase) return;
    
    setSelectedOption(opt);
    setHasSubmittedPractice(true);
    setShowExplanation(true);

    const isCorrect = opt === currentQuestion.correctOption;
    const progressKey = `${selectedCase.id}-${currentQuestion.id}`;
    
    setPracticeProgress(prev => ({
      ...prev,
      [progressKey]: {
        answered: true,
        correct: isCorrect,
        score: isCorrect ? 1 : 0,
        selectedOption: opt
      }
    }));
  };

  // General MCQs Option Click to Validate Automatically
  const handleGeneralOptionSelect = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (hasSubmittedGeneral || !currentMCQ) return;
    
    setSelectedGeneralOption(opt);
    setHasSubmittedGeneral(true);

    const isCorrect = opt === currentMCQ.correctOption;
    const progressKey = `general-${currentMCQ.id}`;
    
    setPracticeProgress(prev => ({
      ...prev,
      [progressKey]: {
        answered: true,
        correct: isCorrect,
        score: isCorrect ? 1 : 0,
        selectedOption: opt
      }
    }));
  };

  // Safe Math helpers
  const parseNum = (val: string | number): number => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  };

  // Recalculate OEE
  const calcOEE = () => {
    const totalMinutes = parseNum(oeeParams.shiftHours) * 60;
    const netAvailableMinutes = Math.max(0, totalMinutes - parseNum(oeeParams.plannedBreaks));
    const netOperatingMinutes = Math.max(0, netAvailableMinutes - parseNum(oeeParams.unplannedDowntime));
    
    // designed ideal production
    const idealSpeed = parseNum(oeeParams.idealSpeedPPM);
    const totalOutputUnits = parseNum(oeeParams.totalOutput);
    const idealOperatingMinutes = idealSpeed > 0 ? totalOutputUnits / idealSpeed : 0;
    
    // quality losses
    const badUnits = parseNum(oeeParams.rejections);
    const goodUnits = Math.max(0, totalOutputUnits - badUnits);
    const lostOperatingMinutes = idealSpeed > 0 ? badUnits / idealSpeed : 0;

    const availability = netOperatingMinutes > 0 && netAvailableMinutes > 0 ? (netOperatingMinutes / netAvailableMinutes) : 0;
    const performance = netOperatingMinutes > 0 ? Math.min(1.0, idealOperatingMinutes / netOperatingMinutes) : 0;
    const quality = totalOutputUnits > 0 ? (goodUnits / totalOutputUnits) : 0;
    const overallOEE = availability * performance * quality;

    // Calculate performance speed loss in minutes
    const speedLossMinutes = Math.max(0, netOperatingMinutes - idealOperatingMinutes);

    // 6 Major Losses partition breakdown calculations
    const loss1_breakdowns = parseNum(oeeParams.unplannedDowntime) * 0.7; // 70% of unplanned downtime
    const loss2_setups = parseNum(oeeParams.unplannedDowntime) * 0.3; // 30% of unplanned downtime
    const loss3_idling = speedLossMinutes * 0.4; // 40% of speed loss minutes
    const loss4_reducedSpeed = speedLossMinutes * 0.6; // 60% of speed loss minutes
    const loss5_processDefects = badUnits * 0.8; // 80% of defective units
    const loss6_startupLosses = badUnits * 0.2; // 20% of defective units

    // OEE Attribution points impact (reconciles 100% of losses sequentially)
    const availLossPointsTotal = (1.0 - availability) * 100;
    const loss1_oee_impact = parseNum(oeeParams.unplannedDowntime) > 0 ? (loss1_breakdowns / parseNum(oeeParams.unplannedDowntime)) * availLossPointsTotal : 0;
    const loss2_oee_impact = parseNum(oeeParams.unplannedDowntime) > 0 ? (loss2_setups / parseNum(oeeParams.unplannedDowntime)) * availLossPointsTotal : 0;

    const perfLossPointsTotal = availability * (1.0 - performance) * 100;
    const loss3_oee_impact = speedLossMinutes > 0 ? (loss3_idling / speedLossMinutes) * perfLossPointsTotal : 0;
    const loss4_oee_impact = speedLossMinutes > 0 ? (loss4_reducedSpeed / speedLossMinutes) * perfLossPointsTotal : 0;

    const qualLossPointsTotal = availability * performance * (1.0 - quality) * 100;
    const loss5_oee_impact = badUnits > 0 ? (loss5_processDefects / badUnits) * qualLossPointsTotal : 0;
    const loss6_oee_impact = badUnits > 0 ? (loss6_startupLosses / badUnits) * qualLossPointsTotal : 0;

    return {
      totalMinutes,
      netAvailableMinutes,
      netOperatingMinutes,
      idealOperatingMinutes,
      goodUnits,
      lostOperatingMinutes,
      availabilityPct: availability * 100,
      performancePct: performance * 100,
      qualityPct: quality * 100,
      oeePct: overallOEE * 100,
      losses: {
        loss1: { name: "1. Equipment Breakdowns", amount: loss1_breakdowns, unitLabel: "mins", impact: loss1_oee_impact, category: "Availability Loss", color: "indigo" },
        loss2: { name: "2. Setup & Adjustments", amount: loss2_setups, unitLabel: "mins", impact: loss2_oee_impact, category: "Availability Loss", color: "indigo" },
        loss3: { name: "3. Idling & Minor Stops", amount: loss3_idling, unitLabel: "mins", impact: loss3_oee_impact, category: "Performance Loss", color: "violet" },
        loss4: { name: "4. Reduced Operation Speed", amount: loss4_reducedSpeed, unitLabel: "mins", impact: loss4_oee_impact, category: "Performance Loss", color: "violet" },
        loss5: { name: "5. Production Defects & Scrap", amount: loss5_processDefects, unitLabel: "units", impact: loss5_oee_impact, category: "Quality Loss", color: "emerald" },
        loss6: { name: "6. Startup & Warmup Yield Losses", amount: loss6_startupLosses, unitLabel: "units", impact: loss6_oee_impact, category: "Quality Loss", color: "emerald" }
      }
    };
  };

  const oeeResults = calcOEE();

  const [oeeAnimatedValues, setOeeAnimatedValues] = useState({
    availabilityPct: 0,
    performancePct: 0,
    qualityPct: 0,
  });

  useEffect(() => {
    if (activeTab === 'sandbox' && sandboxType === 'oee') {
      const timer = setTimeout(() => {
        setOeeAnimatedValues({
          availabilityPct: oeeResults.availabilityPct,
          performancePct: oeeResults.performancePct,
          qualityPct: oeeResults.qualityPct,
        });
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setOeeAnimatedValues({
        availabilityPct: 0,
        performancePct: 0,
        qualityPct: 0,
      });
    }
  }, [
    activeTab,
    sandboxType,
    oeeResults.availabilityPct,
    oeeResults.performancePct,
    oeeResults.qualityPct,
  ]);

  // Recalculate Airline Relevant Costing
  const calcAirlineCosts = () => {
    const paxCount = parseNum(airlineParams.occupancy);
    const revenue = paxCount * parseNum(airlineParams.ticketPrice);
    const variableCost = paxCount * parseNum(airlineParams.variablePassengerCost);
    const contributionMargin = revenue - variableCost;

    // Relevant (avoidable) flight expenses
    const relevantAssistant = parseNum(airlineParams.assistantCostPerFlight);
    const relevantFuel = parseNum(airlineParams.fuelCost);
    const relevantOvernight = parseNum(airlineParams.overnightLayoverCost);
    const relevantPromotion = parseNum(airlineParams.flightPromotion);
    const relevantInsurance = parseNum(airlineParams.attributableInsuranceThird);

    const totalRelevantExpenses = relevantAssistant + relevantFuel + relevantOvernight + relevantPromotion + relevantInsurance;
    const netContinuationGain = contributionMargin - totalRelevantExpenses;

    // Sunk/allocated (irrelevant) expenses
    const irrelevantCrew = parseNum(airlineParams.crewSalaryFixed);
    const irrelevantGround = parseNum(airlineParams.groundHandlingAllocated);
    const irrelevantDepreciation = parseNum(airlineParams.aircraftDepreciationSunk);
    const irrelevantInsurance = parseNum(airlineParams.fixedInsuranceTwoThird);
    const irrelevantHangar = parseNum(airlineParams.hangarLeaseUnavoidable);

    const totalIrrelevantExpenses = irrelevantCrew + irrelevantGround + irrelevantDepreciation + irrelevantInsurance + irrelevantHangar;

    return {
      revenue,
      variableCost,
      contributionMargin,
      totalRelevantExpenses,
      netContinuationGain,
      totalIrrelevantExpenses
    };
  };

  const airlineResults = calcAirlineCosts();

  // Recalculate Target Costing
  const calcTargetCosting = () => {
    const sp = parseNum(targetParams.sellingPrice);
    const margin = sp * (parseNum(targetParams.targetProfitPct) / 100);
    const targetCost = sp - margin;

    // Actual cost components
    const component = parseNum(targetParams.componentCost);
    const labor = parseNum(targetParams.laborHours) * parseNum(targetParams.laborRate);
    const overhead = parseNum(targetParams.toolingOverhead);
    
    // Customized other material standard quantity
    const netKG = parseNum(targetParams.customMaterialNetKG);
    const wastePct = parseNum(targetParams.normalWastagePct);
    const grossKGRequired = wastePct < 100 ? (netKG / (1 - wastePct / 100)) : 0;
    const materialCost = grossKGRequired * parseNum(targetParams.specialPlasticPricePerKG);

    const totalActualCost = component + labor + overhead + materialCost;
    const costGap = Math.max(0, totalActualCost - targetCost);

    return {
      targetProfit: margin,
      targetCost,
      laborCost: labor,
      materialGrossKG: grossKGRequired,
      materialCost,
      totalActualCost,
      costGap
    };
  };

  const targetResults = calcTargetCosting();

  // Recalculate Pareto Data Points
  const calcParetoData = () => {
    const sorted = [...paretoDefects].sort((a, b) => b.count - a.count);
    const totalCount = sorted.reduce((sum, item) => sum + item.count, 0);
    
    let runningSum = 0;
    const mapped = sorted.map(item => {
      runningSum += item.count;
      const pct = totalCount > 0 ? (item.count / totalCount) * 100 : 0;
      const cumPct = totalCount > 0 ? (runningSum / totalCount) * 100 : 0;
      return {
        ...item,
        pct: Number(pct.toFixed(2)),
        cumPct: Number(cumPct.toFixed(2))
      };
    });

    return {
      totalCount,
      defects: mapped
    };
  };

  const paretoResults = calcParetoData();

  // Get filtered chapters and cases based on search keyword
  const filteredChapters = currentChapters.map(chap => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return {
        chap,
        matchesChap: true,
        matchedCases: currentCaseScenarios.filter(cs => cs.chapterId === chap.id),
        hasMatch: true
      };
    }

    const matchesChap = chap.name.toLowerCase().includes(query) ||
                        chap.description.toLowerCase().includes(query);
    
    const matchedCases = currentCaseScenarios.filter(cs => {
      if (cs.chapterId !== chap.id) return false;
      return cs.title.toLowerCase().includes(query) ||
             cs.scenarioText.toLowerCase().includes(query) ||
             cs.questions.some(q => 
               q.questionText.toLowerCase().includes(query) || 
               q.explanation.toLowerCase().includes(query) ||
               Object.values(q.options).some(optText => optText.toLowerCase().includes(query))
             );
    });

    return {
      chap,
      matchesChap,
      matchedCases,
      hasMatch: matchesChap || matchedCases.length > 0
    };
  }).filter(item => item.hasMatch);

  const legalDocTabs: Array<{
    id: 'sitemap' | 'security' | 'privacy' | 'terms' | 'disclaimer' | 'cookies';
    label: string;
    shortLabel: string;
  }> = [
    { id: 'sitemap', label: 'Interactive Platform Site Map', shortLabel: 'Site Map' },
    { id: 'security', label: 'Security Policy', shortLabel: 'Security Policy' },
    { id: 'privacy', label: 'Privacy Policy', shortLabel: 'Privacy Policy' },
    { id: 'terms', label: 'Terms of Service & Legal Use', shortLabel: 'Terms & Legal Use' },
    { id: 'disclaimer', label: 'Academic & ICAI Disclaimer', shortLabel: 'ICAI Disclaimer' },
    { id: 'cookies', label: 'Cookie & Local Storage Policy', shortLabel: 'Cookie & Storage Policy' }
  ];

  const renderLegalDocumentationModal = () => {
    if (!activeLegalDoc) return null;
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-label="practACE Legal, Security & Compliance Documentation"
        onClick={() => setActiveLegalDoc(null)}
      >
        <div
          className="relative w-full max-w-4xl bg-white dark:bg-[#0b1124] rounded-2xl border border-slate-200 dark:border-[#C9A84C]/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Executive Header */}
          <div className="bg-[#021027] border-b border-[#C9A84C]/35 px-5 sm:px-7 py-4 relative shrink-0">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A84C] via-amber-300 to-blue-500" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#C9A84C]/15 border border-[#C9A84C]/40 text-[#C9A84C] shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#C9A84C] block">
                    Trust, Security &amp; Governance Center
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                    practACE Legal, Security &amp; Compliance Documentation
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveLegalDoc(null)}
                aria-label="Close Legal Documentation Modal"
                className="p-1.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/15 rounded-lg transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Document Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-slate-800/90">
              {legalDocTabs.map((tab) => {
                const isActive = activeLegalDoc === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveLegalDoc(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-black tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#C9A84C] text-slate-950 shadow-sm'
                        : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/80'
                    }`}
                  >
                    {tab.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Document Content Body */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-5 text-left text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeLegalDoc === 'sitemap' && (
              <div className="space-y-5">
                {/* Top Header */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111936] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <LayoutDashboard size={16} className="text-[#C9A84C]" />
                      <span>practACE Interactive Site Map &amp; Study Directory</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Complete navigation directory for SPOM Set A (Laws) &amp; Set B (SCMPE) modules, revision decks, practice engines, simulators, and policies.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <a
                      href="./sitemap.xml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#021027] text-[#C9A84C] border border-[#C9A84C]/40 hover:bg-slate-900 text-[11px] font-black whitespace-nowrap"
                    >
                      <span>XML Sitemap</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>

                {/* 3-Column Core Architecture Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Section 1: Core Study & Revision Modules */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172e] space-y-2.5">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <BookOpen size={14} className="text-[#C9A84C]" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                        1. Study &amp; Revision Deck
                      </h4>
                    </div>
                    <ul className="space-y-1.5 text-xs">
                      {[
                        {
                          label: 'Home & Marketing Landing Page',
                          action: () => { setShowLandingPage(true); setActiveLegalDoc(null); }
                        },
                        {
                          label: 'Portal Dashboard & KPI Overview',
                          action: () => { setShowLandingPage(false); setActiveTab('dashboard'); setActiveLegalDoc(null); }
                        },
                        {
                          label: 'Continuous Full-Syllabus Revision Deck',
                          action: () => { setShowLandingPage(false); setActiveTab('revision'); setRevisionSubView('study'); setSelectedRevisionChapterId(-1); setActiveLegalDoc(null); }
                        },
                        ...(activeSubject === 'setA'
                          ? [
                              {
                                label: 'Set-A Statutory Time Limits Chart',
                                action: () => { setShowLandingPage(false); setActiveSubject('setA'); setActiveTab('revision'); setRevisionSubView('study'); setSelectedRevisionChapterId(-101); setActiveLegalDoc(null); }
                              },
                              {
                                label: 'Set-A Monetary & Penalty Limits Chart',
                                action: () => { setShowLandingPage(false); setActiveSubject('setA'); setActiveTab('revision'); setRevisionSubView('study'); setSelectedRevisionChapterId(-102); setActiveLegalDoc(null); }
                              }
                            ]
                          : []),
                        {
                          label: '3D Active Recall Flashcards (Drill)',
                          action: () => { setShowLandingPage(false); setActiveTab('revision'); setRevisionSubView('flashcards'); setFlashcardMode('drill'); setActiveLegalDoc(null); }
                        },
                        {
                          label: 'Statutory & Formula Derivation Quiz',
                          action: () => { setShowLandingPage(false); setActiveTab('revision'); setRevisionSubView('flashcards'); setFlashcardMode('quiz'); setActiveLegalDoc(null); }
                        },
                        {
                          label: activeSubject === 'setA' ? 'Case Law & Precedents Deck' : 'Theoretical Frameworks Deck',
                          action: () => { setShowLandingPage(false); setActiveTab('revision'); setRevisionSubView('frameworks'); setActiveLegalDoc(null); }
                        }
                      ].map((item) => (
                        <li key={item.label}>
                          <button
                            type="button"
                            onClick={item.action}
                            className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-[#9a7b24] dark:hover:text-[#C9A84C] font-semibold flex items-center justify-between group transition-colors cursor-pointer"
                          >
                            <span>{item.label}</span>
                            <ChevronRight size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 2: Practice, Mocks & Simulators */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172e] space-y-2.5">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <ClipboardList size={14} className="text-blue-500" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                        2. Practice, Mocks &amp; Simulators
                      </h4>
                    </div>
                    <ul className="space-y-1.5 text-xs">
                      {[
                        {
                          label: 'ICAI Case Scenarios Vault (80 Cases)',
                          action: () => { setShowLandingPage(false); setActiveTab('practice'); setPracticeSubTab('cases'); setActiveLegalDoc(null); }
                        },
                        {
                          label: 'Standalone Chapter-Wise General MCQs',
                          action: () => { setShowLandingPage(false); setActiveTab('practice'); setPracticeSubTab('general'); setActiveLegalDoc(null); }
                        },
                        {
                          label: 'Saved Questions Revision Vault',
                          action: () => { setShowLandingPage(false); setActiveTab('practice'); setPracticeSubTab('saved'); setActiveLegalDoc(null); }
                        },
                        {
                          label: 'Timed SPOM Mock Exam (10 / 15 / 25 Qs)',
                          action: () => { setShowLandingPage(false); setActiveTab('mock'); setActiveLegalDoc(null); }
                        },
                        ...(activeSubject === 'setA'
                          ? [
                              {
                                label: 'CSR Applicability & Spend Calculator (Sec 135)',
                                action: () => { setShowLandingPage(false); setActiveSubject('setA'); setActiveTab('sandbox'); setSetACalcType('csr'); setActiveLegalDoc(null); }
                              },
                              {
                                label: 'Board Quotas & Audit Committee (Sec 149/177)',
                                action: () => { setShowLandingPage(false); setActiveSubject('setA'); setActiveTab('sandbox'); setSetACalcType('board'); setActiveLegalDoc(null); }
                              },
                              {
                                label: 'Managerial Remuneration Ceilings (Sec 197)',
                                action: () => { setShowLandingPage(false); setActiveSubject('setA'); setActiveTab('sandbox'); setSetACalcType('remuneration'); setActiveLegalDoc(null); }
                              },
                              {
                                label: 'IBC CIRP Default & 330-Day Timeline (Sec 4/12)',
                                action: () => { setShowLandingPage(false); setActiveSubject('setA'); setActiveTab('sandbox'); setSetACalcType('cirp'); setActiveLegalDoc(null); }
                              }
                            ]
                          : [
                              {
                                label: 'Pareto 80/20 Vital Defect Graph (Case 32)',
                                action: () => { setShowLandingPage(false); setActiveSubject('setB'); setActiveTab('sandbox'); setSandboxType('pareto'); setActiveLegalDoc(null); }
                              },
                              {
                                label: 'TPM / OEE 6 Big Losses Calculator (Case 46)',
                                action: () => { setShowLandingPage(false); setActiveSubject('setB'); setActiveTab('sandbox'); setSandboxType('oee'); setActiveLegalDoc(null); }
                              },
                              {
                                label: 'Airlines Relevant Costing Ledger (Case 9)',
                                action: () => { setShowLandingPage(false); setActiveSubject('setB'); setActiveTab('sandbox'); setSandboxType('relevant'); setActiveLegalDoc(null); }
                              },
                              {
                                label: 'Target Costing & Waste Gap Explorer (Case 4)',
                                action: () => { setShowLandingPage(false); setActiveSubject('setB'); setActiveTab('sandbox'); setSandboxType('target'); setActiveLegalDoc(null); }
                              }
                            ])
                      ].map((item) => (
                        <li key={item.label}>
                          <button
                            type="button"
                            onClick={item.action}
                            className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold flex items-center justify-between group transition-colors cursor-pointer"
                          >
                            <span>{item.label}</span>
                            <ChevronRight size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 3: Subjects, Community & Policies */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172e] space-y-2.5">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                        3. Subjects &amp; Governance
                      </h4>
                    </div>
                    <ul className="space-y-1.5 text-xs">
                      <li>
                        <button
                          type="button"
                          onClick={() => { setShowLandingPage(false); setActiveSubject('setA'); setActiveTab('dashboard'); setActiveLegalDoc(null); }}
                          className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-between cursor-pointer"
                        >
                          <span>SPOM Set A: Corporate &amp; Economic Laws</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950">14 Chaps</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => { setShowLandingPage(false); setActiveSubject('setB'); setActiveTab('dashboard'); setActiveLegalDoc(null); }}
                          className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-700 dark:text-[#C9A84C] font-bold flex items-center justify-between cursor-pointer"
                        >
                          <span>SPOM Set B: Strategic Cost Management</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950">10 Chaps</span>
                        </button>
                      </li>
                      {legalDocTabs.filter(t => t.id !== 'sitemap').map((doc) => (
                        <li key={doc.id}>
                          <button
                            type="button"
                            onClick={() => setActiveLegalDoc(doc.id)}
                            className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-[#C9A84C] font-semibold flex items-center justify-between cursor-pointer"
                          >
                            <span>{doc.label}</span>
                            <ChevronRight size={12} className="opacity-50" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Complete 24-Chapter Sitemap Directory (Set A 14 Chapters & Set B 10 Chapters) */}
                {(() => {
                  const staticChapters = activeSubject === 'setA' ? SITEMAP_SET_A_CHAPTERS : SITEMAP_SET_B_CHAPTERS;
                  return (
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#111936] space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                            Chapter-Level Syllabus Index — {activeSubject === 'setA' ? 'SPOM Set A: Corporate & Economic Laws (14 Chapters)' : 'SPOM Set B: Strategic Cost & Performance Management (10 Chapters)'}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Select any chapter action below to open its Revision Deck, Case Scenarios, or Standalone General MCQs directly.
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => setActiveSubject('setA')}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-black cursor-pointer ${activeSubject === 'setA' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
                          >
                            Set A Laws (14 Chaps)
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveSubject('setB')}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-black cursor-pointer ${activeSubject === 'setB' ? 'bg-[#C9A84C] text-slate-950' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
                          >
                            Set B SCMPE (10 Chaps)
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {staticChapters.map((chap) => (
                          <div
                            key={chap.id}
                            className="p-3 rounded-xl bg-white dark:bg-[#0b1124] border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between gap-2.5 hover:border-[#C9A84C]/50 transition-all"
                          >
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-mono font-extrabold text-blue-600 dark:text-blue-400 block">
                                {chap.code}
                              </span>
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug block">
                                {chap.title}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowLandingPage(false);
                                  setSelectedRevisionChapterId(chap.id);
                                  setRevisionSubView('study');
                                  setActiveTab('revision');
                                  setActiveLegalDoc(null);
                                }}
                                className="px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 cursor-pointer"
                              >
                                Revise Notes
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setShowLandingPage(false);
                                  handleOpenPracticeForChapter(chap.id, 'cases');
                                  setActiveLegalDoc(null);
                                }}
                                className="px-2 py-1 rounded-md text-[10px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 hover:bg-blue-100 cursor-pointer"
                              >
                                Practice Cases
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setShowLandingPage(false);
                                  handleOpenPracticeForChapter(chap.id, 'general');
                                  setActiveLegalDoc(null);
                                }}
                                className="px-2 py-1 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 cursor-pointer"
                              >
                                General MCQs
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {activeLegalDoc === 'security' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111936] border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <Lock size={16} className="text-[#C9A84C]" />
                      <span>Security Policy &amp; Data Protection Architecture</span>
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      RLS Enforced
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Effective Date: November 2026 • Applies to all practACE web sessions and cloud synchronization endpoints.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    1. Row-Level Security (RLS) &amp; Data Isolation Invariants
                  </h4>
                  <p>
                    Every student record in practACE is protected by strict PostgreSQL Row-Level Security (RLS) policies on Supabase. A student&apos;s profile (<code className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">profiles</code>) and study progress buckets (<code className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">user_progress</code> covering MCQ practice, flashcard mastery ratings, bookmarks, and case notes) can only be queried or updated when the authenticated JWT user ID matches <code className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">(select auth.uid()) = user_id</code>. Cross-user reads, blanket scraping queries, and unauthenticated writes are rejected at the database layer.
                  </p>

                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    2. Authentication, Password Recovery &amp; Transport Encryption
                  </h4>
                  <p>
                    All communication between your browser and practACE cloud services uses HTTPS/TLS encryption. Passwords are never stored or logged by practACE frontend code; credential hashing (bcrypt/Argon2) and OAuth 2.0 token exchanges are handled directly by Supabase Auth. Password reset links use single-use cryptographic recovery tokens, and canceling a password recovery flow immediately terminates the temporary recovery session.
                  </p>

                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    3. Shared-Device &amp; Local Storage Hygiene
                  </h4>
                  <p>
                    Local progress caches are only written while an authenticated student session is active. Signing out of your practACE account flushes pending progress to the cloud and wipes local session state (<code className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">localStorage</code> study keys) so another student using the same computer starts with a clean workspace.
                  </p>

                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    4. Responsible Vulnerability Disclosure
                  </h4>
                  <p>
                    If you identify a security vulnerability or potential data-exposure bug, please report it confidentially via our official Feedback &amp; Security channel on the header/footer or via the official practACE LinkedIn page. Please allow our engineering team reasonable time to investigate and remediate before public disclosure.
                  </p>
                </div>
              </div>
            )}

            {activeLegalDoc === 'privacy' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111936] border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck size={16} className="text-blue-500" />
                    <span>Privacy Policy &amp; Student Data Rights</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Compliant with applicable data protection principles, including the Digital Personal Data Protection (DPDP) Act, 2023 (India).
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    1. Information We Collect
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Account Identity Data:</strong> Your email address, display name, and optional OAuth profile picture URL when you create a student account or sign in with Google.
                    </li>
                    <li>
                      <strong>Study &amp; Exam Telemetry:</strong> Solved MCQs, accuracy statistics, bookmarked questions, flashcard mastery ratings (Known/Learning), and personal study notes entered into the case scratchpad or global notepad.
                    </li>
                  </ul>

                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    2. How We Use Your Data
                  </h4>
                  <p>
                    Your data is used exclusively to authenticate your access, synchronize your CA Final SPOM Set A and Set B progress across your devices, and compute your personal readiness analytics. <strong>We do not sell, rent, or share your personal information or study notes with third-party advertisers or data brokers.</strong>
                  </p>

                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    3. Data Retention, Export &amp; Deletion
                  </h4>
                  <p>
                    You may export your study notes to PDF at any time using the built-in PDF export tools and reset your flashcard, quiz, or notepad data directly inside the app. To request complete deletion of your account and cloud profile records, submit a request through the official Feedback link from your registered email address.
                  </p>
                </div>
              </div>
            )}

            {activeLegalDoc === 'terms' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111936] border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText size={16} className="text-[#C9A84C]" />
                    <span>Terms of Service &amp; Acceptable Legal Use</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Governing your access to and use of the practACE CA Final SPOM Set A &amp; Set B platform.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    1. Personal Educational License
                  </h4>
                  <p>
                    practACE grants registered students a personal, revocable, non-exclusive, non-transferable license to use the revision decks, statutory calculators, flashcards, case scenarios, and mock exam simulator solely for individual CA Final exam preparation.
                  </p>

                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    2. Prohibited Conduct &amp; Acceptable Use
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Automated scraping, bulk downloading, crawling, or commercial redistribution of practACE question banks, statutory blueprints, visualizers, or source code is strictly prohibited.</li>
                    <li>Attempting to probe, bypass, or flood authentication endpoints, Row-Level Security policies, or API rate limits will result in immediate account termination.</li>
                    <li>Accounts are intended for individual student use so accuracy analytics, bookmarks, and revision progress reflect a single candidate&apos;s preparation.</li>
                  </ul>

                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    3. Service Availability &amp; Warranty Disclaimer
                  </h4>
                  <p>
                    The platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While we strive for high availability and accurate cloud synchronization, students are encouraged to export critical personal study notes periodically before scheduled ICAI examinations.
                  </p>
                </div>
              </div>
            )}

            {activeLegalDoc === 'disclaimer' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-1.5">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Scale size={16} className="text-[#C9A84C]" />
                    <span>Academic, Statutory &amp; ICAI Non-Affiliation Disclaimer</span>
                  </h3>
                  <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold">
                    Important Notice for CA Final Candidates &amp; Legal/Financial Readers
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    1. Independent Study Platform (Non-Affiliation with ICAI)
                  </h4>
                  <p>
                    <strong>practACE</strong> (evolved from pract.CA) is an independent educational technology platform created to assist Chartered Accountancy students preparing for the Self-Paced Online Modules (SPOM Set A: Corporate &amp; Economic Laws and Set B: Strategic Cost &amp; Performance Management). <strong>practACE is not affiliated with, endorsed by, sponsored by, or officially connected to The Institute of Chartered Accountants of India (ICAI).</strong> All references to ICAI syllabus chapters, RTPs, MTPs, or statutory modules are purely for academic indexing and comparative exam preparation.
                  </p>

                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    2. Not Formal Legal, Corporate, or Financial Advice
                  </h4>
                  <p>
                    All statutory summaries, penalty brackets, time limits, diagnostic calculators (including Companies Act 2013, SEBI LODR/ICDR/SAST, FEMA 1999, FCRA 2010, IBC 2016, and SCMPE decision models), and case explanations are simplified pedagogical aids designed for examination revision. They do not constitute legal advice, formal corporate compliance opinions, or professional financial consulting.
                  </p>

                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    3. Statutory Amendments &amp; Official Study Material Precedence
                  </h4>
                  <p>
                    Corporate and economic laws are subject to periodic amendments via MCA, SEBI, RBI, and IBBI notifications. In the event of any discrepancy between a summary or calculator in practACE and the official ICAI BoS Study Material / Statutory Update for your specific exam attempt, the official ICAI publication and bare Act text shall always prevail.
                  </p>
                </div>
              </div>
            )}

            {activeLegalDoc === 'cookies' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111936] border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Info size={16} className="text-sky-500" />
                    <span>Cookie &amp; Local Storage Policy</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Transparency on browser storage keys used by practACE. Zero third-party ad trackers.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    1. Strictly Necessary Authentication Storage
                  </h4>
                  <p>
                    practACE uses browser <code className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">localStorage</code> to store your encrypted Supabase authentication session token so you stay signed in across page reloads and can sync your progress securely.
                  </p>

                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    2. Functional Study &amp; UI Preference Keys
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <code className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">practace_theme</code> / <code className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">spom_active_subject</code>: Remembers your preferred Light/Dark mode and active subject (Set A Laws vs. Set B SCMPE).
                    </li>
                    <li>
                      <code className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">spom_practice_progress</code>, <code className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">spom_saved_bookmarks</code>, <code className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">spom_flashcard_perf</code>, <code className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">spom_case_notes</code>: Provides instant local responsiveness alongside real-time Supabase cloud backup and is cleared automatically when you sign out.
                    </li>
                  </ul>

                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    3. No Third-Party Advertising Cookies
                  </h4>
                  <p>
                    practACE does not embed third-party behavioral advertising pixels, cross-site retargeting cookies, or commercial analytics trackers.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="bg-slate-50 dark:bg-[#080d1e] border-t border-slate-200 dark:border-slate-800 px-5 sm:px-7 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium text-center sm:text-left">
              Questions or compliance inquiries? Reach us via our official Feedback form or LinkedIn page.
            </span>
            <button
              type="button"
              onClick={() => setActiveLegalDoc(null)}
              className="px-4 py-2 rounded-xl bg-[#021027] hover:bg-slate-800 dark:bg-[#C9A84C] dark:hover:bg-[#b0913e] text-white dark:text-slate-950 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shrink-0"
            >
              Close Document
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isAuthLoading) {
    return (
      <div
        onContextMenu={(e) => e.preventDefault()}
        className={`min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col items-center justify-center p-6 font-sans select-none antialiased transition-all duration-200 ${theme === 'dark' ? 'dark bg-[#070b19] text-[#e2e8f0]' : ''}`}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="bg-[#021027] px-4 py-3 rounded-2xl">
            <img
              src={practAceLogoImg}
              alt="practACE — Plan Revise Analyse Correct Track"
              width={386}
              height={100}
              fetchPriority="high"
              decoding="sync"
              className="h-12 sm:h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-500 dark:text-slate-400">
            <div className="w-4 h-4 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
            <span>Verifying your practACE session...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser || isPasswordRecovery || isAuthErrorGate || showLandingPage) {
    const landingSetAModules = [
      {
        code: 'Part I • Ch 1',
        title: 'Appointment & Qualifications of Directors',
        highlights: 'DIN, Independent Directors, Woman Director, Rotational vs. Non-Rotational, Disqualifications (Sec 149–172)'
      },
      {
        code: 'Part I • Ch 2',
        title: 'Appointment & Remuneration of Managerial Personnel',
        highlights: 'MD/WTD/Manager, Schedule V ceilings, KMP mandates, Managerial Remuneration limits (Sec 196–205)'
      },
      {
        code: 'Part I • Ch 3',
        title: 'Meetings of Board & Its Powers',
        highlights: 'Quorum, Video Conferencing, Audit/NRC/SRC Committees, Loan & Investment thresholds, Related Party (Sec 173–195)'
      },
      {
        code: 'Part I • Ch 4–5',
        title: 'Inspection, Inquiry, Investigation & Compromises',
        highlights: 'SFIO Investigation, Search & Seizure, NCLT Schemes of Arrangement, Fast-Track Mergers & Cross-Border (Sec 206–240)'
      },
      {
        code: 'Part I • Ch 6–9',
        title: 'Oppression, Mismanagement, Winding Up & Producer Cos.',
        highlights: 'Class Action Suits (Sec 241–246), Compulsory Winding Up, Foreign Companies, Strike Off, Valuers & Nidhi Rules'
      },
      {
        code: 'Part II • Ch 1',
        title: 'SEBI Act, 1992 & SEBI (LODR) Regulations, 2015',
        highlights: 'Insider Trading penalties, Board Composition, Quarterly/Annual Compliance Timelines & Material Subsidiary Rules'
      },
      {
        code: 'Part III • Ch 1',
        title: 'Foreign Exchange Management Act (FEMA), 1999',
        highlights: 'Residential Status, LRS USD 2,50,000 Schedule I/II/III Current Account Rules, ODI/ECB & Compounding'
      },
      {
        code: 'Part III • Ch 2',
        title: 'Foreign Contribution (Regulation) Act (FCRA), 2010',
        highlights: 'Prohibited Persons (Sec 3), 20% Administrative Expense Cap, FCRA Designated SBI Account & 5-Year Renewal'
      },
      {
        code: 'Part III • Ch 3',
        title: 'Insolvency and Bankruptcy Code (IBC), 2016',
        highlights: 'Rs. 1 Crore Default Threshold, 180/270/330-Day CIRP Timeline, CoC 66% Voting, Sec 29A Ineligibility & Waterfall (Sec 53)'
      }
    ];

    const landingSetBModules = [
      {
        code: 'Module 01',
        title: 'Introduction to Strategic Cost Management',
        highlights: 'Value Chain Analysis (Porter), Strategic Positioning (Cost Leadership vs. Differentiation) & Value Shop Model'
      },
      {
        code: 'Module 02',
        title: 'Modern Business Environment & Cost of Quality',
        highlights: 'PAF Model (Prevention, Appraisal, Internal/External Failure), TQM, Theory of Constraints & Supply Chain'
      },
      {
        code: 'Module 03',
        title: 'Lean System & Innovation (JIT, TPM, OEE, Six Sigma)',
        highlights: 'Nakajima OEE (Availability × Performance × Quality), 6 Big Losses, Kaizen, 5S, Kanban & DMAIC/DMADV'
      },
      {
        code: 'Module 04',
        title: 'Specialist Cost Management Techniques',
        highlights: 'Target Costing & Value Engineering, Life Cycle Costing, Throughput Accounting Ratio (TPAR) & Environmental EMA'
      },
      {
        code: 'Module 05–06',
        title: 'Decision Making & Relevant Costing Analysis',
        highlights: 'Make-or-Buy, Shut Down vs. Continue, Minimum Pricing, Limiting Factor, Incremental Contribution & Sunk Cost Traps'
      },
      {
        code: 'Module 07',
        title: 'Pricing Decisions & Strategic Pricing Models',
        highlights: 'Skimming vs. Penetration, Pareto 80/20 Profit Analysis, Price Elasticity, Sealed Bid & Life-Cycle Pricing'
      },
      {
        code: 'Module 08',
        title: 'Performance Evaluation & Balanced Scorecard',
        highlights: 'Kaplan & Norton 4 Perspectives, Fitzgerald & Moon Building Blocks, Performance Pyramid, EVA & Triple Bottom Line'
      },
      {
        code: 'Module 09',
        title: 'Divisional Transfer Pricing',
        highlights: 'Minimum (Variable Cost + Opportunity Cost) vs. Maximum Transfer Price, Dual Rate, International Tax & Goal Congruence'
      },
      {
        code: 'Module 10–12',
        title: 'Strategic Operating Income, Budgetary & Standard Costing',
        highlights: 'Growth/Price-Recovery/Productivity Components, ABB/ZBB, Planning vs. Operational Variances & Market Size/Share'
      }
    ];

    const practPillars = [
      {
        letter: 'P',
        word: 'Plan',
        title: 'Telemetry-Driven Study Planning',
        desc: 'Map every chapter of SPOM Set A (Laws) and Set B (SCMPE) with live Solved vs. Pending question tracking, completion rings, and high-weightage statutory priority guides.',
        icon: LayoutDashboard,
        badge: 'Dashboard Telemetry'
      },
      {
        letter: 'R',
        word: 'Revise',
        title: 'Crux Bulletins, Formula Books & 3D Flashcards',
        desc: 'Condense bulky ICAI modules into high-retention chapter summaries, statutory time/penalty charts, 220+ 3D spaced-repetition flashcards, and downloadable A4 PDF decks.',
        icon: BookOpen,
        badge: 'Revision Deck'
      },
      {
        letter: 'A',
        word: 'Analyse',
        title: 'Live Costing & Statutory Compliance Simulators',
        desc: 'Run interactive what-if simulations on OEE 6 Big Losses, Pareto 80/20 curves, Airline Relevant Costing, Target Costing, and Companies Act / FEMA / IBC threshold calculators.',
        icon: Calculator,
        badge: '9 Live Simulators'
      },
      {
        letter: 'C',
        word: 'Correct',
        title: 'Examiner Trap Alerts & Step-by-Step Reconciliations',
        desc: 'Eliminate conceptual blind spots with instant option validation, statutory section & proviso reconciliations, and amber Examiner Trap callouts on every question.',
        icon: ShieldCheck,
        badge: 'Mistake Remediation'
      },
      {
        letter: 'T',
        word: 'Track',
        title: '25-Min CBT Mock Exams, Saved Vault & Cloud Sync',
        desc: 'Simulate real ICAI CBT exam pressure with timed mock assessments, bookmark tricky MCQs into your Saved Vault, and sync progress automatically across all devices.',
        icon: Trophy,
        badge: 'Real-Time Cloud Sync'
      }
    ];

    const landingFaqs = [
      {
        q: 'What is included in practACE for CA Final SPOM?',
        a: 'practACE is a dual-subject study and testing suite covering both ICAI CA Final Self-Paced Online Modules: Set A (Corporate and Economic Laws) and Set B (Strategic Cost and Performance Management). It includes multi-question case scenarios, standalone general MCQs, chapter crux notes, formula books, 3D flashcards, 9 interactive simulators, a 25-minute CBT mock exam simulator, and one-click PDF exports.'
      },
      {
        q: 'How does the P-R-A-C-T (Plan Revise Analyse Correct Track) workflow help clear SPOM?',
        a: 'ICAI SPOM exams test application-based 2-mark case scenarios where subtle statutory provisos or sunk-cost traps decide the answer. practACE structures your preparation into 5 steps: Plan your chapters via dashboard telemetry, Revise crux notes & statutory limits, Analyse numericals with live simulators, Correct mistakes using Examiner Trap warnings, and Track readiness with timed mocks.'
      },
      {
        q: 'Is my study progress saved across my laptop, tablet, and phone?',
        a: 'Yes. Once you sign in with your student account, every solved MCQ, flashcard confidence rating (Known vs. Learning), bookmarked question in your Saved Vault, and personal Study Notepad annotation is automatically backed up and synchronized in real time via Supabase Cloud.'
      },
      {
        q: 'Can I download study notes and case scenarios as PDFs for offline revision?',
        a: 'Absolutely. You can export individual Case Scenarios (complete with questions, reconciliations, and your personal sticky notes) or generate a full-syllabus Revision & Formula Compendium PDF with a single click.'
      },
      {
        q: 'Is practACE affiliated with ICAI?',
        a: 'practACE is an independent educational study companion built specifically for CA Final students preparing for the ICAI Self-Paced Online Modules (SPOM). It is not officially affiliated with or endorsed by the Institute of Chartered Accountants of India (ICAI).'
      }
    ];

    const handleLaunchFromLanding = (
      targetTab: 'dashboard' | 'revision' | 'practice' | 'mock' | 'sandbox' = 'dashboard',
      targetSubject?: 'setA' | 'setB',
      options?: {
        revisionView?: 'study' | 'flashcards' | 'frameworks';
        practiceView?: 'cases' | 'general' | 'saved';
      }
    ) => {
      if (targetSubject) {
        setActiveSubject(targetSubject);
      }
      if (options?.revisionView) {
        setRevisionSubView(options.revisionView);
      }
      if (options?.practiceView) {
        setPracticeSubTab(options.practiceView);
      }
      if (currentUser && !isPasswordRecovery && !isAuthErrorGate) {
        setActiveTab(targetTab);
        setShowLandingPage(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollToAuthPortal('signup');
      }
    };

    const openAppWorkspaceFromLanding = handleLaunchFromLanding;

    return (
      <div
        onContextMenu={(e) => e.preventDefault()}
        className={`min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans select-none antialiased transition-all duration-200 ${theme === 'dark' ? 'dark bg-[#070b19] text-[#e2e8f0]' : ''}`}
      >
        {/* Sticky Executive Landing Navbar */}
        <header className="sticky top-0 bg-[#021027]/95 backdrop-blur-md border-b border-[#C9A84C]/30 text-white shadow-lg z-40 px-3 sm:px-6 py-2.5 sm:py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-shrink-0 flex items-center justify-center cursor-pointer"
              >
                <img
                  src={practAceLogoImg}
                  alt="practACE — Plan Revise Analyse Correct Track"
                  width={386}
                  height={100}
                  fetchPriority="high"
                  decoding="sync"
                  className="h-8 sm:h-[42px] md:h-[46px] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </a>
              <div className="hidden sm:flex flex-col text-left border-l border-slate-800 pl-3 min-w-0">
                <span className="text-xs font-extrabold text-slate-100 tracking-wide truncate">
                  pract<span className="text-[#C9A84C]">ACE</span> — CA Final SPOM Set A &amp; Set B Suite
                </span>
                <span className="text-[10px] uppercase text-[#C9A84C] font-extrabold tracking-widest truncate">
                  Plan &nbsp; Revise &nbsp; Analyse &nbsp; Correct &nbsp; Track
                </span>
              </div>
            </div>

            {/* Landing Section Anchor Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded-full px-3 py-1.5 text-xs font-bold text-slate-300 shrink-0">
              <a href="#pract-method" className="px-2.5 py-1 rounded-full hover:text-[#C9A84C] hover:bg-slate-800/70 transition-colors whitespace-nowrap">
                P-R-A-C-T Method
              </a>
              <a href="#spom-curriculum" className="px-2.5 py-1 rounded-full hover:text-[#C9A84C] hover:bg-slate-800/70 transition-colors whitespace-nowrap">
                Set A &amp; Set B Syllabus
              </a>
              <a href="#live-simulators" className="px-2.5 py-1 rounded-full hover:text-[#C9A84C] hover:bg-slate-800/70 transition-colors whitespace-nowrap">
                Simulators &amp; Tools
              </a>
              <a href="#landing-faq" className="px-2.5 py-1 rounded-full hover:text-[#C9A84C] hover:bg-slate-800/70 transition-colors whitespace-nowrap">
                FAQ
              </a>
              <button
                type="button"
                onClick={() => setActiveLegalDoc('sitemap')}
                className="px-2.5 py-1 rounded-full hover:text-[#C9A84C] hover:bg-slate-800/70 transition-colors cursor-pointer whitespace-nowrap"
              >
                Site Map
              </button>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href="https://www.linkedin.com/company/pract-ace/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow practACE on LinkedIn"
                className="hidden md:flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-[#0A66C2]/20 text-slate-300 hover:text-sky-300 rounded-full transition-all border border-slate-700 hover:border-[#0A66C2]/60 text-xs font-bold cursor-pointer shrink-0"
                title="Follow practACE on LinkedIn"
              >
                <Linkedin size={13} className="text-[#0A66C2] dark:text-sky-400" />
                <span className="hidden xl:inline">LinkedIn</span>
              </a>
              <a
                href="https://discord.gg/buecjd45u"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join practACE Discord Community"
                className="hidden md:flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-[#5865F2]/25 text-slate-300 hover:text-indigo-300 rounded-full transition-all border border-slate-700 hover:border-[#5865F2]/60 text-xs font-bold cursor-pointer shrink-0"
                title="Join practACE Discord Community"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-3.5 h-3.5 text-[#5865F2] dark:text-indigo-400"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span className="hidden xl:inline">Discord</span>
              </a>
              <button
                onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                aria-label={theme === 'light' ? 'Toggle Theme to Dark Mode' : 'Toggle Theme to Light Mode'}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-all border border-slate-700 cursor-pointer shrink-0"
              >
                {theme === 'light' ? <Moon size={14} className="text-sky-400" /> : <Sun size={14} className="text-[#C9A84C]" />}
              </button>

              {currentUser && !isPasswordRecovery && !isAuthErrorGate ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowLandingPage(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 sm:px-3.5 py-1.5 rounded-full bg-[#C9A84C] hover:bg-[#b0913e] text-slate-950 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md shadow-[#C9A84C]/20 flex items-center gap-1.5 cursor-pointer transition-all whitespace-nowrap"
                >
                  <span>Dashboard</span>
                  <ArrowRight size={13} />
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => scrollToAuthPortal('signin')}
                    className="px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] sm:text-xs font-bold cursor-pointer transition-colors whitespace-nowrap"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToAuthPortal('signup')}
                    className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#C9A84C] hover:bg-[#b0913e] text-slate-950 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md shadow-[#C9A84C]/20 cursor-pointer transition-all whitespace-nowrap"
                  >
                    <span>Start Free</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile & Tablet Horizontal Quick-Nav Strip (< lg) */}
          <nav
            aria-label="Landing Quick Navigation"
            className="lg:hidden max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 mt-2 border-t border-slate-800/80 text-[11px] font-bold text-slate-300"
          >
            <a
              href="#pract-method"
              className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] whitespace-nowrap transition-colors shrink-0"
            >
              P-R-A-C-T Method
            </a>
            <a
              href="#spom-curriculum"
              className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] whitespace-nowrap transition-colors shrink-0"
            >
              Set A &amp; Set B Syllabus
            </a>
            <a
              href="#live-simulators"
              className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] whitespace-nowrap transition-colors shrink-0"
            >
              9 Live Simulators
            </a>
            <a
              href="#landing-faq"
              className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] whitespace-nowrap transition-colors shrink-0"
            >
              Student FAQ
            </a>
            <button
              type="button"
              onClick={() => setActiveLegalDoc('sitemap')}
              className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              Site Map
            </button>
          </nav>
        </header>

        <main id="top" className="flex-1">
          {/* HERO SECTION: 2-Column Split (Brand Value Proposition Left + Interactive Auth / Launch Portal Right) */}
          <section className="relative overflow-hidden py-8 sm:py-14 lg:py-18 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Hero Pitch, Motto & Live Metrics (7 Cols) */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
                <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#021027] text-white border border-[#C9A84C]/40 shadow-sm max-w-full">
                  <Sparkles size={13} className="text-[#C9A84C] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#C9A84C]">
                    ICAI CA Final SPOM Companion
                  </span>
                  <span className="text-slate-500 hidden xs:inline">•</span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-200">
                    Set A (Laws) &amp; Set B (SCMPE)
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                      pract<span className="text-[#C9A84C]">ACE</span>
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3.5 gap-y-1 text-[11px] sm:text-sm font-black uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[#9a7b24] dark:text-[#C9A84C]">
                      <span>Plan</span>
                      <span>Revise</span>
                      <span>Analyse</span>
                      <span>Correct</span>
                      <span>Track</span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.18]">
                    Conquer CA Final SPOM{' '}
                    <span className="text-blue-600 dark:text-blue-400">Set A (Corporate Laws)</span> &amp;{' '}
                    <span className="text-[#9a7b24] dark:text-[#C9A84C]">Set B (SCMPE)</span> in One Unified Workspace.
                  </h1>

                  <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                    Built specifically for the ICAI Self-Paced Online Modules CBT format. Practise 2-mark integrated case scenarios, drill standalone statutory &amp; costing MCQs, test numerical sensitivity on 9 live simulators, and benchmark your speed with timed 25-minute mock exams.
                  </p>
                </div>

                {/* Primary Hero CTAs */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
                  {currentUser && !isPasswordRecovery && !isAuthErrorGate ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleLaunchFromLanding('dashboard')}
                        className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-xl bg-[#C9A84C] hover:bg-[#b0913e] text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-[#C9A84C]/25 flex items-center gap-2 cursor-pointer transition-all"
                      >
                        <LayoutDashboard size={17} />
                        <span>Launch Study Dashboard</span>
                        <ArrowRight size={16} />
                      </button>
                      <div className="grid grid-cols-2 sm:flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleLaunchFromLanding('practice', 'setA')}
                          className="w-full sm:w-auto justify-center px-4 sm:px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer transition-all"
                        >
                          <Scale size={15} className="shrink-0" />
                          <span>Set A (Laws)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleLaunchFromLanding('practice', 'setB')}
                          className="w-full sm:w-auto justify-center px-4 sm:px-5 py-3.5 rounded-xl bg-[#021027] hover:bg-slate-800 text-[#C9A84C] border border-[#C9A84C]/40 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                        >
                          <Calculator size={15} className="shrink-0" />
                          <span>Set B (SCMPE)</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => scrollToAuthPortal('signup')}
                        className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-xl bg-[#C9A84C] hover:bg-[#b0913e] text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-[#C9A84C]/25 flex items-center gap-2 cursor-pointer transition-all"
                      >
                        <span>Start Practising Free</span>
                        <ArrowRight size={16} />
                      </button>
                      <a
                        href="#spom-curriculum"
                        className="w-full sm:w-auto justify-center px-5 py-3.5 rounded-xl bg-white dark:bg-[#0c1228] hover:bg-slate-100 dark:hover:bg-[#141d3b] text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors"
                      >
                        <BookOpen size={16} className="text-[#C9A84C] shrink-0" />
                        <span>Explore Set A &amp; Set B Syllabus</span>
                      </a>
                    </>
                  )}
                </div>

                {/* 4 Key Curriculum Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1228] border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between h-full">
                    <div className="text-base sm:text-xl font-black text-blue-600 dark:text-blue-400 leading-tight">Set A + Set B</div>
                    <div className="mt-1">
                      <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">24 Core Chapters</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Laws &amp; SCMPE Full Syllabus</div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1228] border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between h-full">
                    <div className="text-base sm:text-xl font-black text-[#9a7b24] dark:text-[#C9A84C] leading-tight">80+ Cases</div>
                    <div className="mt-1">
                      <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">&amp; 800+ MCQs</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">With Examiner Trap Warnings</div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1228] border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between h-full">
                    <div className="text-base sm:text-xl font-black text-emerald-600 dark:text-emerald-400 leading-tight">220+ Cards</div>
                    <div className="mt-1">
                      <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">3D Active Recall</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Flashcards &amp; Formula Quizzes</div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1228] border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between h-full">
                    <div className="text-base sm:text-xl font-black text-indigo-600 dark:text-indigo-400 leading-tight">9 Simulators</div>
                    <div className="mt-1">
                      <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">+ 25-Min CBT Mock</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Live Sensitivity &amp; Cloud Sync</div>
                    </div>
                  </div>
                </div>

                {/* Highlights Checklist Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>Real-time Cloud Sync across laptop, tablet &amp; mobile</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>Statutory Time-Limit &amp; Monetary Penalty Visualizers</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>One-Click A4 PDF Export for Cases &amp; Revision Decks</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>Saved Questions Vault &amp; Persistent Study Notepad</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Embedded Authentication / Quick-Launch Portal (5 Cols) */}
              <div id="landing-auth-portal" ref={authPortalRef} className="lg:col-span-5 w-full">
                <div className="w-full bg-white dark:bg-[#0c1228] rounded-2xl border border-slate-200 dark:border-[#C9A84C]/40 shadow-2xl overflow-hidden">
                  {/* Top Executive Navy Hero Strip */}
                  <div className="bg-[#021027] px-6 py-5 border-b border-[#C9A84C]/30 relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A84C] via-amber-300 to-blue-500" />
                    <div className="flex items-center gap-3.5 text-left">
                      <div className="p-2.5 rounded-xl bg-[#C9A84C]/15 border border-[#C9A84C]/40 text-[#C9A84C] shrink-0">
                        {currentUser && !isPasswordRecovery && !isAuthErrorGate ? (
                          <ShieldCheck size={24} />
                        ) : (
                          <Lock size={24} />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#C9A84C]">
                          <ShieldCheck size={11} />
                          <span>
                            {currentUser && !isPasswordRecovery && !isAuthErrorGate
                              ? 'Active Student Session'
                              : 'Student Portal Access'}
                          </span>
                        </span>
                        <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                          {isPasswordRecovery
                            ? 'Set a New practACE Password'
                            : authMode === 'forgot'
                              ? 'Reset Your practACE Password'
                              : currentUser && !isAuthErrorGate
                                ? `Welcome back, ${currentUser.displayName || currentUser.email.split('@')[0] || 'Student'}`
                                : authMode === 'signup'
                                  ? 'Create Your Free Student Account'
                                  : 'Sign In to practACE'}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Body: Signed-In Quick Launcher OR Sign-In/Sign-Up/Recovery Form */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {currentUser && !isPasswordRecovery && !isAuthErrorGate ? (
                      <div className="space-y-4 text-left">
                        <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs font-black text-slate-900 dark:text-white truncate">
                              {currentUser.email}
                            </p>
                            <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">
                              Cloud Sync Active • All Progress Backed Up
                            </p>
                          </div>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                        </div>

                        <div className="space-y-2">
                          <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Jump Directly Into a Study Workspace:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => handleLaunchFromLanding('dashboard', 'setA')}
                              className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 hover:bg-blue-100/80 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800/60 text-left transition-colors cursor-pointer"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-blue-700 dark:text-blue-300">Set A • Laws</span>
                                <Scale size={14} className="text-blue-600 dark:text-blue-400" />
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                                Companies Act, SEBI, FEMA, FCRA &amp; IBC
                              </p>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleLaunchFromLanding('dashboard', 'setB')}
                              className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/25 hover:bg-amber-100/80 dark:hover:bg-amber-900/35 border border-amber-200 dark:border-[#C9A84C]/40 text-left transition-colors cursor-pointer"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-amber-800 dark:text-[#C9A84C]">Set B • SCMPE</span>
                                <Calculator size={14} className="text-amber-700 dark:text-[#C9A84C]" />
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                                Strategic Costing, Lean, OEE &amp; Transfer Pricing
                              </p>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleLaunchFromLanding('revision')}
                            className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-[#111936] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <BookOpen size={14} className="text-[#C9A84C]" />
                            <span>Revision Deck</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleLaunchFromLanding('practice')}
                            className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-[#111936] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <ClipboardList size={14} className="text-blue-500" />
                            <span>Practice Cases</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleLaunchFromLanding('dashboard')}
                          className="w-full py-3.5 px-5 bg-[#C9A84C] hover:bg-[#b0913e] text-slate-950 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-[#C9A84C]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                        >
                          <LayoutDashboard size={16} />
                          <span>Enter Full Study Dashboard</span>
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    ) : (
                      <>
                        {!isSupabaseConfigured && (
                          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2.5">
                            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                            <span>
                              Supabase configuration is missing in this environment. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY before signing in.
                            </span>
                          </div>
                        )}

                        {authMessage && (
                          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2.5">
                            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                            <span>{authMessage}</span>
                          </div>
                        )}

                        {authError && (
                          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700/60 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5">
                            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                            <span>{authError}</span>
                          </div>
                        )}

                        <div className="space-y-4">
                          <div className="rounded-xl bg-slate-50 dark:bg-[#111936] border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                            {isPasswordRecovery ? (
                              <>
                                <div className="space-y-1 text-left">
                                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                                    Create a New Password
                                  </h3>
                                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                    Enter a strong password (at least 8 characters with uppercase, lowercase, number &amp; special symbol) to secure your practACE account.
                                  </p>
                                </div>

                                <form onSubmit={handleUpdatePassword} className="space-y-2.5 text-left">
                                  <div>
                                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                                      New Password
                                    </label>
                                    <input
                                      type="password"
                                      required
                                      minLength={8}
                                      autoComplete="new-password"
                                      value={passwordInput}
                                      onChange={(e) => setPasswordInput(e.target.value)}
                                      placeholder="Min 8 chars (A-Z, a-z, 0-9 & symbol)"
                                      disabled={isSigningIn || !isSupabaseConfigured}
                                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070b19] text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                                      Confirm New Password
                                    </label>
                                    <input
                                      type="password"
                                      required
                                      minLength={8}
                                      autoComplete="new-password"
                                      value={confirmPasswordInput}
                                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                                      placeholder="Re-enter your new password"
                                      disabled={isSigningIn || !isSupabaseConfigured}
                                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070b19] text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60"
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    disabled={isSigningIn || !isSupabaseConfigured}
                                    className="w-full py-3.5 px-5 bg-[#C9A84C] hover:bg-[#b0913e] disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-[#C9A84C]/20 flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
                                  >
                                    {isSigningIn ? (
                                      <>
                                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                        <span>Updating password...</span>
                                      </>
                                    ) : (
                                      <>
                                        <Lock size={16} />
                                        <span>Update Password</span>
                                        <ArrowRight size={15} />
                                      </>
                                    )}
                                  </button>
                                </form>

                                <button
                                  type="button"
                                  onClick={handleCancelPasswordRecovery}
                                  disabled={isSigningIn}
                                  className="w-full py-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                                >
                                  {currentUser ? 'Cancel & Return to Dashboard' : 'Cancel & Back to Sign In'}
                                </button>
                              </>
                            ) : authMode === 'forgot' ? (
                              <>
                                <div className="flex items-center justify-between">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setAuthMode('signin');
                                      setIsAuthErrorGate(false);
                                      setAuthError(null);
                                      setAuthMessage(null);
                                    }}
                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                                  >
                                    <ChevronLeft size={14} />
                                    <span>Back to Sign In</span>
                                  </button>
                                </div>

                                <div className="space-y-1 text-left">
                                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                                    Reset Your Password
                                  </h3>
                                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                    Enter your registered student email address and we&apos;ll send you a link to set a new password.
                                  </p>
                                </div>

                                <form onSubmit={handlePasswordResetRequest} className="space-y-2.5 text-left">
                                  <div>
                                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                                      Email Address
                                    </label>
                                    <input
                                      type="email"
                                      required
                                      autoComplete="email"
                                      value={emailInput}
                                      onChange={(e) => setEmailInput(e.target.value)}
                                      placeholder="student@example.com"
                                      disabled={isSigningIn || !isSupabaseConfigured}
                                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070b19] text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60"
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    disabled={isSigningIn || !isSupabaseConfigured}
                                    className="w-full py-3.5 px-5 bg-[#C9A84C] hover:bg-[#b0913e] disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-[#C9A84C]/20 flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
                                  >
                                    {isSigningIn ? (
                                      <>
                                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                        <span>Sending reset link...</span>
                                      </>
                                    ) : (
                                      <>
                                        <Mail size={16} />
                                        <span>Send Reset Link</span>
                                        <ArrowRight size={15} />
                                      </>
                                    )}
                                  </button>
                                </form>

                                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 text-left space-y-2">
                                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                                    Link not opening on your device? Paste the email reset link or 6-digit recovery code here:
                                  </p>
                                  <form onSubmit={handleManualRecoveryVerify} className="flex flex-col sm:flex-row gap-2">
                                    <input
                                      type="text"
                                      value={recoveryLinkOrCodeInput}
                                      onChange={(e) => setRecoveryLinkOrCodeInput(e.target.value)}
                                      placeholder="Paste email reset link URL or 6-digit code"
                                      disabled={isSigningIn || !isSupabaseConfigured}
                                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070b19] text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60"
                                    />
                                    <button
                                      type="submit"
                                      disabled={isSigningIn || !isSupabaseConfigured || !recoveryLinkOrCodeInput.trim()}
                                      className="px-3.5 py-2 rounded-lg bg-[#021027] hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-[#C9A84C] border border-[#C9A84C]/40 text-xs font-black uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors"
                                    >
                                      Verify Link / Code
                                    </button>
                                  </form>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="grid grid-cols-2 gap-1.5 bg-slate-200/70 dark:bg-[#070b19] p-1 rounded-lg">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setAuthMode('signin');
                                      setAuthError(null);
                                      setAuthMessage(null);
                                    }}
                                    className={`py-1.5 rounded-md text-xs font-black transition-all cursor-pointer ${
                                      authMode === 'signin'
                                        ? 'bg-white dark:bg-[#172142] text-slate-900 dark:text-white shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                  >
                                    Sign In
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setAuthMode('signup');
                                      setAuthError(null);
                                      setAuthMessage(null);
                                    }}
                                    className={`py-1.5 rounded-md text-xs font-black transition-all cursor-pointer ${
                                      authMode === 'signup'
                                        ? 'bg-white dark:bg-[#172142] text-slate-900 dark:text-white shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                  >
                                    Create Account
                                  </button>
                                </div>

                                <form onSubmit={handleEmailAuth} className="space-y-2.5 text-left">
                                  {authMode === 'signup' && (
                                    <div>
                                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                                        Full Name
                                      </label>
                                      <input
                                        type="text"
                                        value={fullNameInput}
                                        onChange={(e) => setFullNameInput(e.target.value)}
                                        placeholder="e.g. Ananya Sharma"
                                        disabled={isSigningIn || !isSupabaseConfigured}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070b19] text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60"
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                                      Email Address
                                    </label>
                                    <input
                                      type="email"
                                      required
                                      autoComplete="email"
                                      value={emailInput}
                                      onChange={(e) => setEmailInput(e.target.value)}
                                      placeholder="student@example.com"
                                      disabled={isSigningIn || !isSupabaseConfigured}
                                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070b19] text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60"
                                    />
                                  </div>
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300">
                                        Password
                                      </label>
                                      {authMode === 'signin' && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setAuthMode('forgot');
                                            setAuthError(null);
                                            setAuthMessage(null);
                                            setPasswordInput('');
                                          }}
                                          className="text-[11px] font-bold text-[#9a7b24] dark:text-[#C9A84C] hover:underline cursor-pointer"
                                        >
                                          Forgot password?
                                        </button>
                                      )}
                                    </div>
                                    <input
                                      type="password"
                                      required
                                      minLength={authMode === 'signup' ? 8 : 6}
                                      autoComplete={authMode === 'signin' ? 'current-password' : 'new-password'}
                                      value={passwordInput}
                                      onChange={(e) => setPasswordInput(e.target.value)}
                                      placeholder={
                                        authMode === 'signup'
                                          ? 'Min 8 chars (A-Z, a-z, 0-9 & symbol)'
                                          : 'Enter your password'
                                      }
                                      disabled={isSigningIn || !isSupabaseConfigured}
                                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#070b19] text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/60"
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    disabled={isSigningIn || !isSupabaseConfigured}
                                    className="w-full py-3.5 px-5 bg-[#C9A84C] hover:bg-[#b0913e] disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-[#C9A84C]/20 flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
                                  >
                                    {isSigningIn ? (
                                      <>
                                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                        <span>Signing in...</span>
                                      </>
                                    ) : (
                                      <>
                                        <Mail size={16} />
                                        <span>{authMode === 'signin' ? 'Sign In with Email' : 'Create Student Account'}</span>
                                        <ArrowRight size={15} />
                                      </>
                                    )}
                                  </button>
                                </form>
                              </>
                            )}
                          </div>

                          {isGoogleProviderEnabled && !isPasswordRecovery && authMode !== 'forgot' && (
                            <>
                              <div className="flex items-center gap-3">
                                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                  or continue with
                                </span>
                                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                              </div>

                              <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={isSigningIn || !isSupabaseConfigured}
                                aria-label="Sign in with Google to access practACE and save progress"
                                className="w-full py-2.5 px-4 bg-[#021027] hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg text-xs font-black uppercase tracking-wider border border-[#C9A84C]/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                              >
                                <CloudLightning size={14} className="text-[#C9A84C]" />
                                <span>Continue with Google</span>
                              </button>
                            </>
                          )}

                          <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 font-medium">
                            100% free student registration • Cloud progress backup across all devices
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 1: THE P-R-A-C-T 5-PILLAR METHODOLOGY */}
          <section id="pract-method" className="py-14 sm:py-18 px-4 sm:px-6 bg-white/70 dark:bg-[#0a1022]/80 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="text-center max-w-3xl mx-auto space-y-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-[#C9A84C]/40 text-[11px] font-black uppercase tracking-widest text-[#9a7b24] dark:text-[#C9A84C]">
                  <span>The practACE Framework</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Plan &nbsp; Revise &nbsp; Analyse &nbsp; Correct &nbsp; Track
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every feature in practACE is engineered around a five-stage preparation loop designed to help CA Final students clear ICAI SPOM Set A and Set B with 75%+ accuracy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {practPillars.map((pillar) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <div
                      key={pillar.word}
                      className="rounded-2xl bg-white dark:bg-[#0c1228] border border-slate-200/90 dark:border-slate-800 p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-[#C9A84C]/60 transition-all text-left group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-[#021027] border border-[#C9A84C]/40 flex items-center justify-center text-base font-black text-[#C9A84C] shadow-xs">
                            {pillar.letter}
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#151e3d] text-[10px] font-bold text-slate-600 dark:text-slate-300">
                            {pillar.badge}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-widest text-[#9a7b24] dark:text-[#C9A84C]">
                            {pillar.word}
                          </div>
                          <h3 className="text-sm font-black text-slate-900 dark:text-white mt-0.5 leading-snug">
                            {pillar.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        <span>SPOM Set A &amp; Set B</span>
                        <PillarIcon size={14} className="text-[#C9A84C]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 2: DUAL-SUBJECT SPOM CURRICULUM EXPLORER (SET A & SET B) */}
          <section id="spom-curriculum" className="py-14 sm:py-18 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
                <div className="space-y-2 max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    <span>Complete ICAI SPOM Syllabus Coverage</span>
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Interactive Dual-Subject SPOM Curriculum
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Switch between Set A (Corporate &amp; Economic Laws) and Set B (Strategic Cost &amp; Performance Management) to preview the modules, statutory sections, and costing frameworks inside practACE.
                  </p>
                </div>

                {/* Subject Switcher Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:inline-flex items-center gap-1.5 bg-slate-200/80 dark:bg-[#0c1228] p-1.5 rounded-xl border border-slate-300/70 dark:border-slate-800 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => setLandingCurriculumTab('setA')}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      landingCurriculumTab === 'setA'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Scale size={14} className="shrink-0" />
                    <span>SPOM Set A: Corporate &amp; Economic Laws</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLandingCurriculumTab('setB')}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      landingCurriculumTab === 'setB'
                        ? 'bg-[#C9A84C] text-slate-950 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Calculator size={14} className="shrink-0" />
                    <span>SPOM Set B: SCMPE</span>
                  </button>
                </div>
              </div>

              {/* Module Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                {(landingCurriculumTab === 'setA' ? landingSetAModules : landingSetBModules).map((mod) => (
                  <div
                    key={mod.code + mod.title}
                    className="rounded-2xl bg-white dark:bg-[#0c1228] border border-slate-200/90 dark:border-slate-800 p-5 flex flex-col justify-between gap-4 shadow-xs hover:shadow-md hover:border-[#C9A84C]/60 transition-all"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                            landingCurriculumTab === 'setA'
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                              : 'bg-amber-500/10 text-amber-800 dark:text-[#C9A84C] border border-[#C9A84C]/30'
                          }`}
                        >
                          {mod.code}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          Notes • Cases • MCQs
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {mod.highlights}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleLaunchFromLanding('revision', landingCurriculumTab)}
                      className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-black text-[#9a7b24] dark:text-[#C9A84C] hover:underline cursor-pointer"
                    >
                      <span>
                        {currentUser && !isPasswordRecovery && !isAuthErrorGate
                          ? `Open ${landingCurriculumTab === 'setA' ? 'Set A' : 'Set B'} Module`
                          : 'Sign In to Unlock Module'}
                      </span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: INTERACTIVE SIMULATORS & EXAM TOOLS SHOWCASE */}
          <section id="live-simulators" className="py-14 sm:py-18 px-4 sm:px-6 bg-white/70 dark:bg-[#0a1022]/80 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="text-center max-w-3xl mx-auto space-y-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  <span>Interactive Exam Workbenches</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Built for Application-Based SPOM Case Scenarios
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Go beyond passive PDF reading with interactive calculators, statutory threshold visualizers, 3D spaced-repetition flashcards, and a full CBT mock exam engine.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                <div className="rounded-2xl bg-white dark:bg-[#0c1228] border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <ClipboardList size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    ICAI-Pattern Multi-MCQ Case Scenarios
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Practise full-length integrated case scenarios side-by-side with split-screen sticky annotations, instant option validation, detailed reconciliations, and Examiner Trap warnings.
                  </p>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#0c1228] border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-[#C9A84C]/40 text-[#9a7b24] dark:text-[#C9A84C] flex items-center justify-center">
                    <Calculator size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    4 SCMPE Costing &amp; Operations Sandboxes
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Manipulate live parameters for Nakajima OEE &amp; 6 Big Losses, Pareto 80/20 Vital Few Defect Curves, National Airlines Relevant Costing, and Cellwell Target Costing &amp; Normal Wastage.
                  </p>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#0c1228] border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Scale size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    5 Set A Legal Calculators &amp; Limit Charts
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Verify Independent &amp; Rotational Director counts, Board Quorum, Sec 186 Loan/Investment limits, FEMA LRS thresholds, and visual charts of every statutory time limit (days) and penalty (₹).
                  </p>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#0c1228] border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Timer size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    25-Minute Exam-Grade CBT Mock Simulator
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Test under real countdown conditions with configurable 15–30 question pools, question navigation palette, flag-for-review markers, and chapter-wise accuracy breakdown scorecards.
                  </p>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#0c1228] border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    220+ 3D Flashcards &amp; Formula Quiz Engine
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Flip interactive 3D cards, rate each concept as Known or Still Learning, and challenge yourself with bidirectional quizzes matching statutory rules &amp; derivations to their exact provisions.
                  </p>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#0c1228] border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <Download size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Saved Questions Vault &amp; A4 PDF Exporter
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Bookmark tricky MCQs into your personal Saved Vault for last-day revision, jot formulas in the persistent Study Notepad, and download formatted A4 PDF study handouts anytime.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: FREQUENTLY ASKED QUESTIONS (FAQ) */}
          <section id="landing-faq" className="py-14 sm:py-18 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-[#C9A84C]/40 text-[11px] font-black uppercase tracking-widest text-[#9a7b24] dark:text-[#C9A84C]">
                  <span>Student FAQ</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3 text-left">
                {landingFaqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={faq.q}
                      className="rounded-xl bg-white dark:bg-[#0c1228] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-[#111936] transition-colors"
                      >
                        <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                          {faq.q}
                        </span>
                        <ChevronRight
                          size={16}
                          className={`text-[#C9A84C] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 5: BOTTOM CTA BANNER */}
          <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#021027] text-white border-b border-[#C9A84C]/30">
            <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-[#07193a] via-[#021027] to-[#0c1738] border border-[#C9A84C]/40 p-6 sm:p-10 text-center space-y-5 shadow-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/40 text-[10px] font-black uppercase tracking-widest text-[#C9A84C]">
                <Sparkles size={12} />
                <span>Plan &nbsp; Revise &nbsp; Analyse &nbsp; Correct &nbsp; Track</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight max-w-2xl mx-auto">
                Ready to Master CA Final SPOM Set A &amp; Set B?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Join CA Final students revising Corporate &amp; Economic Laws and Strategic Cost &amp; Performance Management with structured case scenarios, live simulators, and cloud progress sync.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                {currentUser && !isPasswordRecovery && !isAuthErrorGate ? (
                  <button
                    type="button"
                    onClick={() => handleLaunchFromLanding('dashboard')}
                    className="px-7 py-3.5 rounded-xl bg-[#C9A84C] hover:bg-[#b0913e] text-slate-950 text-sm font-black uppercase tracking-wider shadow-lg shadow-[#C9A84C]/25 flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <LayoutDashboard size={16} />
                    <span>Enter Study Dashboard</span>
                    <ArrowRight size={15} />
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => scrollToAuthPortal('signup')}
                      className="px-7 py-3.5 rounded-xl bg-[#C9A84C] hover:bg-[#b0913e] text-slate-950 text-sm font-black uppercase tracking-wider shadow-lg shadow-[#C9A84C]/25 flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <span>Create Free Student Account</span>
                      <ArrowRight size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToAuthPortal('signin')}
                      className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-sm font-bold cursor-pointer transition-colors"
                    >
                      Sign In to Existing Account
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* Landing Page Footer — Full-Width Evenly Distributed Executive Footer */}
        <footer className="w-full bg-[#021027] text-slate-400 text-xs pt-10 pb-8 px-6 sm:px-10 lg:px-14 xl:px-20 border-t border-[#C9A84C]/35 tracking-wide relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A84C]/80 via-amber-300/60 to-blue-500/80" />
          <div className="w-full max-w-[1600px] mx-auto space-y-8">
            {/* Top 4-Column Evenly Spread Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16 items-start justify-between text-left w-full">
              {/* Column 1: Brand Identity, Motto & Community */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <img
                    src={practAceLogoImg}
                    alt="practACE Logo"
                    width={386}
                    height={100}
                    loading="lazy"
                    decoding="async"
                    className="h-9 sm:h-10 w-auto object-contain shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left space-y-0.5">
                    <span className="text-white font-black text-sm tracking-wide block leading-tight">
                      pract<span className="text-[#C9A84C]">ACE</span>
                    </span>
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#C9A84C] block">
                      Plan &nbsp; Revise &nbsp; Analyse &nbsp; Correct &nbsp; Track
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
                  Complete CA Final Self-Paced Online Module (SPOM) preparation workspace for <strong className="text-slate-200">Set A (Corporate &amp; Economic Laws)</strong> and <strong className="text-slate-200">Set B (Strategic Cost &amp; Performance Management)</strong>.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <a
                    href="https://www.linkedin.com/company/pract-ace/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-[#0A66C2]/25 text-slate-200 hover:text-sky-300 border border-slate-700 hover:border-[#0A66C2]/60 text-[11px] font-bold transition-all"
                    title="Visit practACE on LinkedIn"
                  >
                    <Linkedin size={12} className="text-sky-400" />
                    <span>LinkedIn</span>
                    <ExternalLink size={10} className="opacity-70" />
                  </a>
                  <a
                    href="https://discord.gg/buecjd45u"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-[#5865F2]/25 text-slate-200 hover:text-indigo-300 border border-slate-700 hover:border-[#5865F2]/60 text-[11px] font-bold transition-all"
                    title="Join practACE Discord Community"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-3.5 h-3.5 text-indigo-400"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <span>Discord</span>
                    <ExternalLink size={10} className="opacity-70" />
                  </a>
                  <a
                    href="https://forms.gle/PzWDLK1F3PsobrFL6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-[#C9A84C]/20 text-slate-200 hover:text-amber-300 border border-slate-700 hover:border-[#C9A84C]/60 text-[11px] font-bold transition-all whitespace-nowrap"
                    title="Share Feedback on practACE"
                  >
                    <MessageSquare size={12} className="text-[#C9A84C]" />
                    <span>Feedback</span>
                    <ExternalLink size={10} className="opacity-70" />
                  </a>
                </div>
              </div>

              {/* Column 2: Study & Revision Modules */}
              <div className="space-y-3 lg:justify-self-center">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-[#C9A84C] pb-1 border-b border-slate-800/80">
                  Study &amp; Revision Modules
                </h4>
                <ul className="space-y-2 text-[11px] font-semibold">
                  <li>
                    <button
                      type="button"
                      onClick={() => openAppWorkspaceFromLanding('dashboard')}
                      className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                      <span>Portal Dashboard &amp; Analytics</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openAppWorkspaceFromLanding('revision', activeSubject, { revisionView: 'study' })}
                      className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                      <span>Revision Deck &amp; Crux Notes</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openAppWorkspaceFromLanding('revision', activeSubject, { revisionView: activeSubject === 'setA' ? 'study' : 'frameworks' })}
                      className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                      <span>Statutory &amp; Concept Blueprints</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openAppWorkspaceFromLanding('revision', activeSubject, { revisionView: 'flashcards' })}
                      className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                      <span>Active Recall Flashcards (220+)</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openAppWorkspaceFromLanding('sandbox')}
                      className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                      <span>Statutory &amp; Decision Calculators</span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 3: Practice, Mocks & Tools */}
              <div className="space-y-3 lg:justify-self-center">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-[#C9A84C] pb-1 border-b border-slate-800/80">
                  Practice &amp; Exam Engines
                </h4>
                <ul className="space-y-2 text-[11px] font-semibold">
                  <li>
                    <button
                      type="button"
                      onClick={() => openAppWorkspaceFromLanding('practice', activeSubject, { practiceView: 'cases' })}
                      className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                      <span>ICAI Case Scenarios Vault (80)</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openAppWorkspaceFromLanding('practice', activeSubject, { practiceView: 'general' })}
                      className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                      <span>Standalone Chapter-Wise MCQs</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openAppWorkspaceFromLanding('practice', activeSubject, { practiceView: 'saved' })}
                      className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                      <span>Saved Questions Revision Vault</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openAppWorkspaceFromLanding('mock')}
                      className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                      <span>Timed SPOM Mock Simulator</span>
                    </button>
                  </li>
                  <li>
                    <a
                      href="#live-simulators"
                      className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                      <span>Interactive Simulators Preview</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 4: Subjects & Sitemap Directory */}
              <div className="space-y-3 lg:justify-self-end">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-[#C9A84C] pb-1 border-b border-slate-800/80">
                  SPOM Subjects &amp; Directory
                </h4>
                <ul className="space-y-2 text-[11px] font-semibold">
                  <li>
                    <button
                      type="button"
                      onClick={() => openAppWorkspaceFromLanding('dashboard', 'setA')}
                      className="text-slate-300 hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-400" />
                      <span>Set A: Corporate &amp; Economic Laws (14 Chaps)</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openAppWorkspaceFromLanding('dashboard', 'setB')}
                      className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                      <span>Set B: Strategic Cost Management (10 Chaps)</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveLegalDoc('sitemap')}
                      className="text-[#C9A84C] hover:underline font-black transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                      <span>Full Interactive Site Map →</span>
                    </button>
                  </li>
                  <li>
                    <a
                      href="#landing-faq"
                      className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                      <span>Student FAQ &amp; Cloud Sync</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="./sitemap.xml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-[#C9A84C] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-500" />
                      <span>XML Sitemap Index</span>
                      <ExternalLink size={10} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Legal, Security & Governance Bar — Evenly Distributed Full Width */}
            <div className="pt-5 border-t border-slate-800/90 flex flex-col xl:flex-row items-center justify-between gap-4 text-[11px] w-full">
              <div className="flex flex-wrap items-center justify-center xl:justify-start gap-x-6 gap-y-2 font-bold">
                {legalDocTabs.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setActiveLegalDoc(doc.id)}
                    className="text-slate-300 hover:text-[#C9A84C] hover:underline transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {doc.shortLabel}
                  </button>
                ))}
              </div>
              <p className="text-slate-400 text-center xl:text-right">
                © {new Date().getFullYear()} practACE. Independent educational preparation platform; not affiliated with or endorsed by ICAI.
              </p>
            </div>
          </div>
        </footer>
        {renderLegalDocumentationModal()}
      </div>
    );
  }

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={`min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans select-none antialiased transition-all duration-200 ${theme === 'dark' ? 'dark bg-[#070b19] text-[#e2e8f0]' : ''}`}
    >
      {/* Premium Corporate Top Navbar - Official practACE Branding with Set A / Set B Switcher */}
      <header className="sticky top-0 bg-[#021027]/95 backdrop-blur-md border-b border-[#C9A84C]/35 text-white shadow-lg z-30 px-3 sm:px-5 xl:px-6 py-2.5 sm:py-3 transition-colors duration-200 dark:bg-[#021027]/95 dark:border-[#C9A84C]/35 relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A84C] via-amber-300 to-blue-500 opacity-90" />

        <div className="max-w-7xl w-full mx-auto flex flex-col gap-2.5">
          {/* Primary Header Row: Logo + Desktop Subject Switcher + Desktop Nav + Profile & Theme Controls */}
          <div className="flex items-center justify-between gap-2 sm:gap-3 w-full">
            {/* Left Side: practACE Logo, Desktop Set A/B Switcher & What's New */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
              <button
                onClick={() => setActiveTab('dashboard')}
                aria-label="practACE Home — Go to Dashboard"
                className="relative flex-shrink-0 select-none flex items-center justify-center p-0 m-0 cursor-pointer group focus:outline-none"
                title="practACE — Plan Revise Analyse Correct Track"
              >
                <img
                  src={practAceLogoImg}
                  alt="practACE — Plan Revise Analyse Correct Track"
                  width={386}
                  height={100}
                  fetchPriority="high"
                  decoding="sync"
                  className="h-8 sm:h-[42px] md:h-[46px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </button>

              {/* Desktop & Tablet Persistent Set A / Set B Switcher (md+) */}
              <div className="hidden md:flex items-center bg-slate-950/90 dark:bg-slate-900 p-1 rounded-xl border border-slate-700/80 shadow-inner shrink-0">
                <button
                  onClick={() => setActiveSubject('setA')}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                    activeSubject === 'setA'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                  title="SPOM Set A: Corporate and Economic Laws"
                >
                  <BookOpen size={13} className={activeSubject === 'setA' ? 'text-white shrink-0' : 'text-slate-400 shrink-0'} />
                  <span>Set A : Laws</span>
                </button>

                <button
                  onClick={() => setActiveSubject('setB')}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                    activeSubject === 'setB'
                      ? 'bg-[#C9A84C] text-slate-950 shadow-md shadow-amber-500/20 ring-1 ring-amber-300'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                  title="SPOM Set B: Strategic Cost & Performance Management"
                >
                  <Calculator size={13} className={activeSubject === 'setB' ? 'text-slate-950 shrink-0' : 'text-slate-400 shrink-0'} />
                  <span>Set B : SCMPE</span>
                </button>
              </div>

              {/* What's New Trigger Button (sm+) */}
              <button
                onClick={() => setShowSetAAnnouncement(true)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-black text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-lg transition-all cursor-pointer shadow-sm whitespace-nowrap shrink-0"
                title="View What's New — practACE Rebrand & Set A Addition"
              >
                <Sparkles size={12} className="text-[#C9A84C] shrink-0" />
                <span>What&apos;s New</span>
              </button>

              {/* Tagline divider & text on 2xl+ screens */}
              <div className="hidden 2xl:block h-6 w-[1px] bg-slate-800 self-center"></div>
              <div className="hidden 2xl:flex flex-col text-left">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] text-slate-200 tracking-wide font-extrabold leading-tight whitespace-nowrap">
                    {activeSubject === 'setA' ? 'SPOM Set A: Corporate & Economic Laws' : 'SPOM Set B: Strategic Cost Management'}
                  </span>
                  <span className="text-[9px] uppercase text-[#C9A84C] font-extrabold tracking-widest leading-none whitespace-nowrap">
                    Plan &nbsp; Revise &nbsp; Analyse &nbsp; Correct &nbsp; Track
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Desktop Nav Tabs + Community Links + Always-Visible Theme & Profile Avatar */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Desktop Study Navigation Tabs (lg+) */}
              <nav className="hidden lg:flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800/90">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                  { id: 'revision', label: 'Revision Deck', icon: BookOpen },
                  { id: 'practice', label: 'Practice Cases', icon: ClipboardList },
                  { id: 'mock', label: 'SPOM Mock', icon: Timer },
                  { id: 'sandbox', label: 'Simulators', icon: Calculator }
                ].map((navItem) => {
                  const isActive = activeTab === navItem.id;
                  const NavIcon = navItem.icon;
                  return (
                    <button
                      key={navItem.id}
                      onClick={() => {
                        setActiveTab(navItem.id as any);
                        setShowMobileMenu(false);
                        if (navItem.id === 'dashboard' && examStarted) {
                          setHasSubmittedPractice(false);
                        }
                      }}
                      className={`group px-2.5 xl:px-3 py-1.5 rounded-lg text-xs tracking-wide whitespace-nowrap transition-all relative cursor-pointer font-sans select-none shrink-0 flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#C9A84C]/15 text-[#C9A84C] font-black border border-[#C9A84C]/40 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60 font-semibold border border-transparent'
                      }`}
                    >
                      <NavIcon size={13} className={isActive ? 'text-[#C9A84C] shrink-0' : 'text-slate-400 group-hover:text-slate-200 shrink-0'} />
                      <span>{navItem.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Desktop Community & Feedback Pills (xl+) */}
              <div className="hidden xl:flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveLegalDoc('sitemap')}
                  aria-label="Open Interactive Platform Site Map"
                  className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-[#C9A84C]/20 text-slate-200 hover:text-[#C9A84C] rounded-full transition-all border border-slate-700 hover:border-[#C9A84C]/60 text-xs font-bold whitespace-nowrap cursor-pointer shrink-0 select-none"
                  title="Open Interactive Site Map & URL Directory"
                >
                  <FileText size={12} className="text-[#C9A84C] shrink-0" />
                  <span>Site Map</span>
                </button>
                <a
                  href="https://forms.gle/PzWDLK1F3PsobrFL6"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share practACE Feedback"
                  className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-[#C9A84C]/20 text-slate-300 hover:text-amber-300 rounded-full transition-all border border-slate-700 hover:border-[#C9A84C]/60 text-xs font-bold whitespace-nowrap cursor-pointer shrink-0 select-none"
                  title="Share Feedback on practACE"
                >
                  <MessageSquare size={13} className="text-[#C9A84C] shrink-0" />
                  <span>Feedback</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/pract-ace/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow practACE on LinkedIn"
                  className="flex items-center justify-center p-2 bg-slate-800 hover:bg-[#0A66C2]/20 text-slate-300 hover:text-sky-300 rounded-full transition-all border border-slate-700 hover:border-[#0A66C2]/60 text-xs font-bold cursor-pointer shrink-0 select-none"
                  title="Follow practACE on LinkedIn"
                >
                  <Linkedin size={13} className="text-[#0A66C2] dark:text-sky-400 shrink-0" />
                </a>
                <a
                  href="https://discord.gg/buecjd45u"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join practACE Discord Community"
                  className="flex items-center justify-center p-2 bg-slate-800 hover:bg-[#5865F2]/25 text-slate-300 hover:text-indigo-300 rounded-full transition-all border border-slate-700 hover:border-[#5865F2]/60 text-xs font-bold cursor-pointer shrink-0 select-none"
                  title="Join practACE Discord Community"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-3.5 h-3.5 text-[#5865F2] dark:text-indigo-400 shrink-0"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              </div>

              {/* Theme Switcher Icon (All Viewports) */}
              <button
                id="global-theme-toggle"
                onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                aria-label={theme === 'light' ? 'Toggle Theme to Dark Mode' : 'Toggle Theme to Light Mode'}
                className="flex items-center justify-center p-2 bg-slate-800/90 hover:bg-slate-700 text-slate-300 rounded-full transition-all border border-slate-700 text-xs font-bold cursor-pointer shrink-0 select-none"
                title={theme === 'light' ? 'Switch to Dark Mode for study sessions' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? <Moon size={14} className="text-sky-400" /> : <Sun size={14} className="text-[#C9A84C]" />}
              </button>

              {/* Always-Visible User Account Icon & Popover (Mobile + Desktop) */}
              <div className="relative shrink-0" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu(prev => !prev)}
                  aria-label={`User Profile (${currentUser.email || currentUser.displayName || 'Account'})`}
                  aria-expanded={showProfileMenu}
                  title={`${currentUser.displayName || 'Student'} (${currentUser.email || ''}) — ${syncError ? 'Sync Error' : (cloudSyncing || isSavingCloud) ? 'Saving...' : 'Saved'}`}
                  className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-slate-800/90 hover:bg-slate-700 border border-[#C9A84C]/50 hover:border-[#C9A84C] transition-all cursor-pointer select-none shadow-sm focus:outline-none"
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.email || 'User Profile'}
                      width={34}
                      height={34}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="w-full h-full rounded-full bg-gradient-to-br from-[#C9A84C] to-amber-600 flex items-center justify-center text-xs font-black text-slate-950 font-sans">
                      {currentUser.email ? currentUser.email.slice(0, 1).toUpperCase() : (currentUser.displayName ? currentUser.displayName.slice(0, 1).toUpperCase() : 'U')}
                    </span>
                  )}
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#021027] ${
                      syncError
                        ? 'bg-rose-500'
                        : (cloudSyncing || isSavingCloud)
                        ? 'bg-amber-400 animate-pulse'
                        : 'bg-emerald-400'
                    }`}
                  />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-1.5rem)] rounded-xl bg-white dark:bg-[#0c1228] border border-slate-200 dark:border-[#C9A84C]/40 shadow-2xl p-3.5 z-50 text-left space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                      {currentUser.photoURL ? (
                        <img
                          src={currentUser.photoURL}
                          alt="Profile"
                          width={32}
                          height={32}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-full border border-[#C9A84C]/40 object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-amber-600 flex items-center justify-center text-xs font-black text-slate-950 shrink-0">
                          {currentUser.email ? currentUser.email.slice(0, 1).toUpperCase() : 'U'}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-black text-slate-900 dark:text-white truncate">
                          {currentUser.displayName || 'practACE Student'}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold">Cloud Sync</span>
                      {syncError ? (
                        <button
                          onClick={() => flushAllProgressToCloud(currentUser)}
                          className="font-bold text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                          <span>Retry Sync</span>
                        </button>
                      ) : (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full inline-block ${(cloudSyncing || isSavingCloud) ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                          <span>{(cloudSyncing || isSavingCloud) ? 'Saving...' : 'All Progress Saved'}</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setActiveLegalDoc('sitemap');
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-[#171f3a] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <FileText size={12} className="text-[#C9A84C]" />
                      <span>Interactive Site Map</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowLandingPage(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-[#171f3a] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles size={12} className="text-[#C9A84C]" />
                      <span>View Landing Page</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setPasswordInput('');
                        setConfirmPasswordInput('');
                        setAuthError(null);
                        setAuthMessage(null);
                        setPasswordRecoveryActive(true);
                        setIsPasswordRecovery(true);
                      }}
                      aria-label="Change Account Password"
                      className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-[#171f3a] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Lock size={12} className="text-[#C9A84C]" />
                      <span>Change Password</span>
                    </button>

                    <button
                      onClick={handleSignOut}
                      aria-label="Sign Out of User Profile"
                      className="w-full py-2 px-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile & Tablet Menu Button (< lg) */}
              <button
                onClick={() => setShowMobileMenu(prev => !prev)}
                aria-label={showMobileMenu ? 'Close Menu' : 'Open Menu'}
                aria-expanded={showMobileMenu}
                title={showMobileMenu ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                className="lg:hidden p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-700/60 cursor-pointer"
              >
                {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Set A / Set B Subject Switcher Row (< md) */}
          <div className="md:hidden flex items-center gap-1.5 w-full">
            <div className="grid grid-cols-2 gap-1 bg-slate-950/90 p-1 rounded-xl border border-slate-700/80 flex-1">
              <button
                onClick={() => setActiveSubject('setA')}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-black tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  activeSubject === 'setA'
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen size={12} className="shrink-0" />
                <span>Set A : Laws</span>
              </button>
              <button
                onClick={() => setActiveSubject('setB')}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-black tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  activeSubject === 'setB'
                    ? 'bg-[#C9A84C] text-slate-950 shadow-sm ring-1 ring-amber-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Calculator size={12} className="shrink-0" />
                <span>Set B : SCMPE</span>
              </button>
            </div>
            <button
              onClick={() => setShowSetAAnnouncement(true)}
              className="sm:hidden flex items-center justify-center p-2 text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-xl transition-all cursor-pointer shrink-0"
              title="What's New"
              aria-label="What's New"
            >
              <Sparkles size={14} className="text-[#C9A84C]" />
            </button>
          </div>

          {/* Mobile & Tablet Horizontal Quick-Tab Bar (< lg) */}
          <nav
            aria-label="Mobile Study Navigation"
            className="lg:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1.5 border-t border-slate-800/80 w-full"
          >
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'revision', label: 'Revision Deck', icon: BookOpen },
              { id: 'practice', label: 'Practice Cases', icon: ClipboardList },
              { id: 'mock', label: 'SPOM Mock', icon: Timer },
              { id: 'sandbox', label: 'Simulators', icon: Calculator }
            ].map((navItem) => {
              const isActive = activeTab === navItem.id;
              const NavIcon = navItem.icon;
              return (
                <button
                  key={navItem.id}
                  onClick={() => {
                    setActiveTab(navItem.id as any);
                    setShowMobileMenu(false);
                    if (navItem.id === 'dashboard' && examStarted) {
                      setHasSubmittedPractice(false);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs tracking-wide whitespace-nowrap transition-all cursor-pointer font-sans select-none shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#C9A84C]/20 text-[#C9A84C] font-black border border-[#C9A84C]/40 shadow-xs'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white font-semibold border border-slate-800'
                  }`}
                >
                  <NavIcon size={12} className={isActive ? 'text-[#C9A84C] shrink-0' : 'text-slate-400 shrink-0'} />
                  <span>{navItem.label}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setShowMobileMenu(false);
                setActiveLegalDoc('sitemap');
              }}
              className="px-3 py-1.5 rounded-lg text-xs tracking-wide whitespace-nowrap transition-all cursor-pointer font-sans select-none shrink-0 flex items-center gap-1.5 bg-slate-900/80 text-[#C9A84C] hover:bg-slate-800 font-bold border border-[#C9A84C]/35"
            >
              <FileText size={12} className="text-[#C9A84C] shrink-0" />
              <span>Site Map</span>
            </button>
          </nav>

          {/* Expandable Mobile Drawer for Community, Feedback & Quick Links */}
          {showMobileMenu && (
            <div className="lg:hidden pt-2.5 pb-1 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 animate-fadeIn">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowLandingPage(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full border border-slate-700 text-xs font-bold cursor-pointer"
                >
                  <Sparkles size={12} className="text-[#C9A84C]" />
                  <span>Landing Page</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMobileMenu(false);
                    setActiveLegalDoc('sitemap');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full border border-slate-700 text-xs font-bold cursor-pointer"
                >
                  <FileText size={12} className="text-[#C9A84C]" />
                  <span>Site Map</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://forms.gle/PzWDLK1F3PsobrFL6"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-[#C9A84C]/20 text-slate-300 rounded-full border border-slate-700 text-xs font-bold"
                >
                  <MessageSquare size={12} className="text-[#C9A84C]" />
                  <span>Feedback</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/pract-ace/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 text-slate-300 rounded-full border border-slate-700 text-xs font-bold"
                >
                  <Linkedin size={12} className="text-sky-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://discord.gg/buecjd45u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 text-slate-300 rounded-full border border-slate-700 text-xs font-bold"
                >
                  <span>Discord</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main and Notepad Dual Structure */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto min-h-0 relative">
        <main className={`flex-1 flex flex-col p-4 sm:p-6 min-w-0 transition-all ${showGlobalNotepad ? 'lg:pr-3' : ''}`}>

        {/* PERSISTENT GLOBAL SITEMAP & LIVE URL BREADCRUMB BAR (Visible Across All Internal Tabs) */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white/90 dark:bg-[#0c1228]/95 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-200/85 dark:border-[#1c243f] shadow-2xs">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 select-none tracking-wide min-w-0">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-1.5 font-extrabold text-slate-800 dark:text-slate-200 hover:text-[#C9A84C] transition-colors cursor-pointer"
            >
              <LayoutDashboard size={13} className="text-[#C9A84C] shrink-0" />
              <span>practACE</span>
            </button>
            <ChevronRight size={12} className="text-slate-400 dark:text-slate-600 shrink-0" />
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`font-black cursor-pointer hover:underline ${
                activeSubject === 'setA' ? 'text-blue-600 dark:text-blue-400' : 'text-amber-700 dark:text-[#C9A84C]'
              }`}
            >
              {activeSubject === 'setA' ? 'Set A (Laws)' : 'Set B (SCMPE)'}
            </button>
            <ChevronRight size={12} className="text-slate-400 dark:text-slate-600 shrink-0" />
            <span className="font-extrabold text-slate-900 dark:text-white">
              {activeTab === 'dashboard' && 'Portal Dashboard'}
              {activeTab === 'revision' && (
                revisionSubView === 'study'
                  ? `Revision Deck (${
                      selectedRevisionChapterId === -1
                        ? 'Full Syllabus'
                        : selectedRevisionChapterId === -101
                        ? 'Time Limits Chart'
                        : selectedRevisionChapterId === -102
                        ? 'Monetary Limits Chart'
                        : `Ch ${activeSubject === 'setA' ? selectedRevisionChapterId - 100 : selectedRevisionChapterId}`
                    })`
                  : revisionSubView === 'flashcards'
                  ? `Flashcards (${flashcardMode === 'quiz' ? 'Quiz Mode' : '3D Drill'})`
                  : activeSubject === 'setA'
                  ? `Case Law Deck (#${currentFrameworkCardIndex + 1})`
                  : `Frameworks Deck (#${currentFrameworkCardIndex + 1})`
              )}
              {activeTab === 'practice' && (
                practiceSubTab === 'cases'
                  ? `Practice Cases (Ch ${activeSubject === 'setA' ? selectedChapterId - 100 : selectedChapterId} • ${selectedCaseId} • Q${currentQuestionIndex + 1})`
                  : practiceSubTab === 'general'
                  ? `Standalone MCQs (Ch ${activeSubject === 'setA' ? selectedChapterId - 100 : selectedChapterId} • Q${currentGeneralIndex + 1})`
                  : `Saved Questions Vault (${activeSubjectBookmarksCount})`
              )}
              {activeTab === 'mock' && (
                `Timed SPOM Mock (${totalMockQuestionsCount} Qs • ${!examStarted ? 'Setup' : examFinished ? 'Results' : `Q${currentMockIndex + 1}`})`
              )}
              {activeTab === 'sandbox' && (
                activeSubject === 'setA'
                  ? `Statutory Simulator (${setACalcType.toUpperCase()})`
                  : `Costing Simulator (${sandboxType.toUpperCase()})`
              )}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setShowLandingPage(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-[#171f3a] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 transition-colors cursor-pointer"
            >
              <Sparkles size={12} className="text-[#C9A84C]" />
              <span>Landing Page</span>
            </button>
            <button
              type="button"
              onClick={() => setShowGlobalNotepad((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-[#171f3a] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 transition-colors cursor-pointer"
            >
              <StickyNote size={12} className="text-[#C9A84C]" />
              <span>{showGlobalNotepad ? 'Hide Notepad' : 'Study Notepad'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLegalDoc('sitemap')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#021027] text-[#C9A84C] border border-[#C9A84C]/40 hover:bg-slate-900 transition-colors cursor-pointer"
              title="Open Interactive Site Map & URL Directory"
            >
              <FileText size={12} />
              <span>Site Map</span>
            </button>
          </div>
        </div>
        
        {/* TAB 1: PORTAL DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">

            {/* Main Subject Prep Header - Executive Panel with Gilded Top Accent */}
            <div className="bg-white text-slate-800 dark:bg-[#0c1228] dark:text-white border border-slate-200/90 dark:border-[#C9A84C]/30 rounded-2xl p-6 shadow-md transition-all duration-200 relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 ${activeSubject === 'setA' ? 'bg-gradient-to-r from-blue-600 via-sky-400 to-[#C9A84C]' : 'bg-gradient-to-r from-[#C9A84C] via-amber-300 to-blue-500'}`} />
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                
                {/* Left Side: Accuracy Circular Dial */}
                <div className="flex flex-col items-center gap-2.5 shrink-0 justify-center w-full lg:w-auto">
                  <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        className="stroke-slate-100 dark:stroke-[#171f3a]"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        className={`transition-all duration-700 ease-out ${activeSubject === 'setA' ? 'stroke-blue-500' : 'stroke-[#C9A84C]'}`}
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 34}
                        strokeDashoffset={2 * Math.PI * 34 * (1 - (practiceAccuracyPercentage || 0) / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-[20px] font-black font-mono leading-none dark:text-white">{practiceAccuracyPercentage}%</span>
                      <span className="text-[12px] tracking-wider text-slate-400 font-bold uppercase mt-1">ACC %</span>
                    </div>
                  </div>
                  {/* Dynamic motivational micro-text */}
                  <span className={`text-[12px] font-bold text-center max-w-[170px] leading-tight select-none ${activeSubject === 'setA' ? 'text-blue-500' : 'text-[#C9A84C]'}`}>
                    {practiceAccuracyPercentage <= 40 ? "Keep pushing! You're getting there 💪" :
                     practiceAccuracyPercentage <= 70 ? "Great momentum! Stay consistent 🔥" :
                     practiceAccuracyPercentage <= 90 ? "Almost there! Final stretch ⚡" :
                     "Vault mastered! You're ready 🏆"}
                  </span>
                </div>

                {/* Center Core Title Information */}
                <div className="flex-1 text-center lg:text-left space-y-2 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-[#171f3a] text-slate-700 dark:text-[#C9A84C] border border-slate-200 dark:border-[#C9A84C]/30">
                    <Sparkles size={11} className="text-[#C9A84C]" />
                    <span>{activeSubject === 'setA' ? 'ICAI SPOM Set A • Corporate & Economic Laws' : 'ICAI SPOM Set B • Strategic Cost Management'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                    {activeSubject === 'setA' ? "Corporate and Economic Laws" : "Strategic Cost Management & Performance Evaluation"}
                  </h2>
                  <p className="text-[13px] sm:text-[14px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                    {activeSubject === 'setA'
                      ? "High-yield statutory revision, corporate governance cases, SEBI LODR rules, and IBC/FEMA thresholds."
                      : (practiceAccuracyPercentage < 50 
                          ? "Significant prep needed. Allocate more daily study hours to chapters and formulas immediately."
                          : "Excellent progress! You are matching advanced Set-B performance thresholds. Continue with mocks.")
                    }
                  </p>
                </div>

                {/* Right Side: Enhanced Overview Stats Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 items-center justify-center w-full lg:w-auto">
                  {/* Case Studies Card */}
                  <div className="flex flex-col justify-center items-center px-3.5 py-3 rounded-xl border border-slate-200/90 dark:border-[#1e293b] border-t-2 border-t-amber-500 bg-slate-50/70 dark:bg-[#111933] text-center shadow-xs">
                    <span className="text-[17px] sm:text-[19px] font-black font-mono text-slate-800 dark:text-white leading-none">
                      {completedCaseScenariosCount} <span className="text-[11px] font-normal text-slate-400">/ {totalCaseScenariosCount}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1.5 uppercase tracking-wider">Cases Solved</span>
                    <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold mt-0.5">{pendingCaseScenariosCount} Pending</span>
                  </div>

                  {/* Total MCQs Card */}
                  <div className="flex flex-col justify-center items-center px-3.5 py-3 rounded-xl border border-slate-200/90 dark:border-[#1e293b] border-t-2 border-t-blue-500 bg-slate-50/70 dark:bg-[#111933] text-center shadow-xs">
                    <span className="text-[17px] sm:text-[19px] font-black font-mono text-slate-800 dark:text-white leading-none">
                      {totalSolvedCount} <span className="text-[11px] font-normal text-slate-400">/ {totalAllQuestionsCount}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1.5 uppercase tracking-wider">MCQs Solved</span>
                    <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold mt-0.5">{totalPendingCount} Pending</span>
                  </div>

                  {/* Accuracy Gauge Card */}
                  <div className="flex flex-col justify-center items-center px-3.5 py-3 rounded-xl border border-slate-200/90 dark:border-[#1e293b] border-t-2 border-t-emerald-500 bg-slate-50/70 dark:bg-[#111933] text-center shadow-xs">
                    <span className="text-[17px] sm:text-[19px] font-black font-mono text-slate-800 dark:text-white leading-none">{practiceAccuracyPercentage}%</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1.5 uppercase tracking-wider">Accuracy</span>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">{totalCorrectPractice}✓ • {totalIncorrectPractice}✗</span>
                  </div>

                  {/* Completion Rate Card */}
                  <div className="flex flex-col justify-center items-center px-3.5 py-3 rounded-xl border border-slate-200/90 dark:border-[#1e293b] border-t-2 border-t-indigo-500 bg-slate-50/70 dark:bg-[#111933] text-center shadow-xs">
                    <span className="text-[17px] sm:text-[19px] font-black font-mono text-slate-800 dark:text-white leading-none">{practiceCompletionPercentage}%</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1.5 uppercase tracking-wider">Completion</span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{activeChaptersCount}/{currentChapters.length} Chaps</span>
                  </div>

                  {/* Saved Questions Vault Card */}
                  <button
                    onClick={() => {
                      setActiveTab('practice');
                      setPracticeSubTab('saved');
                    }}
                    className="flex flex-col justify-center items-center px-3.5 py-3 rounded-xl border border-amber-200 dark:border-amber-900/50 border-t-2 border-t-[#C9A84C] bg-amber-50/60 dark:bg-amber-950/20 hover:bg-amber-100/70 dark:hover:bg-amber-950/40 text-center shadow-xs transition-all cursor-pointer group col-span-2 sm:col-span-1"
                    title="View Bookmarked / Flagged Questions Vault"
                  >
                    <span className="text-[17px] sm:text-[19px] font-black font-mono text-amber-600 dark:text-amber-400 leading-none flex items-center gap-1 group-hover:scale-105 transition-transform">
                      <Bookmark size={14} className="fill-amber-500 text-amber-500" />
                      {activeSubjectBookmarksCount}
                    </span>
                    <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold mt-1.5 uppercase tracking-wider">Saved Qs</span>
                    <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold mt-0.5 group-hover:underline">Review Vault &rarr;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 6-Card Custom Portal Grid — Upgraded High-Craft Interactive Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Card 1: MCQ Practice */}
              <button
                onClick={() => { setActiveTab('practice'); setPracticeSubTab('cases'); }}
                className="bg-white dark:bg-[#0c1228] hover:bg-slate-50/90 dark:hover:bg-[#111938] border border-slate-200/90 dark:border-[#1c243f] hover:border-[#C9A84C]/60 dark:hover:border-[#C9A84C]/60 rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:shadow-[#C9A84C]/10 hover:-translate-y-1 transition-all duration-300 group flex justify-between items-center cursor-pointer min-h-[152px] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A84C] to-amber-300 opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="space-y-2.5 flex-1 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <BookOpen size={17} />
                    </div>
                    <h3 className="font-black text-slate-900 dark:text-white group-hover:text-[#C9A84C] transition-colors text-[19px] tracking-tight leading-tight">MCQ Practice</h3>
                  </div>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Chapter-wise and full-length practice sets with instant statutory explanations
                  </p>
                  
                  {/* Miniature progress bar */}
                  <div className="pt-1.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mb-1">
                      <span>{answeredPracticeQuestions} practiced</span>
                      <span className="font-mono text-[#C9A84C]">{practiceCompletionPercentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-[#171f3a] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#C9A84C] to-amber-400 transition-all duration-1000 ease-out" 
                        style={{ width: `${mcqProgressAnimate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-[#1a233d] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/80 shadow-xs">
                      ⏱️ ~15 mins
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#171f3a] group-hover:bg-[#C9A84C] text-slate-400 dark:text-slate-400 group-hover:text-slate-950 flex items-center justify-center transition-all shrink-0">
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* Card 2: Questions Vault */}
              <button
                onClick={() => { setActiveTab('practice'); setPracticeSubTab('cases'); }}
                className="bg-white dark:bg-[#0c1228] hover:bg-slate-50/90 dark:hover:bg-[#111938] border border-slate-200/90 dark:border-[#1c243f] hover:border-blue-500/60 dark:hover:border-blue-400/60 rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 group flex justify-between items-center cursor-pointer min-h-[152px] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-sky-400 opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="space-y-2.5 flex-1 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-500 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Award size={17} />
                    </div>
                    <h3 className="font-black text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors text-[19px] tracking-tight leading-tight">Questions Vault</h3>
                  </div>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {activeSubject === 'setA' 
                      ? "Corporate Governance, Restructuring, IBC & FEMA case studies" 
                      : "Past exam, RTP, MTP booklet case studies with answers"}
                  </p>
                  <span className="inline-block text-[12px] font-bold text-[#C9A84C] font-mono group-hover:underline">
                    Browse {currentCaseScenarios.length} Detailed Case Studies →
                  </span>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-[#1a233d] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/80 shadow-xs">
                      ⏱️ ~20 mins
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#171f3a] group-hover:bg-blue-500 text-slate-400 dark:text-slate-400 group-hover:text-white flex items-center justify-center transition-all shrink-0">
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* Card 3: Interactive Blueprints */}
              <button
                onClick={() => { setActiveTab('revision'); setRevisionSubView(activeSubject === 'setA' ? 'study' : 'frameworks'); }}
                className="bg-white dark:bg-[#0c1228] hover:bg-slate-50/90 dark:hover:bg-[#111938] border border-slate-200/90 dark:border-[#1c243f] hover:border-emerald-500/60 dark:hover:border-emerald-400/60 rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 group flex justify-between items-center cursor-pointer min-h-[152px] relative overflow-hidden"
               >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="space-y-2.5 flex-1 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Trophy size={17} />
                    </div>
                    <h3 className="font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-[19px] tracking-tight leading-tight">
                      {activeSubject === 'setA' ? "Statutory Blueprints" : "Concept Blueprints"}
                    </h3>
                  </div>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {activeSubject === 'setA'
                      ? "Visual flowcharts of CIRP timelines, Fast-Track Mergers & Director quotas"
                      : "Adjust variables to visualize Porter, OEE, and Transfer Pricing limits"}
                  </p>
                  <span className="inline-block text-[12px] font-bold text-[#C9A84C] font-mono group-hover:underline">
                    {currentChapters.length} Chapters Interactive Maps →
                  </span>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-[#1a233d] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/80 shadow-xs">
                      ⏱️ ~10 mins
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#171f3a] group-hover:bg-emerald-500 text-slate-400 dark:text-slate-400 group-hover:text-slate-950 flex items-center justify-center transition-all shrink-0">
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* Card 4: Formula & Legal Flashcards */}
              <button
                onClick={() => { setActiveTab('revision'); setRevisionSubView('flashcards'); }}
                className="bg-white dark:bg-[#0c1228] hover:bg-slate-50/90 dark:hover:bg-[#111938] border border-slate-200/90 dark:border-[#1c243f] hover:border-indigo-500/60 dark:hover:border-indigo-400/60 rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 group flex justify-between items-center cursor-pointer min-h-[152px] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-400 opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="space-y-2.5 flex-1 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <ClipboardList size={17} />
                    </div>
                    <h3 className="font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-[19px] tracking-tight leading-tight">
                      {activeSubject === 'setA' ? "Statutory Flashcards" : "Formula Flashcards"}
                    </h3>
                  </div>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {activeSubject === 'setA'
                      ? "Drill Section limits, voting percentages, penalty brackets & time limits"
                      : "Learn core relevant costing rules, derivation & strategic models"}
                  </p>
                  <span className="inline-block text-[12px] font-bold text-[#C9A84C] font-mono group-hover:underline">
                    Launch Cards & Active Quiz →
                  </span>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-[#1a233d] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/80 shadow-xs">
                      ⏱️ ~10 mins
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#171f3a] group-hover:bg-indigo-500 text-slate-400 dark:text-slate-400 group-hover:text-white flex items-center justify-center transition-all shrink-0">
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* Card 5: SPOM Mock Exam */}
              <button
                onClick={() => { setActiveTab('mock'); handleStartMockExam(); }}
                className="bg-white dark:bg-[#0c1228] hover:bg-slate-50/90 dark:hover:bg-[#111938] border border-slate-200/90 dark:border-[#1c243f] hover:border-rose-500/60 dark:hover:border-rose-400/60 rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1 transition-all duration-300 group flex justify-between items-center cursor-pointer min-h-[152px] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-amber-400 opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="space-y-2.5 flex-1 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Timer size={17} />
                    </div>
                    <h3 className="font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors text-[19px] tracking-tight leading-tight">SPOM Mock Exam</h3>
                  </div>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Practice 100% compliant exam simulations under a live timer
                  </p>
                  <span className="inline-block text-[12px] font-bold text-[#C9A84C] font-mono group-hover:underline">
                    Launch Timed Mock Simulator →
                  </span>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-[#1a233d] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/80 shadow-xs">
                      ⏱️ ~90 mins
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#171f3a] group-hover:bg-rose-500 text-slate-400 dark:text-slate-400 group-hover:text-white flex items-center justify-center transition-all shrink-0">
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* Card 6: Specialized Decision Tools */}
              <button
                onClick={() => setActiveTab('sandbox')}
                className="bg-white dark:bg-[#0c1228] hover:bg-slate-50/90 dark:hover:bg-[#111938] border border-slate-200/90 dark:border-[#1c243f] hover:border-sky-500/60 dark:hover:border-sky-400/60 rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 transition-all duration-300 group flex justify-between items-center cursor-pointer min-h-[152px] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-blue-500 opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="space-y-2.5 flex-1 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Calculator size={17} />
                    </div>
                    <h3 className="font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors text-[19px] tracking-tight leading-tight">
                      {activeSubject === 'setA' ? "Statutory Limits Calcs" : "Decision Calcs"}
                    </h3>
                  </div>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {activeSubject === 'setA'
                      ? "Calculate CSR 2% spend, Board quotas, Sec 197 caps & IBC timelines"
                      : "Calculate Transfer Price bounds, DuPont ROI, and Altman scores"}
                  </p>
                  <span className="inline-block text-[12px] font-bold text-[#C9A84C] font-mono group-hover:underline">
                    4 Core Diagnostic Engines →
                  </span>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-[#1a233d] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/80 shadow-xs">
                      ⏱️ ~15 mins
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#171f3a] group-hover:bg-sky-500 text-slate-400 dark:text-slate-400 group-hover:text-white flex items-center justify-center transition-all shrink-0">
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

            </div>

            {/* CURRICULUM RESOLUTION & SOLVED VS PENDING ANALYTICS */}
            <div className="bg-white dark:bg-[#0c1228] rounded-2xl border border-slate-200 dark:border-[#1c243f] p-5 sm:p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                      <BarChart2 size={16} />
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                      Curriculum Mastery & Question Resolution Matrix
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                    Live tracking of Case Studies, Standalone MCQs, and Pending questions across all {currentChapters.length} chapters ({activeSubject === 'setA' ? 'Corporate & Economic Laws' : 'SCMPE'}).
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                  <button
                    onClick={() => {
                      setActiveTab('practice');
                      setPracticeSubTab('saved');
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 hover:bg-amber-100 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    <Bookmark size={13} className="fill-amber-500 text-amber-500" />
                    <span>Saved Questions ({activeSubjectBookmarksCount})</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* 4 Summary Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Metric 1: Case Studies Breakdown */}
                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Case Studies Pool
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                      {totalCaseScenariosCount} Cases
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                      {completedCaseScenariosCount}
                    </span>
                    <span className="text-xs text-slate-500 font-medium font-sans">
                      completed ({totalCaseScenariosCount > 0 ? Math.round((completedCaseScenariosCount / totalCaseScenariosCount) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-800">
                    <span>MCQs in Cases: <strong className="text-slate-800 dark:text-white font-mono">{solvedCaseQuestionsCount}/{totalCaseQuestionsCount}</strong></span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold font-mono">{pendingCaseScenariosCount} pending</span>
                  </div>
                </div>

                {/* Metric 2: Standalone General MCQs */}
                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Standalone MCQs
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono">
                      {totalGeneralMCQsCount} MCQs
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                      {solvedGeneralMCQsCount}
                    </span>
                    <span className="text-xs text-slate-500 font-medium font-sans">
                      solved ({totalGeneralMCQsCount > 0 ? Math.round((solvedGeneralMCQsCount / totalGeneralMCQsCount) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-800">
                    <span>Pending: <strong className="text-blue-600 dark:text-blue-400 font-mono">{pendingGeneralMCQsCount}</strong></span>
                    <span className="text-emerald-600 font-bold font-mono">
                      {solvedGeneralMCQsCount > 0 
                        ? Math.round((currentGeneralMCQs.filter(q => practiceProgress['general-' + q.id]?.correct).length / solvedGeneralMCQsCount) * 100) 
                        : 0}% Acc
                    </span>
                  </div>
                </div>

                {/* Metric 3: Global Solved vs Pending */}
                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Overall Question Pool
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono">
                      {totalAllQuestionsCount} Total Qs
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                      {totalSolvedCount}
                    </span>
                    <span className="text-xs text-slate-500 font-medium font-sans">
                      solved • <span className="font-bold text-amber-600 dark:text-amber-400">{totalPendingCount} pending</span>
                    </span>
                  </div>
                  <div className="pt-1">
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full transition-all" style={{ width: `${practiceCompletionPercentage}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Metric 4: Bookmarked Questions Vault */}
                <div className="p-4 rounded-xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      Saved Revision Vault
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono">
                      Flagged
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
                      {activeSubjectBookmarksCount}
                    </span>
                    <span className="text-xs text-slate-500 font-medium font-sans">
                      questions bookmarked
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between pt-1 border-t border-amber-200/50 dark:border-amber-900/30">
                    <span>{activeSubjectBookmarks.filter(b => b.type === 'case').length} Cases • {activeSubjectBookmarks.filter(b => b.type === 'general').length} Standalone</span>
                    <button
                      onClick={() => {
                        setActiveTab('practice');
                        setPracticeSubTab('saved');
                      }}
                      className="text-amber-700 dark:text-amber-400 font-bold hover:underline cursor-pointer"
                    >
                      Open &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Chapter-by-Chapter Solved vs Pending Matrix Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span>Chapter-Wise Resolution & Pending Tracking</span>
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Showing all {currentChapters.length} Chapters with Full Names
                  </span>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto scrollbar-thin">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                          <th className="py-3 px-3.5 min-w-[240px]">Chapter Name (Full ICAI Syllabus)</th>
                          <th className="py-3 px-3 text-center">Case Studies</th>
                          <th className="py-3 px-3 text-center">Case MCQs</th>
                          <th className="py-3 px-3 text-center">Standalone</th>
                          <th className="py-3 px-3 text-center">Solved / Total</th>
                          <th className="py-3 px-3 text-center min-w-[120px]">Progress</th>
                          <th className="py-3 px-3 text-center">Status</th>
                          <th className="py-3 px-3.5 text-right">Practice</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                        {currentChapters.map(chap => {
                          const chapCases = currentCaseScenarios.filter(cs => cs.chapterId === chap.id);
                          const chapTotalCases = chapCases.length;
                          const chapCompletedCases = chapCases.filter(cs => 
                            cs.questions.length > 0 && cs.questions.every(q => practiceProgress[`${cs.id}-${q.id}`]?.answered)
                          ).length;

                          const chapTotalCaseQs = chapCases.reduce((sum, cs) => sum + cs.questions.length, 0);
                          const chapSolvedCaseQs = chapCases.reduce((sum, cs) => 
                            sum + cs.questions.filter(q => practiceProgress[`${cs.id}-${q.id}`]?.answered).length, 0);

                          const chapGenMCQs = currentGeneralMCQs.filter(q => q.chapterId === chap.id);
                          const chapTotalGenMCQs = chapGenMCQs.length;
                          const chapSolvedGenMCQs = chapGenMCQs.filter(q => practiceProgress[`general-${q.id}`]?.answered).length;

                          const chapTotalQuestions = chapTotalCaseQs + chapTotalGenMCQs;
                          const chapTotalSolved = chapSolvedCaseQs + chapSolvedGenMCQs;
                          const chapTotalPending = Math.max(0, chapTotalQuestions - chapTotalSolved);
                          const chapPercent = chapTotalQuestions > 0 ? Math.round((chapTotalSolved / chapTotalQuestions) * 100) : 0;

                          return (
                            <tr key={chap.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                              <td className="py-3 px-3.5">
                                <span className="font-bold text-slate-900 dark:text-white break-words whitespace-normal leading-snug block">
                                  {getPlainChapterName(chap.name)}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-center font-mono font-semibold text-slate-600 dark:text-slate-300">
                                {chapCompletedCases} / {chapTotalCases}
                              </td>
                              <td className="py-3 px-3 text-center font-mono font-semibold text-slate-600 dark:text-slate-300">
                                {chapSolvedCaseQs} / {chapTotalCaseQs}
                              </td>
                              <td className="py-3 px-3 text-center font-mono font-semibold text-slate-600 dark:text-slate-300">
                                {chapSolvedGenMCQs} / {chapTotalGenMCQs}
                              </td>
                              <td className="py-3 px-3 text-center font-mono">
                                <strong className="text-slate-900 dark:text-white font-bold">{chapTotalSolved}</strong>
                                <span className="text-slate-400"> / {chapTotalQuestions}</span>
                              </td>
                              <td className="py-3 px-3">
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500">
                                    <span>{chapPercent}%</span>
                                    <span>{chapTotalPending} left</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full transition-all ${chapPercent === 100 ? 'bg-emerald-500' : (activeSubject === 'setA' ? 'bg-blue-600' : 'bg-indigo-600')}`}
                                      style={{ width: `${chapPercent}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-3 text-center">
                                {chapPercent === 100 ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                                    <CheckCircle2 size={10} /> Completed
                                  </span>
                                ) : chapTotalSolved > 0 ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                    {chapTotalPending} Pending
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                    Not Started
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3.5 text-right">
                                <div className="inline-flex items-center gap-1.5 justify-end">
                                  <button
                                    onClick={() => {
                                      setSelectedRevisionChapterId(chap.id);
                                      setRevisionSubView('study');
                                      setActiveTab('revision');
                                    }}
                                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 inline-flex items-center gap-1 transition-all cursor-pointer"
                                    title={`Revise ${getPlainChapterName(chap.name)}`}
                                  >
                                    <span>Revise</span>
                                  </button>
                                  <button
                                    onClick={() => handleOpenPracticeForChapter(chap.id)}
                                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 inline-flex items-center gap-1 transition-all cursor-pointer"
                                    title={`Practice ${getPlainChapterName(chap.name)}`}
                                  >
                                    <span>Practice</span>
                                    <ChevronRight size={12} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE PRACTICE COMPANION */}
        {activeTab === 'practice' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 animate-tabEnter">
            {/* Left Column - Side Chapter & Case Selector (col-span-3) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white dark:bg-[#0c1228] rounded-2xl border border-slate-200 dark:border-[#1c243f] p-4 shadow-sm">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1">
                  <ClipboardList size={12} /> Select Chapter ({activeSubject === 'setA' ? 'Set A' : 'Set B'})
                </h3>
                <div className="space-y-1.5 flex flex-col max-h-[340px] overflow-y-auto scrollbar-thin">
                  {currentChapters.map(chap => (
                    <button
                      key={chap.id}
                      onClick={() => {
                        setSelectedChapterId(chap.id);
                        setCurrentGeneralIndex(0);
                        setSelectedGeneralOption(null);
                        setHasSubmittedGeneral(false);
                        const firstCase = currentCaseScenarios.find(cs => cs.chapterId === chap.id);
                        if (firstCase) {
                          setSelectedCaseId(firstCase.id);
                          setCurrentQuestionIndex(0);
                          setSelectedOption(null);
                          setHasSubmittedPractice(false);
                          setShowExplanation(false);
                        }
                      }}
                      className={`w-full text-left px-3 py-2.5 text-xs font-bold rounded-xl transition-all flex items-start justify-between gap-2 ${selectedChapterId === chap.id ? (activeSubject === 'setA' ? 'bg-blue-600 text-white shadow-md' : 'bg-indigo-600 text-white shadow-md') : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                      <span className="break-words whitespace-normal leading-snug flex-1">{getPlainChapterName(chap.name)}</span>
                      <ChevronRight size={14} className={`flex-shrink-0 mt-0.5 ${selectedChapterId === chap.id ? 'text-white' : 'text-slate-400'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-tab selection: Cases vs General vs Saved */}
              <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-1 shadow-2xs">
                <button
                  onClick={() => setPracticeSubTab('cases')}
                  className={`py-2 px-2 text-center text-[11px] sm:text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${practiceSubTab === 'cases' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300/40 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                >
                  <FileText size={12} />
                  <span>Cases</span>
                </button>
                <button
                  onClick={() => setPracticeSubTab('general')}
                  className={`py-2 px-2 text-center text-[11px] sm:text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${practiceSubTab === 'general' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300/40 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                >
                  <HelpCircle size={12} />
                  <span>MCQs</span>
                </button>
                <button
                  onClick={() => setPracticeSubTab('saved')}
                  className={`py-2 px-2 text-center text-[11px] sm:text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${practiceSubTab === 'saved' ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-slate-300/40 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                  title="View Saved / Flagged Questions"
                >
                  <Bookmark size={12} className={practiceSubTab === 'saved' || activeSubjectBookmarksCount > 0 ? "text-amber-500 fill-amber-500" : ""} />
                  <span>Saved ({activeSubjectBookmarksCount})</span>
                </button>
              </div>

              {/* Dynamic sidebar content based on sub-tab */}
              {practiceSubTab === 'cases' ? (
                <div className="bg-white dark:bg-[#0c1228] rounded-2xl border border-slate-200 dark:border-[#1c243f] p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                      Cases in Chapter
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {currentCaseScenarios.filter(cs => cs.chapterId === selectedChapterId).length} Available
                    </span>
                  </div>
                  <div className="space-y-2 overflow-y-auto max-h-[360px] pr-1 scrollbar-thin">
                    {currentCaseScenarios.filter(cs => cs.chapterId === selectedChapterId).map(cs => (
                      <button
                        key={cs.id}
                        onClick={() => {
                          setSelectedCaseId(cs.id);
                          setCurrentQuestionIndex(0);
                          setSelectedOption(null);
                          setHasSubmittedPractice(false);
                          setShowExplanation(false);
                        }}
                        className={`w-full text-left p-3 text-xs rounded-xl border transition-all ${selectedCaseId === cs.id ? (activeSubject === 'setA' ? 'border-blue-500 bg-blue-500/10 text-blue-900 dark:text-blue-300 font-bold' : 'border-emerald-400 bg-emerald-500/10 text-emerald-950 font-bold') : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium'}`}
                      >
                        <span className="break-words whitespace-normal leading-snug">{cs.title}</span>
                      </button>
                    ))}
                    {currentCaseScenarios.filter(cs => cs.chapterId === selectedChapterId).length === 0 && (
                      <p className="text-xs text-slate-400 italic text-center py-4">No cases in this chapter.</p>
                    )}
                  </div>
                </div>
              ) : practiceSubTab === 'general' ? (
                <div className="bg-white dark:bg-[#0c1228] rounded-2xl border border-slate-200 dark:border-[#1c243f] p-4 shadow-sm space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                        Filter by Topic
                      </span>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 font-mono">
                        {chapterTopics.length} Topics
                      </span>
                    </div>
                    <select
                      value={effectiveGeneralTopic}
                      onChange={(e) => {
                        setSelectedGeneralTopic(e.target.value);
                        setCurrentGeneralIndex(0);
                        setSelectedGeneralOption(null);
                        setHasSubmittedGeneral(false);
                      }}
                      className="w-full text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ALL">All Topics in Chapter ({allChapterMCQs.length} MCQs)</option>
                      {chapterTopics.map((topic) => {
                        const topicCount = allChapterMCQs.filter(q => q.topic === topic).length;
                        return (
                          <option key={topic} value={topic}>
                            {topic} ({topicCount})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                        Questions ({chapterMCQs.length})
                      </h3>
                      {effectiveGeneralTopic !== 'ALL' && (
                        <button
                          onClick={() => {
                            setSelectedGeneralTopic('ALL');
                            setCurrentGeneralIndex(0);
                            setSelectedGeneralOption(null);
                            setHasSubmittedGeneral(false);
                          }}
                          className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Show All
                        </button>
                      )}
                    </div>
                    <div className="space-y-1.5 overflow-y-auto max-h-[320px] scrollbar-thin">
                      {chapterMCQs.map((q, idx) => {
                        const qProg = practiceProgress[`general-${q.id}`];
                        return (
                          <button
                            key={q.id}
                            onClick={() => {
                              setCurrentGeneralIndex(idx);
                              setSelectedGeneralOption(null);
                              setHasSubmittedGeneral(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs rounded-xl border transition-all flex items-start justify-between gap-2 ${currentGeneralIndex === idx ? (activeSubject === 'setA' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-300 font-bold' : 'border-indigo-455 bg-indigo-50 text-indigo-950 font-bold') : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium'}`}
                          >
                            <span className="break-words whitespace-normal leading-snug flex-1">Q {idx + 1}: {q.topic}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ml-1 flex-shrink-0 mt-0.5 ${qProg?.answered ? (qProg.correct ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300') : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                              {qProg?.answered ? (qProg.correct ? '✓' : '✗') : 'MCQ'}
                            </span>
                          </button>
                        );
                      })}
                      {chapterMCQs.length === 0 && (
                        <p className="text-xs text-slate-400 italic text-center py-4">No general questions in this chapter.</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-[#0c1228] rounded-2xl border border-slate-200 dark:border-[#1c243f] p-4 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                      <Bookmark size={13} className="text-amber-500 fill-amber-500" />
                      <span>Saved Vault</span>
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-mono">
                      {activeSubjectBookmarksCount} Flagged
                    </span>
                  </div>

                  {/* Filter by Type */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Filter size={11} /> Source Filter
                    </span>
                    <div className="grid grid-cols-1 gap-1">
                      <button
                        onClick={() => setSavedFilterType('all')}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                          savedFilterType === 'all'
                            ? (activeSubject === 'setA' ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white')
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>All Saved MCQs</span>
                        <span className="font-mono text-[10px] opacity-80">{activeSubjectBookmarks.length}</span>
                      </button>
                      <button
                        onClick={() => setSavedFilterType('case')}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                          savedFilterType === 'case'
                            ? (activeSubject === 'setA' ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white')
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>From Case Scenarios</span>
                        <span className="font-mono text-[10px] opacity-80">{activeSubjectBookmarks.filter(b => b.type === 'case').length}</span>
                      </button>
                      <button
                        onClick={() => setSavedFilterType('general')}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                          savedFilterType === 'general'
                            ? (activeSubject === 'setA' ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white')
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>From Standalone MCQs</span>
                        <span className="font-mono text-[10px] opacity-80">{activeSubjectBookmarks.filter(b => b.type === 'general').length}</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter by Status */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Clock size={11} /> Status Filter
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        onClick={() => setSavedFilterStatus('all')}
                        className={`py-1.5 text-center rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          savedFilterStatus === 'all'
                            ? 'bg-slate-900 text-white dark:bg-slate-700'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSavedFilterStatus('solved')}
                        className={`py-1.5 text-center rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          savedFilterStatus === 'solved'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                        }`}
                      >
                        Solved
                      </button>
                      <button
                        onClick={() => setSavedFilterStatus('pending')}
                        className={`py-1.5 text-center rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          savedFilterStatus === 'pending'
                            ? 'bg-amber-600 text-white'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100'
                        }`}
                      >
                        Pending
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    <p className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      <Info size={11} /> Pro Revision Tip
                    </p>
                    Save complex numericals and legal exceptions here to drill repeatedly before your exam.
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Split Case Reading and Question Answering / General MCQs / Saved Questions (col-span-9) */}
            <div className={practiceSubTab === 'saved' ? "lg:col-span-9 space-y-4 min-h-[500px]" : "lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px]"}>
              {practiceSubTab === 'saved' ? (
                <div className="space-y-4">
                  {/* Top Control Bar: Search and Quick Stats */}
                  <div className="bg-white dark:bg-[#0c1228] rounded-2xl border border-slate-200 dark:border-[#1c243f] p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                        <Search size={15} />
                      </span>
                      <input
                        type="text"
                        value={savedSearchQuery}
                        onChange={(e) => setSavedSearchQuery(e.target.value)}
                        placeholder="Search saved questions, legal sections, terms, case names..."
                        className="w-full pl-9 pr-12 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                      />
                      {savedSearchQuery && (
                        <button
                          onClick={() => setSavedSearchQuery("")}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 text-xs font-bold"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                        {
                          activeSubjectBookmarks.filter(item => {
                            if (savedFilterType !== 'all' && item.type !== savedFilterType) return false;
                            const isAns = !!practiceProgress[item.id]?.answered;
                            if (savedFilterStatus === 'solved' && !isAns) return false;
                            if (savedFilterStatus === 'pending' && isAns) return false;
                            if (savedSearchQuery.trim()) {
                              const q = savedSearchQuery.toLowerCase();
                              const matchText = (item.questionText || "").toLowerCase().includes(q);
                              const matchExp = (item.explanation || "").toLowerCase().includes(q);
                              const matchChap = (item.chapterName || "").toLowerCase().includes(q);
                              const matchCase = (item.caseTitle || "").toLowerCase().includes(q);
                              if (!matchText && !matchExp && !matchChap && !matchCase) return false;
                            }
                            return true;
                          }).length
                        } of {activeSubjectBookmarksCount} Saved
                      </span>
                    </div>
                  </div>

                  {/* List of Saved Questions */}
                  {(() => {
                    const filteredSaved = activeSubjectBookmarks.filter(item => {
                      if (savedFilterType !== 'all' && item.type !== savedFilterType) return false;
                      const isAns = !!practiceProgress[item.id]?.answered;
                      if (savedFilterStatus === 'solved' && !isAns) return false;
                      if (savedFilterStatus === 'pending' && isAns) return false;
                      if (savedSearchQuery.trim()) {
                        const q = savedSearchQuery.toLowerCase();
                        const matchText = (item.questionText || "").toLowerCase().includes(q);
                        const matchExp = (item.explanation || "").toLowerCase().includes(q);
                        const matchChap = (item.chapterName || "").toLowerCase().includes(q);
                        const matchCase = (item.caseTitle || "").toLowerCase().includes(q);
                        if (!matchText && !matchExp && !matchChap && !matchCase) return false;
                      }
                      return true;
                    });

                    if (filteredSaved.length === 0) {
                      return (
                        <div className="bg-white dark:bg-[#0c1228] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center space-y-4 shadow-sm">
                          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center border border-amber-200/50">
                            <Bookmark size={28} />
                          </div>
                          <div className="max-w-md mx-auto space-y-1.5">
                            <h3 className="text-base font-bold text-slate-800 dark:text-white">
                              {activeSubjectBookmarksCount === 0
                                ? `No Saved Questions in ${activeSubject === 'setA' ? 'Set A (Law)' : 'Set B (SCMPE)'} Yet`
                                : "No Bookmarked Questions Match Your Filter"}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                              {activeSubjectBookmarksCount === 0
                                ? "While solving Case Studies or General MCQs in the Practice tab, click the 'Save MCQ' (Bookmark) icon on any question to add it to your high-yield revision vault."
                                : "Try clearing your search query or switching your source/status filters in the sidebar."}
                            </p>
                          </div>
                          <div className="flex items-center justify-center gap-3 pt-2">
                            <button
                              onClick={() => setPracticeSubTab('cases')}
                              className="px-4 py-2 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer"
                            >
                              Explore Case Studies
                            </button>
                            <button
                              onClick={() => setPracticeSubTab('general')}
                              className="px-4 py-2 rounded-xl text-xs font-extrabold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
                            >
                              Practice General MCQs
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-4">
                        {filteredSaved.map((item, idx) => {
                          const prog = practiceProgress[item.id];
                          const isExpanded = expandedBookmarkKey === item.id;
                          return (
                            <div
                              key={item.id}
                              className="bg-white dark:bg-[#0c1228] rounded-2xl border border-slate-200 dark:border-[#1c243f] p-5 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                            >
                              {/* Card Header with Fully Wrapped Chapter and Case Names */}
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                                <div className="space-y-1.5 flex-1 pr-2">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40">
                                      {activeSubject === 'setA' ? `CH ${item.chapterId - 100}` : `PART ${item.chapterId}`}
                                    </span>
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                      {item.type === 'case' ? 'Case Study MCQ' : 'Standalone Practice MCQ'}
                                    </span>

                                    {/* Resolution Status Pill */}
                                    {prog?.answered ? (
                                      prog.correct ? (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                                          <CheckCircle2 size={11} className="text-emerald-600" /> Solved Correct
                                        </span>
                                      ) : (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 flex items-center gap-1">
                                          <XCircle size={11} className="text-rose-600" /> Solved Incorrect
                                        </span>
                                      )
                                    ) : (
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center gap-1">
                                        <Clock size={11} className="text-amber-600" /> Pending Resolution
                                      </span>
                                    )}
                                  </div>

                                  {/* Completely Visible Wrapped Chapter & Case Study Names */}
                                  <div className="space-y-0.5 pt-1">
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 break-words whitespace-normal leading-snug">
                                      {item.chapterName}
                                    </h4>
                                    {item.caseTitle && (
                                      <p className="text-[11px] text-slate-500 dark:text-slate-400 break-words whitespace-normal leading-snug font-medium">
                                        <span className="font-bold text-indigo-600 dark:text-indigo-400">Case Study:</span> {item.caseTitle}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 self-end sm:self-start flex-shrink-0 pt-1">
                                  {/* Launch into context button */}
                                  <button
                                    onClick={() => {
                                      setSelectedChapterId(item.chapterId);
                                      if (item.type === 'case' && item.caseId) {
                                        setSelectedCaseId(item.caseId);
                                        const cs = currentCaseScenarios.find(c => c.id === item.caseId);
                                        if (cs) {
                                          const qIdx = cs.questions.findIndex(q => q.id === item.questionId);
                                          setCurrentQuestionIndex(qIdx >= 0 ? qIdx : 0);
                                        }
                                        setPracticeSubTab('cases');
                                      } else {
                                        const qIdx = currentGeneralMCQs
                                          .filter(q => q.chapterId === item.chapterId)
                                          .findIndex(q => q.id === item.questionId);
                                        setCurrentGeneralIndex(qIdx >= 0 ? qIdx : 0);
                                        setPracticeSubTab('general');
                                      }
                                      setSelectedOption(null);
                                      setSelectedGeneralOption(null);
                                      setHasSubmittedPractice(false);
                                      setHasSubmittedGeneral(false);
                                    }}
                                    className="px-2.5 py-1 rounded-lg text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30 flex items-center gap-1 transition-all cursor-pointer border border-blue-200/60 dark:border-blue-900/40"
                                    title="Open and practice in full testing environment"
                                  >
                                    <span>Practice in Context</span>
                                    <ChevronRight size={13} />
                                  </button>

                                  {/* Remove Bookmark button */}
                                  <button
                                    onClick={() => toggleBookmarkQuestion(item)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer border border-transparent hover:border-rose-200"
                                    title="Remove this bookmark"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>

                              {/* Question Text with Clean Spacing & Full Text Wrap */}
                              <div className="space-y-3">
                                <div className="flex items-start gap-2.5">
                                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                                    {idx + 1}
                                  </span>
                                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed break-words whitespace-normal">
                                    {item.questionText}
                                  </p>
                                </div>

                                {/* Options 2-column or list */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-7">
                                  {(Object.keys(item.options) as Array<'A' | 'B' | 'C' | 'D'>).map(opt => {
                                    const isCorrectOpt = opt === item.correctOption;
                                    const isUserSelected = prog?.selectedOption === opt;
                                    let optClass = "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300";
                                    
                                    if (isExpanded || prog?.answered) {
                                      if (isCorrectOpt) {
                                        optClass = "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500/30";
                                      } else if (isUserSelected && !isCorrectOpt) {
                                        optClass = "border-rose-400 bg-rose-50/70 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 line-through opacity-75";
                                      }
                                    }

                                    return (
                                      <div
                                        key={opt}
                                        className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 transition-all ${optClass}`}
                                      >
                                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                                          (isExpanded || prog?.answered) && isCorrectOpt
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                        }`}>
                                          {opt}
                                        </span>
                                        <span className="leading-tight flex-1 break-words whitespace-normal">{item.options[opt]}</span>
                                        {(isExpanded || prog?.answered) && isCorrectOpt && (
                                          <Check size={13} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Toggle Explanation Accordion */}
                              <div className="pt-1 pl-7">
                                <button
                                  onClick={() => setExpandedBookmarkKey(isExpanded ? null : item.id)}
                                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Lightbulb size={13} />
                                  <span>{isExpanded ? "Hide Solution Breakdown & Traps" : "Reveal Statutory Solution Breakdown & Pitfalls"}</span>
                                </button>

                                {isExpanded && (
                                  <div className="mt-3 space-y-2.5 animate-fadeIn">
                                    <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 rounded-xl p-3.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line break-words">
                                      <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-black text-[11px] uppercase tracking-wider mb-1.5">
                                        <CheckCircle2 size={12} /> Correct Option {item.correctOption} — Statutory Basis & Reasoning
                                      </div>
                                      <HighlightedText text={item.explanation} boldPrefix={false} />
                                    </div>

                                    {item.examinerWarning && (
                                      <div className="bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-900/40 rounded-xl p-3 text-xs text-rose-800 dark:text-rose-300 leading-relaxed break-words">
                                        <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-black text-[10px] uppercase tracking-wider mb-1">
                                          <AlertTriangle size={12} /> Examiner's Warning & Pitfalls
                                        </div>
                                        <HighlightedText text={item.examinerWarning} boldPrefix={false} />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              ) : practiceSubTab === 'cases' ? (
                selectedCase ? (
                <>
                  {/* Column 1: Case Detail Reading */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col min-h-[360px] max-h-[540px] md:max-h-none md:h-[650px]">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-4">
                      <div className="flex-1 pr-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                          Reference Case scenario
                        </span>
                        <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1 break-words whitespace-normal leading-snug" title={selectedCase.title}>
                          {selectedCase.title}
                        </h2>
                      </div>
                      
                      {/* Active Actions: Sticky Note Toggle & Study PDF Export */}
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-4">
                        <button
                          onClick={() => setShowGlobalNotepad(prev => !prev)}
                          className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all ${
                            showGlobalNotepad 
                              ? 'bg-emerald-50 border-emerald-250 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-400' 
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
                          }`}
                          title={showGlobalNotepad ? "Hide Persistent Study Notepad" : "Show Persistent Study Notepad"}
                        >
                          <StickyNote size={14} />
                          <span className="hidden sm:inline">{showGlobalNotepad ? "Hide Notepad" : "Open Notepad"}</span>
                        </button>
                        
                        <button
                          onClick={() => exportCaseToPDF(selectedCase)}
                          className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-700 hover:border-indigo-800 flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm active:scale-98"
                          title="Export Case Scenario & Notes as PDF"
                        >
                          <Download size={14} />
                          <span className="hidden sm:inline">Export PDF</span>
                        </button>
                      </div>
                    </div>
                    {/* Scenario Text */}
                    <div className="flex-1 overflow-y-auto text-slate-600 text-sm leading-relaxed whitespace-pre-line pr-2 scrollbar-thin">
                      <HighlightedText text={selectedCase.scenarioText} boldPrefix={false} />
                    </div>
              
                    {/* Case Navigation Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs mt-3 select-none">
                      <button
                        disabled={currentCaseIdx <= 0}
                        onClick={() => {
                          if (currentCaseIdx > 0) {
                            const prevCase = currentCaseScenarios[currentCaseIdx - 1];
                            setSelectedChapterId(prevCase.chapterId);
                            setSelectedCaseId(prevCase.id);
                            setCurrentQuestionIndex(0);
                            setSelectedOption(null);
                            setHasSubmittedPractice(false);
                            setShowExplanation(false);
                          }
                        }}
                        className={`px-3 py-2 rounded-xl font-extrabold flex items-center gap-1 transition-all ${currentCaseIdx <= 0 ? 'text-slate-300 bg-slate-50 cursor-not-allowed border border-slate-100' : (activeSubject === 'setA' ? 'text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 active:scale-98' : 'text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 active:scale-98')}`}
                        title="Go to Previous Case Study"
                      >
                        <ChevronLeft size={14} /> Prev Case
                      </button>
                      
                      <span className="text-slate-400 font-extrabold font-mono text-[10px] text-center hidden sm:inline">
                        CASE {currentCaseIdx + 1} OF {currentCaseScenarios.length}
                      </span>
                      
                      <button
                        disabled={currentCaseIdx >= currentCaseScenarios.length - 1 || currentCaseIdx === -1}
                        onClick={() => {
                          if (currentCaseIdx !== -1 && currentCaseIdx < currentCaseScenarios.length - 1) {
                            const nextCase = currentCaseScenarios[currentCaseIdx + 1];
                            setSelectedChapterId(nextCase.chapterId);
                            setSelectedCaseId(nextCase.id);
                            setCurrentQuestionIndex(0);
                            setSelectedOption(null);
                            setHasSubmittedPractice(false);
                            setShowExplanation(false);
                          }
                        }}
                        className={`px-3 py-2 rounded-xl font-extrabold flex items-center gap-1 transition-all ${currentCaseIdx >= currentCaseScenarios.length - 1 || currentCaseIdx === -1 ? 'text-slate-300 bg-slate-50 cursor-not-allowed border border-slate-100' : (activeSubject === 'setA' ? 'text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 active:scale-98' : 'text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 active:scale-98')}`}
                        title="Go to Next Case Study"
                      >
                        Next Case <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Column 2: Question & Options Answer */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col min-h-[380px] md:h-[650px]">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                      <div className="flex items-center gap-1">
                        <button
                          disabled={currentQuestionIndex === 0}
                          onClick={() => {
                            setCurrentQuestionIndex(prev => prev - 1);
                            setSelectedOption(null);
                            setHasSubmittedPractice(false);
                            setShowExplanation(false);
                          }}
                          className={`p-1.5 rounded-lg transition-all ${currentQuestionIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600 active:scale-95'}`}
                          title="Previous Question"
                        >
                          <ChevronLeft size={15} />
                        </button>
                        <span className="text-xs font-extrabold text-slate-500 capitalize bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                          Q {currentQuestionIndex + 1} / {selectedCase.questions.length}
                        </span>
                        <button
                          disabled={currentQuestionIndex === selectedCase.questions.length - 1}
                          onClick={() => {
                            setCurrentQuestionIndex(prev => prev + 1);
                            setSelectedOption(null);
                            setHasSubmittedPractice(false);
                            setShowExplanation(false);
                          }}
                          className={`p-1.5 rounded-lg transition-all ${currentQuestionIndex === selectedCase.questions.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600 active:scale-95'}`}
                          title="Next Question"
                        >
                          <ChevronRight size={15} />
                        </button>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="flex gap-1 items-center">
                          {selectedCase.questions.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setCurrentQuestionIndex(idx);
                                setSelectedOption(null);
                                setHasSubmittedPractice(false);
                                setShowExplanation(false);
                              }}
                              className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${currentQuestionIndex === idx ? 'bg-indigo-600 text-white shadow font-extrabold scale-110' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800'}`}
                              title={`Go to Question ${idx + 1}`}
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>

                        {currentQuestion && (
                          <button
                            onClick={() => {
                              const qKey = `${selectedCase.id}-${currentQuestion.id}`;
                              toggleBookmarkQuestion({
                                key: qKey,
                                subject: activeSubject,
                                type: 'case',
                                chapterId: selectedCase.chapterId,
                                chapterName: currentChapters.find(c => c.id === selectedCase.chapterId)?.name || `Chapter ${selectedCase.chapterId}`,
                                caseId: selectedCase.id,
                                caseTitle: selectedCase.title,
                                questionId: currentQuestion.id,
                                questionText: currentQuestion.questionText,
                                options: currentQuestion.options,
                                correctOption: currentQuestion.correctOption,
                                explanation: currentQuestion.explanation,
                                examinerWarning: currentQuestion.examinerWarning
                              });
                            }}
                            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                              isQuestionBookmarked(`${selectedCase.id}-${currentQuestion.id}`)
                                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50/50'
                            }`}
                            title={isQuestionBookmarked(`${selectedCase.id}-${currentQuestion.id}`) ? "Remove Bookmark" : "Save this Question for Later Revision"}
                          >
                            <Bookmark size={13} className={isQuestionBookmarked(`${selectedCase.id}-${currentQuestion.id}`) ? "fill-white" : ""} />
                            <span className="hidden sm:inline font-mono text-[11px]">{isQuestionBookmarked(`${selectedCase.id}-${currentQuestion.id}`) ? "Saved" : "Save MCQ"}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {currentQuestion ? (
                      <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-1">
                        <div className="space-y-4">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug break-words whitespace-normal">
                            {currentQuestion.questionText}
                          </h3>

                          {/* Options */}
                          <div className="space-y-2.5 pt-2">
                            {(Object.keys(currentQuestion.options) as Array<'A' | 'B' | 'C' | 'D'>).map(opt => {
                              const isSelected = selectedOption === opt;
                              const isCorrect = opt === currentQuestion.correctOption;
                              
                              let buttonClass = "border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/60 hover:border-blue-400 dark:hover:border-blue-500/70 hover:bg-slate-50/90 dark:hover:bg-slate-800/70 text-slate-800 dark:text-slate-200 shadow-2xs";
                              let iconEl = (
                                <div className="w-6 h-6 rounded-lg border border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs font-black text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 shrink-0 transition-colors">
                                  {opt}
                                </div>
                              );

                              if (isSelected) {
                                buttonClass = "border-indigo-500 dark:border-indigo-400 bg-indigo-50/90 dark:bg-indigo-950/50 font-semibold text-indigo-950 dark:text-indigo-200 ring-2 ring-indigo-500/15";
                                iconEl = (
                                  <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                                    {opt}
                                  </div>
                                );
                              }

                              if (hasSubmittedPractice) {
                                if (isCorrect) {
                                  buttonClass = "border-emerald-500 dark:border-emerald-400 bg-emerald-50/90 dark:bg-emerald-950/45 text-emerald-950 dark:text-emerald-200 font-semibold ring-2 ring-emerald-500/15";
                                  iconEl = <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950 shrink-0" size={22} />;
                                } else if (isSelected) {
                                  buttonClass = "border-rose-500 dark:border-rose-400 bg-rose-50/90 dark:bg-rose-950/45 text-rose-950 dark:text-rose-200 font-semibold ring-2 ring-rose-500/15";
                                  iconEl = <XCircle className="text-rose-600 dark:text-rose-400 fill-rose-100 dark:fill-rose-950 shrink-0" size={22} />;
                                } else {
                                  buttonClass = "border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-500 opacity-60";
                                }
                              }

                              return (
                                <button
                                  key={opt}
                                  disabled={hasSubmittedPractice}
                                  onClick={() => handleOptionSelect(opt)}
                                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${buttonClass}`}
                                >
                                  {iconEl}
                                  <span className="flex-1 pt-0.5 leading-relaxed">{currentQuestion.options[opt]}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Action buttons or Explanation */}
                        <div className="pt-6 border-t border-slate-100 mt-6 space-y-4">
                          {!hasSubmittedPractice ? (
                            <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl p-3.5 text-center text-xs font-bold flex items-center justify-center gap-2">
                              <Info size={14} className="text-indigo-500 animate-bounce" /> Select any option above to instantly submit and validate.
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {/* Explanation accordian box */}
                              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-inner">
                                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
                                  <Lightbulb size={14} /> Calculation & Concept Breakdown
                                </div>
                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                                  <HighlightedText text={currentQuestion.explanation} boldPrefix={false} />
                                </p>
                              </div>

                              {currentQuestion.examinerWarning && (
                                <div className="bg-rose-50 rounded-xl p-4 border border-rose-200 shadow-sm animate-fadeIn">
                                  <div className="flex items-center gap-2 text-rose-700 font-black text-xs uppercase tracking-wider mb-1.5 font-mono">
                                    <AlertTriangle size={14} className="text-rose-600" /> Examiner's Warning & Pitfalls
                                  </div>
                                  <p className="text-xs text-rose-800 leading-relaxed font-semibold font-sans">
                                    <HighlightedText text={currentQuestion.examinerWarning} boldPrefix={false} />
                                  </p>
                                </div>
                              )}

                              <div className="flex w-full">
                                {currentQuestionIndex < selectedCase.questions.length - 1 ? (
                                  <button
                                    onClick={() => {
                                      setCurrentQuestionIndex(prev => prev + 1);
                                      setSelectedOption(null);
                                      setHasSubmittedPractice(false);
                                      setShowExplanation(false);
                                    }}
                                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow transition-all active:scale-98"
                                  >
                                    Next Question <ChevronRight size={14} />
                                  </button>
                                ) : (
                                  <div className="w-full bg-teal-50 text-teal-800 p-3 rounded-xl border border-teal-200 text-center font-bold text-xs flex items-center justify-center gap-1 select-none animate-bounce">
                                    🎉 Case Solved Perfectly!
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : (
                <div className="col-span-12 text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                  <BookOpen size={48} className="mx-auto text-slate-400 mb-3" />
                  <p className="text-slate-500 font-bold">Please select a case study to practice.</p>
                </div>
              )) : (
                <>
                  {/* General MCQ Split: Concept review on the left, Questions on the right */}
                  {/* Left Column: Chapter Review Summary Notes */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col min-h-[360px] max-h-[540px] md:max-h-none md:h-[650px]">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-4">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4f46e5] bg-indigo-50 px-2.5 py-1 rounded">
                          Chapter Concept Review
                        </span>
                        <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1 break-words whitespace-normal leading-snug" title={getPlainChapterName(selectedChapterObj?.name)}>
                          {getPlainChapterName(selectedChapterObj?.name) || "Concept Review"}
                        </h2>
                      </div>
                    </div>
                    {/* Notes List */}
                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin space-y-4">
                      {selectedChapterObj?.summaryNotes && selectedChapterObj.summaryNotes.length > 0 ? (
                        selectedChapterObj.summaryNotes.map((section, sIdx) => (
                          <div key={sIdx} className="bg-slate-50/55 rounded-xl p-4 border border-slate-100">
                            <h4 className="text-xs font-black uppercase tracking-wider text-indigo-950 mb-2.5 flex items-center gap-1.5">
                              <span className="w-1.5 h-3 bg-indigo-600 rounded-sm inline-block"></span>
                              {section.title}
                            </h4>
                            <ul className="space-y-1.5">
                              {section.bullets.map((b, bIdx) => (
                                <li key={bIdx} className="text-xs text-slate-600 leading-relaxed pl-3 border-l border-slate-200 font-medium font-sans break-words whitespace-normal">
                                  <HighlightedText text={b} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic text-center py-10">No summary notes available for this chapter.</p>
                      )}
                    </div>
                  </div>

                  {/* Right Column: General MCQ Question & Options Answer */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col min-h-[380px] md:h-[650px]">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                      <div className="flex items-center gap-1 border-r border-slate-100 pr-3 mr-1 flex-shrink-0">
                        <button
                          disabled={currentGeneralIndex === 0}
                          onClick={() => {
                            setCurrentGeneralIndex(prev => prev - 1);
                            setSelectedGeneralOption(null);
                            setHasSubmittedGeneral(false);
                          }}
                          className={`p-1 rounded-lg transition-all ${currentGeneralIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600 active:scale-95'}`}
                          title="Previous Question"
                        >
                          <ChevronLeft size={15} />
                        </button>
                        <span className="text-[10px] font-extrabold text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded whitespace-nowrap">
                          G-MCQ {currentGeneralIndex + 1} / {chapterMCQs.length}
                        </span>
                        <button
                          disabled={currentGeneralIndex === chapterMCQs.length - 1}
                          onClick={() => {
                            setCurrentGeneralIndex(prev => prev + 1);
                            setSelectedGeneralOption(null);
                            setHasSubmittedGeneral(false);
                          }}
                          className={`p-1 rounded-lg transition-all ${currentGeneralIndex === chapterMCQs.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600 active:scale-95'}`}
                          title="Next Question"
                        >
                          <ChevronRight size={15} />
                        </button>
                      </div>

                      {/* Difficulty, Topic Badge, and Bookmark Button in Right Corner */}
                      {currentMCQ && (
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          <span className="text-[9px] uppercase font-mono font-bold bg-slate-100 border border-slate-200/50 text-slate-750 px-1.5 py-0.5 rounded break-words" title={currentMCQ.topic}>
                            {currentMCQ.topic}
                          </span>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded whitespace-nowrap ${
                            currentMCQ.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                            currentMCQ.difficulty === 'Moderate' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                            'bg-rose-50 text-rose-700 border border-rose-100'
                          }`}>
                            {currentMCQ.difficulty}
                          </span>
                          <button
                            onClick={() => {
                              const qKey = `general-${currentMCQ.id}`;
                              toggleBookmarkQuestion({
                                key: qKey,
                                subject: activeSubject,
                                type: 'general',
                                chapterId: currentMCQ.chapterId,
                                chapterName: currentChapters.find(c => c.id === currentMCQ.chapterId)?.name || `Chapter ${currentMCQ.chapterId}`,
                                questionId: currentMCQ.id,
                                questionText: currentMCQ.questionText,
                                options: currentMCQ.options,
                                correctOption: currentMCQ.correctOption,
                                explanation: currentMCQ.explanation,
                                examinerWarning: currentMCQ.examinerWarning
                              });
                            }}
                            className={`p-1 sm:px-2 sm:py-0.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer border ${
                              isQuestionBookmarked(`general-${currentMCQ.id}`)
                                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50/50'
                            }`}
                            title={isQuestionBookmarked(`general-${currentMCQ.id}`) ? "Remove Bookmark" : "Save this Question for Later Revision"}
                          >
                            <Bookmark size={12} className={isQuestionBookmarked(`general-${currentMCQ.id}`) ? "fill-white" : ""} />
                            <span className="hidden sm:inline font-mono text-[10px]">{isQuestionBookmarked(`general-${currentMCQ.id}`) ? "Saved" : "Save MCQ"}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {currentMCQ ? (
                      <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-1 font-sans">
                        <div className="space-y-4">
                          <h3 className="text-base font-bold text-slate-900 leading-snug break-words whitespace-normal">
                            {currentMCQ.questionText}
                          </h3>

                          {/* Options */}
                          <div className="space-y-2.5 pt-2">
                            {(Object.keys(currentMCQ.options) as Array<'A' | 'B' | 'C' | 'D'>).map(opt => {
                              const isSelected = selectedGeneralOption === opt;
                              const isCorrect = opt === currentMCQ.correctOption;
                              
                              let buttonClass = "border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/60 hover:border-blue-400 dark:hover:border-blue-500/70 hover:bg-slate-50/90 dark:hover:bg-slate-800/70 text-slate-800 dark:text-slate-200 shadow-2xs";
                              let iconEl = (
                                <div className="w-6 h-6 rounded-lg border border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs font-black text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 shrink-0 transition-colors">
                                  {opt}
                                </div>
                              );

                              if (isSelected) {
                                buttonClass = "border-indigo-500 dark:border-indigo-400 bg-indigo-50/90 dark:bg-indigo-950/50 font-semibold text-indigo-950 dark:text-indigo-200 ring-2 ring-indigo-500/15";
                                iconEl = (
                                  <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                                    {opt}
                                  </div>
                                );
                              }

                              if (hasSubmittedGeneral) {
                                if (isCorrect) {
                                  buttonClass = "border-emerald-500 dark:border-emerald-400 bg-emerald-50/90 dark:bg-emerald-950/45 text-emerald-950 dark:text-emerald-200 font-semibold ring-2 ring-emerald-500/15";
                                  iconEl = <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950 shrink-0" size={22} />;
                                } else if (isSelected) {
                                  buttonClass = "border-rose-500 dark:border-rose-400 bg-rose-50/90 dark:bg-rose-950/45 text-rose-950 dark:text-rose-200 font-semibold ring-2 ring-rose-500/15";
                                  iconEl = <XCircle className="text-rose-600 dark:text-rose-400 fill-rose-100 dark:fill-rose-950 shrink-0" size={22} />;
                                } else {
                                  buttonClass = "border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-500 opacity-60";
                                }
                              }

                              return (
                                <button
                                  key={opt}
                                  disabled={hasSubmittedGeneral}
                                  onClick={() => handleGeneralOptionSelect(opt)}
                                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${buttonClass}`}
                                >
                                  {iconEl}
                                  <span className="flex-1 pt-0.5 leading-relaxed">{currentMCQ.options[opt]}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Action buttons or Explanation */}
                        <div className="pt-6 border-t border-slate-100 mt-6 space-y-4">
                          {!hasSubmittedGeneral ? (
                            <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl p-3.5 text-center text-xs font-bold flex items-center justify-center gap-2">
                              <Info size={14} className="text-indigo-500 animate-bounce" /> Select any option above to instantly submit and validate.
                            </div>
                          ) : (
                            <div className="space-y-4 font-sans">
                              {/* Explanation box */}
                              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-inner overflow-y-auto max-h-[160px] scrollbar-thin">
                                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
                                  <Lightbulb size={14} /> Correct Option {currentMCQ.correctOption} — Explanation
                                </div>
                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
                                  <HighlightedText text={currentMCQ.explanation} boldPrefix={false} />
                                </p>
                              </div>

                              {currentMCQ.examinerWarning && (
                                <div className="bg-rose-50 rounded-xl p-4 border border-rose-200 shadow-sm animate-fadeIn">
                                  <div className="flex items-center gap-2 text-rose-700 font-black text-xs uppercase tracking-wider mb-1.5 font-mono">
                                    <AlertTriangle size={14} className="text-rose-600" /> Examiner's Trap & Common Pitfalls
                                  </div>
                                  <p className="text-xs text-rose-800 leading-relaxed font-semibold font-sans">
                                    <HighlightedText text={currentMCQ.examinerWarning} boldPrefix={false} />
                                  </p>
                                </div>
                              )}

                              <div className="flex w-full">
                                {currentGeneralIndex < chapterMCQs.length - 1 ? (
                                  <button
                                    onClick={() => {
                                      setCurrentGeneralIndex(prev => prev + 1);
                                      setSelectedGeneralOption(null);
                                      setHasSubmittedGeneral(false);
                                    }}
                                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow transition-all active:scale-98"
                                  >
                                    Next Question <ChevronRight size={14} />
                                  </button>
                                ) : (
                                  <div className="w-full bg-teal-50 text-teal-850 p-3 rounded-xl border border-teal-200 text-center font-bold text-xs flex items-center justify-center gap-1 select-none animate-bounce">
                                    🎉 Chapter MCQ Deck Solved!
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col justify-center items-center text-slate-400">
                        <HelpCircle size={40} className="text-slate-300 mb-3" />
                        <p className="text-xs italic font-medium">No General MCQs loaded for this chapter yet.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Quick Reference Floating Widget */}
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 select-none">
              {showQuickRef && (
                <div 
                  className="w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-[460px] overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-right"
                  style={{ boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
                >
                  {/* Widget Header */}
                  <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 align-middle">
                        <Calculator size={15} className="text-emerald-400" />
                        <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 font-mono">
                          Formula Quick Ref
                        </h4>
                      </div>
                      <h3 className="text-[11px] font-semibold text-slate-300 leading-tight mt-1 truncate max-w-[240px]" title={getPlainChapterName(selectedChapterObj?.name)}>
                        {getPlainChapterName(selectedChapterObj?.name) || "Current Chapter"}
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowQuickRef(false)}
                      className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Hide Reference Widget"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="p-3 bg-slate-50 border-b border-slate-100 relative">
                    <div className="absolute left-6 top-5 text-slate-400">
                      <Search size={13} />
                    </div>
                    <input
                      type="text"
                      value={quickRefSearch}
                      onChange={(e) => setQuickRefSearch(e.target.value)}
                      placeholder="Search formulas or keywords..."
                      className="w-full pl-8 pr-8 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 font-sans"
                    />
                    {quickRefSearch && (
                      <button
                        onClick={() => setQuickRefSearch("")}
                        className="absolute right-6 top-4.5 text-slate-400 hover:text-slate-650 cursor-pointer"
                        title="Clear search query"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>

                  {/* Formulas List */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[280px] bg-white scrollbar-thin">
                    {(selectedChapterObj?.formulas || []).filter(f => {
                      const query = quickRefSearch.toLowerCase().trim();
                      if (!query) return true;
                      return (
                        f.name.toLowerCase().includes(query) ||
                        f.formula.toLowerCase().includes(query) ||
                        f.description.toLowerCase().includes(query)
                      );
                    }).length > 0 ? (
                      (selectedChapterObj?.formulas || []).filter(f => {
                        const query = quickRefSearch.toLowerCase().trim();
                        if (!query) return true;
                        return (
                          f.name.toLowerCase().includes(query) ||
                          f.formula.toLowerCase().includes(query) ||
                          f.description.toLowerCase().includes(query)
                        );
                      }).map((f, idx) => {
                        const isCopied = quickRefCopiedName === f.name;
                        return (
                          <div 
                            key={idx} 
                            className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl hover:bg-indigo-50/15 hover:border-indigo-100 transition-all group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs font-extrabold text-slate-800 leading-tight">
                                {f.name}
                              </span>
                              <button
                                onClick={() => {
                                  try {
                                    navigator.clipboard.writeText(f.formula);
                                    setQuickRefCopiedName(f.name);
                                    setTimeout(() => setQuickRefCopiedName(null), 2000);
                                  } catch (err) {
                                    console.error("Copy failed", err);
                                  }
                                }}
                                className={`p-1 rounded-md border transition-all cursor-pointer ${
                                  isCopied 
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600 opacity-100' 
                                    : 'bg-white border-slate-200 text-slate-400 hover:text-indigo-650 hover:border-indigo-150 shadow-2xs md:opacity-0 group-hover:opacity-100 focus:opacity-100'
                                }`}
                                title={isCopied ? "Copied!" : "Copy Formula to Clipboard"}
                              >
                                {isCopied ? <Check size={12} /> : <Copy size={12} />}
                              </button>
                            </div>

                            {/* Equation body */}
                            <div className="font-mono text-[10px] font-bold text-indigo-700 bg-indigo-50/40 p-2 rounded-lg border border-indigo-100/30 mt-1.5 select-all leading-normal">
                              {f.formula}
                            </div>

                            {/* Description */}
                            <p className="text-[11px] text-slate-500 mt-1.5 leading-normal font-medium">
                              {f.description}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 text-slate-400">
                        <Calculator size={24} className="mx-auto text-slate-300 mb-2" />
                        <p className="text-xs italic font-medium">No formulas found.</p>
                      </div>
                    )}
                  </div>

                  {/* Widget Footer */}
                  <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Formulas in Chapter: {(selectedChapterObj?.formulas || []).length}</span>
                    <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold text-[9px]">SCM SPE</span>
                  </div>
                </div>
              )}

              {/* Floating Action Button (FAB) */}
              <button
                onClick={() => setShowQuickRef(prev => !prev)}
                className={`py-3 px-4 rounded-full shadow-lg flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-black select-none border ${
                  showQuickRef 
                    ? 'bg-rose-600 border-rose-700 text-white hover:bg-rose-700 shadow-rose-200' 
                    : 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800 hover:shadow-indigo-100'
                }`}
                title={showQuickRef ? "Close Formulas Widget" : "Show Quick Reference Formulas"}
              >
                <Calculator size={15} className={`${showQuickRef ? 'animate-pulse' : ''}`} />
                <span>{showQuickRef ? "Close Formulas" : "Quick Reference"}</span>
              </button>
            </div>
          </div>
        )}

        {/* REVISION TAB: Revision Notes & Formula Revision Deck */}
        {activeTab === 'revision' && (
          <div className="space-y-5 flex-1 flex flex-col mb-6 animate-tabEnter">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#021027] via-[#091e3a] to-[#0f172a] text-white rounded-2xl border border-[#C9A84C]/35 p-5 sm:p-6 shadow-md relative overflow-hidden">
              <div className="absolute right-0 bottom-0 top-0 opacity-10 flex items-center pr-8 pointer-events-none">
                <Bookmark size={130} className="text-[#C9A84C]" />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/35 text-[#C9A84C] text-[10px] font-black uppercase tracking-widest">
                    <span>{activeSubject === 'setA' ? 'SPOM Set A : Corporate & Economic Laws' : 'SPOM Set B : Strategic Cost & Performance Management'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    {activeSubject === 'setA' ? 'Statutory Sections, Thresholds & Case Law Companion' : 'Formula, Concept & Strategic Framework Companion'}
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    High-yield revision notes, interactive 3D active-recall flashcards, and examiner trap warnings aligned with ICAI modules.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const targetChapId = selectedRevisionChapterId > 0 ? selectedRevisionChapterId : (currentChapters[0]?.id || (activeSubject === 'setA' ? 101 : 1));
                    handleOpenPracticeForChapter(targetChapId, 'cases');
                  }}
                  className="self-start sm:self-center px-4 py-2.5 text-xs font-black rounded-xl bg-[#C9A84C] hover:bg-[#d8b75c] text-slate-950 shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0"
                  title="Ready to solve problems? Switch to Practice Cases for this Set"
                >
                  <span>Practice Chapter Cases</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Sub-view Navigation Bar — Unified Segmented Pill Bar */}
            <div className="bg-white dark:bg-[#0c1228] p-1.5 rounded-2xl border border-slate-200 dark:border-[#1c243f] shadow-2xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                id="tab-concept-reader"
                onClick={() => setRevisionSubView('study')}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 font-sans whitespace-nowrap cursor-pointer ${
                  revisionSubView === 'study'
                    ? (activeSubject === 'setA' ? 'bg-blue-600 text-white shadow-sm' : 'bg-[#021027] dark:bg-indigo-600 text-white shadow-sm')
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                }`}
              >
                <BookOpen size={15} className={revisionSubView === 'study' ? 'text-[#C9A84C]' : 'text-slate-400'} />
                <span>Concept &amp; Formula Reader</span>
              </button>
              <button
                id="tab-formula-flashcards"
                onClick={() => {
                  setRevisionSubView('flashcards');
                  const keys = Object.keys(currentFormulaDetails);
                  if (keys.length > 0 && (!currentFlashcardKey || !currentFormulaDetails[currentFlashcardKey])) {
                    setCurrentFlashcardKey(keys[0]);
                  }
                  if (!quizTargetKey || !currentFormulaDetails[quizTargetKey]) {
                    handleGenerateQuizQuestion();
                  }
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 font-sans whitespace-nowrap cursor-pointer ${
                  revisionSubView === 'flashcards'
                    ? (activeSubject === 'setA' ? 'bg-blue-600 text-white shadow-sm' : 'bg-[#021027] dark:bg-indigo-600 text-white shadow-sm')
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                }`}
              >
                <Calculator size={15} className={revisionSubView === 'flashcards' ? 'text-[#C9A84C]' : 'text-slate-400'} />
                <span>{activeSubject === 'setA' ? 'Statutory Limit & Formula Flashcards' : 'Formula Flashcards & Quizzes'}</span>
              </button>
              <button
                id="tab-framework-flashcards"
                onClick={() => {
                  setRevisionSubView('frameworks');
                  setCurrentFrameworkCardIndex(0);
                  setIsFrameworkCardFlipped(false);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 font-sans whitespace-nowrap cursor-pointer ${
                  revisionSubView === 'frameworks'
                    ? (activeSubject === 'setA' ? 'bg-blue-600 text-white shadow-sm' : 'bg-[#021027] dark:bg-indigo-600 text-white shadow-sm')
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                }`}
              >
                <Award size={15} className="text-amber-500" />
                <span>{activeSubject === 'setA' ? 'Case Law & Statutory Precedents Deck' : 'Theoretical Frameworks Deck'}</span>
              </button>
            </div>

            {revisionSubView === 'study' ? (
              <>
                {/* Quick Indicators / Search Bar */}
                <div id="revision-search-bar-container" className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-4 items-center text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Bookmark size={12} className="text-indigo-600" /> {currentChapters.length} Chapters
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calculator size={12} className="text-emerald-600" /> Key Formulas & Thresholds
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Lightbulb size={12} className="text-amber-600" /> Detailed Concept Bullets
                    </span>
                  </div>

                  {/* Advanced Search Bar */}
                  <div className="w-full md:w-96 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Search size={16} />
                    </div>
                    <input
                      id="input-revision-search"
                      type="text"
                      placeholder="Query formulas or summary notes..."
                      value={revisionSearchQuery}
                      onChange={(e) => setRevisionSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-50/50"
                    />
                    {revisionSearchQuery && (
                      <button
                        onClick={() => setRevisionSearchQuery("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs font-semibold"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
                  
                  {/* Sidebar: Navigation tabs */}
                  <div className="lg:col-span-3 space-y-2 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm lg:sticky lg:top-4">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 pb-1 pt-2">Topics List</p>
                    
                    {/* 'All Chapters' Tab Toggle */}
                    <button
                      onClick={() => setSelectedRevisionChapterId(-1)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-semibold text-xs border flex items-center justify-between ${selectedRevisionChapterId === -1 ? 'bg-slate-900 border-slate-900 text-emerald-400 shadow-md' : 'bg-transparent hover:bg-slate-50 border-transparent text-slate-600 hover:text-slate-900'}`}
                    >
                      <span className="truncate">📋 View Continuous Revision Deck</span>
                      <ChevronRight size={14} className="opacity-60" />
                    </button>

                    {activeSubject === 'setA' && (
                      <div className="space-y-1.5 pt-1">
                        <button
                          onClick={() => setSelectedRevisionChapterId(-101)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-bold text-xs border flex items-center justify-between ${
                            selectedRevisionChapterId === -101
                              ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                              : 'bg-blue-50/60 hover:bg-blue-100/70 border-blue-200 text-blue-900'
                          }`}
                        >
                          <span className="truncate">⏱️ Set-A Time Limits Chart</span>
                          <ChevronRight size={14} className="opacity-70 shrink-0" />
                        </button>
                        <button
                          onClick={() => setSelectedRevisionChapterId(-102)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-bold text-xs border flex items-center justify-between ${
                            selectedRevisionChapterId === -102
                              ? 'bg-amber-600 border-amber-600 text-white shadow-sm'
                              : 'bg-amber-50/60 hover:bg-amber-100/70 border-amber-200 text-amber-900'
                          }`}
                        >
                          <span className="truncate">💰 Set-A Monetary Limits Chart</span>
                          <ChevronRight size={14} className="opacity-70 shrink-0" />
                        </button>
                      </div>
                    )}

                    <div className="border-t border-slate-100 my-2"></div>

                    {currentChapters.map((chap) => (
                      <button
                        key={chap.id}
                        onClick={() => setSelectedRevisionChapterId(chap.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-bold text-xs border ${selectedRevisionChapterId === chap.id ? (activeSubject === 'setA' ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-slate-900 dark:text-blue-300 shadow-sm font-extrabold' : 'bg-emerald-50 border-emerald-100 text-slate-900 shadow-sm font-extrabold') : 'bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900'}`}
                      >
                        <div className="flex items-start gap-2 justify-between">
                          <span className="break-words whitespace-normal leading-snug flex-1">{getPlainChapterName(chap.name)}</span>
                          {selectedRevisionChapterId === chap.id && (
                            <div className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${activeSubject === 'setA' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                          )}
                        </div>
                      </button>
                    ))}

                    <div className="border-t border-slate-100 dark:border-slate-800 my-2 pt-2">
                      <button
                        onClick={() => exportRevisionToPDF(currentChapters)}
                        className={`w-full text-center px-3 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all border shadow-sm flex items-center justify-center gap-1.5 cursor-pointer text-white ${
                          activeSubject === 'setA' 
                            ? 'border-blue-500 bg-blue-600 hover:bg-blue-700' 
                            : 'border-emerald-200 bg-emerald-500 hover:bg-emerald-600'
                        }`}
                        title="Download complete revision deck as PDF"
                      >
                        <Download size={13} className="animate-pulse" />
                        <span>Export All ({activeSubject === 'setA' ? 'Set A' : 'Set B'}) PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Workspace showing matching results or active chapter */}
                  <div className="lg:col-span-9 space-y-6">
                    {activeSubject === 'setA' && (selectedRevisionChapterId === -101 || selectedRevisionChapterId === -1) && (
                      <Suspense fallback={<div className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-900 animate-pulse" />}>
                        <SetATimeLimitsChart searchQuery={revisionSearchQuery} />
                      </Suspense>
                    )}

                    {activeSubject === 'setA' && (selectedRevisionChapterId === -102 || selectedRevisionChapterId === -1) && (
                      <Suspense fallback={<div className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-900 animate-pulse" />}>
                        <SetAMonetaryLimitsChart searchQuery={revisionSearchQuery} />
                      </Suspense>
                    )}

                    {/* Search Filtering Algorithm */}
                    {(() => {
                      if (activeSubject === 'setA' && (selectedRevisionChapterId === -101 || selectedRevisionChapterId === -102)) {
                        return null;
                      }

                      const queryTerm = revisionSearchQuery.toLowerCase().trim();
                      
                      // Filter Chapters
                      const matchData = currentChapters.map((chap) => {
                        // Check if chapter matches
                        const notesMatches = (chap.summaryNotes || []).filter(note => 
                          note.title.toLowerCase().includes(queryTerm) || 
                          note.bullets.some(b => b.toLowerCase().includes(queryTerm))
                        );

                        const formulaMatches = (chap.formulas || []).filter(f => 
                          f.name.toLowerCase().includes(queryTerm) || 
                          f.formula.toLowerCase().includes(queryTerm) || 
                          f.description.toLowerCase().includes(queryTerm)
                        );

                        const isChapterActive = selectedRevisionChapterId === -1 || selectedRevisionChapterId === chap.id;

                        const hasMatches = queryTerm ? (notesMatches.length > 0 || formulaMatches.length > 0 || chap.name.toLowerCase().includes(queryTerm)) : true;

                        return {
                          chap,
                          notesMatches: queryTerm ? notesMatches : (chap.summaryNotes || []),
                          formulaMatches: queryTerm ? formulaMatches : (chap.formulas || []),
                          isChapterActive,
                          hasMatches
                        };
                      }).filter(c => c.isChapterActive && c.hasMatches);

                      if (matchData.length === 0) {
                        return (
                          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                            <AlertCircle className="mx-auto text-slate-400 mb-2" size={40} />
                            <h4 className="font-bold text-slate-700">No matching summary notes or formulas found</h4>
                            <p className="text-xs text-slate-400 mt-1">Try query elements like "149", "230", "OEE", "Transfer Pricing", or select another chapter.</p>
                          </div>
                        );
                      }

                      return matchData.map(({ chap, notesMatches, formulaMatches }) => (
                        <div key={chap.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 animate-fadeIn">
                          
                          {/* Chapter Title */}
                          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-left">
                              <h3 className="font-black text-lg text-slate-900 leading-snug text-left">
                                {getPlainChapterName(chap.name)}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap self-start sm:self-center flex-shrink-0">
                              <button
                                onClick={() => handleOpenPracticeForChapter(chap.id, 'cases')}
                                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
                                title={`Practice Case Studies & MCQs for ${getPlainChapterName(chap.name)}`}
                              >
                                <span>Practice Cases</span>
                                <ArrowRight size={12} />
                              </button>
                              <button
                                onClick={() => handleOpenPracticeForChapter(chap.id, 'general')}
                                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer"
                                title={`Practice Topic MCQs for ${getPlainChapterName(chap.name)}`}
                              >
                                <span>Topic MCQs</span>
                                <ArrowRight size={12} />
                              </button>
                              <button
                                onClick={() => exportRevisionToPDF(chap)}
                                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
                                title="Export this Chapter's Notes & Formulas as PDF"
                              >
                                <Download size={12} />
                                <span>Export PDF</span>
                              </button>
                            </div>
                          </div>

                          {/* Dynamic Concept Visualizer & Illustration Lab */}
                          <Suspense fallback={<div className="h-32 rounded-2xl bg-slate-100 dark:bg-slate-900 animate-pulse" />}>
                            <ChapterVisualizer chapterId={chap.id} chapterName={chap.name} searchQuery={revisionSearchQuery} />
                          </Suspense>

                          {/* Summary Notes Subsection */}
                          {notesMatches.length > 0 && (
                            <div className="space-y-4">
                              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-l-2 border-indigo-400 pl-2">
                                <BookOpen size={13} /> Concept Summary & Revision Bulletins
                              </h4>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {notesMatches.map((note, idx) => (
                                  <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:border-indigo-150 transition-all space-y-2 text-left">
                                    <h5 className="font-bold text-xs text-slate-880 flex items-center gap-1.5">
                                      <Lightbulb size={13} className="text-amber-500 flex-shrink-0" /> {note.title}
                                    </h5>
                                    <ul className="space-y-1.5 pl-4 list-disc text-slate-600 text-xs leading-relaxed">
                                      {note.bullets.map((bullet, bIndex) => {
                                        // Highlight if matches query
                                        const isHighlight = queryTerm && bullet.toLowerCase().includes(queryTerm);
                                        return (
                                          <li key={bIndex} className={isHighlight ? "bg-amber-100/70 dark:bg-amber-500/20 p-1 rounded font-medium text-amber-950 dark:text-amber-200" : ""}>
                                            <HighlightedText text={bullet} searchQuery={revisionSearchQuery} />
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Formulas Block Subsection */}
                          {formulaMatches.length > 0 && (
                            <div className="space-y-4 pt-2">
                              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-l-2 border-emerald-400 pl-2">
                                <Calculator size={13} /> Key SCM Mathematical Formulas
                              </h4>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {formulaMatches.map((f, idx) => {
                                  const handleCopyText = (formulaText: string, formulaName: string) => {
                                    try {
                                      navigator.clipboard.writeText(formulaText);
                                      setCopiedFormulaName(formulaName);
                                      setTimeout(() => setCopiedFormulaName(null), 2000);
                                    } catch (err) {
                                      console.error("Copy failed", err);
                                    }
                                  };

                                  const isJustCopied = copiedFormulaName === f.name;
                                  const details = getFormulaDetails(f.name, currentFormulaDetails);

                                  return (
                                    <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all hover:border-emerald-200 flex flex-col justify-between space-y-3 text-left hover:z-30 relative duration-200">
                                      <div className="space-y-1">
                                        <div className="flex items-center justify-between gap-2">
                                          <h5 className="font-extrabold text-xs text-slate-800 truncate pr-2" title={f.name}>
                                            {f.name}
                                          </h5>
                                          
                                          {/* Interactive Hover Insights Trigger & Tooltip */}
                                          <div className="relative group/tooltip shrink-0">
                                            <span className="text-[10px] bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 font-black px-2 py-0.5 rounded-full transition-colors flex items-center gap-1 cursor-help border border-slate-200 hover:border-emerald-200">
                                              <Info size={11} className="text-emerald-500 animate-pulse shrink-0" />
                                              Insights
                                            </span>
                                            
                                            {/* Floating interactive tooltip card */}
                                            <div className="absolute right-0 bottom-full mb-2 w-72 sm:w-80 max-w-[calc(100vw-3rem)] bg-slate-900 border border-slate-800 text-slate-100 rounded-xl shadow-2xl p-3.5 z-50 pointer-events-none group-hover/tooltip:pointer-events-auto opacity-0 group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1 translate-y-2 transition-all duration-300 scale-95 group-hover/tooltip:scale-100 leading-normal flex flex-col space-y-2.5">
                                              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1">
                                                  <BookOpen size={12} className="text-emerald-400" /> High-Yield Syllabus Focus
                                                </span>
                                                <span className="text-[9px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                                                  SCM-PE Exam
                                                </span>
                                              </div>

                                              <div className="space-y-2 text-[11px]">
                                                {/* Strategic Context */}
                                                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                                                  <strong className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5 font-bold">Decision Context & Purpose:</strong>
                                                  <span className="text-slate-300 leading-normal block">
                                                    {details.context}
                                                  </span>
                                                </div>

                                                {/* Mathematical Derivation */}
                                                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                                                  <strong className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5 font-bold">Mathematical Derivation:</strong>
                                                  <span className="text-slate-300 leading-normal block font-mono text-[10.5px]">
                                                    {details.derivation}
                                                  </span>
                                                </div>

                                                {/* Decision Rule / Trigger */}
                                                <div className="p-2 bg-emerald-950/40 border border-emerald-900/60 rounded-lg text-emerald-300 text-[11px] leading-relaxed">
                                                  <span className="font-semibold text-emerald-400">💡 Decision Rule:</span> {details.trigger}
                                                </div>
                                              </div>
                                              
                                              <div className="text-[9px] text-slate-500 text-right font-mono italic">
                                                Hover to hold details open
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <p className="text-[11px] text-slate-500 leading-snug">
                                          <HighlightedText text={f.description} searchQuery={revisionSearchQuery} boldPrefix={false} />
                                        </p>
                                      </div>

                                      {/* Formula Block */}
                                      <div className="p-3 bg-slate-900 rounded-xl relative group overflow-hidden border border-slate-800">
                                        <code className="text-[11px] text-emerald-300 font-mono block whitespace-pre-wrap leading-relaxed select-all">
                                          {f.formula}
                                        </code>

                                        {/* Copy to Clipboard action */}
                                        <button
                                          onClick={() => handleCopyText(f.formula, f.name)}
                                          className={`absolute top-2 right-2 p-1 rounded-lg transition-all ${isJustCopied ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                                          title="Copy Formula"
                                        >
                                          {isJustCopied ? <Check size={12} className="text-slate-900" /> : <ClipboardList size={12} />}
                                        </button>
                                      </div>

                                      {isJustCopied && (
                                        <p className="text-[10px] text-emerald-600 font-bold self-end animate-pulse flex items-center gap-1">
                                          <Check size={10} /> Copied formula to clipboard!
                                        </p>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Footer check if no formulas or notes */}
                          {chap.id === 1 && (
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3 text-left">
                              <Info size={16} className="text-slate-400" />
                              <p className="text-xs text-slate-500 leading-relaxed">
                                <strong>Note on strategic frameworks:</strong> Chapter 1 establishes the foundational qualitative strategic positioning models (Porter's Value Chain, Core Positioning, Cost Drivers) rather than mathematical equations. All subsequent costing structures build directly on these themes.
                              </p>
                            </div>
                          )}

                        </div>
                      ));
                    })()}

                  </div>
                </div>
              </>
            ) : revisionSubView === 'flashcards' ? (
              /* Formula Flashcards & Quizzes Sub-view Layout */
              <div id="flashcards-layout-root" className="space-y-6 flex-1 flex flex-col animate-fadeIn">
                
                {/* Flashcard Practice Activity Switcher */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl max-w-md w-full mx-auto shadow-inner border border-slate-250">
                  <button
                    id="btn-flashcard-mode-drill"
                    onClick={() => setFlashcardMode('drill')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${
                      flashcardMode === 'drill'
                        ? 'bg-slate-900 text-emerald-400 shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    <BookOpen size={13} />
                    🗂️ Flashcard Drill
                  </button>
                  <button
                    id="btn-flashcard-mode-quiz"
                    onClick={() => {
                      setFlashcardMode('quiz');
                      handleGenerateQuizQuestion();
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${
                      flashcardMode === 'quiz'
                        ? 'bg-slate-900 text-emerald-400 shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    <Trophy size={13} />
                    📝 Derivation MCQ Quiz
                  </button>
                </div>

                {/* Sub-view Content based on active flashcardMode */}
                {(() => {
                  const keys = Object.keys(currentFormulaDetails);
                  const activeKey = currentFlashcardKey && currentFormulaDetails[currentFlashcardKey] ? currentFlashcardKey : (keys[0] || "");
                  const totalFormulasCount = keys.length;
                  const knownFormulasCount = keys.filter(k => flashcardPerformance[k] === 'known').length;
                  const masteryPct = totalFormulasCount > 0 ? Math.round((knownFormulasCount / totalFormulasCount) * 100) : 0;
                  const cardFormula = currentFormulaDetails[activeKey] || { context: "", derivation: "", trigger: "" };
                  const matchingFormulaObj = currentChapters
                    .flatMap((c) => c.formulas || [])
                    .find((f) => f.name.toLowerCase() === activeKey.toLowerCase());
                  const currentIdx = Math.max(0, keys.indexOf(activeKey));

                  if (flashcardMode === 'drill') {
                    return (
                      <div id="flashcard-drill-section" className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
                        {/* Summary Block */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                          <div className="text-left">
                            <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                              <BookOpen className="text-indigo-600" size={18} />
                              {activeSubject === 'setA'
                                ? 'Set-A Statutory Thresholds, Time Limits & Formula Deck'
                                : 'Set-B SCM-PE Formula Flashcard Study Deck'}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                              {activeSubject === 'setA'
                                ? 'Active recall deck covering all 38 statutory thresholds, quorum/rotational formulas, and appeal timelines across all 14 Set-A chapters.'
                                : 'Active recall tool to master derivation context, mathematical formulas, and operational decision rules from the SCM-PE curriculum.'}
                            </p>
                          </div>
                          {/* Progress box */}
                          <div className="bg-slate-50 flex items-center gap-3.5 p-3 rounded-2xl border border-slate-200/50">
                            <div className="text-right">
                              <span className="text-xs font-bold text-slate-800 block">Deck Mastery</span>
                              <span className="text-[10px] text-slate-500 font-mono font-medium block">
                                {knownFormulasCount} of {totalFormulasCount} Mastered ({masteryPct}%)
                              </span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 font-black text-xs flex items-center justify-center border border-emerald-100">
                              {masteryPct}%
                            </div>
                          </div>
                        </div>

                        {/* Mastery Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-1.5 transition-all duration-500" 
                            style={{ width: `${masteryPct}%` }}
                          />
                        </div>

                        {/* Card Selector Pills / Index Indicator */}
                        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                          <span className="text-xs font-black uppercase tracking-wider font-mono text-slate-500">
                            Card {currentIdx + 1} of {totalFormulasCount}
                          </span>
                          <select
                            aria-label="Select Flashcard Topic"
                            value={activeKey}
                            onChange={(e) => {
                              setCurrentFlashcardKey(e.target.value);
                              setIsCardFlipped(false);
                            }}
                            className="w-full sm:w-80 text-xs font-bold border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {keys.map((k, idx) => (
                              <option key={k} value={k}>
                                #{idx + 1} — {k}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Interactive Card Canvas */}
                        <div className="max-w-2xl mx-auto py-2">
                          <div 
                            id="interactive-flip-card"
                            onClick={() => setIsCardFlipped(!isCardFlipped)}
                            className={`min-h-[360px] flex flex-col justify-between rounded-3xl border-2 p-6 md:p-8 relative transition-all duration-300 select-none cursor-pointer ${
                              isCardFlipped 
                                ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-2xl' 
                                : 'bg-white border-slate-200 text-slate-900 shadow-lg hover:shadow-xl hover:border-indigo-400'
                            }`}
                          >
                            {/* Card Top */}
                            <div className="flex items-center justify-between w-full pb-3 border-b border-slate-200/30">
                              <span className="text-[10px] font-black uppercase tracking-wider font-mono text-indigo-500">
                                {isCardFlipped
                                  ? (activeSubject === 'setA' ? "🔑 BACK: STATUTORY THRESHOLD, RULE & EXCEPTION" : "🔑 BACK: DEFINITION & EXAM TRUTH")
                                  : (activeSubject === 'setA' ? "💡 FRONT: STATUTORY PROVISION / FORMULA" : "💡 FRONT: THE CONCEPT")}
                              </span>
                              <div>
                                {flashcardPerformance[activeKey] === 'known' ? (
                                  <span className="bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                    ✓ Mastered
                                  </span>
                                ) : flashcardPerformance[activeKey] === 'learning' ? (
                                  <span className="bg-amber-500/20 text-amber-500 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                    ✗ In Practice
                                  </span>
                                ) : (
                                  <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                    • Unreviewed
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="flex-1 flex flex-col justify-center items-center py-6 text-center">
                              {!isCardFlipped ? (
                                <div className="space-y-4">
                                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner mx-auto border border-indigo-100">
                                    <Calculator size={28} />
                                  </div>
                                  <h4 className="text-xl md:text-2xl font-black text-slate-900 leading-snug tracking-tight max-w-lg mx-auto">
                                    {activeKey}
                                  </h4>
                                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                                    {activeSubject === 'setA'
                                      ? 'Click card to reveal the exact statutory section, numerical/monetary threshold, and proviso exceptions.'
                                      : 'Click card to flip and inspect the high-yield mathematical derivation and decision rules.'}
                                  </p>
                                </div>
                              ) : (
                                <div className="w-full text-left space-y-4 animate-fadeIn">
                                  <h4 className="text-base sm:text-lg font-black text-emerald-400 border-b border-slate-800 pb-2.5 flex items-center justify-between gap-2">
                                    <span className="break-words">{activeKey}</span>
                                    <span className="text-[10px] bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700 text-slate-300 font-mono shrink-0">
                                      {activeSubject === 'setA' ? 'SET-A LAW' : 'SCM-PE'}
                                    </span>
                                  </h4>

                                  {cardFormula.context && (
                                    <div className="space-y-1">
                                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block font-mono">
                                        {activeSubject === 'setA' ? 'Statutory Section & Scope:' : 'Decision Context & Purpose:'}
                                      </span>
                                      <p className="text-xs leading-relaxed text-slate-100">
                                        <HighlightedText text={cardFormula.context} boldPrefix={false} onDark />
                                      </p>
                                    </div>
                                  )}

                                  {matchingFormulaObj?.formula && (
                                    <div className="space-y-1">
                                      <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block font-mono">
                                        {activeSubject === 'setA' ? 'Quick Statutory Equation / Threshold:' : 'Mathematical Formula Statement:'}
                                      </span>
                                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
                                        <code className="text-xs text-emerald-300 font-mono block whitespace-pre-wrap leading-relaxed select-all">
                                          {matchingFormulaObj.formula}
                                        </code>
                                      </div>
                                    </div>
                                  )}

                                  {cardFormula.derivation && (
                                    <div className="space-y-1">
                                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block font-mono">
                                        {activeSubject === 'setA' ? 'Detailed Statutory Rule & Threshold Breakdown:' : 'Strategic Model Derivation:'}
                                      </span>
                                      <p className="text-xs leading-relaxed text-slate-200">
                                        {cardFormula.derivation}
                                      </p>
                                    </div>
                                  )}

                                  {cardFormula.trigger && (
                                    <div className="p-3 bg-indigo-950/60 border border-indigo-800/80 rounded-xl text-indigo-200 text-xs leading-relaxed shadow-sm">
                                      <span className="font-extrabold text-indigo-400">
                                        {activeSubject === 'setA' ? '💡 Proviso / Exemption / Examiner Trap:' : '💡 Performance Rule / Hurdle Limit:'}
                                      </span>{' '}
                                      {cardFormula.trigger}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Card Footer prompt */}
                            <div className="w-full pt-3 border-t border-slate-200/30 text-center flex justify-center items-center gap-1.5 text-xs font-bold text-slate-400">
                              <RefreshCw size={12} className={isCardFlipped ? "text-emerald-400" : "text-indigo-500"} />
                              <span>{isCardFlipped ? "Click to Flip Back" : "Click to Reveal Details"}</span>
                            </div>
                          </div>

                          {/* Quick Controls below card */}
                          <div className="flex flex-wrap gap-3 mt-6 justify-center items-center">
                            <button
                              onClick={() => {
                                const prevIdx = (currentIdx - 1 + keys.length) % keys.length;
                                setCurrentFlashcardKey(keys[prevIdx]);
                                setIsCardFlipped(false);
                              }}
                              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer"
                            >
                              &larr; Previous
                            </button>

                            <button
                              id="btn-flip-card"
                              onClick={() => setIsCardFlipped(!isCardFlipped)}
                              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer"
                            >
                              <RefreshCw size={13} />
                              Flip Card
                            </button>

                            {isCardFlipped ? (
                              <>
                                <button
                                  id="btn-mark-learning"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFlashcardPerformance({
                                      ...flashcardPerformance,
                                      [activeKey]: 'learning'
                                    });
                                    setIsCardFlipped(false);
                                    const nextIdx = (currentIdx + 1) % keys.length;
                                    setCurrentFlashcardKey(keys[nextIdx]);
                                  }}
                                  className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
                                >
                                  Still Learning ✗
                                </button>
                                <button
                                  id="btn-mark-mastered"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFlashcardPerformance({
                                      ...flashcardPerformance,
                                      [activeKey]: 'known'
                                    });
                                    setIsCardFlipped(false);
                                    const nextIdx = (currentIdx + 1) % keys.length;
                                    setCurrentFlashcardKey(keys[nextIdx]);
                                  }}
                                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 border border-emerald-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 shadow transition-colors cursor-pointer"
                                >
                                  I Know This! ✓
                                </button>
                              </>
                            ) : (
                              <button
                                id="btn-draw-random"
                                onClick={() => {
                                  const nextIdx = (currentIdx + 1) % keys.length;
                                  setCurrentFlashcardKey(keys[nextIdx]);
                                  setIsCardFlipped(false);
                                }}
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                              >
                                Next Card &rarr;
                              </button>
                            )}
                          </div>

                          {/* Reset progress */}
                          <div className="text-center mt-6">
                            <button
                              id="btn-reset-flashcard-stats"
                              onClick={() => {
                                setFlashcardPerformance({});
                              }}
                              className="text-[10px] text-slate-400 hover:text-rose-500 font-extrabold uppercase tracking-wide underline cursor-pointer"
                            >
                              Reset Mastery Progress
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    /* Derivation MCQ Quiz Content Layout */
                    const validQuizTargetKey = quizTargetKey && currentFormulaDetails[quizTargetKey] ? quizTargetKey : (keys[0] || "");
                    const targetDetails = currentFormulaDetails[validQuizTargetKey] || { context: "", derivation: "", trigger: "" };
                    return (
                      <div id="flashcard-quiz-section" className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
                        {/* Summary Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                          <div className="text-left">
                            <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                              <Trophy className="text-indigo-600" size={18} />
                              {activeSubject === 'setA'
                                ? 'Set-A Statutory Threshold & Provision Quiz'
                                : 'Formula Definition & Derivation Quiz'}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                              {activeSubject === 'setA'
                                ? 'Tests active recognition of statutory sections, numerical thresholds, and legal exceptions across Set-A.'
                                : 'Pulls formula properties randomly to test active recognition and formulation retrieval.'}
                            </p>
                          </div>

                          {/* Score metrics */}
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-50 flex items-center gap-3.5 p-3 rounded-2xl border border-slate-200/50 min-w-[140px]">
                              <div className="text-left w-full">
                                <div className="text-xs font-extrabold text-slate-800 flex justify-between">
                                  <span>Score:</span>
                                  <span className="font-mono text-indigo-600">{quizScore.correct}/{quizScore.total}</span>
                                </div>
                                <div className="text-[10px] text-slate-500 font-medium font-mono mt-0.5">
                                  Accuracy: {quizScore.total > 0 ? Math.round((quizScore.correct / quizScore.total) * 100) : 0}%
                                </div>
                              </div>
                            </div>
                            
                            {quizScore.total > 0 && (
                              <button
                                onClick={() => setQuizScore({ correct: 0, total: 0 })}
                                className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
                                title="Reset Quiz Statistics"
                              >
                                <RefreshCw size={13} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Question Block */}
                        <div className="max-w-2xl mx-auto space-y-6 text-left">
                          <div className="space-y-2">
                            <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider font-mono">
                              {quizQuestionType === 'details-to-name'
                                ? 'Identify the statutory provision / formula matching these details'
                                : 'Identify the correct statutory threshold / details for this item'}
                            </span>

                            {quizQuestionType === 'details-to-name' ? (
                              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mt-2 space-y-3.5 shadow-inner">
                                {targetDetails.context && (
                                  <div className="space-y-0.5">
                                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block font-mono">Scope & Context:</span>
                                    <p className="text-xs font-medium text-slate-800 leading-relaxed">
                                      {targetDetails.context}
                                    </p>
                                  </div>
                                )}
                                {targetDetails.derivation && (
                                  <div className="space-y-0.5">
                                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block font-mono">Rule / Threshold / Derivation:</span>
                                    <p className="text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl p-3 shadow-inner leading-relaxed font-sans">
                                      {targetDetails.derivation}
                                    </p>
                                  </div>
                                )}
                                {targetDetails.trigger && (
                                  <div className="space-y-0.5">
                                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block font-mono">Proviso / Decision Rule:</span>
                                    <p className="text-xs text-slate-700 font-mono italic">
                                      "{targetDetails.trigger}"
                                    </p>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border-2 border-slate-800 mt-2 text-center space-y-1 shadow-md relative overflow-hidden">
                                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                                  <Calculator size={90} />
                                </div>
                                <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-400 font-mono">Target Provision / Formula</span>
                                <h4 className="text-lg sm:text-xl font-black text-emerald-300 tracking-tight block py-1">
                                  {validQuizTargetKey}
                                </h4>
                              </div>
                            )}
                          </div>

                          {/* Options Choice Matrix */}
                          <div className="grid grid-cols-1 gap-3.5 mt-4">
                            {quizOptions.map((opt, idx) => {
                              const isSelected = quizSelectedOption === idx;
                              const isCorrectOpt = quizCorrectOptionIndex === idx;
                              const showCorrectFlag = quizIsSubmitted && isCorrectOpt;
                              const showWrongFlag = quizIsSubmitted && isSelected && !isCorrectOpt;

                              let bgClass = "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white text-slate-800";
                              if (quizIsSubmitted) {
                                if (isCorrectOpt) {
                                  bgClass = "border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 font-semibold";
                                } else if (isSelected) {
                                  bgClass = "border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500/20";
                                } else {
                                  bgClass = "border-slate-200 bg-white text-slate-400 opacity-60";
                                }
                              } else if (isSelected) {
                                bgClass = "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/10 text-slate-900";
                              }

                              return (
                                <button
                                  key={idx}
                                  disabled={quizIsSubmitted}
                                  onClick={() => {
                                    if (quizIsSubmitted) return;
                                    setQuizSelectedOption(idx);
                                    setQuizIsSubmitted(true);
                                    const isCorrect = quizCorrectOptionIndex === idx;
                                    setQuizScore(prev => ({
                                      correct: prev.correct + (isCorrect ? 1 : 0),
                                      total: prev.total + 1
                                    }));
                                  }}
                                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 duration-150 ${bgClass}`}
                                >
                                  <div className="flex-shrink-0 mt-0.5">
                                    {showCorrectFlag ? (
                                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                        <CheckCircle2 size={13} />
                                      </div>
                                    ) : showWrongFlag ? (
                                      <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center">
                                        <XCircle size={13} />
                                      </div>
                                    ) : (
                                      <div className={`w-5 h-5 rounded-full font-bold text-xs flex items-center justify-center border ${
                                        isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 text-slate-500'
                                      }`}>
                                        {String.fromCharCode(65 + idx)}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                                    {opt}
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* Interactive feedback card */}
                          {quizIsSubmitted && (
                            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl mt-4 space-y-4 shadow-inner animate-fadeIn">
                              <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
                                {quizSelectedOption === quizCorrectOptionIndex ? (
                                  <span className="text-emerald-700 font-extrabold text-sm flex items-center gap-1.5">
                                    <CheckCircle2 size={16} /> Correct! Exact statutory/formula match verified.
                                  </span>
                                ) : (
                                  <span className="text-rose-700 font-extrabold text-sm flex items-center gap-1.5">
                                    <XCircle size={16} /> Not quite — review the exact provision and threshold below:
                                  </span>
                                )}
                              </div>

                              {/* Target Details summary */}
                              <div className="space-y-3.5 text-xs">
                                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200">
                                  <span className="font-mono text-xs font-black text-indigo-700">
                                    {validQuizTargetKey}
                                  </span>
                                  {currentChapters
                                    .flatMap((c) => c.formulas || [])
                                    .find((f) => f.name.toLowerCase() === validQuizTargetKey.toLowerCase())?.formula && (
                                    <button
                                      onClick={() => {
                                        const matchingF = currentChapters
                                          .flatMap((c) => c.formulas || [])
                                          .find((f) => f.name.toLowerCase() === validQuizTargetKey.toLowerCase());
                                        if (matchingF?.formula) {
                                          navigator.clipboard.writeText(matchingF.formula);
                                        }
                                      }}
                                      className="text-[10px] bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 font-bold px-2.5 py-1 rounded"
                                    >
                                      Copy Threshold / Formula
                                    </button>
                                  )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <p className="text-slate-700 leading-normal">
                                      <strong className="text-slate-900 text-[9px] uppercase font-mono tracking-wider font-bold block mb-0.5">Decision Scope:</strong>
                                      {targetDetails.context}
                                    </p>
                                    
                                    {currentChapters
                                      .flatMap((c) => c.formulas || [])
                                      .find((f) => f.name.toLowerCase() === validQuizTargetKey.toLowerCase())?.formula && (
                                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-emerald-300 font-mono text-[10px]">
                                        {currentChapters
                                          .flatMap((c) => c.formulas || [])
                                          .find((f) => f.name.toLowerCase() === validQuizTargetKey.toLowerCase())?.formula}
                                      </div>
                                    )}
                                  </div>

                                  <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-1 flex flex-col justify-center">
                                    <strong className="text-indigo-900 text-[9px] uppercase font-mono tracking-wider font-extrabold">Exam Application Guideline:</strong>
                                    <p className="text-indigo-950 leading-relaxed italic text-xs">
                                      "{targetDetails.trigger}"
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="pt-2 flex justify-end">
                                <button
                                  id="btn-next-quiz-question"
                                  onClick={() => handleGenerateQuizQuestion()}
                                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer"
                                >
                                  <span>Next Quiz Question</span>
                                  <ArrowRight size={14} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                })()}

              </div>
            ) : (
              /* Quick-Fire Theoretical Frameworks Deck Layout */
              <div id="frameworks-layout-root" className="space-y-6 flex-1 flex flex-col animate-fadeIn">
                
                {/* Stats Header Summary block */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
                  <div className="text-left space-y-1">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Award className="text-amber-500 animate-pulse" size={20} />
                      Core SCM-PE Theoretical Frameworks (High-Yield)
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                      Master the qualitative models that compose up to 40% of the SCM-PE exam. Flip cards to view components, examiner warnings, and rate your confidence to track progress.
                    </p>
                  </div>
                  
                  {/* Confidence metrics */}
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-inner">
                    <div className="text-center px-2">
                      <span className="block font-black text-sm text-teal-600">
                        {Object.values(frameworkCardAssessments).filter(v => v === 'Mastered').length}
                      </span>
                      <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Mastered</span>
                    </div>
                    <div className="w-px h-8 bg-slate-200" />
                    <div className="text-center px-2">
                      <span className="block font-black text-sm text-amber-600">
                        {Object.values(frameworkCardAssessments).filter(v => v === 'Medium').length}
                      </span>
                      <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Medium</span>
                    </div>
                    <div className="w-px h-8 bg-slate-200" />
                    <div className="text-center px-2">
                      <span className="block font-black text-sm text-rose-600">
                        {Object.values(frameworkCardAssessments).filter(v => v === 'Hard').length}
                      </span>
                      <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-slate-500">Review</span>
                    </div>
                  </div>
                </div>

                {/* Main Card Arena */}
                <div className="max-w-3xl w-full mx-auto space-y-6">
                  {/* Card Navigation and Indicator Bar */}
                  <div className="flex items-center justify-between px-2 select-none">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest font-mono">
                      Card {currentFrameworkCardIndex + 1} of {currentFlashcards.length}
                    </span>
                    <span className={`text-[10px] uppercase font-bold font-mono px-2.5 py-0.5 rounded-full border ${
                      currentFlashcards[currentFrameworkCardIndex]?.difficulty === 'Hard'
                        ? 'border-rose-100 bg-rose-50 text-rose-700'
                        : 'border-yellow-105 bg-yellow-50 text-yellow-700'
                    }`}>
                      {currentFlashcards[currentFrameworkCardIndex]?.difficulty || 'Medium'} Difficulty
                    </span>
                  </div>

                  {/* Active Flashcard container */}
                  {currentFlashcards[currentFrameworkCardIndex] && (
                  <div 
                    id={`framework-flashcard-${currentFlashcards[currentFrameworkCardIndex].id}`}
                    className={`relative min-h-[440px] rounded-3xl border transition-all p-6 sm:p-8 flex flex-col justify-between shadow-md cursor-pointer ${
                      isFrameworkCardFlipped 
                        ? 'bg-slate-900 text-white border-indigo-500 shadow-indigo-150/20 shadow-sm' 
                        : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setIsFrameworkCardFlipped(!isFrameworkCardFlipped)}
                  >
                    {!isFrameworkCardFlipped ? (
                      /* FRONT SIDE */
                      <div className="flex-1 flex flex-col justify-between space-y-6 pointer-events-none select-none">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                            <span>CARD #{currentFrameworkCardIndex + 1}</span>
                            <span>•</span>
                            <span>{currentFlashcards[currentFrameworkCardIndex].subtopic}</span>
                          </div>
                          <h4 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight font-sans">
                            {currentFlashcards[currentFrameworkCardIndex].framework}
                          </h4>
                        </div>

                        <div className="text-center py-6">
                          <p className="text-base sm:text-lg font-bold text-slate-700 italic leading-relaxed max-w-xl mx-auto font-sans">
                            "{currentFlashcards[currentFrameworkCardIndex].question}"
                          </p>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] text-indigo-600 font-black uppercase tracking-wider animate-pulse font-mono">
                            Click Anywhere to Flip Card
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">
                            Reveals qualitative framework targets & examiner warning
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* BACK SIDE */
                      <div className="flex-1 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono">
                              Model Breakdown Revealed
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                              {currentFlashcards[currentFrameworkCardIndex].framework}
                            </span>
                          </div>
                          
                          {/* Answer point lists */}
                          <div className="space-y-2.5">
                            {currentFlashcards[currentFrameworkCardIndex].answer.map((ans, idx) => (
                              <div 
                                key={idx} 
                                className="flex items-start gap-3 bg-slate-800/40 p-3 rounded-xl border border-slate-800/30"
                              >
                                <span className="w-5 h-5 flex-shrink-0 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-xs font-mono shadow-sm">
                                  {idx + 1}
                                </span>
                                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed self-center font-medium font-sans">
                                  <HighlightedText text={ans} onDark />
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Examiner Warn alert trap */}
                          {currentFlashcards[currentFrameworkCardIndex].examinerTrap && (
                            <div className="bg-rose-950/45 border border-rose-900 p-3.5 rounded-2xl flex gap-3 text-left">
                              <AlertTriangle className="text-rose-400 flex-shrink-0 mt-0.5" size={16} />
                              <div className="space-y-0.5">
                                <strong className="text-rose-300 text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-1.5 font-mono">
                                  Examiner Pitfall Alert
                                </strong>
                                <p className="text-xs text-rose-200 leading-relaxed font-semibold font-sans">
                                  <HighlightedText text={currentFlashcards[currentFrameworkCardIndex].examinerTrap} boldPrefix={false} onDark />
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] text-emerald-400 font-black uppercase tracking-wider font-mono">
                            Click Card Again to Flip Back
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  )}

                  {/* Rating Confidence Console & Slider */}
                  {currentFlashcards[currentFrameworkCardIndex] && (
                  <div className="space-y-5 bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-inner">
                    {/* Mastery Level Rating Panel */}
                    <div className="space-y-2.5">
                      <p className="text-xs font-black text-slate-500 uppercase tracking-wider text-center font-mono">
                        How confident are you with this framework?
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFrameworkCardAssessments(prev => ({
                              ...prev,
                              [currentFlashcards[currentFrameworkCardIndex].framework]: 'Hard'
                            }));
                            // Auto advance with simple debounce helper
                            setTimeout(() => {
                              if (currentFrameworkCardIndex < currentFlashcards.length - 1) {
                                setCurrentFrameworkCardIndex(prev => prev + 1);
                                setIsFrameworkCardFlipped(false);
                              }
                            }, 400);
                          }}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            frameworkCardAssessments[currentFlashcards[currentFrameworkCardIndex].framework] === 'Hard'
                              ? 'bg-rose-50 border-rose-205 text-rose-700 ring-2 ring-rose-300 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-205 font-sans'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          🔴 Review
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFrameworkCardAssessments(prev => ({
                              ...prev,
                              [currentFlashcards[currentFrameworkCardIndex].framework]: 'Medium'
                            }));
                            setTimeout(() => {
                              if (currentFrameworkCardIndex < currentFlashcards.length - 1) {
                                setCurrentFrameworkCardIndex(prev => prev + 1);
                                setIsFrameworkCardFlipped(false);
                              }
                            }, 400);
                          }}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            frameworkCardAssessments[currentFlashcards[currentFrameworkCardIndex].framework] === 'Medium'
                              ? 'bg-yellow-50 border-yellow-205 text-yellow-700 ring-2 ring-yellow-300 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-255 font-sans'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-yellow-500" />
                          🟡 Medium
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFrameworkCardAssessments(prev => ({
                              ...prev,
                              [currentFlashcards[currentFrameworkCardIndex].framework]: 'Mastered'
                            }));
                            setTimeout(() => {
                              if (currentFrameworkCardIndex < currentFlashcards.length - 1) {
                                setCurrentFrameworkCardIndex(prev => prev + 1);
                                setIsFrameworkCardFlipped(false);
                              }
                            }, 400);
                          }}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            frameworkCardAssessments[currentFlashcards[currentFrameworkCardIndex].framework] === 'Mastered'
                              ? 'bg-teal-50 border-teal-200 text-teal-700 ring-2 ring-teal-300 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 font-sans'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-teal-500" />
                          🟢 Mastered
                        </button>
                      </div>
                    </div>

                    {/* Left & Right arrow controls */}
                    <div className="flex items-center justify-between border-t border-slate-200 pt-4 px-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentFrameworkCardIndex > 0) {
                            setCurrentFrameworkCardIndex(prev => prev - 1);
                            setIsFrameworkCardFlipped(false);
                          }
                        }}
                        disabled={currentFrameworkCardIndex === 0}
                        className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 font-sans ${
                          currentFrameworkCardIndex === 0
                            ? 'opacity-40 text-slate-400 cursor-not-allowed border-slate-100 bg-slate-50'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 active:scale-97'
                        }`}
                      >
                        <ChevronLeft size={16} /> Previous Model
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFrameworkCardFlipped(!isFrameworkCardFlipped);
                        }}
                        className="p-2 px-4 bg-slate-900 border border-slate-950 text-emerald-400 hover:bg-slate-800 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all active:scale-97 shadow font-sans"
                      >
                        <RefreshCw size={13} /> Flip Card
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentFrameworkCardIndex < currentFlashcards.length - 1) {
                            setCurrentFrameworkCardIndex(prev => prev + 1);
                            setIsFrameworkCardFlipped(false);
                          }
                        }}
                        disabled={currentFrameworkCardIndex === currentFlashcards.length - 1}
                        className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 font-sans ${
                          currentFrameworkCardIndex === currentFlashcards.length - 1
                            ? 'opacity-40 text-slate-400 cursor-not-allowed border-slate-100 bg-slate-50'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 active:scale-97'
                        }`}
                      >
                        Next Model <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                  )}

                  {/* Dynamic Pill Indicators at base */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center font-mono">
                      Visual Mastery Grid Matrix
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {currentFlashcards.map((f, idx) => {
                        const status = frameworkCardAssessments[f.framework];
                        let pillClass = "bg-slate-100 text-slate-400 hover:bg-slate-200 border-slate-200";
                        if (status === 'Hard') pillClass = "bg-rose-50 border-rose-200 text-rose-600 font-bold";
                        if (status === 'Medium') pillClass = "bg-yellow-50 border-yellow-250 text-yellow-600 font-bold";
                        if (status === 'Mastered') pillClass = "bg-teal-50 border-teal-200 text-teal-600 font-bold";

                        const isActive = idx === currentFrameworkCardIndex;

                        return (
                          <button
                            key={f.id}
                            title={f.framework}
                            onClick={() => {
                              setCurrentFrameworkCardIndex(idx);
                              setIsFrameworkCardFlipped(false);
                            }}
                            className={`w-9 h-9 text-xs sm:text-sm font-black font-mono rounded-xl border flex items-center justify-center transition-all ${pillClass} ${
                              isActive 
                                ? 'ring-2 ring-indigo-500 ring-offset-2 scale-110 shadow-sm shadow-indigo-200' 
                                : 'hover:scale-105'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* TAB 3: timed mock EXAM simulator */}
        {activeTab === 'mock' && (
          <div className="flex-1 flex flex-col space-y-4 animate-tabEnter">
            
            {/* Setting Screen if not started */}
            {!examStarted ? (
              <div className="max-w-2xl w-full mx-auto bg-white dark:bg-[#0c1228] rounded-2xl border border-slate-200 dark:border-[#1c243f] overflow-hidden shadow-lg text-center">
                <div className="bg-gradient-to-r from-[#021027] via-[#091e3a] to-[#0f172a] px-6 py-6 text-white border-b border-[#C9A84C]/35 relative">
                  <div className="w-14 h-14 bg-[#C9A84C]/15 border border-[#C9A84C]/40 text-[#C9A84C] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Timer size={28} />
                  </div>
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 text-[#C9A84C] mb-1.5">
                    {activeSubject === 'setA' ? 'SPOM Set A : Corporate & Economic Laws' : 'SPOM Set B : Strategic Cost & Performance Management'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {activeSubject === 'setA' ? 'Corporate & Economic Laws Timed SPOM Mock' : 'SCM & PM Full-Length SPOM Mock Exam'}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto mt-1.5 leading-relaxed">
                    Simulate actual ICAI Self-Paced Online Module exam conditions. Questions are dynamically drawn across all chapters with automated countdown enforcement. Passing requires 50% or above.
                  </p>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Exam Settings */}
                  <div className="bg-slate-50 dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto grid grid-cols-2 gap-4 text-left">
                    <div className="space-y-2 col-span-2">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        Select Assessment Question Pool
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[10, 15, 25].map(cnt => (
                          <button
                            key={cnt}
                            onClick={() => setTotalMockQuestionsCount(cnt)}
                            className={`py-2.5 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                              totalMockQuestionsCount === cnt
                                ? (activeSubject === 'setA' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-indigo-600 text-white border-indigo-600 shadow-sm')
                                : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {cnt} MCQs
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Time Limit</span>
                      <p className="text-lg font-black text-slate-800 dark:text-white mt-0.5">{totalMockQuestionsCount * 1} Mins</p>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Passing Mark</span>
                      <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">50% (No Neg.)</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/35 rounded-xl p-4 border border-amber-200 dark:border-amber-800/60 text-left flex gap-3 max-w-lg mx-auto">
                    <AlertTriangle className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <h5 className="text-xs font-extrabold text-amber-900 dark:text-amber-300 uppercase">Exam Simulation Integrity</h5>
                      <p className="text-xs text-amber-800 dark:text-amber-200/90 tracking-wide mt-1 leading-relaxed">
                        The countdown timer runs continuously once initialized. Flag tricky case questions for review and submit before time expires.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleStartMockExam}
                    className="bg-[#021027] dark:bg-[#C9A84C] hover:bg-slate-800 dark:hover:bg-[#d8b75c] text-white dark:text-slate-950 font-black px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
                  >
                    <Play size={16} className="text-[#C9A84C] dark:text-slate-950 fill-current" />
                    <span>Initialize Assessment Session</span>
                  </button>
                </div>
              </div>
            ) : examFinished ? (
              /* Review / Score Card screen */
              <div className="space-y-6">
                {/* Result Summary Bar */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className={`p-4 rounded-2xl flex items-center justify-center shadow-inner ${mockScoreCard && mockScoreCard.pct >= 50 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      <Trophy size={36} />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Scorecard result</span>
                      <h2 className="text-2xl font-black text-slate-900">
                        {mockScoreCard && mockScoreCard.pct >= 50 ? 'CONGRATULATIONS: PASSED' : 'ASSESSMENT OUTCOME: UNPASSED'}
                      </h2>
                      <p className="text-xs text-slate-500">Passing criteria: minimum 50% accurate responses.</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-center">
                    <div className="text-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Accuracy</span>
                      <p className={`text-4xl font-extrabold ${mockScoreCard && mockScoreCard.pct >= 50 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {mockScoreCard?.pct}%
                      </p>
                    </div>
                    <div className="text-center border-l border-slate-200 pl-6">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Score</span>
                      <p className="text-4xl font-extrabold text-slate-800">
                        {mockScoreCard?.score} <span className="text-sm font-medium text-slate-400">/ {mockQuestions.length}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setExamStarted(false)}
                    className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow active:scale-98"
                  >
                    <RefreshCw size={13} /> Exit to Menu
                  </button>
                </div>

                {/* POST-EXAM WEAKNESS ANALYTICS (Chapter-Wise Insights) */}
                {mockScoreCard && mockScoreCard.categoryBreakdown && (
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5 text-left animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                          <BarChart2 className="text-indigo-600 animate-pulse" size={20} />
                          Post-Exam Chapter Weakness Analytics
                        </h3>
                        <p className="text-xs text-slate-500">
                          Syllabus-wise accuracy metrics across CA Final SCM-PE Parts to target corrective study.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-widest">
                        Diagnosis Complete
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(Object.entries(mockScoreCard.categoryBreakdown) as [string, { correct: number; total: number; chapterId: number }][])
                        .sort((a, b) => a[1].chapterId - b[1].chapterId)
                        .map(([partName, data]) => {
                          const percentage = Math.round((data.correct / data.total) * 100);
                          let statusColor = "teal";
                          let bgBar = "bg-teal-500";
                          let bgTrack = "bg-teal-50";
                          let borderClass = "border-teal-100";
                          let textClass = "text-teal-700";
                          let tip = "Mastery Level Attained — Keep current pace.";

                          if (percentage < 55) {
                            statusColor = "rose";
                            bgBar = "bg-rose-500";
                            bgTrack = "bg-rose-50";
                            borderClass = "border-rose-100";
                            textClass = "text-rose-700";
                            tip = "CRITICAL WEAKNESS: Immediate formula review & scenario practice recommended!";
                          } else if (percentage < 80) {
                            statusColor = "amber";
                            bgBar = "bg-amber-500";
                            bgTrack = "bg-amber-50";
                            borderClass = "border-amber-100";
                            textClass = "text-amber-700";
                            tip = "MODERATE GAP: Focus on Examiner warns and MCQs to secure higher score.";
                          }

                          return (
                            <div 
                              key={partName} 
                              className={`p-4 rounded-2xl border ${borderClass} bg-slate-50/50 flex flex-col justify-between space-y-3 transition-all hover:shadow-sm`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-slate-400">
                                    Part {data.chapterId}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-black text-slate-800 leading-tight font-sans">
                                    {partName}
                                  </h4>
                                </div>
                                <div className="text-right">
                                  <span className={`text-[13px] font-mono font-black ${textClass}`}>
                                    {percentage}%
                                  </span>
                                  <span className="block text-[10px] text-slate-400 font-mono font-medium whitespace-nowrap">
                                    {data.correct} / {data.total} Qs
                                  </span>
                                </div>
                              </div>

                              {/* Progress bar */}
                              <div className="space-y-1">
                                <div className={`w-full h-2.5 rounded-full ${bgTrack} overflow-hidden shadow-inner`}>
                                  <div 
                                    className={`h-full ${bgBar} rounded-full transition-all duration-500`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <p className={`text-[10px] font-semibold leading-relaxed font-sans ${textClass}`}>
                                  {tip}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Question Retrospective list */}
                <div className="space-y-4 text-left">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <FileText size={18} className="text-indigo-600" /> Assessment Question Retrospective
                  </h3>

                  <div className="space-y-4">
                    {mockQuestions.map((q, idx) => {
                      const ans = mockAnswers[idx];
                      const isCorrect = ans === q.correctOption;
                      return (
                        <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                            <div>
                              <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
                                {isCorrect ? 'CORRECT SCORE' : 'INCORRECT ANSWER'}
                              </span>
                              <h4 className="text-xs font-bold text-slate-400 mt-2">
                                Derived from reference: {q.caseTitle}
                              </h4>
                            </div>
                            <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                              Question {idx + 1}
                            </span>
                          </div>

                          <p className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                            {q.questionText}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {(Object.keys(q.options) as Array<'A' | 'B' | 'C' | 'D'>).map(opt => {
                              const wasSelected = ans === opt;
                              const isCorrectOption = opt === q.correctOption;
                              
                              let optClass = "border-slate-100 bg-slate-50 text-slate-700";
                              if (wasSelected) optClass = "border-rose-400 bg-rose-50 text-rose-900 font-medium";
                              if (isCorrectOption) optClass = "border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold";

                              return (
                                <div key={opt} className={`p-3 rounded-lg border flex items-start gap-2 ${optClass}`}>
                                  <span className="font-extrabold uppercase text-slate-900 bg-slate-200/50 px-1.5 py-0.5 rounded mr-1">
                                    {opt}
                                  </span>
                                  <span>{q.options[opt]}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Reference calculation explanation card */}
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <span className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-widest block mb-1">
                              Official Reasoning & Formula Reference:
                            </span>
                            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                              <HighlightedText text={q.explanation} boldPrefix={false} />
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Active testing screen */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 text-left">
                
                {/* Left Panel: Active Case + Question (col-span-8) */}
                <div className="lg:col-span-9 flex flex-col gap-4">
                  {/* Top Bar showing Active Timer & Progress */}
                  <div className="bg-white dark:bg-[#0c1228] rounded-2xl border border-slate-200 dark:border-[#1c243f] p-3.5 sm:p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                        <Timer className="animate-spin-slow" size={16} />
                      </div>
                      <span className="text-sm sm:text-base font-black text-slate-800 dark:text-white tracking-tight font-mono">
                        {formatTime(timeRemaining)}
                      </span>
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider pl-1">Remaining</span>
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
                      {mockQuestions.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentMockIndex(idx)}
                          className={`w-8 h-8 shrink-0 rounded-lg text-xs font-extrabold transition-all border flex items-center justify-center cursor-pointer ${
                            currentMockIndex === idx
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : mockAnswers[idx]
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    {/* Panel 1: Case Detail context */}
                    <div className="bg-white dark:bg-[#0c1228] rounded-2xl border border-slate-200 dark:border-[#1c243f] p-5 shadow-sm overflow-hidden flex flex-col h-[460px] sm:h-[520px]">
                      <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3 flex justify-between items-center">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md">
                          Reference Case Scenario
                        </span>
                        {flaggedQuestions[currentMockIndex] && (
                          <span className="text-[10px] font-extrabold uppercase text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-700 px-2.5 py-0.5 rounded-full">
                            ★ Flagged for Review
                          </span>
                        )}
                      </div>
                      <div className="overflow-y-auto text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 whitespace-pre-line pr-1.5 leading-relaxed scrollbar-thin">
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2">
                          {mockQuestions[currentMockIndex]?.caseTitle}
                        </h4>
                        {mockQuestions[currentMockIndex]?.caseText}
                      </div>
                    </div>

                    {/* Panel 2: Active question & answering choices */}
                    <div className="bg-white dark:bg-[#0c1228] rounded-2xl border border-slate-200 dark:border-[#1c243f] p-5 shadow-sm flex flex-col h-[460px] sm:h-[520px] justify-between">
                      <div className="space-y-4 overflow-y-auto pr-1">
                        <div className="flex items-center justify-between">
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs px-2.5 py-1 rounded-md font-extrabold font-mono">
                            Question {currentMockIndex + 1} of {mockQuestions.length}
                          </span>
                          {mockAnswers[currentMockIndex] && (
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 size={13} /> Option {mockAnswers[currentMockIndex]} Selected
                            </span>
                          )}
                        </div>
                        
                        <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                          {mockQuestions[currentMockIndex]?.questionText}
                        </p>

                        <div className="space-y-2.5 pt-1">
                          {mockQuestions[currentMockIndex] ? (
                            (Object.keys(mockQuestions[currentMockIndex].options) as Array<'A' | 'B' | 'C' | 'D'>).map(opt => {
                              const isSelected = mockAnswers[currentMockIndex] === opt;
                              return (
                                <button
                                  key={opt}
                                  onClick={() => {
                                    setMockAnswers(prev => ({
                                      ...prev,
                                      [currentMockIndex]: opt
                                    }));
                                  }}
                                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-[13px] flex items-start gap-3 transition-all cursor-pointer ${
                                    isSelected
                                      ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50/90 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-200 font-bold ring-2 ring-indigo-500/15'
                                      : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/50 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200'
                                  }`}
                                >
                                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                                    isSelected
                                      ? 'bg-indigo-600 text-white shadow-xs'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                                  }`}>
                                    {opt}
                                  </span>
                                  <span className="flex-1 pt-0.5 leading-relaxed">{mockQuestions[currentMockIndex].options[opt]}</span>
                                </button>
                              );
                            })
                          ) : null}
                        </div>
                      </div>

                      {/* Navigation Panel */}
                      <div className="pt-4 border-b-0 border-t border-slate-100 flex justify-between gap-2">
                        <button
                          disabled={currentMockIndex === 0}
                          onClick={() => setCurrentMockIndex(prev => prev - 1)}
                          className="px-3.5 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-500 flex items-center gap-1 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft size={14} /> Back
                        </button>

                        <button
                          onClick={() => {
                            setFlaggedQuestions(prev => ({
                              ...prev,
                              [currentMockIndex]: !prev[currentMockIndex]
                            }));
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${flaggedQuestions[currentMockIndex] ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-200'}`}
                        >
                          ★ {flaggedQuestions[currentMockIndex] ? 'Flagged' : 'Flag for Review'}
                        </button>

                        {currentMockIndex < mockQuestions.length - 1 ? (
                          <button
                            onClick={() => setCurrentMockIndex(prev => prev + 1)}
                            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                          >
                            Next <ChevronRight size={14} />
                          </button>
                        ) : (
                          <button
                            onClick={handleFinishMockExam}
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-all animate-bounce"
                          >
                            <Save size={14} /> Complete Assessment
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Exam status dashboard (col-span-4) */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm text-center space-y-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
                      Testing Dashboard
                    </h3>

                    {/* Completion rate bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-500">
                        <span>Answering Rate</span>
                        <span>
                          {Object.values(mockAnswers).filter(a => a !== null).length} / {mockQuestions.length} answered
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full transition-all duration-300"
                          style={{ width: `${(Object.values(mockAnswers).filter(a => a !== null).length / mockQuestions.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Question quick-hop grid */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-left">
                        Jump to question:
                      </span>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {mockQuestions.map((_, idx) => {
                          const answer = mockAnswers[idx];
                          const isFlagged = flaggedQuestions[idx];
                          let colorClass = "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200";
                          if (answer) colorClass = "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300";
                          if (isFlagged) colorClass = "bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-300";
                          if (currentMockIndex === idx) colorClass = "bg-indigo-600 text-white border-indigo-600 scale-110 shadow-md";

                          return (
                            <button
                              key={idx}
                              onClick={() => setCurrentMockIndex(idx)}
                              className={`py-2 rounded-lg text-xs font-black transition-all border flex items-center justify-center ${colorClass}`}
                            >
                              {idx + 1}
                              {isFlagged && <span className="absolute top-0.5 right-0.5 text-[5px] text-amber-600">★</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 italic leading-snug">
                      Your work can be completed anytime before the countdown concludes. Leaving early submits all saved answers automatically.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: INTERACTIVE CALCULATIONS SANDBOX */}
        {activeTab === 'sandbox' && (
          <div className="space-y-6 text-left animate-tabEnter">
            {activeSubject === 'setA' ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#021027] via-[#091e3a] to-[#0f172a] text-white rounded-2xl border border-[#C9A84C]/35 p-5 sm:p-6 shadow-md">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/35 text-blue-300 text-[10px] font-black uppercase tracking-widest mb-2">
                    <Scale size={12} />
                    <span>SPOM Set A : Statutory Compliance Simulators</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    Statutory Limits, Board Quotas &amp; Penalty Diagnostic Engine
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                    Audit compliance against key statutory thresholds under the Companies Act, 2013, SEBI (LODR), and IBC, 2016. Adjust numerical parameters to test real-time applicability triggers.
                  </p>
                </div>

                <Suspense fallback={<div className="h-48 rounded-2xl bg-slate-100 dark:bg-slate-900 animate-pulse" />}>
                  <SetALegalCalculators
                    activeCalculator={setACalcType}
                    onCalculatorChange={(calc) => setSetACalcType(calc)}
                  />
                </Suspense>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-[#021027] via-[#091e3a] to-[#0f172a] text-white rounded-2xl border border-[#C9A84C]/35 p-5 sm:p-6 shadow-md flex flex-col gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/35 text-[#C9A84C] text-[10px] font-black uppercase tracking-widest mb-2">
                      <Calculator size={12} />
                      <span>SPOM Set B : Interactive Costing &amp; Operations Sandboxes</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-white">
                      Live What-If Decision &amp; Performance Models
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                      Modify operational variables to dynamically visualize Pareto 80/20 vital defects, TPM Overall Equipment Effectiveness (OEE), Relevant Costing cash flows, and Target Costing gaps.
                    </p>
                  </div>

                  <div className="bg-slate-950/70 p-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setSandboxType('pareto')}
                      className={`px-3.5 py-2 text-xs font-extrabold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        sandboxType === 'pareto'
                          ? 'bg-[#C9A84C] text-slate-950 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                      }`}
                    >
                      Pareto Defect Graph (Case 32)
                    </button>
                    <button
                      onClick={() => setSandboxType('oee')}
                      className={`px-3.5 py-2 text-xs font-extrabold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        sandboxType === 'oee'
                          ? 'bg-[#C9A84C] text-slate-950 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                      }`}
                    >
                      TPM / OEE Loss Calculator (Case 46)
                    </button>
                    <button
                      onClick={() => setSandboxType('relevant')}
                      className={`px-3.5 py-2 text-xs font-extrabold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        sandboxType === 'relevant'
                          ? 'bg-[#C9A84C] text-slate-950 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                      }`}
                    >
                      Airlines Relevant Costing (Case 9)
                    </button>
                    <button
                      onClick={() => setSandboxType('target')}
                      className={`px-3.5 py-2 text-xs font-extrabold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        sandboxType === 'target'
                          ? 'bg-[#C9A84C] text-slate-950 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                      }`}
                    >
                      Target Cost Gap Explorer (Case 4)
                    </button>
                  </div>
                </div>

                {/* Sandbox Panel 1: Pareto Chart Defect Analyzer */}
                {sandboxType === 'pareto' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400">
                      Cylinder Head Defects Dataset (Precision Motors)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Tweak the occurrence counts for each defect type below. See how the Pareto curve and cumulative percentages adjust automatically.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-extrabold tracking-wider bg-slate-50/50">
                          <th className="py-2.5 text-left pl-3">DEFECT TYPE</th>
                          <th className="py-2.5 text-center">INSTANCES (INPUT)</th>
                          <th className="py-2.5 text-center pr-3">ADJUSTER</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {paretoDefects.map((def, idx) => (
                          <tr key={def.id} className="hover:bg-slate-50/50">
                            <td className="py-3 pl-3 font-semibold text-slate-800">{def.name}</td>
                            <td className="py-3 text-center font-bold text-slate-900">{def.count}</td>
                            <td className="py-3 text-center pr-3 space-x-1">
                              <button
                                onClick={() => {
                                  setParetoDefects(prev => prev.map(item => item.id === def.id ? { ...item, count: Math.max(0, item.count - 5) } : item));
                                }}
                                className="w-6 h-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs"
                              >
                                -
                              </button>
                              <button
                                onClick={() => {
                                  setParetoDefects(prev => prev.map(item => item.id === def.id ? { ...item, count: item.count + 5 } : item));
                                }}
                                className="w-6 h-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs"
                              >
                                +
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-amber-50 p-4 border border-amber-200 rounded-2xl flex gap-3 text-xs leading-relaxed">
                    <Info size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-700 font-medium">
                      <strong className="text-amber-900 block font-bold mb-0.5 uppercase tracking-wide text-[10px]">Pareto Principle Rule:</strong>
                      Solving the top-ranking defects (which accumulate up to 80%) optimizes resources. The simulator charts the defects in sorted order to isolate these 'vital few'.
                    </p>
                  </div>
                </div>

                {/* Pareto SVG Chart Visualization */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400">
                      Osterwalder-Aligned defect distribution
                    </h3>
                  </div>

                  {/* SVG Chart Rendering */}
                  <div className="flex-1 flex items-center justify-center p-2">
                    <svg viewBox="0 0 500 300" className="w-full h-auto max-h-[350px]">
                      {/* Grid Lines */}
                      {[0, 25, 50, 75, 100].map(yVal => {
                        const yCoord = 250 - (yVal * 2);
                        return (
                          <g key={yVal}>
                            <line x1="50" y1={yCoord} x2="450" y2={yCoord} stroke="#f1f5f9" strokeWidth="1" />
                            <text x="25" y={yCoord + 4} fill="#94a3b8" fontSize="9" fontWeight="bold">{yVal}%</text>
                            <text x="458" y={yCoord + 4} fill="#a7f3d0" fontSize="9" fontWeight="bold">{yVal}%</text>
                          </g>
                        );
                      })}

                      {/* Render Defect Bars sorted */}
                      {paretoResults.defects.map((def, idx) => {
                        const itemMax = Math.max(...paretoResults.defects.map(d => d.count), 1);
                        const scaledHeight = (def.count / itemMax) * 200;
                        const x = 60 + idx * 52;
                        const y = 250 - scaledHeight;
                        
                        // Line segment coordinates for cumulative curve
                        const cumY = 250 - (def.cumPct * 2);
                        const nextY = idx < paretoResults.defects.length - 1 ? 250 - (paretoResults.defects[idx + 1].cumPct * 2) : 0;
                        const nextX = 60 + (idx + 1) * 52 + 10;
                        
                        return (
                          <g key={idx} className="group">
                            {/* Defect Column Bar */}
                            <rect
                              x={x}
                              y={y}
                              width="28"
                              height={scaledHeight}
                              fill={def.cumPct <= 80 ? "#6366f1" : "#cbd5e1"}
                              rx="3"
                              className="transition-all duration-300"
                            />
                            {/* Instances value tooltip */}
                            <text x={x + 14} y={y - 5} fill="#334155" fontSize="8" fontWeight="bold" textAnchor="middle">
                              {def.count}
                            </text>

                            {/* Label abbreviation */}
                            <text x={x + 14} y="265" fill="#64748b" fontSize="8" fontWeight="bold" textAnchor="middle">
                              {def.name.substring(0, 5)}...
                            </text>

                            {/* Cumulative Circle Dot */}
                            <circle cx={x + 14} cy={cumY} r="4" fill="#10b981" />
                            {/* Cumulative value above the dot */}
                            <text x={x + 14} y={cumY - 7} fill="#047857" fontSize="8" fontWeight="black" textAnchor="middle">
                              {def.cumPct}%
                            </text>

                            {/* Line connecting to next dot */}
                            {idx < paretoResults.defects.length - 1 && (
                              <line
                                x1={x + 14}
                                y1={cumY}
                                x2={nextX}
                                y2={nextY}
                                stroke="#10b981"
                                strokeWidth="2"
                                strokeDasharray="1 1"
                              />
                            )}
                          </g>
                        );
                      })}

                      {/* 80% Cutoff horizontal threshold line */}
                      <line x1="50" y1="90" x2="450" y2="90" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 5" />
                      <text x="350" y="84" fill="#b45309" fontSize="9" fontWeight="bold">80% Vital Cutoff Limit</text>
                      
                      {/* Axes */}
                      <line x1="50" y1="250" x2="450" y2="250" stroke="#94a3b8" strokeWidth="1.5" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                    <div className="p-2">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Total Defect Count</span>
                      <p className="text-base font-black text-slate-800 mt-1">{paretoResults.totalCount}</p>
                    </div>
                    <div className="p-2 border-l border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Vital categories (≤ 80%)</span>
                      <p className="text-base font-black text-indigo-600 mt-1">
                        {paretoResults.defects.filter(d => d.cumPct <= 80).length} Defect Types
                      </p>
                    </div>
                    <div className="p-2 border-l border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Top Defect</span>
                      <p className="text-base font-black text-emerald-600 mt-1 truncate" title={paretoResults.defects[0]?.name}>
                        {paretoResults.defects[0]?.name || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sandbox Panel 2: OEE Loss Calculator */}
            {sandboxType === 'oee' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400">
                      TPM Shift inputs (sigma case 46 details)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">Scheduled Shift Length (hrs)</label>
                      <input
                        type="number"
                        value={oeeParams.shiftHours}
                        onChange={e => setOeeParams({ ...oeeParams, shiftHours: Math.max(1, parseNum(e.target.value)) })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-bold bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">Planned Breaks / Meal (mins)</label>
                      <input
                        type="number"
                        value={oeeParams.plannedBreaks}
                        onChange={e => setOeeParams({ ...oeeParams, plannedBreaks: parseNum(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-bold bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 font-mono text-indigo-600">Breakdown Downtime (mins)</label>
                      <input
                        type="number"
                        value={oeeParams.unplannedDowntime}
                        onChange={e => setOeeParams({ ...oeeParams, unplannedDowntime: parseNum(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-bold bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 font-mono text-violet-600">Design speed (parts/min)</label>
                      <input
                        type="number"
                        value={oeeParams.idealSpeedPPM}
                        onChange={e => setOeeParams({ ...oeeParams, idealSpeedPPM: Math.max(1, parseNum(e.target.value)) })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-bold bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">Actual Manufactured Output (units)</label>
                      <input
                        type="number"
                        value={oeeParams.totalOutput}
                        onChange={e => setOeeParams({ ...oeeParams, totalOutput: parseNum(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-bold bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 font-mono text-emerald-600">Rejected Quality defects (units)</label>
                      <input
                        type="number"
                        value={oeeParams.rejections}
                        onChange={e => setOeeParams({ ...oeeParams, rejections: parseNum(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-bold bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                    <span className="font-extrabold text-[10px] text-slate-400 uppercase tracking-widest block">Standard calculations ledger</span>
                    <div className="flex justify-between border-b border-slate-100 py-1">
                      <span className="text-slate-500">Gross Shift Minutes:</span>
                      <strong className="text-slate-800">{oeeResults.totalMinutes} mins</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 py-1">
                      <span className="text-slate-500">Net Available (Planned Prod):</span>
                      <strong className="text-slate-800">{oeeResults.netAvailableMinutes} mins</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 py-1">
                      <span className="text-slate-500">Net Operating time (NOT):</span>
                      <strong className="text-slate-800 font-mono text-indigo-700">{oeeResults.netOperatingMinutes} mins</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 py-1">
                      <span className="text-slate-500">Ideal Operating time (IOT):</span>
                      <strong className="text-slate-800 font-mono text-violet-700">{oeeResults.idealOperatingMinutes.toFixed(1)} mins</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Lost Operating time (LOT):</span>
                      <strong className="text-slate-800 font-mono text-emerald-700">{oeeResults.lostOperatingMinutes.toFixed(1)} mins</strong>
                    </div>
                  </div>
                </div>

                {/* OEE visual breakdown rendering */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400">
                      Overall Equipment Effectiveness (OEE) metrics
                    </h3>
                  </div>

                  <div className="space-y-4 py-4 flex-1 flex flex-col justify-center">
                    {/* Rate 1: Availability */}
                    <div className="space-y-1.1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-600">Availability Rate (NOT / Net Available)</span>
                        <span className="text-indigo-600 font-extrabold">{oeeResults.availabilityPct.toFixed(2)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="bg-indigo-500 h-full transition-all duration-1000 ease-out"
                          style={{ width: `${Math.min(100, oeeAnimatedValues.availabilityPct)}%` }}
                        />
                      </div>
                    </div>

                    {/* Rate 2: Performance */}
                    <div className="space-y-1.1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-600">Performance Speed Rate (IOT / NOT)</span>
                        <span className="text-violet-600 font-extrabold">{oeeResults.performancePct.toFixed(2)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="bg-violet-500 h-full transition-all duration-1000 ease-out"
                          style={{ width: `${Math.min(100, oeeAnimatedValues.performancePct)}%` }}
                        />
                      </div>
                    </div>

                    {/* Rate 3: Quality */}
                    <div className="space-y-1.1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-600">Quality Reject rate (Good units / Gross parts)</span>
                        <span className="text-emerald-700 font-extrabold">{oeeResults.qualityPct.toFixed(2)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="bg-emerald-500 h-full transition-all duration-1000 ease-out"
                          style={{ width: `${Math.min(100, oeeAnimatedValues.qualityPct)}%` }}
                        />
                      </div>
                    </div>

                    {/* Overall OEE glow card */}
                    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-4 text-center mt-4 border border-indigo-500/20 shadow-md">
                      <span className="text-[10px] font-extrabold tracking-widest text-emerald-400 uppercase">
                        Combined result
                      </span>
                      <p className="text-3xl font-black mt-1 font-mono text-emerald-300">
                        {oeeResults.oeePct.toFixed(2)}%
                      </p>
                      <p className="text-[10px] text-slate-300 mt-1 leading-snug">
                        Calculated as: Availability x Performance x Quality. Typically, world-class OEE target is considered above 85.0%.
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              {/* TPM 6 Major Losses Breakdown - Newly Added */}
              <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-6 mt-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                      <span className="p-1 px-2 rounded-lg bg-pink-100 text-pink-700 text-xs font-mono">TPM</span>
                      Deconstruction of TPM's 6 Major Losses
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Breakdown of where availability, performance, and quality are leakages and how they strategically pull down OEE.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-500 block">Total OEE Capacity Loss</span>
                    <span className="text-lg font-black text-rose-600 font-mono">
                      -{(100 - oeeResults.oeePct).toFixed(2)}% (pts)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Loss 1: Breakdowns */}
                  <div className="bg-white rounded-2xl border border-slate-200/75 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded-full">
                          Availability Loss
                        </span>
                        <span className="text-xs font-mono font-bold text-rose-600">
                          -{oeeResults.losses.loss1.impact.toFixed(2)}% OEE
                        </span>
                      </div>
                      <h5 className="font-bold text-slate-800 text-sm">{oeeResults.losses.loss1.name}</h5>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Unplanned equipment fail, tooling downtime or technical asset breakdowns during operational runs.
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 font-sans">
                      <span>Allocated Duration:</span>
                      <span className="font-mono text-slate-800">{oeeResults.losses.loss1.amount.toFixed(1)} mins</span>
                    </div>
                  </div>

                  {/* Loss 2: Setup & Adjustments */}
                  <div className="bg-white rounded-2xl border border-slate-200/75 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded-full">
                          Availability Loss
                        </span>
                        <span className="text-xs font-mono font-bold text-rose-600">
                          -{oeeResults.losses.loss2.impact.toFixed(2)}% OEE
                        </span>
                      </div>
                      <h5 className="font-bold text-slate-800 text-sm">{oeeResults.losses.loss2.name}</h5>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Downtime for setups, part changeovers, tooling adjustments, or calibration activities.
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 font-sans">
                      <span>Allocated Duration:</span>
                      <span className="font-mono text-slate-800">{oeeResults.losses.loss2.amount.toFixed(1)} mins</span>
                    </div>
                  </div>

                  {/* Loss 3: Idling & Minor Stops */}
                  <div className="bg-white rounded-2xl border border-slate-200/75 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black tracking-widest text-violet-600 uppercase bg-violet-50 px-2 py-0.5 rounded-full">
                          Performance Loss
                        </span>
                        <span className="text-xs font-mono font-bold text-rose-600">
                          -{oeeResults.losses.loss3.impact.toFixed(2)}% OEE
                        </span>
                      </div>
                      <h5 className="font-bold text-slate-800 text-sm">{oeeResults.losses.loss3.name}</h5>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Short stoppers, minor line jams, or sensor delays causing brief idle states (usually not counted as downtime).
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 font-sans">
                      <span>Performance Gap:</span>
                      <span className="font-mono text-slate-800">{oeeResults.losses.loss3.amount.toFixed(1)} mins</span>
                    </div>
                  </div>

                  {/* Loss 4: Reduced Operation Speed */}
                  <div className="bg-white rounded-2xl border border-slate-200/75 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black tracking-widest text-violet-600 uppercase bg-violet-50 px-2 py-0.5 rounded-full">
                          Performance Loss
                        </span>
                        <span className="text-xs font-mono font-bold text-rose-600">
                          -{oeeResults.losses.loss4.impact.toFixed(2)}% OEE
                        </span>
                      </div>
                      <h5 className="font-bold text-slate-800 text-sm">{oeeResults.losses.loss4.name}</h5>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Equipment running below its ideal designed cycle speed/capacity limits.
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 font-sans font-sans">
                      <span>Speed Deficit:</span>
                      <span className="font-mono text-slate-800">{oeeResults.losses.loss4.amount.toFixed(1)} mins eq.</span>
                    </div>
                  </div>

                  {/* Loss 5: Production Defects & Scrap */}
                  <div className="bg-white rounded-2xl border border-slate-200/75 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black tracking-widest text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded-full">
                          Quality Loss
                        </span>
                        <span className="text-xs font-mono font-bold text-rose-600">
                          -{oeeResults.losses.loss5.impact.toFixed(2)}% OEE
                        </span>
                      </div>
                      <h5 className="font-bold text-slate-800 text-sm">{oeeResults.losses.loss5.name}</h5>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Material scrap and rework generated during steady-state production runs.
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 font-sans">
                      <span>Rejected Units:</span>
                      <span className="font-mono text-slate-800">{oeeResults.losses.loss5.amount.toFixed(0)} units</span>
                    </div>
                  </div>

                  {/* Loss 6: Warmup Yield Losses */}
                  <div className="bg-white rounded-2xl border border-slate-200/75 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black tracking-widest text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded-full">
                          Quality Loss
                        </span>
                        <span className="text-xs font-mono font-bold text-rose-600">
                          -{oeeResults.losses.loss6.impact.toFixed(2)}% OEE
                        </span>
                      </div>
                      <h5 className="font-bold text-slate-800 text-sm">{oeeResults.losses.loss6.name}</h5>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Scrap and yield losses that occur during project startup or tool warm-up sequences.
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 font-sans">
                      <span>Warmup Defects:</span>
                      <span className="font-mono text-slate-800">{oeeResults.losses.loss6.amount.toFixed(0)} units</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

            {/* Sandbox Panel 3: Airlines Relevant Costing statement */}
            {sandboxType === 'relevant' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Inputs table left side (span 5) */}
                <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400">
                      Flight continuous parameters
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Fictional passenger occupancy count</label>
                      <input
                        type="number"
                        value={airlineParams.occupancy}
                        onChange={e => setAirlineParams({ ...airlineParams, occupancy: Math.min(100, Math.max(0, parseNum(e.target.value))) })}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-slate-50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Ticket fare price per user (₹)</label>
                      <input
                        type="number"
                        value={airlineParams.ticketPrice}
                        onChange={e => setAirlineParams({ ...airlineParams, ticketPrice: parseNum(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-slate-50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Varying fuel expense (₹)</label>
                      <input
                        type="number"
                        value={airlineParams.fuelCost}
                        onChange={e => setAirlineParams({ ...airlineParams, fuelCost: parseNum(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-slate-50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Assistant contractual payment per flight (₹)</label>
                      <input
                        type="number"
                        value={airlineParams.assistantCostPerFlight}
                        onChange={e => setAirlineParams({ ...airlineParams, assistantCostPerFlight: parseNum(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-slate-50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-[#b45309]">Sunk fixed crew annual salaries (₹)</label>
                      <input
                        type="number"
                        value={airlineParams.crewSalaryFixed}
                        onChange={e => setAirlineParams({ ...airlineParams, crewSalaryFixed: parseNum(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-[#fef3c7] font-bold bg-[#fffbeb] text-[#92400e]"
                      />
                    </div>
                  </div>
                </div>

                {/* Comparative Ledger Statement right side (span 8) */}
                <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400">
                      Comprehensive Relevant Cost accounting report
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-extrabold tracking-wider bg-slate-50/50">
                          <th className="py-2 pl-3">COST HEAD LEDGER</th>
                          <th className="py-2 text-right">CONTRACT VALUE</th>
                          <th className="py-2 text-center">IS RELEVANT?</th>
                          <th className="py-2 text-right pr-3">RELEVANT PORTION VALUE (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {/* Revenues */}
                        <tr className="text-indigo-800 font-bold bg-indigo-50/20">
                          <td className="py-2.5 pl-3">Ticket revenue stream</td>
                          <td className="py-2.5 text-right">₹{airlineResults.revenue.toLocaleString()}</td>
                          <td className="py-2.5 text-center text-teal-600">YES (Inflow)</td>
                          <td className="py-2.5 text-right pr-3">₹{airlineResults.revenue.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pl-3">Avoidable Variable passenger costs</td>
                          <td className="py-2.5 text-right">₹{airlineResults.variableCost.toLocaleString()}</td>
                          <td className="py-2.5 text-center text-teal-600">YES (Outflow)</td>
                          <td className="py-2.5 text-right pr-3">-₹{airlineResults.variableCost.toLocaleString()}</td>
                        </tr>
                        {/* Avoidables */}
                        <tr>
                          <td className="py-2.5 pl-3">Aviation Fuel (incremental)</td>
                          <td className="py-2.5 text-right">₹{parseNum(airlineParams.fuelCost).toLocaleString()}</td>
                          <td className="py-2.5 text-center text-teal-600">YES</td>
                          <td className="py-2.5 text-right pr-3">-₹{parseNum(airlineParams.fuelCost).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pl-3">Contractual flight assistant wages</td>
                          <td className="py-2.5 text-right">₹{parseNum(airlineParams.assistantCostPerFlight).toLocaleString()}</td>
                          <td className="py-2.5 text-center text-teal-600">YES</td>
                          <td className="py-2.5 text-right pr-3">-₹{parseNum(airlineParams.assistantCostPerFlight).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pl-3">Specific sector insurance premium (1/3rd)</td>
                          <td className="py-2.5 text-right">₹{parseNum(airlineParams.attributableInsuranceThird).toLocaleString()}</td>
                          <td className="py-2.5 text-center text-teal-600">YES</td>
                          <td className="py-2.5 text-right pr-3">-₹{parseNum(airlineParams.attributableInsuranceThird).toLocaleString()}</td>
                        </tr>
                        {/* Irrelevant Sunk ones */}
                        <tr className="bg-orange-50/30 text-slate-500 font-normal italic">
                          <td className="py-2.5 pl-3">Annual fixed pilots salaries</td>
                          <td className="py-2.5 text-right">₹{parseNum(airlineParams.crewSalaryFixed).toLocaleString()}</td>
                          <td className="py-2.5 text-center text-amber-700">NO (Sunk contract)</td>
                          <td className="py-2.5 text-right pr-3">₹0</td>
                        </tr>
                        <tr className="bg-orange-50/30 text-slate-500 font-normal italic">
                          <td className="py-2.5 pl-3">Ground handling allotted overhead</td>
                          <td className="py-2.5 text-right">₹{parseNum(airlineParams.groundHandlingAllocated).toLocaleString()}</td>
                          <td className="py-2.5 text-center text-amber-700">NO (Apportioned)</td>
                          <td className="py-2.5 text-right pr-3">₹0</td>
                        </tr>
                        <tr className="bg-orange-50/30 text-slate-500 font-normal italic">
                          <td className="py-2.5 pl-3">General aircraft depreciation</td>
                          <td className="py-2.5 text-right">₹{parseNum(airlineParams.aircraftDepreciationSunk).toLocaleString()}</td>
                          <td className="py-2.5 text-center text-amber-700">NO (Sunk book)</td>
                          <td className="py-2.5 text-right pr-3">₹0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800/60 text-teal-900 dark:text-teal-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center mt-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-teal-300 tracking-wider">Continuance Decision Verdict</span>
                      <p className="text-xs text-teal-800 dark:text-teal-200 leading-snug mt-1">
                        Although the traditional book ledger shows loss due to apportioned charges, continuing the route yields positive cash flows.
                      </p>
                    </div>
                    <div className="text-right mt-3 sm:mt-0 font-extrabold text-sm sm:text-base text-emerald-800 dark:text-emerald-300">
                      Net Route continuation Benefit: <span className="font-black text-xl text-emerald-600 dark:text-emerald-400">₹{airlineResults.netContinuationGain.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sandbox Panel 4: Target Cost gap matrices */}
            {sandboxType === 'target' && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-base tracking-tight text-slate-900">
                    Surgical Target Costing sandbox and gross waste closing
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Set targeted parameters. Lowering direct fabrics, labor timelines, or molding wastage % can instantly help close the targeted 'cost gap'. Refer to Cellwell Technology Case 4.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category 1: Selling Parameters */}
                  <div className="space-y-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Selling Price limits</h4>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 block">Planned Retail Price (₹)</label>
                      <input
                        type="number"
                        value={targetParams.sellingPrice}
                        onChange={e => setTargetParams({ ...targetParams, sellingPrice: parseNum(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 block">Target profit margin %</label>
                      <input
                        type="number"
                        value={targetParams.targetProfitPct}
                        onChange={e => setTargetParams({ ...targetParams, targetProfitPct: parseNum(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                      />
                    </div>
                  </div>

                  {/* Category 2: Labor & Overhead conversion */}
                  <div className="space-y-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-violet-600">Labor & Overhead Conversion</h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500 block">Labor Assembly Hours</label>
                        <input
                          type="number"
                          step="0.1"
                          value={targetParams.laborHours}
                          onChange={e => setTargetParams({ ...targetParams, laborHours: parseNum(e.target.value) })}
                          className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500 block">Labor Rate / Hr(₹)</label>
                        <input
                          type="number"
                          value={targetParams.laborRate}
                          onChange={e => setTargetParams({ ...targetParams, laborRate: parseNum(e.target.value) })}
                          className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 block">Tooling Specific Overheads (₹)</label>
                      <input
                        type="number"
                        value={targetParams.toolingOverhead}
                        onChange={e => setTargetParams({ ...targetParams, toolingOverhead: parseNum(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                      />
                    </div>
                  </div>

                  {/* Category 3: Raw materials with conversion wastes */}
                  <div className="space-y-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600">Material conversion Wastes</h4>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 block">Core purchase fabric cost (₹)</label>
                      <input
                        type="number"
                        value={targetParams.componentCost}
                        onChange={e => setTargetParams({ ...targetParams, componentCost: parseNum(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500 block">Plastic Net kg</label>
                        <input
                          type="number"
                          step="0.05"
                          value={targetParams.customMaterialNetKG}
                          onChange={e => setTargetParams({ ...targetParams, customMaterialNetKG: parseNum(e.target.value) })}
                          className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500 block">Wastage %</label>
                        <input
                          type="number"
                          value={targetParams.normalWastagePct}
                          onChange={e => setTargetParams({ ...targetParams, normalWastagePct: parseNum(e.target.value) })}
                          className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border border-slate-100 rounded-3xl bg-slate-50/50">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-150">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Target Profit Margin </span>
                    <p className="text-xl font-extrabold text-indigo-600 mt-1">₹{targetResults.targetProfit.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Based on target profit %</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-150">
                    <span className="text-[10px] uppercase font-bold text-indigo-500">Allowable Target Cost</span>
                    <p className="text-xl font-extrabold text-indigo-700 mt-1">₹{targetResults.targetCost.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Surgical ceiling price limits</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-150">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Actual Cost</span>
                    <p className="text-xl font-extrabold text-slate-800 mt-1">₹{targetResults.totalActualCost.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Sum of modular inputs & gross waste</p>
                  </div>

                  <div className={`p-4 rounded-2xl shadow-md border ${targetResults.costGap > 0 ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
                    <span className="text-[10px] uppercase font-bold tracking-wider">Unsatisfied Cost Gap</span>
                    <p className={`text-xl font-black mt-1 ${targetResults.costGap > 0 ? 'text-rose-600 animate-pulse' : 'text-emerald-600'}`}>
                      ₹{targetResults.costGap.toLocaleString()}
                    </p>
                    <p className="text-[10px] mt-1">{targetResults.costGap > 0 ? 'Engineers must apply value analysis to close gap.' : 'Cost requirement successfully met!'}</p>
                  </div>
                </div>
              </div>
            )}
            </>
            )}
          </div>
        )}
        </main>

        {/* Global Study Notepad Sidebar */}
        {showGlobalNotepad && (
          <aside className="w-full lg:w-80 xl:w-[350px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 backdrop-blur-md flex flex-col p-5 select-text animate-slideIn shadow-xl lg:shadow-none lg:bg-slate-50/10 dark:lg:bg-slate-950/20">
            {/* Header of Notepad */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <StickyNote className="text-emerald-500 animate-pulse" size={16} />
                <h3 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-widest font-mono">
                  Study Notepad
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200/50 dark:border-slate-800/80">
                  Auto-Save
                </span>
                <button
                  onClick={() => setShowGlobalNotepad(false)}
                  className="p-1 hover:bg-slate-105 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-705 dark:hover:text-slate-200 transition-all cursor-pointer"
                  title="Close Notepad Workspace"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Subject Specific Quick Helper templates */}
            <div className="py-2 flex flex-wrap gap-1 border-b border-slate-200/60 dark:border-slate-800/60 font-mono text-[9px] select-none">
              <span className="text-[8px] text-slate-400 font-bold uppercase py-0.5 mr-1 self-center">Insert Boilerplate:</span>
              {activeSubject === 'setA' ? (
                <>
                  <button
                    onClick={() => handleInsertTemplate("Sec 149(4) ID Thresholds:\n• Paid-up Capital >= Rs. 10 Cr\n• Turnover >= Rs. 100 Cr\n• Borrowings > Rs. 50 Cr (strictly >)\n• Appoint min 2 Independent Directors")}
                    className="bg-slate-50 dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-slate-600 dark:text-slate-400 hover:text-blue-500 px-1.5 py-0.5 rounded border border-slate-200/40 dark:border-slate-800/60 cursor-pointer text-[8px]"
                  >
                    Sec 149(4) ID
                  </button>
                  <button
                    onClick={() => handleInsertTemplate("Sec 197 Remuneration Ceilings:\n• Overall public co = 11% Net Profits\n• 1 MD/WTD = 5% Max\n• >1 MD/WTD = 10% Combined Max\n• NEDs = 1% (if MD exists) / 3% (no MD)")}
                    className="bg-slate-50 dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-slate-600 dark:text-slate-400 hover:text-blue-500 px-1.5 py-0.5 rounded border border-slate-200/40 dark:border-slate-800/60 cursor-pointer text-[8px]"
                  >
                    Sec 197 Caps
                  </button>
                  <button
                    onClick={() => handleInsertTemplate("IBC CIRP Timelines (Sec 12):\n• Base: 180 days\n• Extension: +90 days (66% CoC vote)\n• Outer Cap: 330 days (mandatory)\n• Default Floor: >= Rs. 1 Crore (Sec 4)")}
                    className="bg-slate-50 dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-slate-600 dark:text-slate-400 hover:text-blue-500 px-1.5 py-0.5 rounded border border-slate-200/40 dark:border-slate-800/60 cursor-pointer text-[8px]"
                  >
                    IBC Timeline
                  </button>
                  <button
                    onClick={() => handleInsertTemplate("FEMA Sec 2(v) PRII Departure Test:\n• Preceding year stay > 182 days\n• If departs for employment/vocation/uncertain stay -> PROI immediately upon departure")}
                    className="bg-slate-50 dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-slate-600 dark:text-slate-400 hover:text-blue-500 px-1.5 py-0.5 rounded border border-slate-200/40 dark:border-slate-800/60 cursor-pointer text-[8px]"
                  >
                    FEMA PRII
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleInsertTemplate("OEE = Availability x Performance x Quality\n• Avail = Actual Run Time / Planned Prod Time\n• Perf = (Ideal Cycle Time x Total Count) / Run Time\n• Qual = Good Count / Total Count")}
                    className="bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 px-1.5 py-0.5 rounded border border-slate-200/40 dark:border-slate-800/60 cursor-pointer text-[8px]"
                  >
                    OEE
                  </button>
                  <button
                    onClick={() => handleInsertTemplate("Min Transfer Price = Marginal Cost + Opportunity Cost\nMax Transfer Price = Lower of Market Price OR Buyer's net benefit")}
                    className="bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 px-1.5 py-0.5 rounded border border-slate-200/40 dark:border-slate-800/60 cursor-pointer text-[8px]"
                  >
                    Transfer Pricing
                  </button>
                  <button
                    onClick={() => handleInsertTemplate("Target Cost = Target Selling Price - Target Profit Margin\nCost Gap = Estimated cost - Target cost")}
                    className="bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 px-1.5 py-0.5 rounded border border-slate-200/40 dark:border-slate-800/60 cursor-pointer text-[8px]"
                  >
                    Target Cost
                  </button>
                  <button
                    onClick={() => handleInsertTemplate("Material Price Variance = Actual Qty x (Std Price - Actual Price)\nMaterial Usage Variance = Std Price x (Std Qty - Actual Qty)\nLabor Rate Variance = Actual Hours x (Std Rate - Actual Rate)\nLabor Efficiency Variance = Std Rate x (Std Hours - Actual Hours)")}
                    className="bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 px-1.5 py-0.5 rounded border border-slate-200/40 dark:border-slate-800/60 cursor-pointer text-[8px]"
                  >
                    Variances
                  </button>
                </>
              )}
            </div>

            {/* Writing Area */}
            <div className="flex-1 relative mt-3 flex flex-col min-h-[250px] lg:min-h-0">
              <textarea
                value={globalNotepadText}
                onChange={(e) => setGlobalNotepadText(e.target.value)}
                placeholder="💡 Scribble formulas, chapter notes, mock-exam answers or memory aids here.

Your text persists continuously in your browser and stays accessible across all tabs (Dashboard, Case Practice, Revision Cards, and Kalkulator Sandbox) for prompt reference!"
                className="flex-1 w-full text-slate-800 dark:text-slate-100 bg-transparent resize-none focus:outline-none text-[11.5px] leading-relaxed font-mono scrollbar-thin select-text p-1 placeholder:text-slate-405 dark:placeholder:text-slate-600"
              />
            </div>

            {/* Bottom Actions */}
            <div className="pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 select-none">
              <div className="flex items-center gap-1">
                <span>{globalNotepadText.length} chars</span>
                <span>•</span>
                <span>{globalNotepadText.split(/\s+/).filter(Boolean).length} words</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const blob = new Blob([globalNotepadText], { type: "text/plain;charset=utf-8" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `SCM-PE_Study_Notepad_${new Date().toISOString().slice(0, 10)}.txt`;
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="hover:text-emerald-500 hover:underline active:scale-95 transition-all cursor-pointer font-bold"
                  title="Download notes as .txt file"
                >
                  Download .TXT
                </button>
                <span>|</span>
                <button
                  onClick={() => {
                    if (confirm("Reset and clear all study notes in notepad?")) {
                      setGlobalNotepadText("");
                    }
                  }}
                  className="hover:text-rose-500 active:scale-95 transition-all cursor-pointer font-bold"
                  title="Clear study notes"
                >
                  Clear Notes
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Full-Width Evenly Distributed Sitemap Footer with practACE Branding, Direct Navigation & Legal Governance */}
      <footer className="w-full bg-[#021027] text-slate-400 text-xs pt-10 pb-8 px-6 sm:px-10 lg:px-14 xl:px-20 border-t border-[#C9A84C]/35 tracking-wide mt-12 relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A84C]/80 via-amber-300/60 to-blue-500/80" />
        <div className="w-full max-w-[1600px] mx-auto space-y-8">
          {/* Top 4-Column Evenly Spread Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16 items-start justify-between text-left w-full">
            {/* Column 1: Brand Identity, Motto & Community */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <img
                  src={practAceLogoImg}
                  alt="practACE Logo"
                  width={386}
                  height={100}
                  loading="lazy"
                  decoding="async"
                  className="h-9 sm:h-10 w-auto object-contain shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left space-y-0.5">
                  <span className="text-white font-black text-sm tracking-wide block leading-tight">
                    pract<span className="text-[#C9A84C]">ACE</span>
                  </span>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#C9A84C] block">
                    Plan &nbsp; Revise &nbsp; Analyse &nbsp; Correct &nbsp; Track
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
                Complete CA Final Self-Paced Online Module (SPOM) preparation workspace for <strong className="text-slate-200">Set A (Corporate &amp; Economic Laws)</strong> and <strong className="text-slate-200">Set B (Strategic Cost &amp; Performance Management)</strong>.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <a
                  href="https://www.linkedin.com/company/pract-ace/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-[#0A66C2]/25 text-slate-200 hover:text-sky-300 border border-slate-700 hover:border-[#0A66C2]/60 text-[11px] font-bold transition-all"
                  title="Visit practACE on LinkedIn"
                >
                  <Linkedin size={12} className="text-sky-400" />
                  <span>LinkedIn</span>
                  <ExternalLink size={10} className="opacity-70" />
                </a>
                <a
                  href="https://discord.gg/buecjd45u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-[#5865F2]/25 text-slate-200 hover:text-indigo-300 border border-slate-700 hover:border-[#5865F2]/60 text-[11px] font-bold transition-all"
                  title="Join practACE Discord Community"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-3.5 h-3.5 text-indigo-400"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  <span>Discord</span>
                  <ExternalLink size={10} className="opacity-70" />
                </a>
                <a
                  href="https://forms.gle/PzWDLK1F3PsobrFL6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-[#C9A84C]/20 text-slate-200 hover:text-amber-300 border border-slate-700 hover:border-[#C9A84C]/60 text-[11px] font-bold transition-all whitespace-nowrap"
                  title="Share Feedback on practACE"
                >
                  <MessageSquare size={12} className="text-[#C9A84C]" />
                  <span>Feedback</span>
                  <ExternalLink size={10} className="opacity-70" />
                </a>
              </div>
            </div>

            {/* Column 2: Study & Revision Modules */}
            <div className="space-y-3 lg:justify-self-center">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#C9A84C] pb-1 border-b border-slate-800/80">
                Study &amp; Revision Modules
              </h4>
              <ul className="space-y-2 text-[11px] font-semibold">
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                    <span>Portal Dashboard &amp; Analytics</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('revision'); setRevisionSubView('study'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                    <span>Revision Deck &amp; Crux Notes</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('revision'); setRevisionSubView(activeSubject === 'setA' ? 'study' : 'frameworks'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                    <span>Statutory &amp; Concept Blueprints</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('revision'); setRevisionSubView('flashcards'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                    <span>Active Recall Flashcards (220+)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('sandbox'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                    <span>Statutory &amp; Decision Calculators</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Practice, Mocks & Tools */}
            <div className="space-y-3 lg:justify-self-center">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#C9A84C] pb-1 border-b border-slate-800/80">
                Practice &amp; Exam Engines
              </h4>
              <ul className="space-y-2 text-[11px] font-semibold">
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('practice'); setPracticeSubTab('cases'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                    <span>ICAI Case Scenarios Vault (80)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('practice'); setPracticeSubTab('general'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                    <span>Standalone Chapter-Wise MCQs</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('practice'); setPracticeSubTab('saved'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                    <span>Saved Questions Revision Vault</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('mock'); handleStartMockExam(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                    <span>Timed SPOM Mock Simulator</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setShowGlobalNotepad((prev) => !prev)}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                    <span>Global Study Scratchpad &amp; PDF</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Subjects & Sitemap Directory */}
            <div className="space-y-3 lg:justify-self-end">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#C9A84C] pb-1 border-b border-slate-800/80">
                SPOM Subjects &amp; Directory
              </h4>
              <ul className="space-y-2 text-[11px] font-semibold">
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveSubject('setA'); setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-300 hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400" />
                    <span>Set A: Corporate &amp; Economic Laws (14 Chaps)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveSubject('setB'); setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                    <span>Set B: Strategic Cost Management (10 Chaps)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalDoc('sitemap')}
                    className="text-[#C9A84C] hover:underline font-black transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                    <span>Full Interactive Site Map →</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setShowSetAAnnouncement(true)}
                    className="text-slate-300 hover:text-[#C9A84C] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/70" />
                    <span>What&apos;s New in practACE</span>
                  </button>
                </li>
                <li>
                  <a
                    href="./sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#C9A84C] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-500" />
                    <span>XML Sitemap Index</span>
                    <ExternalLink size={10} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal, Security & Governance Bar — Evenly Distributed Full Width */}
          <div className="pt-5 border-t border-slate-800/90 flex flex-col xl:flex-row items-center justify-between gap-4 text-[11px] w-full">
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-x-6 gap-y-2 font-bold">
              {legalDocTabs.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setActiveLegalDoc(doc.id)}
                  className="text-slate-300 hover:text-[#C9A84C] hover:underline transition-colors cursor-pointer whitespace-nowrap"
                >
                  {doc.shortLabel}
                </button>
              ))}
            </div>
            <p className="text-slate-400 text-center xl:text-right">
              © {new Date().getFullYear()} practACE. Independent educational preparation platform; not affiliated with or endorsed by ICAI.
            </p>
          </div>
        </div>
      </footer>
      {renderLegalDocumentationModal()}

      {/* =========================================================================
          OPENING WELCOME POP-UP: 1. pract.CA TO practACE  |  2. INTRO OF SET A
          ========================================================================= */}
      {showSetAAnnouncement && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to practACE"
        >
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#0b1124] rounded-2xl border border-[#C9A84C]/50 shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[94vh]">
            
            {/* 1. EXECUTIVE DARK NAVY BRAND STAGE (Full-Bleed Top Banner) */}
            <div className="bg-[#021027] border-b border-[#C9A84C]/40 px-5 sm:px-7 pt-4 pb-5 relative shrink-0">
              {/* Top Golden Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A84C] via-amber-300 to-blue-500" />

              {/* Top Bar: Welcome Tag + Transition Pill + Close Button */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#C9A84C]/15 border border-[#C9A84C]/40 text-[#C9A84C] text-[10px] font-black uppercase tracking-widest">
                    <Sparkles size={11} />
                    <span>Welcome to practACE</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[10px] font-mono font-bold">
                    <span className="line-through text-slate-400">pract.CA</span>
                    <ArrowRight size={10} className="text-[#C9A84C]" />
                    <span className="text-white font-black">pract<span className="text-[#C9A84C]">ACE</span></span>
                  </span>
                </div>

                <button
                  onClick={() => handleCloseSetAAnnouncement(false)}
                  aria-label="Close Welcome Pop-up"
                  className="p-1.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/15 rounded-lg transition-all cursor-pointer"
                  title="Close Welcome Pop-up"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Brand Identity Showcase: Logo + Welcome Message */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="shrink-0">
                  <img
                    src={practAceLogoImg}
                    alt="practACE — Plan Revise Analyse Correct Track"
                    width={386}
                    height={100}
                    fetchPriority="high"
                    decoding="sync"
                    className="h-12 sm:h-14 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <h2 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                    Welcome to <span className="text-white">pract</span><span className="text-[#C9A84C]">ACE</span> — Evolved from pract.CA &amp; Now With SPOM Set A
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-slate-200">pract.CA</strong> is now <strong className="text-[#C9A84C]">practACE</strong> — your complete CA Final SPOM preparation workspace covering both <strong className="text-blue-400">Set A (Corporate &amp; Economic Laws)</strong> and <strong className="text-[#C9A84C]">Set B (SCMPE)</strong>.
                  </p>
                </div>
              </div>

              {/* 5-Pillar P-R-A-C-T Acronym Strip */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mt-4 pt-3.5 border-t border-slate-800/90">
                {[
                  { letter: 'P', word: 'Plan', desc: 'Chapter Matrix' },
                  { letter: 'R', word: 'Revise', desc: 'Statutory Deck' },
                  { letter: 'A', word: 'Analyse', desc: '80 Case Studies' },
                  { letter: 'C', word: 'Correct', desc: 'Saved Qs Vault' },
                  { letter: 'T', word: 'Track', desc: 'Solved vs Pending' }
                ].map((pillar, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/90 border border-slate-800 hover:border-[#C9A84C]/40 rounded-lg px-2 py-1.5 text-center transition-colors"
                  >
                    <div className="text-[11px] sm:text-xs font-black tracking-wide text-white">
                      <span className="text-[#C9A84C] font-mono mr-0.5">{pillar.letter}</span>
                      <span>{pillar.word.slice(1)}</span>
                    </div>
                    <div className="text-[9px] text-slate-400 font-medium hidden sm:block truncate">
                      {pillar.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. SCROLLABLE STRUCTURED BODY */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin text-left bg-slate-50/60 dark:bg-[#0b1124]">
              
              {/* At-a-Glance Curriculum Scale Strip (4 Static Metric Boxes) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-white dark:bg-[#111936] border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-center shadow-2xs">
                  <div className="text-lg sm:text-xl font-black font-mono text-[#C9A84C] leading-none">
                    800+
                  </div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                    Practice MCQs
                  </div>
                </div>
                <div className="bg-white dark:bg-[#111936] border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-center shadow-2xs">
                  <div className="text-lg sm:text-xl font-black font-mono text-blue-600 dark:text-blue-400 leading-none">
                    65 + 15
                  </div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                    ICAI Case Studies
                  </div>
                </div>
                <div className="bg-white dark:bg-[#111936] border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-center shadow-2xs">
                  <div className="text-lg sm:text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 leading-none">
                    24 Chapters
                  </div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                    Set A (14) + Set B (10)
                  </div>
                </div>
                <div className="bg-white dark:bg-[#111936] border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-center shadow-2xs">
                  <div className="text-lg sm:text-xl font-black font-mono text-indigo-600 dark:text-indigo-400 leading-none">
                    220+ Cards
                  </div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                    Flashcards &amp; Calcs
                  </div>
                </div>
              </div>

              {/* Two-Column Ordered Welcome Matrix: 1st = pract.CA to practACE, 2nd = Intro of Set A */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1st Card: pract.CA to practACE Rebrand & Platform Suite */}
                <div className="bg-white dark:bg-[#111936] rounded-2xl border border-amber-200/80 dark:border-amber-900/40 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-[#C9A84C] text-slate-950">
                          <BarChart2 size={14} />
                        </span>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 dark:text-[#C9A84C] block">
                            1. Brand Evolution
                          </span>
                          <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                            pract.CA → practACE
                          </h3>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        01
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-amber-600 dark:text-[#C9A84C] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">Unified P-R-A-C-T Identity:</strong> Upgraded from <span className="line-through text-slate-400">pract.CA</span> to <strong className="text-slate-900 dark:text-white">practACE</strong> (Plan, Revise, Analyse, Correct, Track) for multi-subject SPOM mastery.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-amber-600 dark:text-[#C9A84C] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">Saved Questions Revision Vault:</strong> Bookmark any Case MCQ or Standalone MCQ during practice to revisit in a dedicated filterable list.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-amber-600 dark:text-[#C9A84C] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">Solved vs. Pending Analytics:</strong> Upgraded Dashboard tracking Completed Cases, Solved MCQs, Pending Questions &amp; Chapter-Wise Resolution.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-amber-600 dark:text-[#C9A84C] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">Seamless Set A / Set B Switcher:</strong> Switch anytime between Corporate &amp; Economic Laws and SCMPE from the top navigation header.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 2nd Card: Introduction of SPOM Set A (Corporate & Economic Laws) */}
                <div className="bg-white dark:bg-[#111936] rounded-2xl border border-blue-200/80 dark:border-blue-900/50 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-blue-600 text-white">
                          <Scale size={14} />
                        </span>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 block">
                            2. Introducing Set A
                          </span>
                          <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                            SPOM Set A: Corporate &amp; Economic Laws
                          </h3>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        02
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">Complete 14-Chapter ICAI Syllabus:</strong> Full coverage of Companies Act 2013 (Ch 1–10), SEBI Act &amp; Regulations, FEMA 1999, FCRA 2010 &amp; IBC 2016.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">65 Official Cases + 400 Topic-Wise MCQs:</strong> Practice all 65 multi-question case scenarios (319 MCQs) and 400 topic-wise standalone chapter MCQs.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">Time &amp; Monetary Limits Master Charts:</strong> Structured statutory blueprints, section-wise revision notes &amp; 160+ high-yield flashcards.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">Legal Diagnostic Calculators:</strong> Built-in verification tools for CSR 2% spend, Sec 197 Remuneration slabs, Board Quotas &amp; CIRP timelines.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. PINNED ACTION FOOTER */}
            <div className="bg-white dark:bg-[#080d1e] border-t border-slate-200 dark:border-slate-800 px-5 sm:px-7 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => handleCloseSetAAnnouncement(true)}
                className="w-full sm:flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <BookOpen size={15} />
                <span>Explore Set A (Corporate &amp; Economic Laws)</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => {
                  handleCloseSetAAnnouncement(false);
                  setActiveSubject('setB');
                }}
                className="w-full sm:w-auto py-3 px-4 bg-[#021027] hover:bg-slate-900 text-[#C9A84C] rounded-xl text-xs sm:text-sm font-black border border-[#C9A84C]/40 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <Calculator size={15} />
                <span>Continue with Set B (SCMPE)</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
