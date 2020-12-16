/*eslint-disable */

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  Select,
  Chip,
  InputLabel,
} from '@material-ui/core';
import { Formik, Form, Field, FieldProps } from 'formik';
import { string, object, number } from 'yup';
import { UserDataFormResponse, UserDataInterface } from '../../interfaces/userData';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

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
    background: 'white',
    padding: '20px',
    borderRadius: '10px/12px',
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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

// interface Props {
// }

const UserDataForm: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const context = React.useContext(UserContext);
  const [user, setUser] = React.useState<UserDataInterface>();

  const validationSchema = object({
    age: number()
      .positive('age cannot be negative')
      .max(120, 'max age is 120')
      .required('must contain age'),
  });
  // @ts-ignore
  const initialValues: any = user
    ? user
    : {
        userId: context.id,
        age: 18,
        gender: 'female',
        smoke: 'Never',
        pet: false,
        relationship: false,
        employed: false,
        interests: [],
        languages: [],
        music: [],
        lookingFor: [],
        numOfRoomates: 0,
        religion: false,
      };

  const submit = async (values: any) => {
    if(context.filledDataForm){
      await axios.put(`/api/v1/users/user-data/${context.id}`, values);
      
    }
    else{
      await axios.post("/api/v1/users/user-data", values);
      context.logUserIn({ filledDataForm: true });
      history.push("/home");
    }
    
  };

  const fetchUserData = async () => {
    
    const { data } = await axios.get(
      `/api/v1/users/basic-info?id=${context.id}`
    );
    
    // delete data[0].createdAt;
    // delete data[0].deletedAt;
    // delete data[0].updatedAt;
    // delete data[0].id;
    if(data[0]){
      setUser(data[0]);
    } else {
      setUser(initialValues)
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
            <Formik
            // @ts-ignore
              initialValues={user}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                submit(values);
              }}
            >
              {({ isValid, isSubmitting }) => (
                <Form className={classes.form}>
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
                        autoFocus
                        data-test='userdata-age'
                        // error={(touched || value !== initialValue) && Boolean(error)}
                        helperText={
                          touched || value !== initialValue ? error : ''
                        }
                        {...field}
                      />
                    )}
                  </Field>
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
                        // error={touched && value !== initialValue && Boolean(error)}
                        helperText={
                          touched && value !== initialValue && touched
                            ? error
                            : ''
                        }
                        {...field}
                      >
                        <MenuItem value='female'>female</MenuItem>
                        <MenuItem value='male'>male</MenuItem>
                      </TextField>
                    )}
                  </Field>
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
                        // error={touched && value !== initialValue && Boolean(error)}
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
                  <Field name='interests'>
                    {({
                      field,
                      meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                      <Select
                        variant='outlined'
                        style={{ margin: '5px' }}
                        fullWidth
                        label='interests'
                        multiple
                        id='interests'
                        data-test='userdata-interests'
                        // error={touched && value !== initialValue && Boolean(error)}
                        {...field}
                        renderValue={(selected) => (
                          <div className={classes.chips}>
                            {(selected as string[]).map((val) => (
                              <Chip
                                key={val}
                                label={val}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                      >
                        <MenuItem value='Sports'>Sports</MenuItem>
                        <MenuItem value='Dance'>Dance</MenuItem>
                        <MenuItem value='Books'>Books</MenuItem>
                      </Select>
                    )}
                  </Field>
                  <Field name='languages'>
                    {({
                      field,
                      meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                      <Select
                        variant='outlined'
                        style={{ margin: '5px' }}
                        fullWidth
                        label='languages'
                        multiple
                        id='languages'
                        data-test='userdata-languages'
                        // error={touched && value !== initialValue && Boolean(error)}
                        {...field}
                        renderValue={(selected) => (
                          <div className={classes.chips}>
                            {(selected as string[]).map((val) => (
                              <Chip
                                key={val}
                                label={val}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                      >
                        <MenuItem value='Hebrew'>Hebrew</MenuItem>
                        <MenuItem value='English'>English</MenuItem>
                        <MenuItem value='Spanish'>Spanish</MenuItem>
                      </Select>
                    )}
                  </Field>
                  <Field name='music'>
                    {({
                      field,
                      meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                      <Select
                        variant='outlined'
                        style={{ margin: '5px' }}
                        fullWidth
                        label='music'
                        multiple
                        id='music'
                        data-test='userdata-music'
                        // error={touched && value !== initialValue && Boolean(error)}
                        {...field}
                        renderValue={(selected) => (
                          <div className={classes.chips}>
                            {(selected as string[]).map((val) => (
                              <Chip
                                key={val}
                                label={val}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                      >
                        <MenuItem value='Rock'>Rock</MenuItem>
                        <MenuItem value='Classic'>Classic</MenuItem>
                      </Select>
                    )}
                  </Field>
                  <Field name='lookingFor'>
                    {({
                      field,
                      meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                      <Select
                        variant='outlined'
                        style={{ margin: '5px' }}
                        fullWidth
                        label='looking for...'
                        multiple
                        id='lookingFor'
                        data-test='userdata-lookingFor'
                        // error={touched && value !== initialValue && Boolean(error)}
                        {...field}
                        renderValue={(selected) => (
                          <div className={classes.chips}>
                            {(selected as string[]).map((val) => (
                              <Chip
                                key={val}
                                label={val}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                      >
                        <MenuItem value='Roomate'>Roomate</MenuItem>
                        <MenuItem value='Friend'>Friend</MenuItem>
                      </Select>
                    )}
                  </Field>
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
