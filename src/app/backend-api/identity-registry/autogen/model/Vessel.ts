/**
 * Maritime Cloud Identity Registry API
 * Maritime Cloud Identity Registry API can be used for managing entities in the Maritime Cloud.
 *
 * OpenAPI spec version: 0.5.0
 * Contact: info@maritimecloud.net
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface Vessel {
    attributes?: Array<models.VesselAttribute>;

    /**
     * Cannot be created/updated by editing in the model. Use the dedicate create and revoke calls.
     */
    certificates?: Array<models.Certificate>;

    createdAt?: Date;

    /**
     * The Maritime Resource Name
     */
    mrn: string;

    name: string;

    /**
     * Permissions as assigned from the organization
     */
    permissions?: string;

    updatedAt?: Date;

}
