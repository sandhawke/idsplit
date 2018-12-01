const cheerio = require('cheerio')
// const H = require('escape-html-template-tag')
const debug = require('debug')('idsplit')

function idsplit ($) {
  if (typeof $ === 'string') $ = cheerio.load($)
  const split = {}

  s('body')
  function s (node, pre = '') {
    // debug(pre + 'pre at type=%j node=xx', node.nodeType)
    const jq = $(node)
    // debug(pre + '.....  html=%j', jq ? jq.html(): '---')
    jq.contents().each(function (i) {
      s(this, pre + ' *' + i + '  ')
    })
    const id = jq.attr('id')
    const html = jq.clone().wrap('<p>').parent().html()
    if (id) {
      debug(pre + 'SAVING %j = %j', id, html)
      split[id] = html
      jq.replaceWith(`<ref id="${id}" />`)
    }
  }

  return split
}

// move to objdiff?  so simple, but.
function changes (from, to) {
  const add = []
  const update = []
  const old = Object.assign({}, from)  // destroyable copy
  for (const k of Object.keys(to)) {
    const oldval = old[k]
    delete old[k]
    if (oldval === undefined) {
      add.push(k)
    } else {
      if (oldval === to[k]) {
        // no change
      } else {
        update.push(k)
      }
    }
  }
  const remove = Object.keys(old)
  return { add, update, remove }
}

/* 
   seems nice, but not tested since I don't actually need it

function patch (from, to) {
  const changes = changes(from, to)
  const out = []
  for (const k of changes.remove) out.push(['-', k])
  for (const k of changes.add.concat(changes.update)) {
    out.push(['+', k, to[k]])
  }
  return out
}

// function applyPatch (patch, objP) {
// }

function patchAsFunction (from, to) {
  const changes = changes(from, to)
  const out = []
  out.push('function (obj) {')
  for (const k of changes.remove) out.push('  delete obj.' + k)
  for (const k of changes.add.concat(changes.update)) {
    out.push('  obj.' + k + ' = ' + JSON.stringify(to[k]))
  }
  out.push('}')
  return out
}

// what I really want is
//
// what new HTML do I need to send...
//
//  delete -- no need to send, just forget
//  update -- send the new thing
//  add    -- no need, it'll be in some parent update
// 

*/

module.exports = idsplit
idsplit.changes = changes



