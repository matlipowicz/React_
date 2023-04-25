// First we have to know on which step we are, so to do that create state with a step number which will be counted based on passed array length
import { ReactElement, useState } from 'react';

export const useMultiStepForm = (step: ReactElement[]) => {
  const [currentStepNumber, setCurentStepNumber] = useState(0);

  //Changing step methods

  function nextStep(event: React.SyntheticEvent) {
    event.preventDefault();
    setCurentStepNumber((prev) => {
      if (prev >= step.length - 1) {
        return prev;
      }
      console.log(prev + 1);
      return prev + 1;
    });
  }

  function previousStep(event: React.SyntheticEvent) {
    event.preventDefault();
    setCurentStepNumber((prev) => {
      if (prev === 0) {
        return prev;
      }
      console.log(prev + 1);
      return prev - 1;
    });
  }

  return {
    currentStepNumber,
    nextStep,
    previousStep,
    steps: step[currentStepNumber],
    maxStep: step.length,
  };
};
