$(document).ready(function () {
    var id = 0;

    $("form").submit(function (e) {
        e.preventDefault();
        var name = $("input[name='name']").val();
        var title = $("input[name='title']").val();

        $(".data-table tbody").append(`<tr data-no="R${++id}" data-name="${name}" data-title="${title}">
		<td class="row-index"><p>${id}</p></td>
		<td>${name}</td>
		<td>${title}</td>
		<td>
            <button type="button" class="btn-edit btn btn-outline-info">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
                </svg>
                Edit
            </button>
            <button type="button" class="btn-delete btn btn-outline-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                Delete
            </button>
		</td>
	</tr>`);

        $("input[name='name']").val('');
        $("input[name='title']").val('');
    });

    $("body").on("click", ".btn-delete", function () {
        if (confirm("Are you sure you want to delete") == true) {
            var child = $(this).closest('tr').nextAll();
            child.each(function () {
                var id = $(this).attr('data-no');
                var idx = $(this).children('.row-index').children('p');
                var dig = parseInt(id.substring(1));
                idx.html(`${dig - 1}`);
                $(this).attr('data-no', `R${dig - 1}`);
            });
            $(this).closest('tr').remove();
            id--;
            alert("Deleted");
        }else{
            alert("Cancelled");
        }
    });

    $("body").on("click", ".btn-edit", function () {
        var name = $(this).parents("tr").attr('data-name');
        var title = $(this).parents("tr").attr('data-title');

        $(this).parents("tr").find("td:eq(1)").html('<label for="floatingName">Name</label><input class="form-control" id="floatingName" name="edit_name" value="' + name + '">');
        $(this).parents("tr").find("td:eq(2)").html('<label for="floatingTitle">Title</label><input class="form-control" id="floatingTitle" name="edit_title" value="' + title + '">');
        $(this).parents("tr").find("td:eq(3)").prepend(`
        <button type="button" class="btn-update btn btn-outline-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
            </svg>
                Update
        </button>
        <button type="button" class="btn-cancel btn btn-outline-warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
                Cancel
        </button>`)
        $(this).hide();
    });

    $("body").on("click", ".btn-cancel", function () {
        if (confirm("Are you sure you want to cancel") == true) {
            var name = $(this).parents("tr").attr('data-name');
            var title = $(this).parents("tr").attr('data-title');

            $(this).parents("tr").find("td:eq(1)").text(name);
            $(this).parents("tr").find("td:eq(2)").text(title);

            $(this).parents("tr").find(".btn-edit").show();
            $(this).parents("tr").find(".btn-update").remove();
            $(this).parents("tr").find(".btn-cancel").remove();
            alert("Deleted");
        } else {
            alert("Cancelled");
        }
    });

    $("body").on("click", ".btn-update", function () {
        var name = $(this).parents("tr").find("input[name='edit_name']").val();
        var title = $(this).parents("tr").find("input[name='edit_title']").val();

        $(this).parents("tr").find("td:eq(1)").text(name);
        $(this).parents("tr").find("td:eq(2)").text(title);

        $(this).parents("tr").attr('data-name', name);
        $(this).parents("tr").attr('data-title', title);

        $(this).parents("tr").find(".btn-edit").show();
        $(this).parents("tr").find(".btn-cancel").remove();
        $(this).parents("tr").find(".btn-update").remove();
    });
});