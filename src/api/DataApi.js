/*
 * @flow
 */

/**
 * DataApi gives access to Loom's REST API for reading and writing data against an existing EntityDataModel.
 *
 * @module DataApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.DataApi.get...
 *
 * @example
 * import { DataApi } from 'loom-data';
 * // DataApi.get...
 */

import Immutable from 'immutable';

import Logger from '../utils/Logger';

import {
  DATA_API
} from '../constants/ApiNames';

import {
  GET_DATA_PATH,
  ENTITY_DATA_PATH
} from '../constants/ApiPaths';

import {
  getApiBaseUrl,
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isNonEmptyObject
} from '../utils/LangUtils';

import {
  isValidUuid,
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('DataApi');

const FILE_TYPES :Map<string, string> = Immutable.Map().withMutations((map :Map<string, string>) => {
  map.set('csv', 'csv');
  map.set('CSV', 'csv');
  map.set('json', 'json');
  map.set('JSON', 'json');
});

/**
 * `GET /data/entitydata/{uuid}`
 *
 * Gets all data for the given EntitySet UUID.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {UUID} entitySetId
 * @returns {Promise}
 *
 * @example
 * DataApi.getEntitySetData("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getEntitySetData(entitySetId :UUID) :Promise<> {

  if (!isValidUuid(entitySetId)) {
    return Promise.reject('invalid parameter: entitySetId must be a valid UUID');
  }

  return getApiAxiosInstance(DATA_API)
    .get(`/${ENTITY_DATA_PATH}/${entitySetId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * Returns the URL to be used for a direct file download for all data for the given EntitySet UUID.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {UUID} entitySetId
 * @param {string} fileType
 * @returns {string}
 *
 * @example
 * DataApi.getAllEntitiesOfTypeFileUrl("ec6865e6-e60e-424b-a071-6a9c1603d735", "json");
 */
export function getEntitySetDataFileUrl(entitySetId :UUID, fileType :string) :?string {

  if (!isValidUuid(entitySetId)) {
    LOG.warn('invalid parameter: entitySetId must be a valid UUID', entitySetId);
    return null;
  }

  if (!FILE_TYPES.contains(fileType)) {
    LOG.warn('invalid parameter: fileType must be a valid file type string', fileType);
    return null;
  }

  return `${getApiBaseUrl(DATA_API)}/${ENTITY_DATA_PATH}/${entitySetId}?fileType=${FILE_TYPES.get(fileType)}`;
}

/**
 * `POST /data/entitydata/{uuid}/getData`
 *
 * Gets all data for the given EntitySet UUID with respect to the given filters.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {UUID} entitySetId
 * @param {UUID[]} syncIds
 * @param {UUID[]} propertyTypeIds
 * @returns {Promise}
 *
 * @example
 * DataApi.getSelectedEntitySetData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"],
 *   ["8f79e123-3411-4099-a41f-88e5d22d0e8d"]
 * );
 */
export function getSelectedEntitySetData(entitySetId :UUID, syncIds :UUID[], propertyTypeIds :UUID[]) :Promise<> {

  if (!isValidUuid(entitySetId)) {
    return Promise.reject('invalid parameter: entitySetId must be a valid UUID');
  }

  if (!isValidUuidArray(syncIds)) {
    return Promise.reject('invalid parameter: syncIds must be a non-empty array of valid UUIDs');
  }

  if (!isValidUuidArray(propertyTypeIds)) {
    return Promise.reject('invalid parameter: propertyTypeIds must be a non-empty array of valid UUIDs');
  }

  const data = {
    syncIds,
    properties: propertyTypeIds
  };

  return getApiAxiosInstance(DATA_API)
    .post(`/${ENTITY_DATA_PATH}/${entitySetId}/${GET_DATA_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /data/entitydata/{uuid}/{uuid}`
 *
 * Creates an entry for the given entity data.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {UUID} entitySetId
 * @param {UUID} syncId
 * @param {Object} entities
 * @return {Promise}
 *
 * @example
 * DataApi.createEntityData({
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   {
 *     "entityId_1": [
 *       {
 *         "uuid_1": ["value_1", "value_2"],
 *         "uuid_2": ["value_3", "value_4"]
 *       }
 *     ]
 *   }
 * });
 */
export function createEntityData(entitySetId :UUID, syncId :UUID, entities :Object) :Promise<> {

  if (!isValidUuid(entitySetId)) {
    return Promise.reject('invalid parameter: entitySetId must be a valid UUID');
  }

  if (!isValidUuid(syncId)) {
    return Promise.reject('invalid parameter: syncId must be a valid UUID');
  }

  // TODO: validate entities as Map<String, SetMultimap<UUID, Object>>

  if (!isNonEmptyObject(entities)) {
    return Promise.reject('invalid parameter: entities must be a non-empty object');
  }

  return getApiAxiosInstance(DATA_API)
    .post(`/${ENTITY_DATA_PATH}/${entitySetId}/${syncId}`, entities)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
