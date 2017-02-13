/*
 * @flow
 */

import Immutable from 'immutable';
import has from 'lodash/has';
import isUndefined from 'lodash/isUndefined';

import Logger from '../utils/Logger';

import {
  isDefined,
  isEmptyArray
} from '../utils/LangUtils';

import {
  isValidPermissionArray,
  isValidUuidArray
} from '../utils/ValidationUtils';

import type {
  Permission
} from '../constants/types/PermissionTypes';

const LOG = new Logger('AccessCheck');

/**
 * @class AccessCheck
 * @memberof loom-data
 */
export default class AccessCheck {

  aclKey :UUID[];
  permissions :Permission[];

  constructor(aclKey :UUID[], permissions :Permission[]) {

    this.aclKey = aclKey;
    this.permissions = permissions;
  }
}

/**
 * @class AclBuilder
 * @memberof loom-data
 */
export class AccessCheckBuilder {

  aclKey :UUID[];
  permissions :Permission[];

  setAclKey(aclKey :UUID[]) :AccessCheckBuilder {

    if (isUndefined(aclKey) || isEmptyArray(aclKey)) {
      return this;
    }

    if (!isValidUuidArray(aclKey)) {
      throw new Error('invalid parameter: aclKey must be a non-empty array of valid UUIDs');
    }

    this.aclKey = aclKey;
    return this;
  }

  setPermissions(permissions :Permission[]) :AccessCheckBuilder {

    if (isUndefined(permissions) || isEmptyArray(permissions)) {
      return this;
    }

    if (!isValidPermissionArray(permissions)) {
      throw new Error('invalid parameter: permissions must be a non-empty array of valid Permissions');
    }

    this.permissions = Immutable.Set().withMutations((set :Set<Permission>) => {
      permissions.forEach((permission :Permission) => {
        set.add(permission);
      });
    }).toJS();

    return this;
  }

  build() {

    if (!this.aclKey) {
      this.aclKey = [];
    }

    if (!this.permissions) {
      this.permissions = [];
    }

    return new AccessCheck(this.aclKey, this.permissions);
  }
}

export function isValid(accessCheck :any) :boolean {

  if (!isDefined(accessCheck)) {

    LOG.error('invalid parameter: accessCheck must be defined', accessCheck);
    return false;
  }

  if (!has(accessCheck, 'aclKey') || !has(accessCheck, 'permissions')) {

    LOG.error('missing properties: accessCheck is missing required properties');
    return false;
  }

  try {

    (new AccessCheckBuilder())
      .setAclKey(accessCheck.aclKey)
      .setPermissions(accessCheck.permissions)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, accessCheck);
    return false;
  }
}
