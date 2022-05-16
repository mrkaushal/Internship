$(document).ready(function(){
    $("form").submit(function (e) {
        e.preventDefault();
        var file = $("input[name='file']").val();
        var document = $("select[name='document']").val();
        var comment = tinyMCE.activeEditor.getBody().textContent;
        var half = comment.slice(0,20);
        var half2 = comment.slice(20);
        if (file != "" && document != "" && comment != "") {
            $(".data-table tbody").append(`<tr data-document="${document}" data-comment="${comment}">
                <td>${document}</td>
                <td><span class="collapsed">
                    ${half}
                <a href="javascript:void(0);"> READ MORE>></a>
                </span>
                <span class="expanded">
                    ${half}${half2}
                <a href="javascript:void(0);">READ LESS<<</a>
                </span>
                </td>
                <td>
                    <a href="${file}" download><button class='btn-download btn btn-warning' >Download</button></a>
                    <button class='btn-delete btn btn-danger'>Delete</button>
                </td>
            </tr>`);

            $("input[name='file']").val('');
            $("select[name='document']").val('0');
            tinymce.get("basic-example").setContent("");

            $(".expanded").hide();

        } else {
            alert("Please fill all the fields");
        }
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