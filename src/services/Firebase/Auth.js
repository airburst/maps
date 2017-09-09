import fire from './config';

export default class FirebaseAuth {

    constructor() {
        this.user = null;
        this.authToken = null;
    }

    login = (email, password) => {
        return new Promise((resolve, reject) => {
            fire.auth().signInWithEmailAndPassword(email, password)
                .then(user => resolve(this.getUserProfile(user)))
                .catch(err => reject(err));
        });
    }

    logout = () => {
        fire.auth().signOut()
            .then(() => console.log('User logged out'))
            .catch(err => console.log('Error logging user out', err));
    }

    // https://firebase.google.com/docs/auth/web/manage-users
    getUserProfile(user) {
        const { uid, displayName: name, email, emailVerified } = user;
        return { uid, name, email, emailVerified };
    }

    updateUserProfile({ displayName, photoURL }) {
        // Validate and ignore missing items
        // const user = firebase.auth().currentUser;
        this.user.updateProfile({ displayName, photoURL })
            .then(() => console.log('Successfully updated user profile'))
            .catch(err => console.log('Error updating user profile', err));
    }

    updateUserEmail(email) {
        // validate email
        // const user = firebase.auth().currentUser;
        this.user.updateEmail(email)
            .then(() => console.log('Successfully updated user email'))
            .catch(err => console.log('Error updating user email', err));
    }

    addUser(user) {

    }

    sendVerificationEmail() {
        if (this.user) {
            this.user.sendEmailVerification()
                .then(() => console.log('Verification email sent'))
                .catch(err => console.log('Error sending verification email', err));
        }
    }

    updatePassword(newPassword) {
        this.user.updatePassword(newPassword)
            .then(() => console.log('Password changed'))
            .catch(err => console.log('Error setting new password', err));
    }

}
