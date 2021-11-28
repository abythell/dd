/* global angular */

angular.module('dateModule').service('dateService', [function () {
  this.selectedDate = new Date()

  this.isToday = function () {
    const today = new Date().toDateString()
    const selected = this.selectedDate.toDateString()
    return (selected === today)
  }

  this.addDays = function (i) {
    this.selectedDate.setDate(this.selectedDate.getDate() + i)
  }
}])
