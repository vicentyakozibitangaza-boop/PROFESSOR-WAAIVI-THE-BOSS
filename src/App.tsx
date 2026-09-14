import React, { useState, useEffect, useCallback } from 'react';
import { MUSIC_QUESTIONS } from './data/questions';
import { QuizQuestion, UserAnswer } from './types';
import { soundManager } from './utils/audio';
import { QuizHeader } from './components/QuizHeader';
import { QuestionCard } from './components/QuestionCard';
import { QuizResults } from './components/QuizResults';
import { Sun, Moon } from 'lucide-react';

export default function App() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(MUSIC_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [status, setStatus] = useState<'in-progress' | 'completed'>('in-progress');
  const [isMuted, setIsMuted] = useState<boolean>(() => soundManager.isMuted());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('music_quiz_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync dark class to html
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('music_quiz_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('music_quiz_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleToggleMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  const currentQuestion = questions[currentIndex];
  const score = userAnswers.filter((a) => a.isCorrect).length;

  const handleSelectOption = useCallback((index: number) => {
    if (selectedOption !== null || !currentQuestion) return;

    soundManager.playSelect();
    setSelectedOption(index);

    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }

    const timeSpent = Math.max(1, Math.round((Date.now() - questionStartTime) / 1000));
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedIndex: index,
      isCorrect,
      timeSpentSeconds: timeSpent
    };

    setUserAnswers((prev) => [...prev, newAnswer]);
  }, [selectedOption, currentQuestion, questionStartTime]);

  const handleNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setQuestionStartTime(Date.now());
    } else {
      setStatus('completed');
      soundManager.playCompletion();
    }
  }, [currentIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setQuestions(MUSIC_QUESTIONS);
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setStatus('in-progress');
    setQuestionStartTime(Date.now());
  }, []);

  const handleShuffleRestart = useCallback(() => {
    // Fisher-Yates shuffle questions
    const shuffled = [...MUSIC_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setStatus('in-progress');
    setQuestionStartTime(Date.now());
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-amber-500/30 selection:text-amber-900 dark:selection:text-amber-200 transition-colors">
      {/* Persistent Quiz Header */}
      <QuizHeader
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        score={score}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onRestart={handleRestart}
        status={status}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-6 sm:py-10 max-w-3xl w-full mx-auto">
        {status === 'in-progress' && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={currentIndex === questions.length - 1}
          />
        )}

        {status === 'completed' && (
          <QuizResults
            questions={questions}
            userAnswers={userAnswers}
            onRestart={handleRestart}
            onShuffleRestart={handleShuffleRestart}
          />
        )}
      </main>

      {/* Subtle Footer with Dark/Light Toggle */}
      <footer className="w-full border-t border-zinc-200/80 dark:border-zinc-800/80 py-3.5 px-4 sm:px-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xs text-xs text-zinc-500">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>10 Music Questions</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span>Rock, Pop, Jazz, Classical, Hip-Hop, Theory</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
              aria-label="Toggle visual theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-zinc-600" />}
              <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
