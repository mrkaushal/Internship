$(document).ready(function(){
    $("form").submit(function (e) {
        e.preventDefault();
        var email = $("input[name='email']").val();
        var password = $("input[name='password']").val();
        var file = $("input[name='file']").val();
        if (file != "" && email != "" && password != "") {
            $(".data-table tbody").append(`<tr data-email="${email}" data-comment="${password}">
                <td>${email}</td>
                <td>${password}</td>
                <td>${file}</td>
                <td>
                    <button class='btn-download btn btn-warning' >Download</button>
                    <button class='btn-delete btn btn-danger'>Delete</button>
                </td>
            </tr>`);

            $("select[name='email']").val('');
            $("select[name='password']").val('');
            $("input[name='file']").val('');

            $(".expanded").hide();

        } else {
            alert("Please fill all the fields");
        }
    });

    $("tbody").on("click", ".btn-download", function () {
        window.location.href = "C:\\Users\\Kaushal\\OneDrive\\Pictures\\facebook-cover-01.png";
    });

    $("tbody").on("click", ".btn-delete", function () {
        if (confirm("Are you sure want to delete?") == true) {
            $(this).closest('tr').remove();
        } else {
            alert("Record not deleted");
        }
    });

    $("tbody").on("click", ".expanded a, .collapsed a", function () {
        var $container = $(this).parents("td");
        $container.children(".expanded, .collapsed").toggle();
    });
});