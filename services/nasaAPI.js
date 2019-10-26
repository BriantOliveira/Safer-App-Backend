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

/**
 * Collect all the current Iceberg Tracking events from Brigham Young
 * University Antarctic Iceberg Tracking Database at the specified
 * url into data that can be used throughout the rest of the project.
 * @param {String} url The url pointing to the endpoint to be processed
 * @param {String} When “BYU_ICE” will only return current Iceberg event.
 * @returns The raw data returned from the NASA API or undefined
 * @return {id} Unique id for this event
 * @return {title} The title of the event.
 * @return {description} Optional longer description of the event.
 * Most likely only a sentence or two.
 * @return {link} The full link to the API endpoint for this specific event.
 * @return {categories} One or more categories assigned to the event.
 * @return {sources} One or more sources that refer to more information about the event.
 * @return {geometries} One or more event geometries are the pairing of a
 * specific date/time with a location.
 */
const getAllIcebergTrackingEvents = async (url) => {
  logger.info('Collecting all of the satellite data.');
  try {
    const response = await nasaAPI.get('/api/v2.1/events?source=BYU_ICE', {
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
 * Collect all the current Iceberg Tracking events from Brigham Young
 * University Antarctic Iceberg Tracking Database at the specified
 * url into data that can be used throughout the rest of the project.
 * @param {String} url The url pointing to the endpoint to be processed
 * @param {String} BYU_ICE will only return current Iceberg event.
 * @param {String} close will only return return events that had ended
 * @returns The raw data returned from the NASA API or undefined
 */
const getInactiveIcebergTrackingEvents = async (url) => {
  logger.info('Collecting all of the satellite data.');
  try {
    const response = await nasaAPI.get('/api/v2.1/events?source=BYU_ICE&status=closed', {
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
 * Collect all the current Storms, Volcanos and Floods events from
 * Copernicus Emergency Management Service at the specified
 * url into data that can be used throughout the rest of the project.
 * @param {String} url The url pointing to the endpoint to be processed
 * @param {String} When “CEMS” will only return current event.
 * @returns The raw data returned from the NASA API or undefined
 */
const getAllVolcanicEvents = async (url) => {
  logger.info('Collecting all of the satellite data.');
  try {
    const response = await nasaAPI.get('/api/v2.1/events?source=CEMS', {
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
 * Collect all the current Storms, Volcanos and Floods events from
 * Copernicus Emergency Management Service at the specified
 * url into data that can be used throughout the rest of the project.
 * @param {String} url The url pointing to the endpoint to be processed
 * @param {String} When “CEMS” will only return current event.
 * @param {String} close will only return return events that had ended
 * @returns The raw data returned from the NASA API or undefined
 */
const getInactiveCEMEvents = async (url) => {
  logger.info('Collecting all of the satellite data.');
  try {
    const response = await nasaAPI.get('/api/v2.1/events?source=CEMS&status=closed', {
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
 * Earth Observatory data at the specified
 * url into data that can be used throughout the rest of the project.
 * @param {String} url The url pointing to the endpoint to be processed
 * @param {String} When “CEMS” will only return current event.
 * @param {String} close will only return return events that had ended
 * @returns The raw data returned from the NASA API or undefined
 */
const getInactiveEOEvents = async (url) => {
  logger.info('Collecting all of the satellite data.');
  try {
    const response = await nasaAPI.get('/api/v2.1/events?source=EOS&status=closed', {
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
 * Collect all the current Earth Observatory data at the specified
 * url into data that can be used throughout the rest of the project.
 * @param {String} url The url pointing to the endpoint to be processed
 * @param {String} When “EO” will only return current event.
 * @returns The raw data returned from the NASA API or undefined
 */
const getEarthObservatoryEvents = async (url) => {
  logger.info('Collecting all of the satellite data.');
  try {
    const response = await nasaAPI.get('/api/v2.1/events?source=EO', {
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
