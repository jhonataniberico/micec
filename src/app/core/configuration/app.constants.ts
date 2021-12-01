import { Injectable } from '@angular/core';
import { getAuthAccess, saveAuthNonce } from '../auth/storage/token.storage';
import { environment as env } from '../../../environments/environment';

@Injectable()
export class Configuration {

    public Server: string = env.server;
    // public Server: string = 'http://localhost:8080/api_gateway_micec/be_micec/';

    public ServerSecurity: string = env.serverSecurity;
    //public ServerSecurity: string = 'http://localhost:8080/security/';

    public hostName: string = env.hostName;
    // public hostName: string = 'http://localhost:4200/';

    public $clientId = 'paciente'
    public $auth0 = {
        domain: "dev-mcec-paciente.us.auth0.com",
        client_id: "y46e4IwbpgvPtBLmzHngA1fsSQ3qRzvg",
        audience: "fe_micec"
    }

    constructor() {
    }

    public randomString(length: number) {
        let charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.random() * charset.length);
        }
        return result;
    }

    public getLoginAuth0(state?: string): string {
        let nonce = this.randomString(32);
        saveAuthNonce(nonce);
        return "https://" + this.$auth0.domain + "/authorize?" +
            "redirect_uri=" + this.hostName +
            "&client_id=" + this.$auth0.client_id +
            "&audience=" + this.$auth0.audience +
            "&scope=openid profile" +
            "&response_type=code token" +
            "&state=" + `${state}&nonce=${nonce}`;
    }

    public getLoginAuth0FB(state?: string) {
        let nonce = this.randomString(32);
        saveAuthNonce(nonce);
        return "https://" + this.$auth0.domain + "/authorize?" +
            "redirect_uri=" + this.hostName +
            "&client_id=" + this.$auth0.client_id +
            "&audience=" + this.$auth0.audience +
            "&scope=openid profile" +
            "&response_type=code token" +
            "&connection=facebook" +
            "&state=" + `${state}&nonce=${nonce}&type="facebook"`;
    }

    public getLoginAuth0Google(state?: string) {
        let nonce = this.randomString(32);
        saveAuthNonce(nonce);
        return "https://" + this.$auth0.domain + "/authorize?" +
            "redirect_uri=" + this.hostName +
            "&client_id=" + this.$auth0.client_id +
            "&audience=" + this.$auth0.audience +
            "&scope=openid profile" +
            "&response_type=code token" +
            "&connection=google-oauth2" +
            "&state=" + `${state}&nonce=${nonce}`;
    }

    public getLogoutAuth0(): string {
        return 'https://' + this.$auth0.domain + '/v2/logout?' +
            'federated&' + //(getAuthAccess() ? 'returnTo=https%3A%2F%2Fdev-8tdy8zrw.us.auth0.com%2Flogout%3F' : '') +
            'returnTo=' + this.hostName +
            '&client_id=' + this.$auth0.client_id +
            (getAuthAccess() ? '&access_token=' + getAuthAccess() : '')
    }
}