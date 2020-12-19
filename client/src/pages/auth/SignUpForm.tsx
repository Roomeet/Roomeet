import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  Formik, Form, Field, FieldProps,
} from 'formik';
import { string, object, ref } from 'yup';
import { Grow } from '@material-ui/core';
import BGImage from '../../images/BGSignUpForm.jpg';
import network from '../../utils/network';
import { SignUpUserData } from '../../interfaces/authentication';
import { UserContext } from '../../context/UserContext';

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
  root: {
    minHeight: '100vh',
  },
  image: {
    backgroundImage: `url(${BGImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    color: theme.palette.primary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alertMessage: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SignUpForm: React.FC = () => {
  const classes = useStyles();
  const location = useHistory();
  const [checked, setChecked] = useState<boolean>(false);
  const context = React.useContext(UserContext);

  useEffect(() => {
    setChecked(true);
  }, []);

  const initialValues: SignUpUserData & { confirmPassword: string } = {
    name: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  const signUp = (values: SignUpUserData) => {
    network.post('/api/v1/auth/register', values);
    location.push('/signin');
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grow in={checked}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Grow>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
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
                    <Grid item xs>
                      <Link to="/signin">Have an account? Sign In</Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </Grow>
        <Box mt={8} />
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
