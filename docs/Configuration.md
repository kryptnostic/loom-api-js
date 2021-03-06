<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Configuration](#configuration)
    -   [configure](#configure)

## Configuration

### configure

baseUrl can be a full URL, or an environment identifier (substring). for example, all of the following strings are valid values for baseUrl:

-   "https://api.openlattice.com"
-   "https://api.staging.openlattice.com"
-   "localhost"
-   "staging"
-   "production"

**Parameters**

-   `config` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an object literal containing all configuration options
    -   `config.authToken` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a Base64-encoded JWT auth token
    -   `config.baseUrl` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a full URL, or a simple URL identifier
