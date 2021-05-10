let keys = [];
let obj = {};
let idHystory = [];
let saveKey;
let indexOfRowTable = 0;
let i = 0;
let objArr = [];
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
        // console.log("result:")
        // console.log(objArr);
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
                // console.log(res);
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

        // console.log(' array : ', objArr.length)
        if (type == "Increasing") {
            let tempObj1;
            let tempObj2;
            // console.log("befor sort:");
            for (let i = 0; i < objArr.length; i++) {
                // console.log(i + ": " + objArr[i][field]);
            }
            // להוסיף מקרה קצה שהטבלה קטנה מ-2

            for (let i = 0; i < objArr.length; i++) {
                tempObj1 = objArr[i];
                for (let j = i + 1; j < objArr.length; j++) {
                    if (objArr[j][field] < tempObj1[field]) {
                        // alert(objArr[j][field] + "<" + tempObj1[field]);
                        tempObj2 = objArr[j];
                        objArr[i] = tempObj2
                        objArr[j] = tempObj1;
                        tempObj1 = tempObj2;
                    }
                }
            }
            // console.log("after sort:");
            for (let i = 0; i < objArr.length; i++) {

                // console.log(i + ": " + objArr[i][field]);
            }

        }//end Increasing
        else if (type == "Decreasing") {
            let tempObj1;
            let tempObj2;
            // console.log("befor sort:");
            for (let i = 0; i < objArr.length; i++) {
                // console.log(i + ": " + objArr[i][field]);
            }
            // להוסיף מקרה קצה שהטבלה קטנה מ-2


            for (let i = 0; i < objArr.length; i++) {
                tempObj1 = objArr[i];

                for (let j = i + 1; j < objArr.length; j++) {
                    if (objArr[j][field] > tempObj1[field]) {
                        // alert(objArr[j][field] + ">" + tempObj1[field]);

                        tempObj2 = objArr[j];
                        objArr[i] = tempObj2
                        objArr[j] = tempObj1;
                        tempObj1 = tempObj2;
                        // alert("i: " + i + "+" + "j: " + j)
                        // alert(objArr[0].id + "+" + objArr[1].id + "+" + objArr[2].id + "+" + objArr[3].id);
                    }
                }
            }
            // console.log("after sort:");
            for (let i = 0; i < objArr.length; i++) {

                // console.log(i + ": " + objArr[i][field]);
            }
        }

        showTable();
    }
    //----------------------------------------------------------------
    function showTable() {
        a = 0, b = 1000, c = 100000, d = 10000000;
        var table = document.getElementById("myTable");
        var temp = objArr.length;


        // for (let i = temp; i > 0; i--) {
        //     var x = document.getElementById("myTable");

        //     x.deleteRow(i);
        // }

        if (table.rows.length > objArr.length)
            for (let i = objArr.length; i > 0; --i) {
                {
                    // console.log('te: ', table.rows[i])
                    table.deleteRow(i);

                    // console.log('te: ', table.rows[i])
                }
            }


        // table.deleteRow(0);

        // console.log('length: ', table.rows.length)
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

            countIndex = 0;

            // alert(objArr[nameId].path[countIndex].name);
            // alert(objArr[nameId].path[countIndex].country);

            cell1.innerHTML = "<button class= details id=" + id_s + ">Add location </button>" + "<br />"// id-s??? לבדוק אם
            // cell1.innerHTML = "<button class= details id=" + id_s + ">Add location </button>" + "<br />"
            if (objArr[nameId].path === null) { alert("no") }
            while (objArr[nameId].path[countIndex] !== undefined) {
                cell1.innerHTML +=
                    "name: " + objArr[nameId].path[countIndex].name + "," + "  country: " + objArr[nameId].path[countIndex].country
                    +
                    "<button class= details id=" + id_s + ">Delete location </button>" + "<br />";
                countIndex++;
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