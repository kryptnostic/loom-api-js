/*
 * @flow
 */

/**
 * EntityDataModelApi gives access to Loom's REST API for interacting with EntityDataModel (EDM) schemas.
 *
 * @module EntityDataModelApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.EntityDataModelApi.get...
 *
 * @example
 * import { EntityDataModelApi } from 'loom-data';
 * // EntityDataModelApi.get...
 */

import {
  isNil
} from 'lodash';

import FullyQualifiedName from '../types/FullyQualifiedName';
import Logger from '../utils/Logger';

import {
  EDM_API
} from '../constants/ApiNames';

import {
  SCHEMA_PATH,
  ENTITY_SET_PATH,
  ENTITY_TYPE_PATH,
  PROPERTY_TYPE_PATH,
  NAMESPACE_PATH,
  ADD_PROPERTY_TYPES_PATH,
  DELETE_PROPERTY_TYPES_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isNonEmptyArray,
  isNonEmptyObject,
  isNonEmptyString,
  isValidUUID
} from '../utils/LangUtils';

const LOG = new Logger('EntityDataModelApi');

/**
 * @typedef {string} UUID
 */

/*
 *
 * EntityDataModel APIs
 *
 */

/**
 * `GET /`
 *
 * Gets the entire Entity Data Model schema.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise} - a Promise that will resolve with the Entity Data Model schema as its fulfillment value
 */
export function getEntityDataModel() :Promise<> {

  return getApiAxiosInstance(EDM_API)
    .get('/')
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/*
 *
 * Schema APIs
 *
 */

/**
 * `GET /schema/{namespace}/{name}`
 *
 * Gets the schema definition for the given schema FQN.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} schemaFqn - an object literal representing a fully qualified name
 * @return {Promise<Object>} - a Promise that will resolve with the schema definition as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getSchema(
 *   { namespace: "LOOM", name: "MySchema" }
 * );
 */
export function getSchema(schemaFqn :Object) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(schemaFqn)) {
    return Promise.reject('invalid parameter: schemaFqn must be a valid FQN object literal');
  }

  const { namespace, name } = schemaFqn;

  return getApiAxiosInstance(EDM_API)
    .get(`/${SCHEMA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /schema`
 *
 * Gets all schema definitions.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise<Object[]>} - a Promise that will resolve with all schema definitions as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllSchemas();
 */
export function getAllSchemas() :Promise<> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${SCHEMA_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /schema/{namespace}`
 *
 * Gets all schema definitions under the given namespace.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {string} namespace - the substring before the dot in a FullyQualifiedName String
 * @return {Promise<Object[]>} - a Promise that will resolve with all schema definitions as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllSchemasInNamespace("LOOM");
 */
export function getAllSchemasInNamespace(namespace :string) :Promise<> {

  if (!isNonEmptyString(namespace)) {
    return Promise.reject('invalid parameter: namespace must be a non-empty string');
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${SCHEMA_PATH}/${namespace}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PUT /schema`
 *
 * Creates a new schema definition for the given schema FQN, it it does not already exist.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} schemaFqn - an object literal representing a fully qualified name
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.createSchema(
 *   { namespace: "LOOM", name: "MySchema" }
 * );
 */
export function createSchema(schemaFqn :Object) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(schemaFqn)) {
    return Promise.reject('invalid parameter: schemaFqn must be a valid FQN object literal');
  }

  return getApiAxiosInstance(EDM_API)
    .put(`/${SCHEMA_PATH}`, schemaFqn)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PUT /schema/{namespace}/{name}`
 *
 * Updates the schema definition for the given schema FQN with the addition of the given EntityType FQNs.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} schemaFqn - an object literal representing a fully qualified name
 * @param {Object[]} entityTypeFqns - an array of object literals representing fully qualified names
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.addEntityTypesToSchema(
 *   { namespace: "LOOM", name: "MySchema" },
 *   [
 *     { namespace: "LOOM", name: "MyEntity1" },
 *     { namespace: "LOOM", name: "MyEntity2" }
 *   ]
 * );
 */
export function addEntityTypesToSchema(schemaFqn :Object, entityTypeFqns :Object[]) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(schemaFqn)) {
    return Promise.reject('invalid parameter: schemaFqn must be a valid FQN object literal');
  }

  if (!isNonEmptyArray(entityTypeFqns)) {
    return Promise.reject('invalid parameter: entityTypeFqns must be a non-empty array');
  }

  const allValid = entityTypeFqns.reduce((isValid, entityTypeFqn) => {
    return isValid && FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn);
  }, true);

  if (!allValid) {
    return Promise.reject('invalid parameter: entityTypeFqns must be an array of valid FQN object literals');
  }

  const { namespace, name } = schemaFqn;

  return getApiAxiosInstance(EDM_API)
    .put(`/${SCHEMA_PATH}/${namespace}/${name}`, entityTypeFqns)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /schema/{namespace}/{name}`
 *
 * Updates the schema definition for the given schema FQN with the removal of the given EntityType FQNs.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} schemaFqn - an object literal representing a fully qualified name
 * @param {Object[]} entityTypeFqns - an array of object literals representing fully qualified names
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.removeEntityTypesFromSchema(
 *   { namespace: "LOOM", name: "MySchema" },
 *   [
 *     { namespace: "LOOM", name: "MyEntity1" },
 *     { namespace: "LOOM", name: "MyEntity2" }
 *   ]
 * );
 */
export function removeEntityTypesFromSchema(schemaFqn :Object, entityTypeFqns :Object[]) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(schemaFqn)) {
    return Promise.reject('invalid parameter: schemaFqn must be a valid FQN object literal');
  }

  if (!isNonEmptyArray(entityTypeFqns)) {
    return Promise.reject('invalid parameter: entityTypeFqns must be a non-empty array');
  }

  const allValid = entityTypeFqns.reduce((isValid, entityTypeFqn) => {
    return isValid && FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn);
  }, true);

  if (!allValid) {
    return Promise.reject('invalid parameter: entityTypeFqns must be an array of valid FQN object literals');
  }

  const { namespace, name } = schemaFqn;

  return getApiAxiosInstance(EDM_API)
    .delete(`/${SCHEMA_PATH}/${namespace}/${name}`, {
      data: entityTypeFqns
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PUT /schema/{namespace}/{name}/addPropertyTypes`
 *
 * Updates the schema definition for the given schema FQN with the addition of the given PropertyType FQNs.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} schemaFqn - an object literal representing a fully qualified name
 * @param {Object[]} propertyTypeFqns - an array of object literals representing fully qualified names
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.addPropertyTypesToSchema(
 *   { namespace: "LOOM", name: "MySchema" },
 *   [
 *     { namespace: "LOOM", name: "MyProperty1" },
 *     { namespace: "LOOM", name: "MyProperty2" }
 *   ]
 * );
 */
export function addPropertyTypesToSchema(schemaFqn :Object, propertyTypeFqns :Object[]) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(schemaFqn)) {
    return Promise.reject('invalid parameter: schemaFqn must be a valid FQN object literal');
  }

  if (!isNonEmptyArray(propertyTypeFqns)) {
    return Promise.reject('invalid parameter: propertyTypeFqns must be a non-empty array');
  }

  const allValid = propertyTypeFqns.reduce((isValid, propertyTypeFqn) => {
    return isValid && FullyQualifiedName.isValidFqnObjectLiteral(propertyTypeFqn);
  }, true);

  if (!allValid) {
    return Promise.reject('invalid parameter: propertyTypeFqns must be an array of valid FQN object literals');
  }

  const { namespace, name } = schemaFqn;

  return getApiAxiosInstance(EDM_API)
    .put(`/${SCHEMA_PATH}/${namespace}/${name}/${ADD_PROPERTY_TYPES_PATH}`, propertyTypeFqns)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /schema/{namespace}/{name}/deletePropertyTypes`
 *
 * Updates the schema definition for the given schema FQN with the removal of the given PropertyType FQNs.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} schemaFqn - an object literal representing a fully qualified name
 * @param {Object[]} propertyTypeFqns - an array of object literals representing fully qualified names
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.removePropertyTypesFromSchema(
 *   { namespace: "LOOM", name: "MySchema" },
 *   [
 *     { namespace: "LOOM", name: "MyProperty1" },
 *     { namespace: "LOOM", name: "MyProperty2" }
 *   ]
 * );
 */
export function removePropertyTypesFromSchema(schemaFqn :Object, propertyTypeFqns :Object[]) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(schemaFqn)) {
    return Promise.reject('invalid parameter: schemaFqn must be a valid FQN object literal');
  }

  if (!isNonEmptyArray(propertyTypeFqns)) {
    return Promise.reject('invalid parameter: propertyTypeFqns must be a non-empty array');
  }

  const allValid = propertyTypeFqns.reduce((isValid, propertyTypeFqn) => {
    return isValid && FullyQualifiedName.isValidFqnObjectLiteral(propertyTypeFqn);
  }, true);

  if (!allValid) {
    return Promise.reject('invalid parameter: propertyTypeFqns must be an array of valid FQN object literals');
  }

  const { namespace, name } = schemaFqn;

  return getApiAxiosInstance(EDM_API)
    .delete(`/${SCHEMA_PATH}/${namespace}/${name}/${DELETE_PROPERTY_TYPES_PATH}`, {
      data: propertyTypeFqns
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/*
 *
 * EntitySet APIs
 *
 */

/**
 * `GET /entity/set`
 *
 * Gets all EntitySet definitions.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {boolean} isOwner - (optional)
 * @return {Promise<Object[]>} - a Promise that will resolve with all EntitySet definitions as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllEntitySets();
 */
export function getAllEntitySets(isOwner :boolean) :Promise<> {

  const queryString = (isNil(isOwner))
    ? ''
    : `?isOwner=${!!isOwner}`;

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_SET_PATH}${queryString}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entity/set`
 *
 * Creates a new EntitySet definition.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object[]} entitySets
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.createEntitySets(
 *   [{
 *     name: "MyEntities",
 *     type: { namespace: "LOOM", name: "MyEntity" },
 *     title: "a collection of MyEntity EntityTypes"
 *   }]
 * );
 */
export function createEntitySets(entitySets :Object[]) :Promise<> {

  if (!isNonEmptyArray(entitySets)) {
    return Promise.reject('invalid parameter: entitySets must be a non-empty array');
  }

  const allValid = entitySets.reduce((isValid, entitySet) => {
    return isValid && isNonEmptyObject(entitySet);
  }, true);

  if (!allValid) {
    return Promise.reject('invalid parameter: entitySets must be an array of valid FQN object literals');
  }

  return getApiAxiosInstance(EDM_API)
    .post(`/${ENTITY_SET_PATH}`, entitySets)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/*
 *
 * EntityType APIs
 *
 */

/**
 * `GET /entity/type/{uuid}`
 *
 * Gets the EntityType definition for the given EntityType UUID.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} entityTypeId - the EntityType UUID
 * @return {Promise<Object>} - a Promise that will resolve with the EntityType definition as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntityType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getEntityType(entityTypeId :string) :Promise<> {

  if (!isValidUUID(entityTypeId)) {
    return Promise.reject('invalid parameter: entityTypeId must be a valid UUID');
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_TYPE_PATH}/${entityTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /entity/type`
 *
 * Gets all EntityType definitions.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise<Object[]>} - a Promise that will resolve with all EntityType definitions as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllEntityTypes();
 */
export function getAllEntityTypes() :Promise<> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_TYPE_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entity/type`
 *
 * Creates a new EntityType definition.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} entityType
 * @return {Promise<UUID>} - a Promise that will resolve with the newly-created EntityType UUID
 *
 * @example
 * EntityDataModelApi.createEntityType(
 *   {
 *     id: "ec6865e6-e60e-424b-a071-6a9c1603d735", // optional
 *     namespace: "LOOM",
 *     name: "MyEntity",
 *     schemas: [
 *       { namespace: "LOOM", name: "MySchema" }
 *     ],
 *     key: [
 *       "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *       "4b08e1f9-4a00-4169-92ea-10e377070220"
 *     ],
 *     properties: [
 *       "8f79e123-3411-4099-a41f-88e5d22d0e8d",
 *       "e39dfdfa-a3e6-4f1f-b54b-646a723c3085"
 *       "fae6af98-2675-45bd-9a5b-1619a87235a8"
 *     ]
 *   }
 * );
 */
export function createEntityType(entityType :Object) :Promise<> {

  if (!isNonEmptyObject(entityType)) {
    return Promise.reject('invalid parameter: entityType must be a non-empty object literal');
  }

  if (entityType.id !== undefined && !isValidUUID(entityType.id)) {
    return Promise.reject('invalid parameter: entityType.id must be a valid UUID');
  }

  const entityTypeFqn = new FullyQualifiedName(entityType.namespace, entityType.name);
  if (!entityTypeFqn.isValid()) {
    return Promise.reject('invalid parameters: entityType.namespace and entityType.name must form a valid FQN');
  }

  if (!isNonEmptyArray(entityType.schemas)) {
    return Promise.reject('invalid parameter: entityType.schemas must be a non-empty array');
  }

  const allValidSchemaFqns = entityType.schemas.reduce((isValid, shemaFqn) => {
    return isValid && FullyQualifiedName.isValidFqnObjectLiteral(shemaFqn);
  }, true);

  if (!allValidSchemaFqns) {
    return Promise.reject('invalid parameter: entityType.schemas must be an array of valid FQN object literals');
  }

  if (!isNonEmptyArray(entityType.key)) {
    return Promise.reject('invalid parameter: entityType.key must be a non-empty array');
  }

  const allValidKeyIds = entityType.key.reduce((isValid, id) => {
    return isValid && isValidUUID(id);
  }, true);

  if (!allValidKeyIds) {
    return Promise.reject('invalid parameter: entityType.key must be an array of valid UUIDs');
  }

  if (!isNonEmptyArray(entityType.properties)) {
    return Promise.reject('invalid parameter: entityType.properties must be a non-empty array');
  }

  const allValidPropertyIds = entityType.properties.reduce((isValid, id) => {
    return isValid && isValidUUID(id);
  }, true);

  if (!allValidPropertyIds) {
    return Promise.reject('invalid parameter: entityType.properties must be an array of valid UUIDs');
  }

  return getApiAxiosInstance(EDM_API)
    .post(`/${ENTITY_TYPE_PATH}`, entityType)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/type/{uuid}`
 *
 * Deletes the EntityType definition for the given EntityType UUID.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} entityTypeId - the EntityType UUID
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.deleteEntityType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deleteEntityType(entityTypeId :string) :Promise<> {

  if (!isValidUUID(entityTypeId)) {
    return Promise.reject('invalid parameter: entityTypeId must be a valid UUID');
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ENTITY_TYPE_PATH}/${entityTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PATCH /entity/type/{uuid}`
 *
 * Updates the EntityType definition for the given EntityType UUID with the given PropertyType UUIDs.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} entityTypeId - the EntityType UUID
 * @param {UUID[]} propertyTypeIds - the PropertyType UUIDs to set
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.updatePropertyTypesForEntityType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *     "4b08e1f9-4a00-4169-92ea-10e377070220"
 *   ]
 * );
 */

export function updatePropertyTypesForEntityType(entityTypeId :string, propertyTypeIds :string[]) :Promise<> {

  if (!isValidUUID(entityTypeId)) {
    return Promise.reject('invalid parameter: entityTypeId must be a valid UUID');
  }

  if (!isNonEmptyArray(propertyTypeIds)) {
    return Promise.reject('invalid parameter: propertyTypeIds must be a non-empty array');
  }

  const allValid = propertyTypeIds.reduce((isValid, id) => {
    return isValid && isValidUUID(id);
  }, true);

  if (!allValid) {
    return Promise.reject('invalid parameter: propertyTypeIds must be an array of valid UUIDs');
  }

  return getApiAxiosInstance(EDM_API)
    .patch(`/${ENTITY_TYPE_PATH}/${entityTypeId}`, propertyTypeIds)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/*
 *
 * PropertyType APIs
 *
 */

/**
 * `GET /property/type/{uuid}`
 *
 * Gets the PropertyType definition for the given PropertyType UUID.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} propertyTypeId - the PropertyType UUID
 * @return {Promise<Object>} - a Promise that will resolve with the PropertyType definition as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getPropertyType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getPropertyType(propertyTypeId :string) :Promise<> {

  if (!isValidUUID(propertyTypeId)) {
    return Promise.reject('invalid parameter: propertyTypeId must be a valid UUID');
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${PROPERTY_TYPE_PATH}/${propertyTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /property/type`
 *
 * Gets all PropertyType definitions.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise<Object[]>} - a Promise that will resolve with all PropertyType definitions as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllPropertyTypes();
 */
export function getAllPropertyTypes() :Promise<> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${PROPERTY_TYPE_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /namespace/{namespace}/property/type`
 *
 * Gets all PropertyType definitions under the given namespace.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {string} namespace - the substring before the dot in a FullyQualifiedName String
 * @return {Promise<Object[]>} - a Promise that will resolve with all PropertyType definitions as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllPropertyTypesInNamespace("LOOM");
 */
export function getAllPropertyTypesInNamespace(namespace :string) :Promise<> {

  if (!isNonEmptyString(namespace)) {
    return Promise.reject('invalid parameter: namespace must be a non-empty string');
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${NAMESPACE_PATH}/${namespace}/${PROPERTY_TYPE_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /property/type`
 *
 * Creates a new PropertyType definition.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} propertyType
 * @return {Promise<UUID>} - a Promise that will resolve with the newly-created PropertyType UUID
 *
 * @example
 * EntityDataModelApi.createPropertyType(
 *   {
 *     id: "ec6865e6-e60e-424b-a071-6a9c1603d735", // optional
 *     namespace: "LOOM",
 *     name: "MyProperty",
 *     datatype: "String",
 *     schemas: [
 *       { namespace: "LOOM", name: "MySchema" }
 *     ]
 *   }
 * );
 */
export function createPropertyType(propertyType :Object) :Promise<> {

  if (!isNonEmptyObject(propertyType)) {
    return Promise.reject('invalid parameter: propertyType must be a non-empty object literal');
  }

  if (propertyType.id !== undefined && !isValidUUID(propertyType.id)) {
    return Promise.reject('invalid parameter: propertyType.id must be a valid UUID');
  }

  const propertyTypeFqn = new FullyQualifiedName(propertyType.namespace, propertyType.name);
  if (!propertyTypeFqn.isValid()) {
    return Promise.reject('invalid parameters: propertyType.namespace and propertyType.name must form a valid FQN');
  }

  if (!isNonEmptyString(propertyType.datatype)) {
    return Promise.reject('invalid parameter: propertyType.datatype must be a non-empty string');
  }

  if (!isNonEmptyArray(propertyType.schemas)) {
    return Promise.reject('invalid parameter: propertyType.schemas must be a non-empty array');
  }

  const allValid = propertyType.schemas.reduce((isValid, shemaFqn) => {
    return isValid && FullyQualifiedName.isValidFqnObjectLiteral(shemaFqn);
  }, true);

  if (!allValid) {
    return Promise.reject('invalid parameter: propertyType.schemas must be an array of valid FQN object literals');
  }

  return getApiAxiosInstance(EDM_API)
    .post(`/${PROPERTY_TYPE_PATH}`, propertyType)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /property/type/{namespace}/{name}`
 *
 * Deletes the PropertyType definition for the given PropertyType FQN.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} propertyTypeId - the PropertyType UUID
 * @param {Object} propertyTypeFqn - an object literal representing a fully qualified name
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.deletePropertyType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   { namespace: "LOOM", name: "MyProperty" }
 * );
 */
export function deletePropertyType(propertyTypeId :string, propertyTypeFqn :Object) :Promise<> {

  if (!isValidUUID(propertyTypeId)) {
    return Promise.reject('invalid parameter: propertyTypeId must be a valid UUID');
  }

  if (!FullyQualifiedName.isValidFqnObjectLiteral(propertyTypeFqn)) {
    return Promise.reject('invalid parameter: propertyTypeFqn must be a valid FQN object literal');
  }

  const { namespace, name } = propertyTypeFqn;

  return getApiAxiosInstance(EDM_API)
    .delete(`/${PROPERTY_TYPE_PATH}/${propertyTypeId}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
