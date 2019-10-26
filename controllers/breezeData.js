const logger = require('../services/logger');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { convertFireAlertToRawData, convertAirQualityToRawData } = require('../services/breezeOfMeterAPI');
const { respondWith } = require('../services/clientResponse');
const { asyncHandler } = require('../services/asyncRouterHandler');

module.exports = function(app) {
    app.use(methodOverride('_method'));
    app.use(bodyParser.urlencoded({ extended: true }));

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
};
