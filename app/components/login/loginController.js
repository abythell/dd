/* global angular */

(function () {
  angular.module('loginModule').controller('LoginController', ['$location',
    'loginService', '$scope', '$cookies', function ($location, loginService,
      $scope, $cookies) {
      this.email = $cookies.get('lastuser')
      this.password = ''

      this.login = function () {
        $scope.error = null
        loginService.$signInWithEmailAndPassword(this.email, this.password).then(function (authData) {
          if (authData.isTemporaryPassword) {
            $location.path('/reset')
          } else {
            $cookies.put('lastuser', authData.email)
            $location.path('/view')
          }
        }).catch(function (error) {
          $scope.error = error.message
        })
      }

      this.clear = function () {
        this.email = ''
        this.password = ''
        $scope.error = null
        $scope.success = null
      }

      this.resetPassword = function () {
        $scope.error = null
        $scope.success = null
        loginService.$sendPasswordResetEmail(this.email).then(function () {
          $scope.success = 'Password reset sent to ' + this.email
        }).catch(function (error) {
          $scope.error = 'Reset failed: ' + error.message
        })
      }
    }])

  angular.module('loginModule').controller('LoginButtonController', ['$scope',
    'loginService', '$location', 'userService', function ($scope,
      loginService, $location, userService) {
      $scope.location = $location
      loginService.$onAuthStateChanged(function (authData) {
        $scope.authData = authData
        if (!authData) {
          $location.path('/login')
        } else {
          userService.getUser(authData.uid).$loaded().then(function (data) {
            if (!data.active) {
              $scope.signout()
            } else {
              $scope.username = data.name
              $scope.isAdmin = data.admin
              if (!$scope.username) {
                $scope.username = authData.email
              }
            }
          })
        }
      })

      $scope.signout = function () {
        loginService.$signOut().then(function () {
          $location.path('/login')
        }).catch((err) => {
          $scope.error = err.message
        })
      }
    }])

  angular.module('loginModule').controller('LoginResetController', ['$scope',
    'loginService', '$location', function ($scope, loginService, $location) {
      $scope.changePassword = function () {
        if ($scope.new1 !== $scope.new2) {
          $scope.error = "New passwords don't match"
          return
        }
        loginService.$updatePassword($scope.new1).then(function () {
          $location.path('/view')
        }).catch(function (error) {
          $scope.error = error.message
        })
      }

      $scope.cancel = function () {
        $location.path('/view')
      }
    }])
})()
