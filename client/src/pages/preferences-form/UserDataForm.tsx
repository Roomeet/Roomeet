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
import { CitiesContext } from '../../context/CitiesContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '1%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    padding: '20px',
    borderRadius: '10px/12px',
    'overflow-y': 'auto',
    'overflow-x': 'hidden',
    height: '85vh',
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
  range_root: {
    width: 150,
  },
}));

const UserDataForm: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const context = React.useContext(UserContext);
  const citiesContext = React.useContext(CitiesContext);
  const [user, setUser] = React.useState<UserDataInterface>();
  const [file, setFile] = React.useState<any>();
  const [budgetRange, setBudgetRange] = React.useState<number[]>([500, 6000]);

  const validationSchema = object({
    age: number()
      .positive('age cannot be negative')
      .max(120, 'max age is 120')
      .required('must contain age'),
    aboutMe: string().max(300, 'Maximum 300 characters'),
    numOfRoomates: number()
    .min(0 ,'number of roomates cannot be neagetive ')
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
        budgetRange: [500, 6000],
        pet: false,
        relationship: false,
        employed: false,
        religion: false,
      };

  const submit = async (values: any) => {
    values.fullName = context.name;
    values.minBudget = budgetRange[0];
    values.maxBudget = budgetRange[1];
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

  const handleBudjetRangeChange = (event: any, newValue: number | number[]) => {
    setBudgetRange(newValue as number[]);
  };

  const fetchUserData = async () => {
    const { data } = await network.get(
      `/api/v1/users/basic-info?id=${context.id}`
    );
    if (data[0]) {
      setUser(data[0]);
      citiesContext.set({ cities: data[0].cities ? data[0].cities : [] });
      data[0].minBudget &&
        setBudgetRange([data[0].minBudget, data[0].maxBudget]);
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
                        label='How Old Are You?'
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
                        label='Please Tell Us About You:'
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
                        label='Do You Smoke?'
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
                        label='Number Of Roomates You Are Looking For:'
                        type='number'
                        data-test='userdata-age'
                        helperText={
                          touched || value !== initialValue ? error : ''
                        }
                        {...field}
                      />
                    )}
                  </Field>
                  <div>
                    <Typography id='range-slider' gutterBottom>
                      What is your budget range?
                    </Typography>
                    <Slider
                      value={budgetRange}
                      onChange={handleBudjetRangeChange}
                      valueLabelDisplay='auto'
                      aria-labelledby='range-slider'
                      marks
                      min={500}
                      max={6000}
                      step={500}
                    />
                  </div>
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
                    label='I Have A Pet'
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
                    label='I Am In A Relationship'
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
                    label='I`m Employed'
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
                    label='I`m Religion'
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
