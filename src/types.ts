export interface QuizQuestion {
  id: number;
  category: string;
  genreIcon: 'disc' | 'music' | 'mic' | 'radio' | 'guitar' | 'piano' | 'volume-2';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserAnswer {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export type QuizStatus = 'idle' | 'in-progress' | 'completed';
