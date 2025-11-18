'use client';

import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { useAnimationStore } from '@/lib/store/animationStore';
import { useEffect } from 'react';

export default function Controls() {
  const {
    isPlaying,
    speed,
    currentStep,
    totalSteps,
    setPlaying,
    setSpeed,
    nextStep,
    previousStep,
    reset,
  } = useAnimationStore();

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (currentStep < totalSteps) {
        nextStep();
      } else {
        setPlaying(false);
      }
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, totalSteps, speed, nextStep, setPlaying]);

  return (
    <div className="border-b bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPlaying(!isPlaying)}
            className="p-2 rounded-md hover:bg-accent transition"
            disabled={totalSteps === 0}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={previousStep}
            className="p-2 rounded-md hover:bg-accent transition"
            disabled={currentStep === 0}
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={nextStep}
            className="p-2 rounded-md hover:bg-accent transition"
            disabled={currentStep >= totalSteps}
          >
            <SkipForward className="h-5 w-5" />
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-md hover:bg-accent transition"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Step {currentStep} / {totalSteps}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Speed:</label>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="px-2 py-1 border rounded-md text-sm"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={5}>5x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
