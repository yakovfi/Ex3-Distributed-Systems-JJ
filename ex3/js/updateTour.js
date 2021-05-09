
$(document).ready(function () {
    $("form[name='user_form']").validate({
        // Specify validation rules
        rules: {
            // all: {
            //     required: true
            // },
            "name": {
                minlength: 5
            },
            "id_field": {
                required: true,
                minlength: 6
            },
            "email": {
                "email": true
            }
        },
        // Specify validation error messages
        messages: {
            name: "At least 5 characters long!",
            id_field: {
                digits: "Please enter only digits",
                minlength: "At least 6 characters long!"
            },
            email: "email structure is some@domain "
        }
    });

    let this_page_url = window.location.href;
    let url_array = this_page_url.split("/");
    let params_array = url_array[url_array.length-1].split("=");
    let ID = params_array[params_array.length-1];

    // process the form
    $('#user_form').submit(function (event) {

        if (!$("#user_form").valid()) return;


        var data2 = JSON.stringify({
            "start_date": $("#start_date").val(),
            "duration": Number($("#Duration").val()),
            "price": Number($("#price").val()),
            "guide": {
                "name": $('#gname').val(),
                "email": $('#gemail').val(),
                "cellular": $('#gcell').val(),
            }
        })

        // console.log('test:', data2)
        // console.log('stringed: ', JSON.stringify(data2))
        // process the form
        $.ajax({
            type: 'PUT', // define the type of HTTP verb we want to use (PUT for our form)
            url: '/users/'+ID, // the url where we want to PUT
            contentType: 'application/json',
            data: data2,
            processData: false,
            // dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function (data, textStatus, jQxhr) {
                console.log(data);
                location.href = "/main";

            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
function backToMain() {
    window.location.replace('/main');
}