import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import * as V from 'Client/lib/validation';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <div>Error : {error}</div>) || (warning && <div>Warning : {warning}</div>))}
    </div>
  </div>
);

renderField.propTypes = {
  input : PropTypes.object,
  label : PropTypes.string,
  type  : PropTypes.string,
  meta  : PropTypes.object
};

const renderTextArea = ({ input, label, type, meta : { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={label} type={type}>{input.value}</textarea>
      {touched && ((error && <div>Error : {error}</div>) || (warning && <div>Warning : {warning}</div>))}
    </div>
  </div>
);

renderTextArea.propTypes = {
  input : PropTypes.object,
  label : PropTypes.string,
  type  : PropTypes.string,
  meta  : PropTypes.object
};

const CreateCardForm = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>

      <Field
        name="title"
        type="text"
        component={renderField}
        validate={[V.required, V.minTitleLength, V.maxTitleLength]}
        label="Title"
      />

      <Field
        name="description"
        component={renderTextArea}
        validate={[V.required, V.minParagraphLength]}
        warn={V.maxParagraphLength}
        label="Description"
      />

      <button type="submit">Save</button>
    </form>
  );
};

CreateCardForm.propTypes = {
  handleSubmit : PropTypes.func
};

// Decorate the form component
export default reduxForm({
  form          : 'CreateCardForm',
  fields        : ['title', 'description', 'type'],
  initialValues : {
    type : 'idea'
  }
})(CreateCardForm);
