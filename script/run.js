// event-independent
console.clear()
var minitracker = new Tracker("Temp", "A tracker for logging what elements have their display toggled based on their language.", {})
var excludedlangs = []
langs.forEach(lang => {
  excludedlangs.push(altLang(lang, minitracker))
});
minitracker = null
var langtracker = new Tracker("LanguageToggle", "A tracker for logging what elements have their display toggled based on their language.", excludedlangs)

var bibtracker = new Tracker("BibChanges", "A tracker for logging bibliographic changes.", {})
var notetracker = new Tracker("NoteChanges", "A tracker for logging footnote changes.", {})
bibtracker.datum = produceBib(citations, biblios)
notetracker.datum = produceBib(notes, footnotes)

// event-dependent
//langset.forEach(langopt => {
//  langopt.onclick = () => {
//    Settings.lang.default = langopt.value
//    changeLang(Settings.lang.default)
//    if (langopt.value == "en") {
//      Tracker.langbutton.en.status = true
//      Tracker.langbutton.es.status = false
//      Tracker.langbutton.ja.status = false
//    } else if (langopt.value == "es") {
//      Tracker.langbutton.en.status = false
//      Tracker.langbutton.es.status = true
//      Tracker.langbutton.ja.status = false
//    } else if (langopt.value = "ja") {
//      Tracker.langbutton.en.status = false
//      Tracker.langbutton.es.status = false
//      Tracker.langbutton.ja.status = true
//    }
//  }
//});
