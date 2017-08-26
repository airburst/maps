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

    setSession = (authResult) => {
        const { accessToken, idToken, expiresIn } = authResult;
        const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('maps:accessToken', accessToken);
        localStorage.setItem('maps:idToken', idToken);
        localStorage.setItem('maps:expiresAt', expiresAt);
        history.replace('/');
    }

    logout = () => {
        localStorage.removeItem('maps:accessToken');
        localStorage.removeItem('maps:idToken');
        localStorage.removeItem('maps:expiresAt');
        history.push('/');
    }

    isAuthenticated = () => {
        const expiresAt = localStorage.getItem('maps:expiresAt');
        return new Date().getTime() < expiresAt;
    }
}
