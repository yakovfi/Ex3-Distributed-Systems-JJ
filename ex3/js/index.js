let keys = [];
let obj = {};
let idHystory = [];
let saveKey;
let indexOfRowTable = 0;
let i = 0;
let objArr = [];
let if_showing_trackTable = false;
// let max;
//-----------------------
let tempIndex;
let ID = "id";
let START_DATE = "start_date";
let DURATION = "duration";
let PRICE = "price";
//-------------------------
function backToMain() {
    window.location.replace('/main');
}
$(document).ready(function () {

    $('#myTable').hide();
    $.ajax({
        url: "/Server_Error_Handling_and_implementation",
        type: 'get',
        success: function (result) {

            console.log(result);

            for (const [key, value] of Object.entries(result)) {
                saveKey = key;
                keys[i] = saveKey;
                i++;
            }
            createObjectsArray(result);
            dataTrip();
        },
        error: function (err) {
            alert(err);
        }
    });

    $("#Adding_a_new_Trip").click(function () {
        window.location.replace('/add_tour');
    });
    $("#Adding_new_Trip").click(function () {
        window.location.replace('/add_tour');
    });
    function createObjectsArray(res) {
        for (let i = 0; i < keys.length; i++) {
            let tempArr = keys[i]
            objArr[i] = res[tempArr];
        }
    }
    //---------------------------------------------------------
    function dataTrip() {

        sorting("Increasing", ID); //defult

        $(".sorts_type").click(() => {
            let type;
            select = document.getElementById("sorts_type");
            radio = document.getElementsByName("Increasing");
            radio.forEach(element => {
                if (element.checked) {
                    type = element.id;
                }
            });
            option = select.options[select.selectedIndex].value;

            if (option == "ID") {
                indexOfRowTable = 0;
                sorting(type, ID);
            }
            if (option == "Price") {
                indexOfRowTable = 0;
                sorting(type, PRICE);
            }
            if (option == "Duration") {
                indexOfRowTable = 0;
                sorting(type, DURATION);
            }
            if (option == "Start_Date") {
                indexOfRowTable = 0;
                sorting(type, START_DATE);
            }
        }
        )
    }
    // -------------------------------------------------------------
    function sorting(type, field) {

        if (type == "Increasing") {
            let tempObj1;
            let tempObj2;
            for (let i = 0; i < objArr.length; i++) {
                tempObj1 = objArr[i];
                for (let j = i + 1; j < objArr.length; j++) {
                    if (objArr[j][field] < tempObj1[field]) {
                        tempObj2 = objArr[j];
                        objArr[i] = tempObj2
                        objArr[j] = tempObj1;
                        tempObj1 = tempObj2;
                    }
                }
            }
            for (let i = 0; i < objArr.length; i++) {

            }

        }
        else if (type == "Decreasing") {
            let tempObj1;
            let tempObj2;
            for (let i = 0; i < objArr.length; i++) {
            }

            for (let i = 0; i < objArr.length; i++) {
                tempObj1 = objArr[i];

                for (let j = i + 1; j < objArr.length; j++) {
                    if (objArr[j][field] > tempObj1[field]) {

                        tempObj2 = objArr[j];
                        objArr[i] = tempObj2
                        objArr[j] = tempObj1;
                        tempObj1 = tempObj2;
                    }
                }
            }

            for (let i = 0; i < objArr.length; i++) {

            }
        }

        showTable();
    }
    //----------------------------------------------------------------
    function showTable() {
        a = 0, b = 1000, c = 100000, d = 10000000;
        var table = document.getElementById("myTable");
        var temp = objArr.length;

        if (table.rows.length > objArr.length)
            for (let i = objArr.length; i > 0; --i) {
                {

                    table.deleteRow(i);

                }
            }

        for (let i = objArr.length - 1; i >= 0; i--) {
            var table = document.getElementById("myTable");
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML =
                "Name of the Tour: " + objArr[i].id + "<br />" + "<br />" +
                "Departure Date: " + objArr[i].start_date + "<br />" + "<br />" +
                "Duration: " + objArr[i].duration + "<br />" + "<br />" +
                "Price: " + objArr[i].price;
            cell2.innerHTML =
                "<button class= details id=" + a + ">Deleting the trip </button>" + "<br />" +
                "<button class= details id=" + b + ">Details of the guide </button>" + "<br />" +
                "<button class= details id=" + c + ">View the track </button>" + "<br />" +
                "<button class= details id=" + d + ">Editing the trip details </button>" + "<br />";
            indexOfRowTable++;
            pressedId = $(this).attr('id');
            deleteTrip(a, i);
            DetailsOfTheGuide(b, i);
            trackView(c, i);
            update(d, i);
            a++;
            b++;
            c++;
            d++;
        }
        if (objArr.length == 0) {
            $('#myTable').hide();
        }

        $('#myTable').show();
        // flag = true;

    }
    //-----------------------------------------------------------
    function DetailsOfTheGuide(id_s, nameId) {
        $('#myTable2').hide();
        if ($("#" + id_s).click(function () {
            var table = document.getElementById("myTable2");
            if (table.rows.length > 0) {
                table.rows[0].deleteCell(0);
                table.deleteRow(0);
            }
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);


            cell1.innerHTML =
                "name: " + objArr[nameId].guide.name + "<br />" + "<br />" +
                "email: " + objArr[nameId].guide.email + "<br />" + "<br />" +
                "cellular: " + objArr[nameId].guide.cellular + "<br />" + "<br />";
            $('#myTable2').replaceWith(table);
            $('#myTable2').show();

        }

        ));

    }
    //----------------------------------------------------------------

    function trackTable(id_s, nameId) {
        // $('#myTable2').show();

        let buttons = [];
        let counters = [];



        var table = document.getElementById("myTable2");

        if (table.rows.length > 0) {
            table.rows[0].deleteCell(0);
            table.deleteRow(0);
        }
        let row = table.insertRow(0);
        let cell1 = row.insertCell(0);

        let countIndex = 0;

        let counter = 0;

        cell1.innerHTML = "<button class= details id=" + id_s + ">Add location </button>" + "<br />"

        let delete_all_id = "delete_all_id";
        // max = objArr[nameId].path.length;
        while (objArr[nameId].path[countIndex] !== undefined) {
            let button = "button" + counter;
            cell1.innerHTML +=
                "name: " + objArr[nameId].path[countIndex].name + "," + "  country: " + objArr[nameId].path[countIndex].country
                +
                "<button class= delete id=" + button + ">Delete location </button>" + "<br />";
            if (objArr[nameId].path[countIndex + 1] == undefined) {
                cell1.innerHTML += "<button class= details id=" + delete_all_id + ">Detete path </button>" + "<br />"
            }
            buttons[counter] = button;
            counters[counter] = counter;
            countIndex++;

            deleteT(buttons, counters, nameId);
            counter++;


        }
        DeletePath(nameId, delete_all_id);

        // click on the add location
        $("#" + id_s).click(() => {

            let path = '/add_location/id?id=' + objArr[nameId].id;
            window.location.replace(path);
            $.ajax();
        });
        return;
        // $('#myTable2').replaceWith(table);
    }
    function DeletePath(nameID, delete_all_id) {
        tempIndex = objArr[nameID].id;
        let tempUrl = '/Server_Error_Handling_and_implementation/' + tempIndex;
        let body = JSON.stringify({ "delete": true });

        if ($("#" + delete_all_id).click(function () {
            $.ajax({
                type: 'DELETE',
                url: tempUrl,
                traditional: true,
                contentType: 'application/json',
                data: body,
                success: function () {

                },
                error: function () {
                    alert("Cannot access to JSON");
                }
            });
            window.location.replace('/main');
        }));
    }


    //----------------------------------------------------------------
    function trackView(id_s, nameId) {
        $('#myTable2').hide();
        if ($("#" + id_s).click(function () {
            $('#myTable2').show();
            trackTable(id_s, nameId)
        }
        ));


    }
    // --------------------------------------------------------------------------
    function deleteTrip(id_s, index) {
        $('#myTable2').hide();
        tempIndex = objArr[index].id;
        let tempUrl = '/Server_Error_Handling_and_implementation/' + tempIndex;


        if ($("#" + id_s).click(function () {

            $.ajax({
                type: 'DELETE',
                url: tempUrl,
                traditional: true,
                success: function () {

                },
                error: function () {
                    alert("Cannot access to JSON");
                }
            });
            window.location.replace('/main');
        }));
    }
    function deleteT(arrButtons, arrCounter, nameId) {
        let index;
        // let tempUrl = '/users/' + tempIndex;
        for (let i = 0; i < arrButtons.length; i++) {

            let id_s = arrButtons[i];
            if ($("#" + id_s).click(function () {
                index = arrCounter[i]
                let tempIndex = objArr[nameId].path[index];


                tempIndex = JSON.stringify(tempIndex);
                let tempUrl = '/Server_Error_Handling_and_implementation/' + objArr[nameId].id;


                $.ajax({
                    type: 'DELETE',
                    url: tempUrl,
                    traditional: true,
                    contentType: 'application/json',
                    data: tempIndex,
                    success: function () {

                        location.reload();
                        // trackTable(id_button_track_view, nameId);
                        // location.reload();
                    },
                    error: function () {
                        alert("Cannot access to JSON");
                    }
                });
            }));
        };
    }
    function update(id_s, index) {
        $('#myTable2').hide();
        tempIndex = objArr[index].id;
        let tempUrl = '/Server_Error_Handling_and_implementation/' + tempIndex;



        if ($("#" + id_s).click(function () {

            window.location.replace('/update_tour/id?id=' + objArr[index].id);
        }));
    }
});