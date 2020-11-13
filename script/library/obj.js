var Settings = {
  lang: {multiple: true, default: "en"},
  bib: {automatic: true}
}

class Tracker {
  constructor(name, desc, type) {
    this.name = name
    this.info = desc
    this.datum = type
    this.run = false
  }

  update(...args) {
    if (typeof this.datum == "boolean") {
      if (args === undefined || args.length <= 0) {
        if (this.datum) {
          this.datum = false
        } else {
          this.datum = true
        }
      } else if (args.length > 0 && args.length < 2) {
        if (typeof args[0] == "boolean"){
          this.datum = args[0]
        } else {
          throw new Error("Argument must be a boolean type.")
          return false
        }
      } else {
        throw new Error("Invalid argument length. Only one entry allowed.")
        return false
      }

      return true
    } else if (typeof this.datum == "object") {
      if (Array.isArray(this.datum)) {
        for (var q = 0; q < args.length; q++) {
          if (Array.isArray(args[q])) {
            for (var i = 0; i < args[q].length; i++) {
              this.datum.push(args[q][i])
            }
          } else if (typeof args[q] == "object") {
            for (var i = 0; i < Object.values(args[q]).length; i++) {
              console.warn("Argument should be an array, but object argument will be converted into an array.")
              this.datum.push(Object.values(args[q])[i])
            }
          } else {
            throw new Error("Arguments must be an object.")
            return false
          }
        }
      } else {
        for (var q = 0; q < args.length; q++) {
          if (Array.isArray(args[q])) {
            console.warn("Array should either be an object value or be an object itself. Automatic keys will be created for arrays.")
            Object.defineProperty(this.datum, "misc" + q, args[q])
          } else if (typeof args[q] == "object") {
            var leftovers = []
            for (var i = 0; i < Object.keys(this.datum).length; i++) {
              for (var e = 0; e < Object.keys(args[q]).length; e++) {
                if (Object.keys(this.datum)[i] == Object.keys(args[q])[e]) {
                  var typeindex = Object.keys(this.datum)[i]
                  var argindex = Object.keys(args[q])[e]
                  this.datum[pseudindex] = args[q][argindex]
                } else {
                  if (leftovers.length == Object.keys(this.datum).length) {
                    var argindex = Object.keys(args[q])[e]
                    Object.defineProperty(this.datum, argindex, args[q][argindex])
                  } else {
                    leftovers.push(args[q][e])
                  }
                }
              }
            }
          }
        }
      }

      return true
    } else if (typeof this.datum == "function") {
      if (args.length == 1) {
        this.datum = args[0]
      } else {
        for (var q = 0; q < args.length; q++) {
          this["func" + q] = args[q]
        }
      }

      return true
    }
  }

  del() {
    // code
  }

  current() {
    var t = new Date()
    str = t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()
    console.log("[" + str + "]: %o", this.datum)
    return this.datum
  }

  stream(stop=null) {
    if (stop == null) {
      stop = this.run
    }

    var minitracker = null;

    if (stop == false) {
      stop = true
      this.run = stop
      var process = setInterval(function () {
        console.log(this.datum)
        minitracker = this.datum
      }, 500)
    } else if (stop == true) {
      clearInterval(process)

      stop = false
      this.run = stop
    }

    if (stop == false || this.run == false) {
      return minitracker
    }
  }
}
