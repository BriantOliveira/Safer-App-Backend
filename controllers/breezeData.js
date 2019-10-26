const breezeOfMeterAPI = require('breezeOfMeterAPI');
const logger = require('../services/logger');
const { respondWith } = require('../services/clientResponse');

app.get('/airquality', asyncHandler(async (req, res) => {
  const data = await convertFireAlertToRawData();
  if (!data) {
    logger.error(data);
    return respondWith(res, 500, ['An error occured while getting data.']);
  }
  return respondWith(res, 200, 'Data retrieved successfully.', data);
}));

app.get('/firealert', asyncHandler(async (req, res) => {
  const data = await convertAirQualityToRawData();
  if (!data) {
    logger.error(data);
    return respondWith(res, 500, ['An error occured while getting data.']);
  }
  return respondWith(res, 200, 'Data retrieved successfully.', data);
}));
