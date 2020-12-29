import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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
import FilterModal from './FilterModal';

export type Props = {
    [key: string]: any;
  };

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  range_root: {
    width: 150,
    marginLeft: '10px',
    marginTop: '10px',
  },
  searchBarMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  searchBarDesktop: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px',
    margin: 'auto',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '30px',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {

    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    [theme.breakpoints.down('sm')]: {

    },
  },
  header: {
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {

    },
  },
  cleanFilter: {
    marginTop: theme.spacing(2),
  },
}));

const FilterBar: React.FC<Props> = ({
  setAllUsersInfo,
  userId,
  openFil,
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
  const [openFilter, SetOpenFilter] = useState<boolean>(false);
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
      `/api/v1/users/all-cards?userId=${userId}`,
    );
    setAllUsersInfo(data);
  };

  const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilters({ ...filters, gender: event.target.value as string });
  };

  const handleSubmit = async () => {
    const objEntries = Object.entries(filters);
    const filteredSearchObj = Object.fromEntries(
      objEntries.filter(
        (filter) => filter[1] === true || typeof filter[1] !== 'boolean',
      ),
    );
    if (filteredSearchObj.gender === '') delete filteredSearchObj.gender;
    filteredSearchObj.userId = userId;
    const { data } = await network.post(
      '/api/v1/users/all-cards/filtered',
      filteredSearchObj,
    );
    console.log(data);
    setAllUsersInfo(data);
  };

  return (
    (openFil
    && (
      <>
        {/* <FormGroup className={classes.searchBarDesktop}>
          <Typography variant="h6" className={classes.header}>
            Filter Roomates:
          </Typography>
          <FormControl variant="filled" className={classes.formControl}>
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
          <div className={classes.range_root}>
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
          <div className={classes.range_root}>
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
          <div className={classes.buttons}>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                size="small"
              >
                Search
              </Button>
            </div>
            <div>
              <Button
                className={classes.cleanFilter}
                variant="contained"
                color="primary"
                onClick={handleRefreshSearch}
                size="small"
              >
                Clean Filters
              </Button>
            </div>
          </div>
        </FormGroup>
        <FormGroup className={classes.searchBarMobile}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => SetOpenFilter((prev) => !prev)}
            size="small"
          >
            Filter Roomates
          </Button>
          <FilterModal
            openFilter={openFilter}
            SetOpenFilter={SetOpenFilter}
            setAllUsersInfo={setAllUsersInfo}
            userId={userId}
          />
        </FormGroup> */}
        filter Bar
      </>
    )
    )
  );
};

export default FilterBar;
