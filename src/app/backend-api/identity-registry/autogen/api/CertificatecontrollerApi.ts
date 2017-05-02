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

import { Inject, Injectable, Optional }                      from '@angular/core';
import { Http, Headers, URLSearchParams }                    from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseContentType }                     from '@angular/http';

import { Observable }                                        from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as models                                           from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';

/* tslint:disable:no-unused-variable member-ordering */


@Injectable()
export class CertificatecontrollerApi {
    protected basePath = 'https://staging-api.maritimecloud.net';
    public defaultHeaders: Headers = new Headers();
    public configuration: Configuration = new Configuration();

    constructor(protected http: Http, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
        }
    }

    /**
     * getCRL
     * 
     * @param caAlias caAlias
     */
    public getCRLUsingGET(caAlias: string, extraHttpRequestParams?: any): Observable<any> {
        return this.getCRLUsingGETWithHttpInfo(caAlias, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * getCRL
     * 
     * @param caAlias caAlias
     */
    public getCRLUsingGET1(caAlias: string, extraHttpRequestParams?: any): Observable<any> {
        return this.getCRLUsingGET1WithHttpInfo(caAlias, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * getOCSP
     * 
     * @param caAlias caAlias
     */
    public getOCSPUsingGET(caAlias: string, extraHttpRequestParams?: any): Observable<any> {
        return this.getOCSPUsingGETWithHttpInfo(caAlias, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * getOCSP
     * 
     * @param caAlias caAlias
     */
    public getOCSPUsingGET1(caAlias: string, extraHttpRequestParams?: any): Observable<any> {
        return this.getOCSPUsingGET1WithHttpInfo(caAlias, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * postOCSP
     * 
     * @param caAlias caAlias
     * @param input input
     */
    public postOCSPUsingPOST(caAlias: string, input: string, extraHttpRequestParams?: any): Observable<any> {
        return this.postOCSPUsingPOSTWithHttpInfo(caAlias, input, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * postOCSP
     * 
     * @param caAlias caAlias
     * @param input input
     */
    public postOCSPUsingPOST1(caAlias: string, input: string, extraHttpRequestParams?: any): Observable<any> {
        return this.postOCSPUsingPOST1WithHttpInfo(caAlias, input, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }


    /**
     * getCRL
     * 
     * @param caAlias caAlias
     */
    public getCRLUsingGETWithHttpInfo(caAlias: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/oidc/api/certificates/crl/${caAlias}'
                    .replace('${' + 'caAlias' + '}', String(caAlias));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'caAlias' is not null or undefined
        if (caAlias === null || caAlias === undefined) {
            throw new Error('Required parameter caAlias was null or undefined when calling getCRLUsingGET.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/x-pem-file;charset=UTF-8'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * getCRL
     * 
     * @param caAlias caAlias
     */
    public getCRLUsingGET1WithHttpInfo(caAlias: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/x509/api/certificates/crl/${caAlias}'
                    .replace('${' + 'caAlias' + '}', String(caAlias));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'caAlias' is not null or undefined
        if (caAlias === null || caAlias === undefined) {
            throw new Error('Required parameter caAlias was null or undefined when calling getCRLUsingGET1.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/x-pem-file;charset=UTF-8'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * getOCSP
     * 
     * @param caAlias caAlias
     */
    public getOCSPUsingGETWithHttpInfo(caAlias: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/oidc/api/certificates/ocsp/${caAlias}/**'
                    .replace('${' + 'caAlias' + '}', String(caAlias));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'caAlias' is not null or undefined
        if (caAlias === null || caAlias === undefined) {
            throw new Error('Required parameter caAlias was null or undefined when calling getOCSPUsingGET.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/ocsp-response'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * getOCSP
     * 
     * @param caAlias caAlias
     */
    public getOCSPUsingGET1WithHttpInfo(caAlias: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/x509/api/certificates/ocsp/${caAlias}/**'
                    .replace('${' + 'caAlias' + '}', String(caAlias));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'caAlias' is not null or undefined
        if (caAlias === null || caAlias === undefined) {
            throw new Error('Required parameter caAlias was null or undefined when calling getOCSPUsingGET1.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/ocsp-response'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * postOCSP
     * 
     * @param caAlias caAlias
     * @param input input
     */
    public postOCSPUsingPOSTWithHttpInfo(caAlias: string, input: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/oidc/api/certificates/ocsp/${caAlias}'
                    .replace('${' + 'caAlias' + '}', String(caAlias));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'caAlias' is not null or undefined
        if (caAlias === null || caAlias === undefined) {
            throw new Error('Required parameter caAlias was null or undefined when calling postOCSPUsingPOST.');
        }
        // verify required parameter 'input' is not null or undefined
        if (input === null || input === undefined) {
            throw new Error('Required parameter input was null or undefined when calling postOCSPUsingPOST.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
            'application/ocsp-request'
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/ocsp-response'
        ];

        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: input == null ? '' : JSON.stringify(input), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * postOCSP
     * 
     * @param caAlias caAlias
     * @param input input
     */
    public postOCSPUsingPOST1WithHttpInfo(caAlias: string, input: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/x509/api/certificates/ocsp/${caAlias}'
                    .replace('${' + 'caAlias' + '}', String(caAlias));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'caAlias' is not null or undefined
        if (caAlias === null || caAlias === undefined) {
            throw new Error('Required parameter caAlias was null or undefined when calling postOCSPUsingPOST1.');
        }
        // verify required parameter 'input' is not null or undefined
        if (input === null || input === undefined) {
            throw new Error('Required parameter input was null or undefined when calling postOCSPUsingPOST1.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
            'application/ocsp-request'
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/ocsp-response'
        ];

        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: input == null ? '' : JSON.stringify(input), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

}
