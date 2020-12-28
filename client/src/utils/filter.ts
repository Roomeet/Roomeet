/*eslint-disable */
import { UserDataInterface } from '../interfaces/userData';

export type filterState = {
    gender: string;
    smoke: boolean;
    pet: boolean;
    relationship: boolean;
    religion: boolean;
    employed: boolean;
    budgetRange: number[];
    ageRange: number[];
};

export const filterData = (allUsersInfo : UserDataInterface[], filterBy: filterState) => {
  const objEntries = Object.entries(filterBy);
  console.log(allUsersInfo[0]);
  const filteredSearchObj = objEntries.filter((filter) => filter[1] === true || typeof filter[1] !== 'boolean');
//   const filteredData = allUsersInfo.filter((userInfo) => )
  return 'hey';
};
