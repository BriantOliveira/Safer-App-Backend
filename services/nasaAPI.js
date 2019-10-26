/* eslint-disable max-len */
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
 * @return {id} Unique id for this event
 * @return {title} The title of the event.
 * @return {description} Optional longer description of the event. Most likely only a sentence or two.
 * @return {link} The full link to the API endpoint for this specific event.
 * @return {categories} One or more categories assigned to the event.
 * @return {sources} One or more sources that refer to more information about the event.
 * @return {geometries} One or more event geometries are the pairing of a specific date/time with a location.
 * @return {closed} An event is deemed “closed” when it has ended.
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

/**
 * Collect all the current catastrophes events at the specified url into data that can be used
 * throughout the rest of the project.
 * @param {String} url The url pointing to the endpoint to be processed
 * @param {String} When “closed” will only return events that had ended.
 * @returns The raw data returned from the NASA API or undefined
 * @return {id} Unique id for this event
 * @return {title} The title of the event.
 * @return {description} Optional longer description of the event. Most likely only a sentence or two.
 * @return {link} The full link to the API endpoint for this specific event.
 * @return {categories} One or more categories assigned to the event.
 * @return {sources} One or more sources that refer to more information about the event.
 * @return {geometries} One or more event geometries are the pairing of a specific date/time with a location.
 * @return {closed} An event is deemed “closed” when it has ended.
 */
const getAllEndedEvents = async (url) => {
  logger.info('Collecting all of the satellite data.');
  try {
    const response = await nasaAPI.get('/api/v2.1/events?status=closed', {
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
  getAllEndedEvents,
};
