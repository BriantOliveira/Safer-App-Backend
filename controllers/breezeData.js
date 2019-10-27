/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable func-names */
const { Router } = require('express');
const logger = require('../services/logger');
const {
  convertFireAlertToRawData, convertAirQualityToRawData, FindFireAlertToRawData, FindAirQualityToRawData
} = require('../services/breezeOfMeterAPI');
const { respondWith } = require('../services/clientResponse');
const { asyncHandler } = require('../services/asyncRouterHandler');

const router = Router();

router.get('/airquality', asyncHandler(async (req, res) => {
  const data = await convertAirQualityToRawData();
  if (data === undefined) {
    logger.error(data);
    return respondWith(res, 500, ['An error occured while getting data.']);
  }
  return respondWith(res, 200, { data });
}));

router.get('/firealert', asyncHandler(async (req, res) => {
  const data = await convertFireAlertToRawData();
  if (data === undefined) {
    logger.error(data);
    return respondWith(res, 500, ['An error occured while getting data.']);
  }
  return respondWith(res, 200, { data });
}));

router.post('/findairquality', asyncHandler(async (req, res) => {
  const data = await FindAirQualityToRawData(req.body.lat, req.body.long);
  if (data === undefined) {
    logger.error(data);
    return respondWith(res, 500, ['An error occured while getting data.']);
  }
  return respondWith(res, 200, { data });
}));

router.post('/findfirealert', asyncHandler(async (req, res) => {
  const data = await FindFireAlertToRawData(req.body.lat, req.body.long);
  if (data === undefined) {
    logger.error(data);
    return respondWith(res, 500, ['An error occured while getting data.']);
  }
  return respondWith(res, 200, { data });
}));

module.exports = router;
