/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

const router = Router();
const faker = require('faker');

//mongoDB models:
const UserData = require('../../../models/userData');
const UserPreferences = require('../../../models/userPreferences');

router.post('/mock-user-data', async (req: Request, res: Response) => {
  try {
    const mockUsersArray: typeof UserData[] = [];
    for (let id = 1; id < 35; id++) {
      const userData = new UserData({
        _id: new ObjectId(),
        userId: new ObjectId(id),
        age: faker.random.number({min: 16, max: 40}),
        gender: faker.random.arrayElement(['Female', 'Male']),
        smoke: faker.random.arrayElement(['Allways', 'Sometime', 'Never']),
        pet: faker.random.boolean(),
        relationship: faker.random.boolean(),
        employee: faker.random.boolean(),
        interests: [faker.random.arrayElement(['Sports', 'Music', 'Business', 'Other'])],
        languages: [faker.random.arrayElement(['Hebrew', 'English', 'Spanich', 'French', 'Arabic'])],
        music: [faker.random.arrayElement(['Israeli', 'Pop', 'Rock', 'Mizrahit', 'Old French'])],
        lookingFor: {roomate: true, friend: false},
        numOfRoomates: faker.random.number({ min: 1, max: 3}),
        religion: faker.random.boolean(),
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      });
      await userData.save(userData).then(() => mockUsersArray.push(userData));
    }
    console.log(mockUsersArray);
    
    res.status(200).json(mockUsersArray);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/mock-user-preference', async (req: Request, res: Response) => {
  try {
    const mockUsersArray: typeof UserPreferences[] = [];
    for (let id = 1; id < 35; id++) {
      const userPreferences = new UserPreferences({
        _id: new ObjectId(),
        userId: new ObjectId(id),
        ages: { top: faker.random.number({ min: 25, max: 40 }), bottom: faker.random.number({ min: 16, max: 25 }) },
        genders: { male: faker.random.boolean(), female: faker.random.boolean() },
        smokes: faker.random.boolean(),
        pets: faker.random.boolean(),
        relationship: faker.random.boolean(),
        employed: faker.random.boolean(),
        interests: [faker.random.arrayElement(['Sports', 'Music', 'Business', 'Other'])],
        languages: [faker.random.arrayElement(['Hebrew', 'English', 'Spanich', 'French', 'Arabic'])],
        music: [faker.random.arrayElement(['Israeli', 'Pop', 'Rock', 'Mizrahit', 'Old French'])],
        lookingFor: { roomate: true, friend: false },
        numOfRoomates: faker.random.number({ min: 1, max: 3 }),
        religion: faker.random.boolean(),
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      });
      await userPreferences.save(userPreferences).then(() => mockUsersArray.push(userPreferences));
    }
    console.log(mockUsersArray);
    
    res.status(200).json(mockUsersArray);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;