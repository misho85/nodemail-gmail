import React, { Component } from 'react';
import axios from 'axios';
import { Formik } from 'formik';

class Contact extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    submitSuccess: false,
    formMessage: null
  };

  handleFormSubmitSuccess = () => {
    this.setState({
      submitSuccess: true,
      formMessage:
        'Contact Form Successly Submitted. You will receive a reply to your message within 24 hours.'
    });
  };

  handleFormSubmitError = error => {
    this.setState({
      submitSuccess: false,
      formMessage: 'Error submitting form. Please try again.'
    });
  };

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          message: '',
          firstName: '',
          lastName: ''
        }}
        // biblioteka za validaciju Yup, umesto regexa
        validate={({ email, name, message, subject }) => {
          const errors = {};

          if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = true;
          }

          if (!message) errors.message = true;

          return errors;
        }}
        onSubmit={(
          { email, message, firstName, lastName },
          { setSubmitting, setErrors, resetForm }
        ) => {
          const endPoint = '/api/form';

          axios
            .post(endPoint, {
              // HACK: Endpoint expects name property
              email,
              message,
              firstName,
              lastName
            })

            .then(response => {
              if (response.status === 200) {
                this.handleFormSubmitSuccess();
                resetForm();
              } else {
                this.handleFormSubmitError();
              }
            })
            .catch(error => {
              this.handleFormSubmitError();
            });
        }}
        render={({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <div className="container">
            <div className="row">
              <form onSubmit={handleSubmit} className="col s12 m12 l6 forma">
                <div className="row">
                  <div className="input-field col s12 m12 l12">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      id="firstName"
                      className="validate"
                      value={values.firstName}
                      name="firstName"
                    />
                    <label htmlFor="firstName">First Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m12 l12">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      id="lastName"
                      className="validate"
                      value={values.lastName}
                      name="lastName"
                    />
                    <label htmlFor="lastName">Last Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m12 l12">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                      id="email"
                      className="validate"
                      value={values.email}
                      name="email"
                    />
                    <label htmlFor="email">Email</label>
                    <span
                      className="helper-text"
                      data-error="Wrong email form"
                      data-success="right"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m12 l12">
                    <textarea
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="message"
                      className="materialize-textarea"
                      data-length="120"
                      value={values.message}
                      name="message"
                    />
                    <label htmlFor="message">Message</label>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col s6 m4 l4">
                    <button
                      className="btn-large waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      Send
                    </button>
                  </div>
                </div> */}
                {this.state.formMessage && (
                  <div className="row">
                    <span
                      style={{
                        color: this.state.submitSuccess ? '#0093BF' : '#d81f44'
                      }}
                    >
                      {this.state.formMessage}
                    </span>
                  </div>
                )}
                <div className="row">
                  <div className="12u">
                    <ul className="actions">
                      <li>
                        <input type="submit" className="special" value="Send Message" />
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      />
    );
  }
}

Contact.propTypes = {};
Contact.defaultProps = {};

export default Contact;
