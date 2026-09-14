import React from 'react';
import { Volume2, VolumeX, RotateCcw, Music } from 'lucide-react';

interface QuizHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  score: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestart: () => void;
  status: 'idle' | 'in-progress' | 'completed';
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentIndex,
  totalQuestions,
  score,
  isMuted,
  onToggleMute,
  onRestart,
  status
}) => {
  return (
    <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand/Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-heading">
                Music Quiz
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium border border-zinc-200 dark:border-zinc-700">
                10 Questions
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Test your knowledge across genres, instruments & legends
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {status === 'in-progress' && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80 mr-1">
              <span className="text-zinc-400">Score:</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{score}</span>
              <span className="text-zinc-400">/ {currentIndex}</span>
            </div>
          )}

          <button
            id="sound-toggle-btn"
            type="button"
            onClick={onToggleMute}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-amber-500" />}
          </button>

          {status !== 'idle' && (
            <button
              id="restart-quiz-btn"
              type="button"
              onClick={onRestart}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              title="Restart Quiz"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Track for In-Progress */}
      {status === 'in-progress' && (
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1 overflow-hidden">
          <div
            className="bg-amber-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      )}
    </header>
  );
};
