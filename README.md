# JSONITE
JSON Builder for command line | Use JSON on your command line, say no to json bloat

## Installation
```
npm install jsonite -g
```

## Usage examples

### Basic
Simply specify keys and values, that's it
```
jsonite homer=dad marge=mom bart=son lisa=daughter maggie=
```

Output
```
{"homer":"dad","marge":"mom","bart":"son","lisa":"daughter","maggie":null}
```

### Advanced
You can use patchs to write complex object

```
jsonite families[0].homer=dad families[0].marge=mom families[0].bart=son families[0].lisa=daughter families[0].maggie=
```

Output
```
{"families":[{"homer":"dad","marge":"mom","bart":"son","lisa":"daughter","maggie":null}]}
```

### Pretty print
Use `-p` argument to pretty print output

```
jsonite homer=dad marge=mom bart=son lisa=daughter maggie= -p
```

Output
```
{
  "homer": "dad",
  "marge": "mom",
  "bart": "son",
  "lisa": "daughter",
  "maggie": null
}
```

### Type guessing and string with whitespaces
You can use numbers and null values. User `KEY=` for a null value `KEY=number` for a number, they will be handled automatically. Use `"` to input string with whitespaces.

```
jsonite age=22 fullname="John Doe" children[0]=lisa children[1]=bart address= -p
```

Output
```
{
  "age": 22,
  "fullname": "John Doe",
  "children": [
    "lisa",
    "bart"
  ],
  "address": null
}
```

### Preventing type guessing
Type guessing is cool, but sometimes is is problematic, don't worry, just state type using `-t KEY=TYPE` arguments. Types might be `string` or `number`

#### Empty string
Avoid null type guessing for empty strings
```
jsonite family.details= -t family.details=string
```

Output
```{"family":{"details":""}}```

#### Numeric string
Avoid numeric type guessing for empty strings
```
jsonite family.age="22" -t family.age=string
```

Output
```{"family":{"age":"22"}}```

## Using with other apps
Jsonite alone is cool, but working side by side with other tools is great.

### CURL Example
```
curl -v -H "Content-Type: application/json" -X PUT -d `jsonite key=value` https://webtask.it.auth0.com/api/run/wt-damianfortu-gmail_com-0/jsonite-example
```
Test it by yourself
