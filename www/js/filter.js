
angular.module('starter.filters',[])


 .filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
          if (input != null)
          {
            return input.split(splitChar)[splitIndex];
          }
        }
    })
    

    .filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}])

    .filter('formatDuration', function () {
    return function (input) {
        var totalHours, totalMinutes, totalSeconds, hours, minutes, seconds, result='';

        totalSeconds = input / 1000;
        totalMinutes = totalSeconds / 60;
        totalHours = totalMinutes / 60;

        seconds = Math.floor(totalSeconds) % 60;
        minutes = Math.floor(totalMinutes) % 60;
        hours = Math.floor(totalHours) % 60;

        if (hours !== 0) {
            result += hours+':';

            if (minutes.toString().length == 1) {
                minutes = '0'+minutes;
            }
        }

        result += minutes+' M';

        if (seconds.toString().length == 1) {
            seconds = '0'+seconds;
        }

        // result += seconds;

        return result;
    };
});