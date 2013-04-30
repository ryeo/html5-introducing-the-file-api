if (Meteor.isClient) {
  var BinaryFileReader = {
    read: function (file, callback) {
      var reader = new FileReader;

      var fileInfo = {
        name: file.name,
        type: file.type,
        size: file.size,
        file: null
      };

      // called when the file has been read into
      // memory
      reader.onload = function () {
        // the result is assigned to the reader.result property and
        // then we assign it to our fileInfo object and call our callback
        // with the fileInfo passed as the second parameter
        fileInfo.file = reader.result;
        callback(null, fileInfo);
      };

      // called when there is an error reading
      // the file into memory
      reader.onerror = function () {
        // if there's an error pass it as the first parameter to our
        // callback
        callback(reader.error);
      };

      // read the file into memory in a specified format like
      // readAsText, reasAsBinaryString, readAsDataURL,
      // readAsArrayBuffer
      reader.readAsArrayBuffer(file);
    }
  };

  Template.fileUpload.events({
    // Handle the form submit event
    "submit form": function (e, tmpl) {
      var fileInput = tmpl.find('input[type=file]');

      // grab a list of the files selected with the file chooser
      // input
      var fileList = fileInput.files;

      // let's not actually submit the form
      e.preventDefault();

      for (var i = 0; i < fileList.length; i++) {

        // for each file call the read method on our custom
        // file reader object
        BinaryFileReader.read(fileList[i], function (err, fileInfo) {
          if (err)
            console.log(err);
          else
            console.log(fileInfo);
        });
      }
    }
  });
}
