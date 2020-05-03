const moment = require('moment')
const numeralFilter = require('nunjucks-numeral-filter');

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
   var filters = {}

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

    ------------------------------------------------------------------ */

    filters.date = function(date,format) {
      return moment(date).format(format)
    }

    filters.addToDate = function(date,q,m) {
      return moment(date).add(q,m)
    }

    filters.today = function(format) {
      return moment().format(format)
    }

    filters.reservationMonths = function(count, inputName){
      var monthFormat = "MMMM YYYY"
      var currentMonth = moment().format(monthFormat)

      var months = [
      // {
      //   value: 'before-now',
      //   text: "Before " + currentMonth,
      //   attributes:
      //   {
      //     required: "required"
      //   }
      // },
      {
        value: currentMonth,
        text: "Between " + moment(currentMonth).startOf('month').format(monthFormat) + " and " + moment(currentMonth).add(2, 'months').startOf('month').format(monthFormat),
        attributes:
        {
          required: "required"
        }
      }]

      function addMonths(m){
        if(months.length <= m-1){
          var date = moment(months[months.length-1]["value"]).add(1, 'months').format(monthFormat);
          var month = {
            value: date,
            text: "Between " + moment(date).startOf('month').format(monthFormat) + " and " + moment(date).add(2, 'months').startOf('month').format(monthFormat),
            hint:
            {
              text: ""
            }
          }

          months.push(month)
          addMonths(m)
        }
      }

      addMonths(count)

      months.push({
        divider: "or"
      },
      {
        value: "unknown",
        text: "I don't know"
      })

      return months
    }

    env.addFilter('numeral', numeralFilter);



  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
    ------------------------------------------------------------------ */
    return filters
  }
