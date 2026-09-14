import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  RotateCcw, 
  Check, 
  X, 
  Trophy, 
  Award, 
  Share2, 
  CheckCircle2,
  ListFilter
} from 'lucide-react';
import { QuizQuestion, UserAnswer } from '../types';

interface QuizResultsProps {
  questions: QuizQuestion[];
  userAnswers: UserAnswer[];
  onRestart: () => void;
  onShuffleRestart: () => void;
}

interface TierInfo {
  title: string;
  tagline: string;
  color: string;
}

const getTier = (score: number): TierInfo => {
  if (score === 10) {
    return {
      title: "Virtuoso Prodigy",
      tagline: "Flawless score! Your musical knowledge spans every genre and era with absolute mastery.",
      color: "text-amber-500"
    };
  }
  if (score >= 8) {
    return {
      title: "Master Conductor",
      tagline: "Exceptional ear and deep music trivia knowledge. You know your classics and legends.",
      color: "text-emerald-500"
    };
  }
  if (score >= 6) {
    return {
      title: "Dedicated Audiophile",
      tagline: "Solid performance! You have a well-rounded appreciation across multiple musical domains.",
      color: "text-blue-500"
    };
  }
  if (score >= 4) {
    return {
      title: "Enthusiastic Listener",
      tagline: "Good effort! A few legendary tracks tripped you up, but the rhythm is definitely there.",
      color: "text-purple-500"
    };
  }
  return {
    title: "Backstage Apprentice",
    tagline: "Time to fire up the turntable and study the timeless classics again!",
    color: "text-zinc-500"
  };
};

export const QuizResults: React.FC<QuizResultsProps> = ({
  questions,
  userAnswers,
  onRestart,
  onShuffleRestart
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [copied, setCopied] = useState(false);

  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);
  const tier = getTier(correctCount);

  const filteredAnswers = userAnswers.filter((ans) => {
    if (filter === 'correct') return ans.isCorrect;
    if (filter === 'incorrect') return !ans.isCorrect;
    return true;
  });

  const handleShare = () => {
    const text = `I scored ${correctCount}/${total} (${percentage}%) on the 10-Question Music Quiz! Can you beat my score?`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Summary Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 sm:p-8 text-center shadow-sm"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-4">
          <Trophy className="w-7 h-7" />
        </div>

        <div className="space-y-1 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-heading">
            Music Quiz Complete
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 font-heading">
            {tier.title}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            {tier.tagline}
          </p>
        </div>

        {/* Score Display */}
        <div className="my-6 inline-flex items-baseline gap-2 px-6 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
          <span className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 font-heading">
            {correctCount}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-zinc-400">
            / {total}
          </span>
          <span className="ml-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
            ({percentage}%)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            id="play-again-btn"
            type="button"
            onClick={onRestart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>

          <button
            id="shuffle-again-btn"
            type="button"
            onClick={onShuffleRestart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-colors cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Shuffle & Retake</span>
          </button>

          <button
            id="share-score-btn"
            type="button"
            onClick={handleShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-colors cursor-pointer"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Score Copied!' : 'Share Result'}</span>
          </button>
        </div>
      </motion.div>

      {/* Question Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-heading">
              10-Question Review
            </h3>
            <p className="text-xs text-zinc-500">
              Verify your answers and learn the musical history behind each question
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              All ({total})
            </button>
            <button
              type="button"
              onClick={() => setFilter('correct')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                filter === 'correct'
                  ? 'bg-white dark:bg-zinc-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Correct ({correctCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('incorrect')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                filter === 'incorrect'
                  ? 'bg-white dark:bg-zinc-700 text-rose-600 dark:text-rose-400 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Missed ({total - correctCount})
            </button>
          </div>
        </div>

        {/* List of Questions with answers */}
        <div className="space-y-3">
          {filteredAnswers.map((answer) => {
            const q = questions.find((item) => item.id === answer.questionId);
            if (!q) return null;

            const selectedText = q.options[answer.selectedIndex];
            const correctText = q.options[q.correctIndex];

            return (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 space-y-3 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5 ${
                        answer.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    >
                      {answer.isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          Question #{q.id}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                          {q.category}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                        {q.question}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Answers breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div
                    className={`p-2.5 rounded-lg border ${
                      answer.isCorrect
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-300'
                        : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800/40 text-rose-900 dark:text-rose-300'
                    }`}
                  >
                    <span className="font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                      Your Choice:
                    </span>
                    <span className="font-medium">{selectedText}</span>
                  </div>

                  {!answer.isCorrect && (
                    <div className="p-2.5 rounded-lg border bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-300">
                      <span className="font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                        Correct Answer:
                      </span>
                      <span className="font-medium">{correctText}</span>
                    </div>
                  )}
                </div>

                {/* Trivia Explanation note */}
                <p className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800 leading-relaxed">
                  <strong className="text-zinc-800 dark:text-zinc-200">Fact: </strong>
                  {q.explanation}
                </p>
              </div>
            );
          })}

          {filteredAnswers.length === 0 && (
            <div className="text-center py-8 text-sm text-zinc-500">
              No questions found under this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
