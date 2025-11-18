import { create } from 'zustand';

interface AnimationState {
  isPlaying: boolean;
  speed: number;
  currentStep: number;
  totalSteps: number;
  setPlaying: (isPlaying: boolean) => void;
  setSpeed: (speed: number) => void;
  setCurrentStep: (step: number) => void;
  setTotalSteps: (steps: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  isPlaying: false,
  speed: 1,
  currentStep: 0,
  totalSteps: 0,
  setPlaying: (isPlaying) => set({ isPlaying }),
  setSpeed: (speed) => set({ speed }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setTotalSteps: (steps) => set({ totalSteps: steps }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),
  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
  reset: () => set({ currentStep: 0, isPlaying: false }),
}));
