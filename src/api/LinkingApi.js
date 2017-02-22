/*
 * @flow
 */

/**
 * LinkingApi ...
 *
 * @module LinkingApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.LinkingApi.link...
 *
 * @example
 * import { LinkingApi } from 'loom-data';
 * // LinkingApi.link...
 */

import Logger from '../utils/Logger';

import {
  LINKING_API
} from '../constants/ApiNames';

import {
  SET_PATH,
  TYPE_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid
} from '../utils/ValidationUtils';

const LOG = new Logger('LinkingApi');

/**
 * `POST /linking/type`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise<UUID>}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function createLinkingEntityType(linkingEntityType :LinkingEntityType) :Promise<> {

  return getApiAxiosInstance(LINKING_API)
    .post(`/${TYPE_PATH}`, linkingEntityType)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /linking/set`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise<UUID>}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 */
export function linkEntitySets(linkingEntitySet :LinkingEntitySet) :Promise<> {

  return getApiAxiosInstance(LINKING_API)
    .post(`/${SET_PATH}`, linkingEntitySet)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /linking/set/{syncId}/{entitySetId}/{entityId}`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise<UUID>}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function linkEntities(syncId :UUID, entitySetId :UUID, entityId :string, entities :EntityKey[]) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(entityId)) {
    errorMsg = 'invalid parameter: entityId must be a non-empty string';
    LOG.error(errorMsg, entityId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(LINKING_API)
    .post(`/${SET_PATH}/${syncId}/${entitySetId}/${entityId}`, entities)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /linking/set/{syncId}/{entitySetId}/{entityId}`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function setLinkedEntities(syncId :UUID, entitySetId :UUID, entityId :string, entities :EntityKey[]) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(entityId)) {
    errorMsg = 'invalid parameter: entityId must be a non-empty string';
    LOG.error(errorMsg, entityId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(LINKING_API)
    .put(`/${SET_PATH}/${syncId}/${entitySetId}/${entityId}`, entities)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /linking/set/{syncId}/{entitySetId}/{entityId}`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function removeLinkedEntities(syncId :UUID, entitySetId :UUID, entityId :string) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(entityId)) {
    errorMsg = 'invalid parameter: entityId must be a non-empty string';
    LOG.error(errorMsg, entityId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(LINKING_API)
    .delete(`/${SET_PATH}/${syncId}/${entitySetId}/${entityId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /linking/set/{syncId}/{entitySetId}/{entityId}/{linkedEntityId}`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function addLinkedEntities(
    syncId :UUID,
    entitySetId :UUID,
    entityId :string,
    linkedEntityId :string) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(entityId)) {
    errorMsg = 'invalid parameter: entityId must be a non-empty string';
    LOG.error(errorMsg, entityId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(linkedEntityId)) {
    errorMsg = 'invalid parameter: linkedEntityId must be a non-empty string';
    LOG.error(errorMsg, linkedEntityId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(LINKING_API)
    .put(`/${SET_PATH}/${syncId}/${entitySetId}/${entityId}/${linkedEntityId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /linking/set/{syncId}/{entitySetId}/{entityId}/{linkedEntityId}`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function removeLinkedEntity(
    syncId :UUID,
    entitySetId :UUID,
    entityId :string,
    linkedEntityId :string) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(entityId)) {
    errorMsg = 'invalid parameter: entityId must be a non-empty string';
    LOG.error(errorMsg, entityId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(linkedEntityId)) {
    errorMsg = 'invalid parameter: linkedEntityId must be a non-empty string';
    LOG.error(errorMsg, linkedEntityId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(LINKING_API)
    .delete(`/${SET_PATH}/${syncId}/${entitySetId}/${entityId}/${linkedEntityId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
