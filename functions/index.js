const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

/**
 * Add a user profile to the Real Time Database whenever a new
 * login is created.
 */
exports.createUser = functions.auth.user().onCreate((user) => {
  const profile = {
    name: 'NEW USER',
    email: user.email,
    active: true,
    admin: false
  }
  const userRef = admin.database().ref().child('users').child(user.uid)
  return userRef.set(profile)
})

exports.deleteUser = functions.auth.user().onDelete((user) => {
  return admin.database().ref().child('users').child(user.uid).remove()
})
