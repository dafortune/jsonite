#! /usr/bin/env node

const yargs = require('yargs')
const set = require('lodash.set')
const get = require('lodash.get')
const reduce = require('lodash.reduce')
const forEach = require('lodash.foreach')

const argv = yargs
    .usage('Usage: $0 <keys> [options]')
    .alias('p', 'pretty')
    .alias('t', 'type')
    .alias('h', 'help')
    .boolean('pretty')
    .describe('p', 'Pretty print JSON output')
    .describe('t', 'Type for a key. Format: key=value')
    .example('$0 homer=dad marge=mom bart=son lisa=daughter maggie=daughter', 'count the lines in the given file')
    .help('help')
    .argv

const vtypes = {
  'string': function(v) {
    return v.toString()
  },

  number(v) {
    const parsed = parseFloat(v)

    if (isNaN(parsed) || parsed.toString() !== v) {
      throw new Error(`${v} is not a valid number`);
    }

    return parsed;
  }
};

function keyValueParse(strings, types) {
  strings = strings || []
  strings = Array.isArray(strings) ? strings : [ strings ]

  return strings.reduce((result, str) => {
    const pair = str.split('=')
    const key = pair[0]
    const value = typify(key, pair[1], types)

    if (!key) {
      throw new Error('Error parsing key')
    }

    result[key] = value

    return result
  }, {})
};

function typify(key, value, types) {
  if (!types) {
    return value;
  }

  const transform = vtypes[get(types, key)];
  if (transform) {
    return transform(value)
  } else {
    return guessType(value)
  }
}

function guessType(v) {
  const handlers = [vtypes.number, vtypes.string]

  if (!v) {
    return null
  }

  forEach(handlers, (transform) => {
    try {
      v = transform(v)
      return false
    } catch (e) {
      return true
    }
  })

  return v;
}

function checkTypes(types) {
  forEach(types, (t, k) => {
    if (!vtypes[t]) {
      throw new Error(`Invalid type ${t} for key ${k}`)
    }
  })
}

function generateJSONObject(kvObject) {
  return reduce(kvObject, (result, value, key) => {
    set(result, key, value);

    return result;
  }, {});
}

function generateJSONString(obj, pretty) {
  return JSON.stringify(obj, null, pretty ? 2 : null)
}

try {
  const types = keyValueParse(argv.type) || {};
  checkTypes(types);

  const jsonObject = generateJSONObject(keyValueParse(argv._, types))
  const jsonString = generateJSONString(jsonObject, argv.pretty)

  console.log(jsonString)
} catch (e) {
  if (typeof e === 'object' && e.message) {
    console.log(e.message)
  } else {
    console.log(e)
  }
}
