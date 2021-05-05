let arr = [];
let tempIndex;
let IdsTourArr = [];
let pricesArr = [];
let StartDateArr = [];
let durationsArr = [];
let i = 0;

function backToMain() {
    window.location.replace('/main');
}

$(document).ready(function () {
    $.ajax({
        url: "/users",
        type: 'get',
        success: function (result) {
            const test = { a: 1, b: 2, c: 3 };
            let i = 0;
            for (const [key, value] of Object.entries(result)) {
                arr[i] = key;
                i++;
            }
            dataTrip(result);
            // להוסיף סטטוס
        },
        error: function (err) {
            console.log("err", err);
            // להוסיף סטטוס
        }
    });

    $("button").click(function () {
        window.location.replace('/add_user');
    });
    // -----------------------------------------------------------------------
    function dataTrip(res) {

        var pressedId;
        for (let i = 0, a = 0, b = 1000, c = 100000, d = 10000000; i < arr.length; i++, a++, b++, c++, d++) {

            var table = document.getElementById("myTable");
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            let nameId = arr[i];

            cell1.innerHTML =
                "id: " + res[nameId].id + "<br />" + "<br />" +
                "start_date: " + res[nameId].start_date + "<br />" + "<br />" +
                "duration: " + res[nameId].duration + "<br />" + "<br />" +
                "price: " + res[nameId].price + ".  ";
            cell2.innerHTML =
                "<button class= details id=" + a + ">Deleting the trip </button>" + "<br />" +
                "<button class= details id=" + b + ">Details of the guide </button>" + "<br />" +
                "<button class= details id=" + c + ">View the track </button>" + "<br />" +
                "<button class= details id=" + d + ">Editing the trip details </button>" + "<br />";
            pressedId = $(this).attr('id');
            tempIndex = arr[i];
            deleteTrip(a);
            DetailsOfTheGuide(b, res, nameId);
            trackView(c, res, nameId);
        }
    }
    function trackView(id_s, res, nameId) {
        let d = 'idd';
        if ($("#" + id_s).click(function () {
            $('#myTable2').show();
            var table = document.getElementById("myTable2");
            if (table.rows.length > 0) {
                table.rows[0].deleteCell(0);
                table.deleteRow(0);
            }
            let row = table.insertRow(0);
            let cell1 = row.insertCell(0);
            // alert(nameId);
            countIndex = 0;
            cell1.innerHTML = "<button class= details id=" + id_s + ">Add location </button>" + "<br />"// id-s??? לבדוק אם
            while (res[nameId].path[countIndex] !== undefined) {
                cell1.innerHTML +=
                    "name: " + res[nameId].path[countIndex].name + "," + "  country: " + res[nameId].path[countIndex].country + "<br />" + "<br />";
                countIndex++;
            }
            $("#" + id_s).click(() => {
                window.location.replace('/add_location');
                $.ajax();
            });
            // $('#myTable2').replaceWith(table);
        }
        ));
    }
    // --------------------------------------------------------------------------
    function DetailsOfTheGuide(id_s, res, nameId) {

        if ($("#" + id_s).click(function () {
            $('#myTable2').show();

            var table = document.getElementById("myTable2");
            console.log('test', table.rows.length)
            if (table.rows.length > 0) {

                table.rows[0].deleteCell(0);
                table.deleteRow(0);

            }
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);

            // alert(nameId);
            cell1.innerHTML =
                "name: " + res[nameId].guide.name + "<br />" + "<br />" +
                "email: " + res[nameId].guide.email + "<br />" + "<br />" +
                "duration: " + res[nameId].guide.cellular + "<br />" + "<br />";
            $('#myTable2').replaceWith(table);
        }
        ));
    }
    // -------------------------------------------------------------
    function deleteTrip(id_s) {

        tempIndex = '/users/' + tempIndex;
        let tempUrl = tempIndex;

        if ($("#" + id_s).click(function () {

            $(document).ready(function () {
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
            });
        }));
    }
});
//--------------------------------------------------------
function sorting(arrSort, type, parameter) {
    let resultSort = [];
    let temp;
    for (let i = 0; i < arrSort.length; i++) {
        temp = arrSort[i];
        for (let j = 0; j < arrSort.length; j++) {
            if (arrSort[j] < temp)
                temp = arrSort[j];
        }
        resultSort[i] = temp;
    }
}
