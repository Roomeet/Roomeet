import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  Formik, Form, Field, FieldProps,
} from 'formik';
import { string, object, ref } from 'yup';
import network from '../../utils/network';
import { SignUpUserData } from '../../interfaces/authentication';

const validationSchema = object({
  name: string().required('First Name is required'),
  lastName: string().required('Last Name is required'),
  password: string()
    .min(4, 'Password must contain at least 4 characters')
    .required('Enter your password'),
  confirmPassword: string()
    .required('Confirm your password')
    .oneOf([ref('password')], 'Password does not match'),
  email: string().email().required('Enter your email'),

});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    color: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpForm: React.FC = () => {
  const classes = useStyles();
  const location = useHistory();

  const initialValues: SignUpUserData & { confirmPassword: string } = {
    name: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  const signUp = (values: SignUpUserData) => {
    network.post('/api/v1/auth/register', values);
    location.push('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.logo}>
          Welcome To Roomeet
        </div>
        <Typography component="h1" variant="h5" data-test="signup-title">
          Sign Up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setFieldValue }) => {
            setSubmitting(true);
            signUp(values);
          }}
        >
          {({ isValid, isSubmitting, dirty }) => (
            <Form className={classes.form}>
              <Field name="name">
                {({
                  field, meta: {
                    error, value, initialValue, touched,
                  },
                }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    type="text"
                    autoFocus
                    data-test="signup-name"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ''}
                    {...field}
                  />
                )}
              </Field>
              <Field name="lastName">
                {({
                  field, meta: {
                    error, value, initialValue, touched,
                  },
                }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    type="text"
                    data-test="signup-last-name"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ''}
                    {...field}
                  />
                )}
              </Field>
              <Field name="password">
                {({
                  field, meta: {
                    error, value, initialValue, touched,
                  },
                }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    data-test="signup-password"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ''}
                    {...field}
                  />
                )}
              </Field>
              <Field name="confirmPassword">
                {({
                  field, meta: {
                    error, value, initialValue, touched,
                  },
                }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm Password"
                    id="confirmPassword"
                    data-test="signup-confirmPassword"
                    type="password"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ''}
                    {...field}
                  />
                )}
              </Field>
              <Field name="email">
                {({
                  field, meta: {
                    error, value, initialValue, touched,
                  },
                }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    type="email"
                    data-test="signup-email"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ''}
                    {...field}
                  />
                )}
              </Field>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                data-test="signup-submit"
                disabled={!isValid || isSubmitting}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signin">Have an account? Sign In</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={8} />
    </Container>
  );
};

export default SignUpForm;
