// `createEmployeeRecord`

// Argument(s)
// A 4-element Array of a `String`, `String`, `String`, and `Number`
  //corresponding to a first name, family name, title, and pay rate per hour

// Returns
// JavaScript `Object` with keys:
  // `firstName`
  // `familyName`
  // `title`
  // `payPerHour`
  // `timeInEvents`
  // `timeOutEvents`

// Behavior
// Loads `Array` elements into corresponding `Object` properties.
  //_Additionally_, initialize empty `Array`s on the properties `timeInEvents`
  //and `timeOutEvents`.

  let createEmployeeRecord = function(array){

          return { firstName:  array[0],
            familyName: array[1],
            title: array[2],
            payPerHour: array[3],
            timeInEvents: [],
            timeOutEvents: [] 
    
    
    } 




  }

  let createEmployeeRecords = function(employeeDataArray) {
    return employeeDataArray.map(function(array){
        return createEmployeeRecord(array)
    })
}

let createTimeInEvent = function(employeeRecord, dateTimeStamp){
       let [date, hour] = dateTimeStamp.split(' ')

       employeeRecord.timeInEvents.push({
           type: "TimeIn",
           hour: parseInt(hour, 10),
           date,
       })
   
       return employeeRecord


}
  

let createTimeOutEvent = function(employeeRecord, dateTimeStamp){
    let [date, hour] = dateTimeStamp.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeRecord


}

let hoursWorkedOnDate = function(employee, dateWorked){

    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === dateWorked
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === dateWorked
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateWorked){
    let rawWage = hoursWorkedOnDate(employee, dateWorked)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}