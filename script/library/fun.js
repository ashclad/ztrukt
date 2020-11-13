function changeLang(to = "en", hasrun=Tracker.lang_initialized) {
  // write code here using altLang
}

function altLang(elems, tracker, languageset=Settings.lang) {
  tracker.datum = {status: null, affected: [], currentlang: Settings.lang}

  if (elems !== undefined && root.getAttribute('lang') !== undefined && languageset.default !== undefined) {
    if (elems.length > 0) {
      console.info("Language to be reviewed: %s.", elems[0].getAttribute('lang'))
    }
    if (root.getAttribute('lang') == languageset.default && languageset.multiple == true) {
      for (var i = 0; i < elems.length; i++) {
        if (elems[i].getAttribute('lang') != languageset.default) {
          if (elems[i].tagName != "HTML") {
            tracker.datum.affected.push({elem: elems[i], index: i, value: window.getComputedStyle(elems[i]).display, lang: elems[i].getAttribute('lang')})
          }
          console.info("Default display for %o: %s.", elems[i], window.getComputedStyle(elems[i]).display)
          if (elems[i].tagName != "HTML") {
            console.log("Different language from default. Display changed to %s for %o.", "none", elems[i])
            elems[i].style.display = "none"
          }
        } else if (elems[i].getAttribute('lang') == languageset.default) {
          if (elems[i].tagName != "HTML") {
            if (elems[i].style.display == "none" || window.getComputedStyle(elems[i]).display == "none") {
              tracker.datum.affected.forEach(langdef => {
                if (langdef['elem'].getAttribute('lang') == elems[i].getAttribute('lang')) {
                  if (langdef['index'] == i) {
                    elems[i].style.display = langdef['value']
                    console.warn("Same language as default with improper display. Display changed to %s for %o.", elems[i].style.display, elems[i])
                  } else {
                    console.warn("Seems %o had not been logged.", elems[i])
                  }
                }
              });
            } else {
              console.warn("Same language as default. No display changed for %o.", elems[i])
            }
          }
        }
        if (elems[i].tagName == "HTML") {
          console.info("Review of element #%i skipped due to defining the default language.", i)
        } else {
          console.info("Done reviewing element #%i.", i)
        }
      }
      tracker.datum.status = true
    } else if (root.getAttribute('lang') != languageset.default && languageset.multiple == true) {
      throw new Error("HTML root \"lang\" attribute value inconsistent with default language setting.")
      tracker.datum.status = false
    } else if (languageset.multiple == false) {
      console.warn("No support for multiple language toggling in settings.")
    }
  } else {
    throw new ReferenceError("One or many of the app's language-related components missing.")
    tracker.datum.status = false
  }

  console.info("Default display values for linguistically-specified elements logged: %o.", tracker.datum)
  return tracker.datum
}

function produceBib(cites, table, elems = citeds, bibset=Settings.bib) {
  output = {status: null, currentbibs: [], movedrefs: []}

  if (bibset.automatic == true && table !== undefined) {
    for (var i = 0; i < elems.length; i++) {
      for (var o = 0; o < cites.length; o++) {
        if (elems[i].contains(cites[o]) && table.length == 0 && window.getComputedStyle(elems[i]).display != "none") {
          var bib = doc.createElement("OL")
          if (cites[o].classList.contains("note")) {
            bib.setAttribute("class", "footnotes")
            console.log("Created %o for needed footnotes.", bib)
          } else if (cites[o].classList.contains("citation")) {
            bib.setAttribute("class", "bib")
            console.log("Created %o for needed bibliography.", bib)
          }
          if (cites[o].tagName == 'A') {
            var refid = cites[o].href
            refid = refid.split('/')
            refid = refid[refid.length-1]
            refid = refid.replace('#',"")
            if (table.children !== undefined) {
              var refindex = []
              if (table.children.length > 0) {
                for (var x = 0; x < table.children.length; x++) {
                  var footref = table.children[x].id
                  footref = "#" + footref
                  if (footref == refid) {
                    refindex.push(x)
                  }
                }
                if (refindex !== undefined) {
                  if (refindex.length == 0) {
                    var refitem = doc.createElement("LI")
                    refitem.setAttribute("class", "reference")
                    refitem.setAttribute("id", refid)
                    var refcontent = doc.createTextNode(cites[o].title)
                    refitem.appendChild(refcontent)
                    bib.appendChild(refitem)
                  }
                }
              }
            } else {
              var refitem = doc.createElement("LI")
              refitem.setAttribute("class", "reference")
              refitem.setAttribute("id", refid)
              var refcontent = doc.createTextNode(cites[o].title)
              refitem.appendChild(refcontent)
              bib.appendChild(refitem)
            }
            var citeshrefarr = cites[o].href.split('/')
            console.log("%o created for citation or note based on %s and appended to %o.", refitem, cites[o].tagName + "." + cites[o].className + "[href=" + citeshrefarr[citeshrefarr.length-1] + "] #" + o, bib)
          } else if (cites[o].tagName == 'SPAN') {
            for (var p = 0; p < cites[o].children.length; p++) {
              if (cites[o].children[p].tagName == 'A') {
                var refid = cites[o].children[p].href
                refid = refid.split('/')
                refid = refid[refid.length-1]
                refid = refid.replace('#',"")
              }
              if (table.children !== undefined) {
                var refindex = []
                if (table.children.length > 0) {
                  for (var x = 0; x < table.children.length; x++) {
                    var footref = table.children[x].id
                    footref = "#" + footref
                    if (footref == refid) {
                      refindex.push(x)
                    }
                  }
                  if (refindex !== undefined) {
                    if (refindex.length == 0) {
                      var refitem = doc.createElement("LI")
                      refitem.setAttribute("class", "reference")
                      refitem.setAttribute("id", refid)
                      var refcontent = doc.createTextNode(cites[o].title)
                      refitem.appendChild(refcontent)
                      bib.appendChild(refitem)
                    }
                  }
                }
              } else {
                var refitem = doc.createElement("LI")
                refitem.setAttribute("class", "reference")
                refitem.setAttribute("id", refid)
                var refcontent = doc.createTextNode(cites[o].title)
                refitem.appendChild(refcontent)
                bib.appendChild(refitem)
              }
            }
            console.info("%o created for citation or note based on %s and appended to %o.", refitem, cites[o].tagName + "." + cites[o].className + "[href=" + citeshrefarr[citeshrefarr.length-1] + "] #" + o, bib)
          }
          elems[i].appendChild(bib)
          output.currentbibs.push(bib)
          console.info("%o appended to corresponding post or article %s.", bib, elems[i].tagName + ".cited #" + i)
        } else if (elems[i].contains(cites[o]) == false && table.length == 0 && window.getComputedStyle(elems[i]).display != "none") {
          output.status = false
          console.warn("Some citations or notes are outside %s.", elems[i].tagName + ".cited #" + i)
        } else if (elems[i].contains(cites[o]) && table.length > 0 && window.getComputedStyle(elems[i]).display != "none") {
          console.warn("Preventing new reference or footnote creation. Some references or footnotes have already been created.")
          var linkid = cites[o].href
          linkid = linkid.split('/')
          linkid = linkid[linkid.length-1]
          linkid = linkid.replace('#',"")
          refs = doc.querySelectorAll('.reference')

          for (var d = 0; d < refs.length; d++) {
            if (refs[d].id == linkid) {
              if (elems[i].contains(cites[o]) && !elems[i].contains(refs[d])) {
                console.warn("%o is in the wrong place. Reshuffling.", refs[d])
                for (var t = 0; t < table.length; t++) {
                  if (elems[i].contains(table[t])) {
                    table[t].appendChild(refs[d])
                  } else {
                    refs[d].remove()
                  }

                  output.movedrefs.push({what: refs[d], from: refs[d].parentElement.parentElement, to: elems[i]})
                }
              }
            }
          }
        }
      }
    }
  }

  output.status = true

  return output
}
