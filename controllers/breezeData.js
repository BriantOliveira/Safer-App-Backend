/* eslint-disable func-names */
const { Router } = require('express');
const logger = require('../services/logger');
const { convertFireAlertToRawData, convertAirQualityToRawData } = require('../services/breezeOfMeterAPI');
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

module.exports = router;
