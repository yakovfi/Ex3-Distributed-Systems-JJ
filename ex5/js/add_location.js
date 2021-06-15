$(document).ready(function () {
    $("form[name='user_form']").validate({
        // Specify validation rules
        rules: {
            all: {
                required: true,
            }
        },
        // Specify validation error messages
        messages: {
            require: "Please fill all the fields",
            digits: "Please fill only labels"
        }
    });
    let this_page_url = window.location.href;
    let url_array = this_page_url.split("/");
    let params_array = url_array[url_array.length - 1].split("=");
    let ID = params_array[params_array.length - 1];

    // process the form
    $('#user_form').submit(function (event) {

        if (!$("#user_form").valid()) return;

        var data2 = JSON.stringify({
            "name": $("#location_name").val(),
            "country": $("#country_name").val(),
        })
        let myUrl = '/tour/' + ID

        // process the form
        $.ajax({
            type: 'PUT', // define the type of HTTP verb we want to use (PUT for our form)
            url: myUrl, // the url where we want to PUT
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