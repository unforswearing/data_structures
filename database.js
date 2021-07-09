function Database() {
  let err = {
    key: new Error("No key provided"),
    value: new Error("No value provided"),
    noArgs: new Error("No arguments were passed"),
  };

  let record = {};

  // main active buffer
  record.master = {};

  // buffer allows the use of a different key
  // eg. db.buffer.state = true
  //     db.buffer.key = 'otherKey'
  record.buffer = {
    key: null,
    state: false,
    reset: false,
    validate: function (key) {
      // return the buffer key if state is true,
      // otherwise, return the active key
      if (record.buffer.state && key === undefined) {
        return record.buffer.key;
      }
      return key;
    },
  };

  record.useBuffer = function (key) {
    record.buffer.state = true;
    record.buffer.key = key;
  };

  record.resetBuffer = function () {
    // remove the current buffer
    record.buffer.state = false;
    record.buffer.key = null;
  };

  record.buffer.reset = record.resetBuffer;

  record.create = function (key, value) {
    // create a new key called 'key' with value 'value'
    // use 'key' as the active buffer
    if (!key) throw err.key;

    record.buffer.reset();

    if (!value) value = false;

    if (record.master[key]) return record.master[key];

    record.master[key] = { 0: value };
    record.buffer.key = key;

    return record;
  };

  record.getIndex = function (key) {
    return Object.keys(record.master[key]).length;
  };

  record.getValues = function (key) {
    key = record.buffer.validate(key);
    if (!key) throw err.key;

    return record.master[key];
  };

  record.addValue = function (key, value) {
    if (!key && !value) throw err.noArgs;

    if (!value) {
      if (record.buffer.state) {
        value = key;
        key = record.buffer.key;
      } else {
        throw err.value;
      }
    }

    let index = record.getIndex(key);
    let keyMaster = record.master[key];

    keyMaster[index] = value;
    return record;
  };

  record.replace = function (addTo, addFrom, rmFrom) {
    // replace replaces the values of addTo with addFrom
    // if used, buffer.key will have to be
    // specified in addTo or addFrom
    let key = addTo;
    let rmkey = addFrom;

    addTo = record.master[addTo];
    addFrom = record.master[addFrom];

    function doMerge(to, from) {
      for (n in from) {
        if (typeof to[n] !== "object") {
          to[n] = from[n];
        } else if (typeof from[n] === "object") {
          to[n] = doMerge(to[n], from[n]);
        }
      }
      return to;
    }

    record.master[key] = doMerge(addTo, addFrom);

    if (rmFrom) delete record.master[rmkey];

    return record;
  };

  record.merge = function (mergeInto, addFrom) {
    // if used, buffer.key will have to be
    // specified in mergeInto or addFrom
    let intoRecord = record.master[mergeInto];
    let intoIndex = record.getIndex(mergeInto);

    let fromRecord = record.master[addFrom];
    let fromKeys = Object.keys(fromRecord);

    fromKeys.forEach(function (item) {
      intoRecord[intoIndex] = fromRecord[item];
      intoIndex++;
    });

    return record;
  };

  record.listKeys = function () {
    if (record.master) return Object.keys(record.master);
    return [];
  };

  record.export = function (key) {
    // this doesn't handle nested objects
    // which is probably fine for my use
    key = record.buffer.validate(key);

    let keyRecord = record.master[key];
    if (!keyRecord) return undefined;

    let keys = Object.keys(keyRecord);

    let tmp = [];

    let keyRecord = record.master[key];
    let keys = Object.keys(keyRecord);

    keys.forEach(function (item) {
      tmp[item] = keyRecord[item];
    });

    return tmp;
  };

  record.deleteKey = function (key) {
    if (record.buffer.key === key) record.buffer.reset();

    let keyRecord = record.master[key];
    let keys = Object.keys(keyRecord);

    keys.forEach(function (item) {
      delete keyRecord[item];
    });

    delete record.master[key];
    delete record.master[undefined];

    return record;
  };

  return record;
}
x;
