/*
 * @flow
 */

import {
  ROLE_MOCK,
  Role,
  RoleBuilder,
  genRandomRole,
  isValidRole,
} from './Role';

import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
  Role,
  RoleBuilder,
  ROLE_MOCK,
  isValidRole,
  genRandomRole,
  {
    setDescription: {
      field: 'description',
      isOptional: true,
      validParams: [ROLE_MOCK.description],
    },
    setId: {
      field: 'id',
      isOptional: true,
      validParams: [ROLE_MOCK.id],
    },
    setOrganizationId: {
      field: 'organizationId',
      validParams: [ROLE_MOCK.organizationId],
    },
    setPrincipal: {
      field: 'principal',
      validParams: [ROLE_MOCK.principal],
    },
    setTitle: {
      field: 'title',
      validParams: [ROLE_MOCK.title],
    },
  }
);
