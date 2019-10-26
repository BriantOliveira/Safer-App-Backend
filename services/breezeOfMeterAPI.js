const axios = require('axios');
const logger = require('../services/logger');
//features for air quality to use
const features = {"health_recommendations", "dominant_pollutant_concentrations", "pollutants_concentrations", "pollutants_aqi_information"};
let lat = "37.871593"; //will later pass in latitue and longitude gotten from user location
let long = "-122.272743"; //use these for Berkeley
// let lat = "38.521120" //will later pass in latitue and longitude gotten from user location
// let long = "-122.812060" //use these for getting a current fire
//get current fire alerts
const getBreezeData = axios.create({
    baseURL: 'https://api.breezometer.com/',
    headers: { lat: lat, lon: long, key: process.env.breezeKey },
})
//get current air quality conditions
const getAirQuality = axios.create({
    baseURL: 'https://api.breezometer.com/',
    headers: { lat: lat, lon: long, key: process.env.breezeKey},
})
//convert the data
const convertFireAlertToRawData = async (url) => {
  logger.info('Coverting data from api.');
  try {
    const response = await getBreezeData.get('/fires/v1/current-conditions', {
      url,
    });
    return response.data;
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

const convertAirQualityToRawData = async (url) => {
  logger.info('Coverting data from api.');
  try {
    const response = await getBreezeData.get('/air-quality/v2/current-conditions', {
      url,
      headers: { 'features': features },
    });
    return response.data;
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

module.exports = { breezeOfMeterAPI };
