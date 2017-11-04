import * as ApiPaths from '../../src/constants/ApiPaths';

// base endpoint controller paths
const ANALYSIS_PATH = 'analysis';
const APP_PATH = 'app';
const AUTHORIZATIONS_PATH = 'authorizations';
const DATA_PATH = 'data';
const DATA_SOURCES_PATH = 'datasource';
const DATASTORE_PATH = 'datastore';
const EDM_PATH = 'edm';
const LINKING_PATH = 'linking';
const ORGANIZATIONS_PATH = 'organizations';
const PERMISSIONS_PATH = 'permissions';
const PRINCIPALS_PATH = 'principals';
const REQUESTS_PATH = 'requests';
const SEARCH_PATH = 'search';
const SYNC_PATH = 'sync';

// shared paths
const ENTITY_SET_PATH = 'entity/set';
const ENTITY_TYPE_PATH = 'entity/type';
const IDS_PATH = 'ids';
const NAMESPACE_PATH = 'namespace';
const PROPERTY_TYPE_PATH = 'property/type';
const ROLES_PATH = 'roles';
const SET_PATH = 'set';
const TYPE_PATH = 'type';

// AppApi specific paths
const BULK_PATH = 'bulk';
const CONFIG_PATH = 'config';
const INSTALL_PATH = 'install';

// DataApi specific paths
const ENTITY_DATA_PATH = 'entitydata';
const TICKET_PATH = 'ticket';

// EntityDataModelApi specific paths
const ASSOCIATION_TYPE_PATH = 'association/type';
const COMPLEX_TYPE_PATH = 'complex/type';
const DETAILED_PATH = 'detailed';
const ENUM_TYPE_PATH = 'enum/type';
const FORCE_PATH = 'force';
const HIERARCHY_PATH = 'hierarchy';
const SCHEMA_PATH = 'schema';
const SRC_PATH = 'src';
const DST_PATH = 'dst';

// OrganizationsApi specific paths
const DESCRIPTION_PATH = 'description';
const EMAIL_DOMAINS_PATH = 'email-domains';
const MEMBERS_PATH = 'members';
const TITLE_PATH = 'title';

// PrincipalsApi specific paths
const EMAIL_PATH = 'email';
const USERS_PATH = 'users';

// SearchApi specific paths
const ADVANCED_PATH = 'advanced';
const FQN_PATH = 'fqn';
const NEIGHBORS_PATH = 'neighbors';
const SEARCH_ENTITY_TYPES_PATH = 'entity_types';
const SEARCH_PROPERTY_TYPES_PATH = 'property_types';

// SyncApi specific paths
const CURRENT_PATH = 'current';

describe('ApiPaths', () => {

  describe('base endpoint controller paths', () => {

    it(`should expose "${ANALYSIS_PATH}"`, () => {
      expect(ApiPaths.ANALYSIS_PATH).toBeDefined();
      expect(ApiPaths.ANALYSIS_PATH).toEqual(ANALYSIS_PATH);
    });

    it(`should expose "${APP_PATH}"`, () => {
      expect(ApiPaths.APP_PATH).toBeDefined();
      expect(ApiPaths.APP_PATH).toEqual(APP_PATH);
    });

    it(`should expose "${AUTHORIZATIONS_PATH}"`, () => {
      expect(ApiPaths.AUTHORIZATIONS_PATH).toBeDefined();
      expect(ApiPaths.AUTHORIZATIONS_PATH).toEqual(AUTHORIZATIONS_PATH);
    });

    it(`should expose "${DATA_PATH}"`, () => {
      expect(ApiPaths.DATA_PATH).toBeDefined();
      expect(ApiPaths.DATA_PATH).toEqual(DATA_PATH);
    });

    it(`should expose "${DATA_SOURCES_PATH}"`, () => {
      expect(ApiPaths.DATA_SOURCES_PATH).toBeDefined();
      expect(ApiPaths.DATA_SOURCES_PATH).toEqual(DATA_SOURCES_PATH);
    });

    it(`should expose "${DATASTORE_PATH}"`, () => {
      expect(ApiPaths.DATASTORE_PATH).toBeDefined();
      expect(ApiPaths.DATASTORE_PATH).toEqual(DATASTORE_PATH);
    });

    it(`should expose "${EDM_PATH}"`, () => {
      expect(ApiPaths.EDM_PATH).toBeDefined();
      expect(ApiPaths.EDM_PATH).toEqual(EDM_PATH);
    });

    it(`should expose "${LINKING_PATH}"`, () => {
      expect(ApiPaths.LINKING_PATH).toBeDefined();
      expect(ApiPaths.LINKING_PATH).toEqual(LINKING_PATH);
    });

    it(`should expose "${ORGANIZATIONS_PATH}"`, () => {
      expect(ApiPaths.ORGANIZATIONS_PATH).toBeDefined();
      expect(ApiPaths.ORGANIZATIONS_PATH).toEqual(ORGANIZATIONS_PATH);
    });

    it(`should expose "${PERMISSIONS_PATH}"`, () => {
      expect(ApiPaths.PERMISSIONS_PATH).toBeDefined();
      expect(ApiPaths.PERMISSIONS_PATH).toEqual(PERMISSIONS_PATH);
    });

    it(`should expose "${PRINCIPALS_PATH}"`, () => {
      expect(ApiPaths.PRINCIPALS_PATH).toBeDefined();
      expect(ApiPaths.PRINCIPALS_PATH).toEqual(PRINCIPALS_PATH);
    });

    it(`should expose "${REQUESTS_PATH}"`, () => {
      expect(ApiPaths.REQUESTS_PATH).toBeDefined();
      expect(ApiPaths.REQUESTS_PATH).toEqual(REQUESTS_PATH);
    });

    it(`should expose "${SEARCH_PATH}"`, () => {
      expect(ApiPaths.SEARCH_PATH).toBeDefined();
      expect(ApiPaths.SEARCH_PATH).toEqual(SEARCH_PATH);
    });

    it(`should expose "${SYNC_PATH}"`, () => {
      expect(ApiPaths.SYNC_PATH).toBeDefined();
      expect(ApiPaths.SYNC_PATH).toEqual(SYNC_PATH);
    });

  });

  describe('shared paths', () => {

    it(`should expose "${ENTITY_SET_PATH}"`, () => {
      expect(ApiPaths.ENTITY_SET_PATH).toBeDefined();
      expect(ApiPaths.ENTITY_SET_PATH).toEqual(ENTITY_SET_PATH);
    });

    it(`should expose "${ENTITY_TYPE_PATH}"`, () => {
      expect(ApiPaths.ENTITY_TYPE_PATH).toBeDefined();
      expect(ApiPaths.ENTITY_TYPE_PATH).toEqual(ENTITY_TYPE_PATH);
    });

    it(`should expose "${IDS_PATH}"`, () => {
      expect(ApiPaths.IDS_PATH).toBeDefined();
      expect(ApiPaths.IDS_PATH).toEqual(IDS_PATH);
    });

    it(`should expose "${NAMESPACE_PATH}"`, () => {
      expect(ApiPaths.NAMESPACE_PATH).toBeDefined();
      expect(ApiPaths.NAMESPACE_PATH).toEqual(NAMESPACE_PATH);
    });

    it(`should expose "${PROPERTY_TYPE_PATH}"`, () => {
      expect(ApiPaths.PROPERTY_TYPE_PATH).toBeDefined();
      expect(ApiPaths.PROPERTY_TYPE_PATH).toEqual(PROPERTY_TYPE_PATH);
    });

    it(`should expose "${ROLES_PATH}"`, () => {
      expect(ApiPaths.ROLES_PATH).toBeDefined();
      expect(ApiPaths.ROLES_PATH).toEqual(ROLES_PATH);
    });

    it(`should expose "${SET_PATH}"`, () => {
      expect(ApiPaths.SET_PATH).toBeDefined();
      expect(ApiPaths.SET_PATH).toEqual(SET_PATH);
    });

    it(`should expose "${TYPE_PATH}"`, () => {
      expect(ApiPaths.TYPE_PATH).toBeDefined();
      expect(ApiPaths.TYPE_PATH).toEqual(TYPE_PATH);
    });

  });

  describe('AppApi specific paths', () => {

    it(`should expose "${BULK_PATH}"`, () => {
      expect(ApiPaths.BULK_PATH).toBeDefined();
      expect(ApiPaths.BULK_PATH).toEqual(BULK_PATH);
    });

    it(`should expose "${CONFIG_PATH}"`, () => {
      expect(ApiPaths.CONFIG_PATH).toBeDefined();
      expect(ApiPaths.CONFIG_PATH).toEqual(CONFIG_PATH);
    });

    it(`should expose "${INSTALL_PATH}"`, () => {
      expect(ApiPaths.INSTALL_PATH).toBeDefined();
      expect(ApiPaths.INSTALL_PATH).toEqual(INSTALL_PATH);
    });

  });

  describe('DataApi specific paths', () => {

    it(`should expose "${ENTITY_DATA_PATH}"`, () => {
      expect(ApiPaths.ENTITY_DATA_PATH).toBeDefined();
      expect(ApiPaths.ENTITY_DATA_PATH).toEqual(ENTITY_DATA_PATH);
    });

    it(`should expose "${TICKET_PATH}"`, () => {
      expect(ApiPaths.TICKET_PATH).toBeDefined();
      expect(ApiPaths.TICKET_PATH).toEqual(TICKET_PATH);
    });

  });

  describe('EntityDataModelApi specific paths', () => {

    it(`should expose "${ASSOCIATION_TYPE_PATH}"`, () => {
      expect(ApiPaths.ASSOCIATION_TYPE_PATH).toBeDefined();
      expect(ApiPaths.ASSOCIATION_TYPE_PATH).toEqual(ASSOCIATION_TYPE_PATH);
    });

    it(`should expose "${COMPLEX_TYPE_PATH}"`, () => {
      expect(ApiPaths.COMPLEX_TYPE_PATH).toBeDefined();
      expect(ApiPaths.COMPLEX_TYPE_PATH).toEqual(COMPLEX_TYPE_PATH);
    });

    it(`should expose "${DETAILED_PATH}"`, () => {
      expect(ApiPaths.DETAILED_PATH).toBeDefined();
      expect(ApiPaths.DETAILED_PATH).toEqual(DETAILED_PATH);
    });

    it(`should expose "${ENUM_TYPE_PATH}"`, () => {
      expect(ApiPaths.ENUM_TYPE_PATH).toBeDefined();
      expect(ApiPaths.ENUM_TYPE_PATH).toEqual(ENUM_TYPE_PATH);
    });

    it(`should expose "${FORCE_PATH}"`, () => {
      expect(ApiPaths.FORCE_PATH).toBeDefined();
      expect(ApiPaths.FORCE_PATH).toEqual(FORCE_PATH);
    });

    it(`should expose "${HIERARCHY_PATH}"`, () => {
      expect(ApiPaths.HIERARCHY_PATH).toBeDefined();
      expect(ApiPaths.HIERARCHY_PATH).toEqual(HIERARCHY_PATH);
    });

    it(`should expose "${SCHEMA_PATH}"`, () => {
      expect(ApiPaths.SCHEMA_PATH).toBeDefined();
      expect(ApiPaths.SCHEMA_PATH).toEqual(SCHEMA_PATH);
    });

    it(`should expose "${SRC_PATH}"`, () => {
      expect(ApiPaths.SRC_PATH).toBeDefined();
      expect(ApiPaths.SRC_PATH).toEqual(SRC_PATH);
    });

    it(`should expose "${DST_PATH}"`, () => {
      expect(ApiPaths.DST_PATH).toBeDefined();
      expect(ApiPaths.DST_PATH).toEqual(DST_PATH);
    });

  });

  describe('OrganizationsApi specific paths', () => {

    it(`should expose "${DESCRIPTION_PATH}"`, () => {
      expect(ApiPaths.DESCRIPTION_PATH).toBeDefined();
      expect(ApiPaths.DESCRIPTION_PATH).toEqual(DESCRIPTION_PATH);
    });

    it(`should expose "${EMAIL_DOMAINS_PATH}"`, () => {
      expect(ApiPaths.EMAIL_DOMAINS_PATH).toBeDefined();
      expect(ApiPaths.EMAIL_DOMAINS_PATH).toEqual(EMAIL_DOMAINS_PATH);
    });

    it(`should expose "${MEMBERS_PATH}"`, () => {
      expect(ApiPaths.MEMBERS_PATH).toBeDefined();
      expect(ApiPaths.MEMBERS_PATH).toEqual(MEMBERS_PATH);
    });

    it(`should expose "${TITLE_PATH}"`, () => {
      expect(ApiPaths.TITLE_PATH).toBeDefined();
      expect(ApiPaths.TITLE_PATH).toEqual(TITLE_PATH);
    });

  });

  describe('PrincipalsApi specific paths', () => {

    it(`should expose "${EMAIL_PATH}"`, () => {
      expect(ApiPaths.EMAIL_PATH).toBeDefined();
      expect(ApiPaths.EMAIL_PATH).toEqual(EMAIL_PATH);
    });

    it(`should expose "${USERS_PATH}"`, () => {
      expect(ApiPaths.USERS_PATH).toBeDefined();
      expect(ApiPaths.USERS_PATH).toEqual(USERS_PATH);
    });

  });

  describe('SearchApi specific paths', () => {

    it(`should expose "${ADVANCED_PATH}"`, () => {
      expect(ApiPaths.ADVANCED_PATH).toBeDefined();
      expect(ApiPaths.ADVANCED_PATH).toEqual(ADVANCED_PATH);
    });

    it(`should expose "${FQN_PATH}"`, () => {
      expect(ApiPaths.FQN_PATH).toBeDefined();
      expect(ApiPaths.FQN_PATH).toEqual(FQN_PATH);
    });

    it(`should expose "${NEIGHBORS_PATH}"`, () => {
      expect(ApiPaths.NEIGHBORS_PATH).toBeDefined();
      expect(ApiPaths.NEIGHBORS_PATH).toEqual(NEIGHBORS_PATH);
    });

    it(`should expose "${SEARCH_ENTITY_TYPES_PATH}"`, () => {
      expect(ApiPaths.SEARCH_ENTITY_TYPES_PATH).toBeDefined();
      expect(ApiPaths.SEARCH_ENTITY_TYPES_PATH).toEqual(SEARCH_ENTITY_TYPES_PATH);
    });

    it(`should expose "${SEARCH_PROPERTY_TYPES_PATH}"`, () => {
      expect(ApiPaths.SEARCH_PROPERTY_TYPES_PATH).toBeDefined();
      expect(ApiPaths.SEARCH_PROPERTY_TYPES_PATH).toEqual(SEARCH_PROPERTY_TYPES_PATH);
    });

  });

  describe('SyncApi specific paths', () => {

    it(`should expose "${CURRENT_PATH}"`, () => {
      expect(ApiPaths.CURRENT_PATH).toBeDefined();
      expect(ApiPaths.CURRENT_PATH).toEqual(CURRENT_PATH);
    });

  });

});
