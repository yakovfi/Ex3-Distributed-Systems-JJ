let keys = [];
let obj = {};
let idHystory = [];
let saveKey;
let indexOfRowTable = 0;
let j = 0;
let objArr = [];
let if_showing_trackTable = false;
$(document).ready(function () {

  $.ajax({
    url: "/guide",
    type: 'GET',
    success: function (result) {
      for (const [key, value] of Object.entries(result)) {
        saveKey = key;
        keys[j] = saveKey;
        j++;
      }
      createObjectsArray(result);

      let guideschoices = [];
      let i = 0;
      objArr.forEach(e => {

        let guide = "<option value=" + e._id + ">" + e.Guide_Name + "</option>";
        guideschoices[i] = guide;
        i++;
      });
      for (let index = 0; index < guideschoices.length; index++) {
        $('#guide').append(guideschoices[index]);
      }
      if(guideschoices.length == 0){
        alert("There is no guide in the database, please create one before creating a Trip/Tour");
        location.href = '/main';
      }
    },
    error: function (err) {
      alert(err);
    }
  });

  function createObjectsArray(res) {
    for (let i = 0; i < keys.length; i++) {
      let tempArr = keys[i]
      objArr[i] = res[tempArr];
    }
  }

  $("form[name='user_form']").validate({
    // Specify validation rules
    rules: {
      all: {
        required: true
      },
      "name": {
        minlength: 3
      },
      "start_date": {
        required: false,
        date: true,
      },
      "id_field": {
        required: true,
        minlength: 3
      }
    }
  });
  let _id_of_chosen_guide = $("#guide").val();
  let obj_chosen_guide;
  objArr.forEach(e => {
    if (e._id == _id_of_chosen_guide) {
      obj_chosen_guide = e;
    }
  });
  // process the form
  $('#user_form').submit(function (event) {
    if (!$("#user_form").valid()) return;

    // process the form
    $.ajax({
      type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
      url: '/tour', // the url where we want to POST
      contentType: 'application/json',
      data: JSON.stringify({
        "id": $("#id_field").val(),
        "start_date": $("#start_date").val(),
        "duration": Number($("#Duration").val()),
        "price": Number($("#price").val()),
        "guide": $('#guide').val()
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