import { useState } from 'react';

import { StepOne, StepThree, StepTwo } from './Steps/ExportAllSteps';
import { InitialData } from './Types/multistepform_types';
import { useMultiStepForm } from './useMultiStepForm';

import style from './MultiStepForm.module.css';

const MultiStepForm = () => {
  const [data, setData] = useState<InitialData>({
    subRegion: '',
    name: '',
    surname: '',
    street: '',
    postalCode: '',
    town: '',
    phoneNumber: '',
    orders: [],
    price: '',
    dateFrom: '',
    dateTo: '',
  });

  function updateFormState(invoiceFields: Partial<InitialData>) {
    setData((prev) => ({ ...prev, ...invoiceFields }));
  }

  const { currentStepNumber, nextStep, previousStep, steps, maxStep } = useMultiStepForm([
    <StepOne key='1' {...data} updateForm={updateFormState} />,
    <StepTwo key='2' {...data} updateForm={updateFormState} />,
    <StepThree key='3' {...data} updateForm={updateFormState} />,
  ]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (currentStepNumber + 1 !== maxStep) return nextStep(e);
    // alert(JSON.stringify(data, null, 2));
    console.log(data);
  }

  return (
    <div className={style['step__container']}>
      <form className={style['step__form']} onSubmit={handleSubmit}>
        {steps}
        <div className={style['step__number']}>
          {currentStepNumber + 1} / {maxStep}
        </div>
        <div className={style['step__buttons']}>
          {currentStepNumber + 1 !== 1 && (
            <button className={style['step__previous-btn']} onClick={previousStep}>
              Back
            </button>
          )}

          <button
            className={style['step__next-btn']}
            onClick={() => {
              nextStep;
            }}
          >
            {currentStepNumber + 1 === maxStep ? 'Finish' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
