import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  Typography,
  Button,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import network from '../utils/network';

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
  checkBoxes: {
    display: 'flex',
    flexDirection: 'column',

  },
  searchBarDesktop: {
    padding: '0 1em',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    margin: 'auto',
    position: 'relative',
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
  closeMenu,
  setFilters,
  filters,
  setOverTime,
}) => {
  const classes = useStyles();

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
    closeMenu();
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
      '/server/api/v1/users/all-cards/filtered',
      filteredSearchObj,
    );
    setAllUsersInfo(data);
    setOverTime(false);
    closeMenu();
  };

  return (
    <form>
      <FormGroup className={classes.searchBarDesktop}>
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
        <div className={classes.checkBoxes}>
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
              Search Potential Roomates
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
              Get all the Roomates
            </Button>
          </div>
          <Button
            className={classes.cleanFilter}
            onClick={closeMenu}
            variant="contained"
            color="secondary"
            size="small"
          >
            Cancel
          </Button>
        </div>
      </FormGroup>

      {/* <FormGroup className={classes.searchBarMobile}>
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

    </form>
  );
};

export default FilterBar;
