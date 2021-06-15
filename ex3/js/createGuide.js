
$(document).ready(function () {

    $("form[name='user_form']").validate({
      // Specify validation rules
      rules: {
        all: {
          required: true
        },
        "name": {
          minlength: 3
        },
        "id_field": {
          required: true,
          minlength: 3
        },
        "email": {
          required: true,
          email: true,
        },
        "cellular": {
  
          minlength: 7
  
        }
      },
      // Specify validation error messages
      messages: {
        name: "At least 3 characters long!!",
        id_field: {
          // digits: "Please enter only digits",
          minlength: "At least 3 characters long!"
        },
        email: {
          email: "The email should be in the format: abc@domain.tld"
        }
      },
      cellular: {
        minlength: "Cell phone number should be 7 digits"
  
      }
    });
  
    // process the form
    $('#user_form').submit(function (event) {
      if (!$("#user_form").valid()) return;
  
      // process the form
      $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/Server_Error_Handling_and_implementation', // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
          "Guide_Name": String($("#gname").val()),
          "Guide_Email": String($("#gemail").val()),
          "Guide_Cell": Number($("#cellular").val()),
          // "guide": {
          //   "name": $('#gname').val(),
          //   "email": $('#gemail').val(),
          //   "cellular": $('#gcell').val(),
          // }
          // "path": [],
        }),
        processData: false,
        // dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data, textStatus, jQxhr) {
          location.href = "/main";
  
        },
        error: function (jqXhr, textStatus, errorThrown) {
          alert(jqXhr.responseText);
        }
      })
  
      // stop the form from submitting the normal way and refreshing the page
      event.preventDefault();
    });
  
  });
  function backToMain() {
    window.location.replace('/main');
  }