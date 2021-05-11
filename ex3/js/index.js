let keys = [];
let obj = {};
let idHystory = [];
let saveKey;
let indexOfRowTable = 0;
let i = 0;
let objArr = [];
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
    $('#myTable2').hide();
    $('#myTable').hide();
    $.ajax({
        url: "/users",
        type: 'get',
        success: function (result) {

            for (const [key, value] of Object.entries(result)) {
                saveKey = key;
                keys[i] = saveKey;
                i++;
            }
            createObjectsArray(result);
            dataTrip();
            // alert(i);
            // להוסיף סטטוס
        },
        error: function (err) {
            console.log("err", err);
            // להוסיף סטטוס
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
                "id: " + objArr[i].id + "<br />" + "<br />" +
                "start_date: " + objArr[i].start_date + "<br />" + "<br />" +
                "duration: " + objArr[i].duration + "<br />" + "<br />" +
                "price: " + objArr[i].price;
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

        if ($("#" + id_s).click(function () {
            var table = document.getElementById("myTable2");
            if (table.rows.length > 0) {
                table.rows[0].deleteCell(0);
                table.deleteRow(0);
            }
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);

            // alert(nameId);
            cell1.innerHTML =
                "name: " + objArr[nameId].guide.name + "<br />" + "<br />" +
                "email: " + objArr[nameId].guide.email + "<br />" + "<br />" +
                "duration: " + objArr[nameId].guide.cellular + "<br />" + "<br />";
            $('#myTable2').replaceWith(table);
            $('#myTable2').show();

        }
        ));
    }
    //----------------------------------------------------------------
    function trackView(id_s, nameId) {

        if ($("#" + id_s).click(function () {
            // $('#myTable2').show();
            var table = document.getElementById("myTable2");
            // alert("table.rows.length: " + table.rows.length);
            if (table.rows.length > 0) {
                table.rows[0].deleteCell(0);
                table.deleteRow(0);
            }
            let row = table.insertRow(0);
            let cell1 = row.insertCell(0);

            let countIndex = 0;

            let counter = 0;

            cell1.innerHTML = "<button class= details id=" + id_s + ">Add location </button>" + "<br />"
            if (objArr[nameId].path === null) { alert("no") }

            let buttons = [];
            let counters = [];
            // max = objArr[nameId].path.length;
            while (objArr[nameId].path[countIndex] !== undefined) {
                let button = "button" + counter;
                cell1.innerHTML +=
                    "name: " + objArr[nameId].path[countIndex].name + "," + "  country: " + objArr[nameId].path[countIndex].country
                    +
                    "<button class= details id=" + button + ">Delete location </button>" + "<br />";
                buttons[counter] = button;
                counters[counter] = counter;
                // if ((countIndex + 1) == max) { break; }
                countIndex++;
                deleteT(buttons, counters, nameId);
                counter++;

            }
            $("#" + id_s).click(() => {

                let path = '/add_location/id?id=' + objArr[nameId].id;
                window.location.replace(path);
                $.ajax();
            });
            // $('#myTable2').replaceWith(table);
        }
        ));
        $('#myTable2').show();
    }
    // --------------------------------------------------------------------------
    function deleteTrip(id_s, index) {
        tempIndex = objArr[index].id;
        let tempUrl = '/users/' + tempIndex;

        if ($("#" + id_s).click(function () {
            // alert(tempUrl);

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
                console.log(tempIndex);

                tempIndex = JSON.stringify(tempIndex);
                let tempUrl = '/users/' + objArr[nameId].id;
                alert(tempUrl);
                $.ajax({
                    type: 'DELETE',
                    url: tempUrl,
                    traditional: true,
                    contentType: 'application/json',
                    data: tempIndex,
                    success: function () {
                        location.reload();
                    },
                    error: function () {
                        alert("Cannot access to JSON");
                    }
                });
                // max--;
            }));
        }
        // if ($("#" + id_s).click(function () {
        //     // alert(tempUrl);

        // }));


    }
    function update(id_s, index) {

        tempIndex = objArr[index].id;
        let tempUrl = '/users/' + tempIndex;
        // alert(objArr[index].id);


        if ($("#" + id_s).click(function () {
            // alert(tempUrl);
            // alert(id_s);

            window.location.replace('/update_tour/id?id=' + objArr[index].id);
        }));
    }
});