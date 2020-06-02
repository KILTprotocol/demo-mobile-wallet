module.exports = class Helper {
  constructor(props) {}

  parse_string = (start, end, array) => {
    var string = '';
    for (var i = start; i < end; i++) {
      if (array[i] != 0) {
        string += String.fromCharCode(array[i]);
      }
    }
    return string;
  };

  convert_bytes_to_int = array => {
    var val = 0;
    if (array.length == 1) {
      return array[0];
    }

    var buf = Buffer.from(array);
    if (array.length == 2) {
      val = buf.readUInt16LE(0);
    } else if (array.length == 4) {
      val = buf.readUInt32LE(0);
    }

    return val;
  };

  string_to_array = (string, end) => {
    var array = [];
    for (var i = 0; i < end; i++) {
      if (i < string.length) {
        array.push(string.charCodeAt(i));
      } else {
        array.push(0);
      }
    }
    return array;
  };

  convert_sn = deviceSN => {
    if (deviceSN == null || deviceSN.length != 16) {
      return;
    }

    var fistSeries = deviceSN.slice(0, 4);
    var secondSeries = deviceSN.slice(4, 8);
    var thirdSeries = deviceSN.slice(8, 17);

    fistSeries = fistSeries.replace(/^0+/, '');
    secondSeries = secondSeries.replace(/^0+/, '');
    thirdSeries = thirdSeries.replace(/^0+/, '');

    var string = 'SN: ' + fistSeries + '.' + secondSeries + '.' + thirdSeries;
    return string;
  };
};
