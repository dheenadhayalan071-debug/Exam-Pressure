import { create } from "zustand";

const QUESTION_TIME = 20;

const useTestStore = create((set, get) => ({
  examId: null,
  currentQuestion: 1,
  timeLeft: QUESTION_TIME,
  answers: {},
  examEnded: false,
  submissionReason: null,
  submittedAt: null,

  startExam: (examId) =>
    set({ examId, currentQuestion: 1, timeLeft: QUESTION_TIME }),

  tick: () =>
    set((state) => ({
      timeLeft: state.timeLeft - 1,
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestion: state.currentQuestion + 1,
      timeLeft: QUESTION_TIME,
    })),

  setAnswer: (q, index, value) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [q]: { index, value },
      },
    })),

  endExam: (reason) =>
    set({
      examEnded: true,
      submissionReason: reason,
      submittedAt: new Date().toISOString(),
    }),
  resetExam: () =>
    set({
      examId: null,
      currentQuestion: 1,
      timeLeft: 20,
      answers: {},
      examEnded: false,
      endReason: null,
      submittedAt: null,
    }),
}));

export default useTestStore;
