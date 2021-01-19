import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import network from '../utils/network';

export type Props = {
  [key: string]: any;
};

const useStyles = makeStyles({
  mainDiv: {
  },
  modalDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '3px solid black',
    textAlign: 'center',
    height: '80%',
    overflowY: 'auto',
    minWidth: '300px',
    maxWidth: '500px',
    width: '70%',
    marginTop: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'black',
    backgroundColor: '#BFB4AB',
  },
  rows: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
  },
  labels: {

  },
  infoData: {

  },
  profilePic: {
    pointerEvents: 'none',
    boxShadow: '0 2px 5px 3px rgba(0,0,0,0.7)',
    height: '30%',
    maxWidth: '200px',
    maxHeight: '200px',
    marginTop: '5px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  nameTitle: {
    fontSize: '1.3em',
  },
  advancedInfoDiv: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  basicInfoDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '60%',
  },
  titleInfoDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginTop: '10px',
  },
});

const FilterModal: React.FC<Props> = ({
  openFilter, SetOpenFilter, setAllUsersInfo, userId,
}) => {
  const classes = useStyles();
  const [filters, setFilters] = useState({
    gender: '',
    smoke: false,
    pet: false,
    relationship: false,
    religion: false,
    employed: false,
    budgetRange: [500, 6000],
    ageRange: [16, 60],
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
  };

  const handleBudjetRangeChange = (event: any, newValue: number | number[]) => {
    setFilters({ ...filters, budgetRange: newValue as number[] });
  };

  const handleAgeRangeChange = (event: any, newValue: number | number[]) => {
    setFilters({ ...filters, ageRange: newValue as number[] });
  };

  const handleRefreshSearch = async () => {
    setFilters({
      gender: '',
      smoke: false,
      pet: false,
      relationship: false,
      religion: false,
      employed: false,
      budgetRange: [500, 6000],
      ageRange: [16, 60],
    });
    const { data } = await network.get(
      `/server/api/v1/users/all-cards?userId=${userId}`,
    );
    setAllUsersInfo(data);
    SetOpenFilter((prev: boolean) => !prev);
  };

  const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilters({ ...filters, gender: event.target.value as string });
  };

  const handleSubmit = async () => {
    const objEntries = Object.entries(filters);
    const filteredSearchObj = Object.fromEntries(objEntries.filter((filter) => filter[1] === true || typeof filter[1] !== 'boolean'));
    if (filteredSearchObj.gender === '') delete filteredSearchObj.gender;
    filteredSearchObj.userId = userId;
    const { data } = await network.post('/server/api/v1/users/all-cards/filtered', filteredSearchObj);
    setAllUsersInfo(data);
    SetOpenFilter((prev: boolean) => !prev);
  };

  return (
    <div>
      {openFilter && (
        <Modal
          open
          onClose={() => SetOpenFilter((prev: boolean) => !prev)}
          className={classes.modalDiv}
        >
          <FormGroup className={classes.advancedInfoDiv}>
            <FormControl variant="filled">
              <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={filters.gender}
                name="gender"
                value={filters.gender}
                onChange={(event) => handleGenderChange(event)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.button}>
              <Typography id="range-slider" gutterBottom>
                Age range
              </Typography>
              <Slider
                value={filters.ageRange}
                onChange={handleAgeRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                marks
                min={16}
                max={60}
                step={1}
              />
            </div>
            <div>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={filters.smoke}
                    onChange={handleChange}
                    name="smoke"
                    color="primary"
                  />
                )}
                label="No smoking"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={filters.pet}
                    onChange={handleChange}
                    name="pet"
                    color="primary"
                  />
                )}
                label="No pets"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={filters.relationship}
                    onChange={handleChange}
                    name="relationship"
                    color="primary"
                  />
                )}
                label="Single"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={filters.religion}
                    onChange={handleChange}
                    name="religion"
                    color="primary"
                  />
                )}
                label="Religion"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={filters.employed}
                    onChange={handleChange}
                    name="employed"
                    color="primary"
                  />
                )}
                label="Employed"
              />
            </div>
            <div>
              <Typography id="range-slider" gutterBottom>
                Budget range
              </Typography>
              <Slider
                value={filters.budgetRange}
                onChange={handleBudjetRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                marks
                min={500}
                max={6000}
                step={500}
              />
            </div>
            <div>
              <div>
                <Button variant="contained" color="primary" onClick={handleSubmit} size="small">
                  Search
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRefreshSearch}
                  size="small"
                  className={classes.button}
                >
                  Clean Filters
                </Button>
              </div>
            </div>
          </FormGroup>
        </Modal>
      )}
    </div>
  );
};

export default FilterModal;
