import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  Formik, Form, Field, FieldProps,
} from 'formik';
import { string, object } from 'yup';
import { Grow } from '@material-ui/core';
import BGImage from '../../images/BGSignin.jpg';
import { SignInUserData } from '../../interfaces/authentication';
import network from '../../utils/network';
import { UserContext } from '../../context/UserContext';

const validationSchema = object({
  email: string().email().required('email is required'),
  password: string()
    .min(4, 'Password must contain at least 4 characters')
    .required('Enter your password'),
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
    width: '100%', // Fix IE 11 issue.
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

const SignInForm: React.FC<any> = () => {
  const classes = useStyles();
  const history = useHistory();
  const context = React.useContext(UserContext);

  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const initialValues: SignInUserData = {
    email: '',
    password: '',
    remember: undefined,
  };

  const login = async (values: SignInUserData) => {
    const { data } = await network.post('/api/v1/auth/login', values);
    context.logUserIn({ ...data, success: true });
    history.push('/home');
  };

  return (
    <>
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
                        <div onClick={() => alert('need to go to the forgot password functionality')}>
                          Forgot password?
                        </div>
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
          </Grow>
          <Box mt={8} />
        </Grid>
      </Grid>
    </>
  );
};

export default SignInForm;
