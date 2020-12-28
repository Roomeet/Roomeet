/*eslint-disable */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  Container,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Slider,
  Typography,
} from '@material-ui/core';
import { Formik, Form, Field, FieldProps } from 'formik';
import { string, object, number } from 'yup';
import { UserDataInterface } from '../../interfaces/userData';
import { UserContext } from '../../context/UserContext';
import network from '../../utils/network';
import WrappedMap from '../../components/Map';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import { CitiesContext } from '../../context/CitiesContext';

const validationSchema = object({
  email: string().email().required('email is required'),
  password: string()
    .min(4, 'Password must contain at least 4 characters')
    .required('Enter your password'),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    padding: '20px',
    borderRadius: '10px/12px',
    'overflow-y': 'auto',
    height: '79vh',
    boxShadow: '0 2px 5px 1px rgba(0,0,0,0.7)',
  },
  logo: {
    color: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alertMessage: {
    marginBottom: theme.spacing(2),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  pic: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const UserDataForm: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const context = React.useContext(UserContext);
  const citiesContext = React.useContext(CitiesContext);
  const [user, setUser] = React.useState<UserDataInterface>();
  const [file, setFile] = React.useState<any>();
  const [budget, setBudget] = React.useState<number>(500);

  const validationSchema = object({
    age: number()
      .positive('age cannot be negative')
      .max(120, 'max age is 120')
      .required('must contain age'),
    aboutMe: string().max(300, 'Maximum 300 characters'),
  });
  // @ts-ignore
  const initialValues: any = user
    ? user
    : {
        userId: context.id,
        fullName: context.name,
        gender: 'other',
        age: 18,
        rentLocation: '',
        aboutMe: '',
        smoke: '',
        numOfRoomates: 0,
        budget: 500,
        pet: false,
        relationship: false,
        employed: false,
        religion: false,
      };

  const submit = async (values: any) => {
    values.fullName = context.name;
    values.budget = budget;
    const data = new FormData();
    delete values.image;
    data.append('file', file);
    values.fullName = context.name;
    values.cities = citiesContext.cities;
    await network.post(`/api/v1/users/user-data/${context.id}`, values);
    await network.post(
      `/api/v1/users/user-data/profile/picture/${context.id}`,
      data
    );
  };

  const fetchUserData = async () => {
    const { data } = await network.get(
      `/api/v1/users/basic-info?id=${context.id}`
    );
    if (data[0]) {
      setUser(data[0]);
      citiesContext.set({ cities: data[0].cities ? data[0].cities : [] });
    } else {
      setUser(initialValues);
    }
  };
  React.useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className='user-data-form'>
      {user && (
        <Container component='main' maxWidth='sm'>
          <CssBaseline />
          <div className={classes.paper}>
            <div className={classes.logo}>Let Us Know More About You</div>
            <div className={classes.pic}>
              <label htmlFor='file'>Profile picture</label>
              <input
                type='file'
                className='image'
                accept='.jpg'
                onChange={(event) => {
                  if (event.target.files) {
                    const image = event.target.files[0];
                    setFile(image);
                  }
                }}
              />
            </div>
            <Formik
              // @ts-ignore
              initialValues={user}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                submit(values);
                history.push('/home');
              }}
            >
              {/* <input
                type="file"
                name="file"
                onChange={(event: any) =>{
                  setFieldValue("photo1", event.currentTarget.files[0]);
                }}
              /> */}
              {({ isValid, isSubmitting }) => (
                <Form className={classes.form}>
                  <Field name='gender'>
                    {({
                      field,
                      meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                      <TextField
                        variant='outlined'
                        style={{ margin: '5px' }}
                        fullWidth
                        label='gender'
                        select
                        id='gender'
                        data-test='userdata-gender'
                        helperText={
                          touched && value !== initialValue && touched
                            ? error
                            : ''
                        }
                        {...field}
                      >
                        <MenuItem value='female'>female</MenuItem>
                        <MenuItem value='male'>male</MenuItem>
                        <MenuItem value='other'>other</MenuItem>
                      </TextField>
                    )}
                  </Field>
                  <Field name='age'>
                    {({
                      field,
                      meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                      <TextField
                        variant='outlined'
                        style={{ margin: '5px' }}
                        fullWidth
                        id='age'
                        label='age'
                        type='number'
                        data-test='userdata-age'
                        helperText={
                          touched || value !== initialValue ? error : ''
                        }
                        {...field}
                      />
                    )}
                  </Field>
                  <Field name='aboutMe'>
                    {({
                      field,
                      meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                      <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='aboutMe'
                        label='About Me'
                        type='text'
                        data-test='form-full-name'
                        error={
                          (touched || value !== initialValue) && Boolean(error)
                        }
                        helperText={
                          touched || value !== initialValue ? error : ''
                        }
                        {...field}
                      />
                    )}
                  </Field>
                  <h3>Choose Location</h3>
                  <WrappedMap
                    loadingElement={<div style={{ height: `300px` }} />}
                    containerElement={<div style={{ height: `300px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                  />
                  <Field name='smoke'>
                    {({
                      field,
                      meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                      <TextField
                        variant='outlined'
                        style={{ margin: '5px' }}
                        fullWidth
                        label='smoke'
                        select
                        id='smoke'
                        data-test='userdata-smoke'
                        helperText={
                          touched && value !== initialValue && touched
                            ? error
                            : ''
                        }
                        {...field}
                      >
                        <MenuItem value='Never'>Never</MenuItem>
                        <MenuItem value='Allways'>Allways</MenuItem>
                        <MenuItem value='Sometimes'>Sometimes</MenuItem>
                      </TextField>
                    )}
                  </Field>
                  <Field name='numOfRoomates'>
                    {({
                      field,
                      meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                      <TextField
                        variant='outlined'
                        style={{ margin: '5px' }}
                        fullWidth
                        id='numOfRoomates'
                        label='Number Of Roomates'
                        type='number'
                        data-test='userdata-age'
                        helperText={
                          touched || value !== initialValue ? error : ''
                        }
                        {...field}
                      />
                    )}
                  </Field>
                  <Typography gutterBottom>Range of Budget</Typography>
                  <Slider
                    key={`slider-${context.id}`}
                    defaultValue={initialValues.budget}
                    aria-labelledby='discrete-slider'
                    valueLabelDisplay='auto'
                    step={100}
                    marks
                    min={500}
                    max={10000}
                    onChange={(event: any) =>
                      setBudget(Number(event.target.innerText))
                    }
                  />
                  <FormControlLabel
                    control={
                      <Field name='pet'>
                        {({ field }: FieldProps) => (
                          <Checkbox
                            defaultChecked={user!.pet}
                            color='primary'
                            data-test='userdata-pet'
                            {...field}
                          />
                        )}
                      </Field>
                    }
                    label='pet'
                  />
                  <FormControlLabel
                    control={
                      <Field name='relationship'>
                        {({ field }: FieldProps) => (
                          <Checkbox
                            defaultChecked={user.relationship}
                            color='primary'
                            data-test='userdata-relationship'
                            {...field}
                          />
                        )}
                      </Field>
                    }
                    label='relationship'
                  />
                  <FormControlLabel
                    control={
                      <Field name='employed'>
                        {({ field }: FieldProps) => (
                          <Checkbox
                            defaultChecked={user.employed}
                            color='primary'
                            data-test='userdata-employed'
                            {...field}
                          />
                        )}
                      </Field>
                    }
                    label='employed'
                  />
                  <FormControlLabel
                    control={
                      <Field name='religion'>
                        {({ field }: FieldProps) => (
                          <Checkbox
                            defaultChecked={user.religion}
                            color='primary'
                            data-test='userdata-religion'
                            {...field}
                          />
                        )}
                      </Field>
                    }
                    label='religion'
                  />
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    data-test='userdata-submit'
                    disabled={!isValid || isSubmitting}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
          <Box mt={8} />
        </Container>
      )}
    </div>
  );
};

export default UserDataForm;
