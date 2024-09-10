import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "./Input/Input";
import * as Yup from "yup";

const FormComp = ({ inputs, onSubmit, btn }) => {
  const initialValues = inputs.reduce((acc, input) => {
    acc[input.name] = input.initialValue || "";
    return acc;
  }, {});

  const validationSchema = Yup.object(
    inputs.reduce((acc, input) => {
      if (input.validation) {
        acc[input.name] = input.validation;
      }
      return acc;
    }, {}),
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <div key={input.name}>
              <Field name={input.name}>
                {({ field }) => (
                  <Input
                    type={input.type}
                    placeholder={input.placeholder}
                    icon={input.icon}
                    field={field}
                  />
                )}
              </Field>
              <ErrorMessage
                name={input.name}
                component="div"
                className="text-red-500"
              />
            </div>
          ))}
          {btn}
        </Form>
      )}
    </Formik>
  );
};

export default FormComp;
