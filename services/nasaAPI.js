/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/*
*  NASA's EONET API SERVICES
*/

const axios = require('axios');
/* eslint-disable no-console */
// eslint-disable-next-line import/order
const { client, DATABASE_NAME } = require('../config/db');
const logger = require('../services/logger');
const { respondWith } = require('../services/clientResponse');
const Event = require('../models/events');
/** Creating reference to NASA's API */
// const baseURL = 'https://eonet.sci.gsfc.nasa.gov';

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
const getAllEventsData = async () => {
  logger.info('Collecting all of the satellite data.');
  try {
    const response = await axios.get('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events', {
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
const getAllEndedEvents = async () => {
  logger.info('Collecting all of the satellite data.');
  try {
    const response = await nasaAPI.get('/api/v2.1/events?status=closed', {
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
 * Process the raw data returned from NASA's API into
 * data that can be used to create models in the database
 * @param {JSON} rawData the raw data returned from the API to be processed
 * @return An Object containing the processed data climate data
 */
// TODO: COME BACK ON THIS FUNCTION
const processRawData = (rawData) => {
  logger.info('Processing raw data into usable data...');

  /** Process item data */
  const EventDataArray = rawData.events.map((item) => {
    try {
      const eventValues = {
        eventId: item.id,
        title: item.title,
        link: item.link,
        categoryNumber: item.categories[0].id,
        categoryName: item.categories[0].title,
        sources: item.sources,
        date: item.geometries[0].date,
        geometriesType: item.geometries[0].type,
        coordinates: item.geometries[0].coordinates,
      };
      return eventValues;
    } catch (err) {
      logger.error(err);
      return undefined;
    }
  });
  return EventDataArray;
};


const storeClimateData = async () => {
  try {
    /** Process the data */
    const climateRawData = await getAllEventsData();
    const eventData = await processRawData(climateRawData);

    // console.log(eventData);
    // const StoreData = await Event.save(eventData);

    // save into the db
    return eventData;
  } catch (err) {
    logger.error(err);
    return err;
  }
};


module.exports = {
  storeClimateData,
  getAllEventsData,
  getAllEndedEvents,
};
