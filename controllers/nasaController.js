/* eslint-disable no-undef */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
const { Router } = require('express');
// const cron = require('node-cron');
const { respondWith } = require('../services/clientResponse');
const logger = require('../services/logger');
const { asyncHandler } = require('../services/asyncRouterHandler');
const { storeClimateData } = require('../services/nasaAPI');
const Event = require('../models/events');

const router = Router();

router.post('/getEvents', asyncHandler(async (req, res) => {
  const data = await storeClimateData();

  const newEvent = new Event(data);
  // console.log(data);
  newEvent.eventId = 'hello';
  // console.log(newEvent.eventId);
  newEvent.save(data, (err) => {
    if (err) {
      logger.error(err);
      return respondWith(res, 500, ['An Error occured while fetching NASA API']);
    }

    return respondWith(res, 200, ['Data retrieved successfully.'], { data });
  });
}));


router.get('/getAllEvents', asyncHandler(async (req, res) => {
  const data = await storeClimateData();

  if (data === undefined) {
    logger.error(data);
    return respondWith(res, 500, ['An Error occured while fetching NASA API']);
  }

  return respondWith(res, 200, ['Data retrieved successfully.'], { data });
}));

module.exports = router;
