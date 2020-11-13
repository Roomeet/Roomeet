import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  Formik, Form, Field, FieldProps,
} from 'formik';
import { string, object } from 'yup';
import Alert from '@material-ui/lab/Alert';
import { ReactComponent as RWALogo } from '../../svgs/rwa-logo.svg';
import { SignInUserData } from '../../../../server/models/user';
import network from '../../utils/network';

const validationSchema = object({
  email: string().email().required('email is required'),
  password: string()
    .min(4, 'Password must contain at least 4 characters')
    .required('Enter your password'),
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
  alertMessage: {
    marginBottom: theme.spacing(2),
  },
}));

interface Props {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const SignInForm: React.FC<Props> = ({ setLoggedIn }) => {
  const classes = useStyles();
  const history = useHistory();

  const initialValues: SignInUserData = {
    email: '',
    password: '',
    remember: undefined,
  };

  const login = async (values: SignInUserData) => {
    await network.post('/api/v1/auth/login', values);
    setLoggedIn(true);
    history.push('/home');
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* {authState.context?.message && (
          <Alert data-test="signin-error" severity="error" className={classes.alertMessage}>
            {authState.context.message}
          </Alert>
        )} */}
          <div>
            <RWALogo className={classes.logo} />
          </div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              login(values);
            }}
          >
            {({ isValid, isSubmitting }) => (
              <Form className={classes.form}>
                <Field name="email">
                  {({
                    field, meta: {
                      error, value, initialValue, touched,
                    },
                  }: FieldProps) => (
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label="email"
                      type="text"
                      autoFocus
                      data-test="signin-email"
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
                      fullWidth
                      label="Password"
                      type="password"
                      id="password"
                      data-test="signin-password"
                      error={touched && value !== initialValue && Boolean(error)}
                      helperText={touched && value !== initialValue && touched ? error : ''}
                      {...field}
                    />
                  )}
                </Field>
                <FormControlLabel
                  control={(
                    <Field name="remember">
                      {({ field }: FieldProps) => <Checkbox color="primary" data-test="signin-remember-me" {...field} />}
                    </Field>
                  )}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  data-test="signin-submit"
                  disabled={!isValid || isSubmitting}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link to="/forgotpassword">Forgot password?</Link> */}
                  </Grid>
                  <Grid item>
                    <Link data-test="signup" to="/signup">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
        <Box mt={8} />
      </Container>
    </>
  );
};

export default SignInForm;
