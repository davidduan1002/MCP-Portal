/**
 * Maritime Cloud Service Registry API
 * Maritime Cloud Service Registry, developed under the Horizon 2020 Project EfficienSea2, cofunded by the European Union.
 *
 * OpenAPI spec version: 0.7
 * Contact: josef.jahn@frequentis.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface JsonNode {
    array?: boolean;

    bigDecimal?: boolean;

    bigInteger?: boolean;

    binary?: boolean;

    boolean?: boolean;

    containerNode?: boolean;

    double?: boolean;

    float?: boolean;

    floatingPointNumber?: boolean;

    int?: boolean;

    integralNumber?: boolean;

    long?: boolean;

    missingNode?: boolean;

    nodeType?: JsonNode.NodeTypeEnum;

    null?: boolean;

    number?: boolean;

    object?: boolean;

    pojo?: boolean;

    short?: boolean;

    textual?: boolean;

    valueNode?: boolean;

}
export namespace JsonNode {
    export enum NodeTypeEnum {
        ARRAY = <any> 'ARRAY',
        BINARY = <any> 'BINARY',
        BOOLEAN = <any> 'BOOLEAN',
        MISSING = <any> 'MISSING',
        NULL = <any> 'NULL',
        NUMBER = <any> 'NUMBER',
        OBJECT = <any> 'OBJECT',
        POJO = <any> 'POJO',
        STRING = <any> 'STRING'
    }
}
