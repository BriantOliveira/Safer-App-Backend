require('dotenv').config();
const axios = require('axios');
const logger = require('./logger');
// features for air quality to use
const features = ['health_recommendations', 'dominant_pollutant_concentrations', 'pollutants_concentrations', 'pollutants_aqi_information'];
const lat = '37.871593'; // will later pass in latitue and longitude gotten from user location
const long = '-122.272743'; // use these for Berkeley

const BreezeURI = 'https://api.breezometer.com';

// convert the data
const convertFireAlertToRawData = async () => {
  logger.info('Coverting data from api.');
  try {
    const response = await axios.get(`${BreezeURI}/fires/v1/current-conditions?lat=${lat}&lon=${long}&key=${process.env.APIKEY}`, {
      refresh: false,
      incognito: false,
      ipAddress: '32.4.2.223',
      language: 'en',
    });

    return response.data;
  } catch (error) {
    console.log(error);
    // logger.error(error);
    return undefined;
  }
};

const convertAirQualityToRawData = async () => {
  logger.info('Coverting data from api.');
  try {
    const response = await axios.get(`${BreezeURI}/air-quality/v2/current-conditions?lat=${lat}&lon=${long}&features=${features}&key=${process.env.APIKEY}`, {
      // headers: { 'features': features },
      refresh: false,
      incognito: false,
      ipAddress: '32.4.2.223',
      language: 'en',
    });

    return response.data;
  } catch (error) {
    console.log(error);
    // logger.error(error);
    return undefined;
  }
};

const FindFireAlertToRawData = async (lat1, long2) => {
  logger.info('Coverting data from api.');
  try {
    const response = await axios.get(`${BreezeURI}/fires/v1/current-conditions?lat=${lat1}&lon=${long2}&key=${process.env.APIKEY}`, {
      refresh: false,
      incognito: false,
      ipAddress: '32.4.2.223',
      language: 'en',
    });

    return response.data;
  } catch (error) {
    console.log(error);
    // logger.error(error);
    return undefined;
  }
};

const FindAirQualityToRawData = async (lat2, long2) => {
  logger.info('Coverting data from api.');
  try {
    const response = await axios.get(`${BreezeURI}/air-quality/v2/current-conditions?lat=${lat2}&lon=${long2}&features=${features}&key=${process.env.APIKEY}`, {
      // headers: { 'features': features },
      refresh: false,
      incognito: false,
      ipAddress: '32.4.2.223',
      language: 'en',
    });

    return response.data;
  } catch (error) {
    console.log(error);
    // logger.error(error);
    return undefined;
  }
};

module.exports = {
  convertFireAlertToRawData,
  convertAirQualityToRawData,
  FindFireAlertToRawData,
  FindAirQualityToRawData,
};
