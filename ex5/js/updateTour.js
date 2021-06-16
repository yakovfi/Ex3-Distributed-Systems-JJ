let keys = [];
let obj = {};
let idHystory = [];
let saveKey;
let indexOfRowTable = 0;
let j = 0;
let objArr = [];
let if_showing_trackTable = false;

$(document).ready(function () {
    $("form[name='user_form']").validate({
        // Specify validation rules
        rules: {
            "name": {
                minlength: 5
            },
            "id_field": {
                required: true,
                minlength: 6
            },
            "email": {
                required: true,
                email: true,
            }
        },
        // Specify validation error messages
        messages: {
            name: "At least 5 characters long!",
            id_field: {
                digits: "Please enter only digits",
                minlength: "At least 6 characters long!"
            },
            email: {
                email: "The email should be in the format: abc@domain.tld"
            },
        }
    });

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






    let this_page_url = window.location.href;
    let url_array = this_page_url.split("/");
    let params_array = url_array[url_array.length - 1].split("=");
    let ID = params_array[params_array.length - 1];

    // process the form
    $('#user_form').submit(function (event) {

        if (!$("#user_form").valid()) return;


        var data2 = JSON.stringify({
            "start_date": $("#start_date").val(),
            "duration": Number($("#Duration").val()),
            "price": Number($("#price").val()),
            "guide": $('#guide').val()
        })


        // process the form
        $.ajax({
            type: 'PUT', // define the type of HTTP verb we want to use (PUT for our form)
            url: '/tour/' + ID, // the url where we want to PUT
            contentType: 'application/json',
            data: data2,
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