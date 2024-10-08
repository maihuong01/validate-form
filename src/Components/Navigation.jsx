import { Button } from 'antd';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';

const Navigation = ({ maxSteps, currentIndex, onClickNext, onClickBack }) => {
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === maxSteps - 1;

  // Grab what we need from formik without prop-drilling
  const { validateForm, handleSubmit, isSubmitting, isValid } = useFormikContext();

  // Will run form.validateForm() when the currentIndex prop is changed
  useEffect(() => {
    validateForm();
  }, [currentIndex, validateForm]);

  return (
    <div>
      {isLastStep ? (
        <Button disabled={!isValid} onClick={() => handleSubmit()} loading={isSubmitting}>
          Submit
        </Button>
      ) : (
        <Button disabled={!isValid} onClick={onClickNext}>
          Next
        </Button>
      )}

      {!isFirstStep && <Button onClick={onClickBack}>Back</Button>}
    </div>
  );
};

export default Navigation;
