import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Disc, 
  Music, 
  Mic2, 
  Radio, 
  Guitar, 
  Check, 
  X, 
  ArrowRight, 
  Sparkles,
  Info
} from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuestionCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

const getCategoryIcon = (iconName: QuizQuestion['genreIcon']) => {
  switch (iconName) {
    case 'disc':
      return <Disc className="w-3.5 h-3.5" />;
    case 'mic':
      return <Mic2 className="w-3.5 h-3.5" />;
    case 'radio':
      return <Radio className="w-3.5 h-3.5" />;
    case 'guitar':
      return <Guitar className="w-3.5 h-3.5" />;
    case 'piano':
      return <Music className="w-3.5 h-3.5" />;
    default:
      return <Music className="w-3.5 h-3.5" />;
  }
};

const OPTION_KEYS = ['A', 'B', 'C', 'D'];

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNextQuestion,
  isLastQuestion
}) => {
  const isAnswered = selectedOption !== null;
  const isCorrect = isAnswered && selectedOption === question.correctIndex;

  // Keyboard accessibility: 1-4, A-D for options, Enter for next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid if user is in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (!isAnswered) {
        const key = e.key.toUpperCase();
        if (key === '1' || key === 'A') onSelectOption(0);
        else if (key === '2' || key === 'B') onSelectOption(1);
        else if (key === '3' || key === 'C') onSelectOption(2);
        else if (key === '4' || key === 'D') onSelectOption(3);
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, onSelectOption, onNextQuestion]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Top Meta Line: Question Step + Category */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-heading">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            {getCategoryIcon(question.genreIcon)}
            {question.category}
          </span>
        </div>

        {/* Step dots */}
        <div className="hidden sm:flex items-center gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-6 bg-amber-500'
                  : i < currentIndex
                  ? 'w-2 bg-zinc-400 dark:bg-zinc-600'
                  : 'w-2 bg-zinc-200 dark:bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Question Box */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 sm:p-8 shadow-sm transition-colors"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug tracking-tight font-heading mb-6">
          {question.question}
        </h2>

        {/* Options List */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectAnswer = idx === question.correctIndex;

            let buttonStyle = "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 text-zinc-800 dark:text-zinc-200 hover:border-amber-500/50 hover:bg-amber-50/40 dark:hover:bg-amber-950/20";
            let badgeStyle = "bg-zinc-200/70 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300";

            if (isAnswered) {
              if (isCorrectAnswer) {
                buttonStyle = "border-emerald-500/90 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500/50";
                badgeStyle = "bg-emerald-600 text-white";
              } else if (isSelected && !isCorrectAnswer) {
                buttonStyle = "border-rose-500/90 bg-rose-50 dark:bg-rose-950/30 text-rose-950 dark:text-rose-100 ring-1 ring-rose-500/50";
                badgeStyle = "bg-rose-600 text-white";
              } else {
                buttonStyle = "border-zinc-200/50 dark:border-zinc-800/50 bg-transparent text-zinc-400 dark:text-zinc-600 opacity-60";
                badgeStyle = "bg-zinc-200/40 dark:bg-zinc-800/40 text-zinc-400 dark:text-zinc-600";
              }
            }

            return (
              <button
                key={idx}
                id={`option-btn-${question.id}-${idx}`}
                type="button"
                disabled={isAnswered}
                onClick={() => onSelectOption(idx)}
                className={`w-full group text-left px-4 py-3.5 sm:py-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${buttonStyle} cursor-pointer disabled:cursor-default`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold font-heading transition-colors ${badgeStyle}`}>
                    {OPTION_KEYS[idx]}
                  </span>
                  <span className="text-sm sm:text-base font-medium leading-normal break-words">
                    {option}
                  </span>
                </div>

                <div className="flex-shrink-0">
                  {isAnswered && isCorrectAnswer && (
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500 text-white shadow-sm">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  )}
                  {!isAnswered && (
                    <span className="text-[11px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                      Press {OPTION_KEYS[idx]}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Post-Answer Trivia Box & Next Button */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 space-y-4"
            >
              {/* Outcome Banner & Explanation */}
              <div className={`p-4 rounded-xl text-sm ${
                isCorrect 
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200' 
                  : 'bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200'
              }`}>
                <div className="flex items-start gap-2.5">
                  {isCorrect ? (
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="space-y-1">
                    <p className="font-semibold text-xs uppercase tracking-wider">
                      {isCorrect ? 'Correct! Musical Fact:' : 'Trivia Insight:'}
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Question CTA */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">Enter ↵</kbd> to proceed
                </span>

                <button
                  id="next-question-btn"
                  type="button"
                  onClick={onNextQuestion}
                  autoFocus
                  className="w-full sm:w-auto ml-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <span>{isLastQuestion ? 'Complete Quiz' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
