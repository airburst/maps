import auth0 from 'auth0-js';
import createHistory from 'history/createBrowserHistory';
import { AUTH_CONFIG } from './Auth.config';

const history = createHistory();

export default class Auth {

    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: AUTH_CONFIG.domain,
            clientID: AUTH_CONFIG.clientId,
            redirectUri: 'http://localhost:3000',
            // audience: AUTH_CONFIG.domain + '/userinfo',
            responseType: 'token id_token',
            scope: 'openid'
        });
    }

    login = () => {
        this.auth0.authorize();
    }

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                history.replace('/');
            } else if (err) {
                history.replace('/');
                console.log(err);
            }
        });
    }

    setSession(authResult) {
        const { accessToken, idToken, expiresIn } = authResult;
        const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('id_token', idToken);
        localStorage.setItem('expires_at', expiresAt);
        history.replace('/');
    }

    logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        history.push('/');
    }

    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}
