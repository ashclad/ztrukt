var doc = document
var root = document.documentElement
var japs = doc.querySelectorAll('[lang="ja"]')
var engs = doc.querySelectorAll('[lang="en"]')
var esp = doc.querySelectorAll('[lang="es"]')
var langs = [engs, esp, japs]
var articles = doc.querySelectorAll('article')
var posts = doc.querySelectorAll('.blogpost')
var citeds = doc.querySelectorAll('.cited')
var citations = doc.querySelectorAll('.citation')
var biblios = doc.querySelectorAll('.bib')
var notes = doc.querySelectorAll('.note')
var footnotes = doc.querySelectorAll('.footnotes')
var langset = doc.querySelectorAll('[name="langset"]')
