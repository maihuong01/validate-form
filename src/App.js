import './App.css';
import 'antd/dist/reset.css';
import { Layout, Steps } from 'antd';
import { useState } from 'react';
import StepsFirst from './Components/StepsFirst';
import StepsSecond from './Components/StepsSecond';
import StepsLast from './Components/StepsLast';
import { Formik } from 'formik';
import Navigation from './Components/Navigation';
import * as Yup from 'yup';

export const generateInitialValues = (filteredSteps) => {
  const initialValues = filteredSteps.reduce((values, step) => {
    return { ...values, [step.name]: '' };
  }, {});

  return initialValues;
};

export const getStepSchema = (currentIndex, steps) => {
  return steps[currentIndex].validationSchema;
};

const emailAddressStepSchema = Yup.object({
  emailAddress: Yup.string()
    .email('Please enter a valid email address')
    .required('Please enter an email address')
    .nullable(),
});

const firstNameStepSchema = Yup.object({
  firstName: Yup.string().required('Please enter your first name').nullable(),
});

const phoneNumberStepSchema = Yup.object({
  phoneNumber: Yup.string().required('Please enter your phone number').nullable(),
});

const steps = [
  {
    title: 'FirstName',
    name: 'firstName',
    component: StepsFirst,
    validationSchema: firstNameStepSchema,
  },
  {
    title: 'EmailName',
    name: 'emailAddress',
    component: StepsSecond,
    validationSchema: emailAddressStepSchema,
  },
  { title: 'PhoneName', name: 'phoneNumber', component: StepsLast, validationSchema: phoneNumberStepSchema },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [initialValues] = useState(generateInitialValues(steps));
  const goNext = () => {
    setCurrentIndex((oldIndex) => oldIndex + 1);
  };

  const goBack = () => {
    setCurrentIndex((oldIndex) => oldIndex - 1);
  };

  const renderCurrentStep = (form) => {
    const step = steps[currentIndex];

    const commonProps = {
      name: step.name,
      form,
    };

    const StepComponent = step.component;

    return <StepComponent {...commonProps} />;
  };
  const handleSubmitQuestionnaire = (values) => {
    console.log('🚀  values ==', values);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <Layout style={{ padding: '40px' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={getStepSchema(currentIndex, steps)}
        onSubmit={handleSubmitQuestionnaire}
        validateOnMount
      >
        {(form) => {
          console.log('🚀  form ==', form);
          return (
            <>
              <Steps current={currentIndex} items={items} />
              <div>{renderCurrentStep(form)}</div>

              <Navigation
                maxSteps={steps.length}
                currentIndex={currentIndex}
                onClickNext={goNext}
                onClickBack={goBack}
              />
            </>
          );
        }}
      </Formik>
    </Layout>
  );
}

export default App;
