require('dotenv').config();
const axios = require('axios');
const logger = require('./logger');
//features for air quality to use
const features = ["health_recommendations", "dominant_pollutant_concentrations", "pollutants_concentrations", "pollutants_aqi_information"]
let lat = "37.871593"; //will later pass in latitue and longitude gotten from user location
let long = "-122.272743"; //use these for Berkeley
// let lat = "38.521120" //will later pass in latitue and longitude gotten from user location
// let long = "-122.812060" //use these for getting a current fire
//get current fire alerts

//get current air quality conditions
// const getAirQuality = axios.create({
//     baseURL: 'https://api.breezometer.com',
//     headers: { lat: lat, lon: long, key: process.env.breezeKey},
// })
// axios.get('https://api.breezometer.com/fires/v1/current-conditions?lat=38.521120&lon=-122.812060&key=3e8fb9e213d949d8b66eba36dffb7e2e', {

const BreezeURI = 'https://api.breezometer.com'

// convert the data
const convertFireAlertToRawData = async () => {
  logger.info('Coverting data from api.');
    try {
        const response = await axios.get(`${BreezeURI}/fires/v1/current-conditions?lat=${lat}&lon=${long}&key=${process.env.APIKEY}`, {
          //headers: { 'features': features },
          refresh: false,
          incognito: false,
          ipAddress: '32.4.2.223',
          language: 'en',
        });

        return response.data;
  } catch (error) {
      console.log(error)
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
      console.log(error)
    // logger.error(error);
    return undefined;
  }
};



// const convertAirQualityToRawData = async (url) => {
//   logger.info('Coverting data from api.');
//   try {
//     const response = await getBreezeData.get('/air-quality/v2/current-conditions', {
//       url,
//       headers: { 'features': features },
//     });
//     return response.data;
//   } catch (error) {
//     logger.error(error);
//     return undefined;
//   }
// };

module.exports = { convertFireAlertToRawData, convertAirQualityToRawData };
