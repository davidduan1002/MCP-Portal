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

export interface IdentityProviderAttribute {
    /**
     * OpenId Connect or SAML2 attribute name
     */
    attributeName: IdentityProviderAttribute.AttributeNameEnum;

    /**
     * OpenId Connect or SAML2 attribute value
     */
    attributeValue: string;

    createdAt?: Date;

    updatedAt?: Date;

}
export namespace IdentityProviderAttribute {
    export enum AttributeNameEnum {
        ImportUrl = <any> 'importUrl',
        ValidateSignature = <any> 'validateSignature',
        SigningCertificate = <any> 'signingCertificate',
        SingleLogoutServiceUrl = <any> 'singleLogoutServiceUrl',
        PostBindingResponse = <any> 'postBindingResponse',
        PostBindingAuthnRequest = <any> 'postBindingAuthnRequest',
        SingleSignOnServiceUrl = <any> 'singleSignOnServiceUrl',
        WantAuthnRequestsSigned = <any> 'wantAuthnRequestsSigned',
        UserInfoUrl = <any> 'userInfoUrl',
        TokenUrl = <any> 'tokenUrl',
        AuthorizationUrl = <any> 'authorizationUrl',
        LogoutUrl = <any> 'logoutUrl',
        Issuer = <any> 'issuer',
        PublicKeySignatureVerifier = <any> 'publicKeySignatureVerifier',
        ClientId = <any> 'clientId',
        ClientSecret = <any> 'clientSecret',
        ProviderType = <any> 'providerType',
        FirstNameAttr = <any> 'firstNameAttr',
        LastNameAttr = <any> 'lastNameAttr',
        EmailAttr = <any> 'emailAttr',
        UsernameAttr = <any> 'usernameAttr',
        PermissionsAttr = <any> 'permissionsAttr'
    }
}
