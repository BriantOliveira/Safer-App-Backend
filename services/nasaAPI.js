/*
*  NASA's EONET API SERVICES
*/

const axios = require('axios');
const logger = require('../services/logger');

/** Creating reference to NASA's API */
const nasaAPI = axios.create({
  baseURL: 'https://eonet.sci.gsfc.nasa.gov',
});

/**
 * Collect all the catastrophes events at the specified url into data that can be used
 * throughout the rest of the project.
 * @param {String} url The url pointing to the endpoint to be processed
 * @returns The raw data returned from the NASA API or undefined
 */
const getAllEventsData = async (url) => {
  logger.info('Collecting all of the satellite data.');
  try {
    const response = await nasaAPI.get('/api/v2.1/events', {
      url,
      headers: { 'x-custom-key': 'string' },
      refresh: false,
      incognito: false,
      ipAddress: '32.4.2.223',
      language: 'en',
    });
    return response.data;
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

module.exports = {
  getAllEventsData,
};
