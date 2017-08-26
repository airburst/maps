import Auth from '../../services/Auth';

export default () => {
    const auth = new Auth();
    auth.login();
}
