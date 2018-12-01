const idsplit = require('.')
const test = require('tape')

test(t => {
  const h = `<div id="a"><div id="aa"><div id="aaa">`
  const s = idsplit(h)
  // console.log(JSON.stringify(s, null, 4))
  const ss = {
    "aaa": "<div id=\"aaa\"></div>",
    "aa": "<div id=\"aa\"><ref id=\"aaa\"></ref></div>",
    "a": "<div id=\"a\"><ref id=\"aa\"></ref></div>"
  }
  t.deepEqual(s,ss)
  t.end()
})

test(t => {
  const h = `
<div>wrapper
<div id="a">a
  <div id="aa">aa</div>
  <div id="ab">ab
    <div id="aba">aba</div>
    <div id="abb">abb</div>
      <div>abba</div>
      <div>abbc</div>
    <div id="abc">abc</div>
 </div>
  <div id="ac">ac</div>
</div>
<div id="b">b</div>
<div id="c">c</div>
</div>
`
  const s = idsplit(h)
  // console.log(JSON.stringify(s, null, 4))
  const ss = {
    "aa": "<div id=\"aa\">aa</div>",
    "aba": "<div id=\"aba\">aba</div>",
    "abb": "<div id=\"abb\">abb</div>",
    "abc": "<div id=\"abc\">abc</div>",
    "ab": "<div id=\"ab\">ab\n    <ref id=\"aba\"></ref>\n    <ref id=\"abb\"></ref>\n      <div>abba</div>\n      <div>abbc</div>\n    <ref id=\"abc\"></ref>\n </div>",
    "ac": "<div id=\"ac\">ac</div>",
    "a": "<div id=\"a\">a\n  <ref id=\"aa\"></ref>\n  <ref id=\"ab\"></ref>\n  <ref id=\"ac\"></ref>\n</div>",
    "b": "<div id=\"b\">b</div>",
    "c": "<div id=\"c\">c</div>"
  }
  t.deepEqual(s,ss)
  t.end()
})

test(t => {
  const h1 = `<div id="a"><div id="aa"><div id="aaa">x`
  const h2 = `<div id="a"><div id="aa"><div id="aaa">y`
  const s1 = idsplit(h1)
  const s2 = idsplit(h2)
  const changes = idsplit.changes(s1, s2)
  // console.log(JSON.stringify(changes, null, 4))
  const ss = {
    "add": [],
    "update": [
      "aaa"
    ],
    "remove": []
  }
  t.deepEqual(changes ,ss)
  t.end()
})

test(t => {
  const h1 = `<div id="a"><div id="aa"><div id="aaa">x`
  const h2 = `<div id="a"><div id="ab"><div id="aaa">y`
  const s1 = idsplit(h1)
  const s2 = idsplit(h2)
  const changes = idsplit.changes(s1, s2)
  // console.log(JSON.stringify(changes, null, 4))
  const ss = {
    "add": [
      "ab"
    ],
    "update": [
      "aaa",
      "a"
    ],
    "remove": [
      "aa"
    ]
  }
  t.deepEqual(changes ,ss)
  t.end()
})

test(t => {
  const h1 = `<div id="a"><div id="aa"><div id="aaa">x`
  const h2 = `<div id="a"><div id="aa"><div id="aab">x`
  const s1 = idsplit(h1)
  const s2 = idsplit(h2)
  const changes = idsplit.changes(s1, s2)
  // console.log(JSON.stringify(changes, null, 4))
  const ss = {
    "add": [
      "aab"
    ],
    "update": [
      "aa",
    ],
    "remove": [
      "aaa"
    ]
  }
  t.deepEqual(changes ,ss)
  t.end()
})

