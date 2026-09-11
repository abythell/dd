const functions = require('firebase-functions/v1')
const { initializeApp } = require('firebase-admin/app')
const { getDatabase } = require('firebase-admin/database')

initializeApp()
const db = getDatabase()

/**
 * Add a user profile to the Realtime Database whenever a new
 * user is added to Firebase Authentication.
 */
exports.createUser = functions.auth.user().onCreate((user) => {
  if (!user || !user.uid || !user.email) throw Error(`Invalid user: ${JSON.stringify(user)}`)
  const profile = {
    name: 'NEW USER',
    email: user.email,
    active: false,
    admin: false
  }
  const userRef = db.ref().child('users').child(user.uid)
  return userRef.set(profile)
})

/**
 * Remove a user profile from the Realtime Database when a user is
 * deleted from Firebase Authentication
 */
exports.deleteUser = functions.auth.user().onDelete((user) => {
  if (!user || !user.uid) throw Error(`Invalid user: ${JSON.stringify(user)}`)
  return db.ref().child('users').child(user.uid).remove()
})
