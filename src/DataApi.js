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

import FullyQualifiedName from './types/FullyQualifiedName';
import Logger from './utils/Logger';

import {
  getApiBaseUrl,
  DATA_API
} from './config/ApiEndpoints';

import {
  getAxiosInstance
} from './utils/AxiosUtils';

import {
  isNonEmptyString
} from './utils/LangUtils';

const LOG = new Logger('DataApi');

/*
 *
 * constants
 *
 */

const ENTITY_DATA_PATH = 'entitydata';
const MULTIPLE_PATH = 'multiple';

/**
 * `GET /entitydata/{namespace}/{name}`
 *
 * Gets all entity data for the given EntityType
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @returns {Promise<Array<Object>>} - a Promise that will resolve with the entity data as its fulfillment value
 *
 * @example
 * DataApi.getAllEntitiesOfType(
 *   { namespace: "LOOM", name: "MyEntity" }
 * );
 */
export function getAllEntitiesOfType(entityTypeFqn :Object) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn)) {
    return Promise.reject('invalid parameter: entityTypeFqn must be a valid object literal');
  }

  const { namespace, name } = entityTypeFqn;

  return getAxiosInstance(getApiBaseUrl(DATA_API))
    .get(`/${ENTITY_DATA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function downloadAllEntitiesOfType(entityTypeFqn :Object, fileType :string) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn)) {
    return Promise.reject('invalid parameter: entityTypeFqn must be a valid object literal');
  }

  const { namespace, name } = entityTypeFqn;

  return getAxiosInstance(getApiBaseUrl(DATA_API))
    .get(`/${ENTITY_DATA_PATH}/${namespace}/${name}`, {
      params: {
        fileType
      }
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PUT /entitydata/multiple`
 *
 * Gets all entity data for the given array of EntityTypes
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Array<Object>} entityTypeFqns - an array of object literals representing fully qualified names
 * @returns {Promise<Array<Array<Object>>>} - a Promise that will resolve with the entity data as its fulfillment value
 *
 * @example
 * DataApi.getAllEntitiesOfTypes([
 *   { namespace: "LOOM", name: "MyEntity1" },
 *   { namespace: "LOOM", name: "MyEntity2" }
 * ]);
 */
export function getAllEntitiesOfTypes(entityTypeFqns :Object[]) :Promise<> {

  return getAxiosInstance(getApiBaseUrl(DATA_API))
    .put(`/${ENTITY_DATA_PATH}/${MULTIPLE_PATH}`, entityTypeFqns)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /entitydata/{namespace}/{name}/{name}`
 *
 * Gets all entity data in the EntitySet defined by the given EntityType.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @param {String} entitySetName - the value of the "name" field of the EntitySet
 * @returns {Promise}
 *
 * @example
 * DataApi.getAllEntitiesOfTypeInSet({
 *   { namespace: "LOOM", name: "MyEntity" },
 *   "MyEntityCollection"
 * });
 */
export function getAllEntitiesOfTypeInSet(entityTypeFqn :Object, entitySetName :string) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn)) {
    return Promise.reject('invalid parameter: entityTypeFqn must be a valid object literal');
  }

  if (isNonEmptyString(entitySetName)) {
    return Promise.reject('invalid parameter: entitySetName must be a non-empty string');
  }

  const { namespace, name } = entityTypeFqn;

  return getAxiosInstance(getApiBaseUrl(DATA_API))
    .get(`/${ENTITY_DATA_PATH}/${namespace}/${name}/${entitySetName}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function downloadAllEntitiesOfTypeInSet(
    entityTypeFqn :Object, entitySetName :string, fileType :string) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn)) {
    return Promise.reject('invalid parameter: entityTypeFqn must be a valid object literal');
  }

  if (isNonEmptyString(entitySetName)) {
    return Promise.reject('invalid parameter: entitySetName must be a non-empty string');
  }

  const { namespace, name } = entityTypeFqn;

  return getAxiosInstance(getApiBaseUrl(DATA_API))
    .get(`/${ENTITY_DATA_PATH}/${namespace}/${name}/${entitySetName}`, {
      params: {
        fileType
      }
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entitydata`
 *
 * Creates an entry for the given entity data
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Object} createEntityRequest
 * @returns {Promise}
 *
 * @example
 * // creating a single entity
 * DataApi.createEntity({
 *   type: { namespace: "LOOM", name: "MyEntity" },
 *   entitySetName: "MyEntityCollection",
 *   properties: [{
 *     "LOOM.MyPropertyType": "value"
 *   }]
 * });
 *
 * @example
 * // creating multiple entities of the same EntityType
 * DataApi.createEntity({
 *   type: { namespace: "LOOM", name: "MyEntity" },
 *   entitySetName: "MyEntityCollection",
 *   properties: [{
 *     { "LOOM.MyPropertyType": "value1" },
 *     { "LOOM.MyPropertyType": "value2" },
 *   }]
 * });
 */
export function createEntity(createEntityRequest :Object) :Promise<> {

  return getAxiosInstance(getApiBaseUrl(DATA_API))
    .post(`/${ENTITY_DATA_PATH}`, createEntityRequest)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
