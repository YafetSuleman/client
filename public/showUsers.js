function getUsers() {
    const nrUsers = $("#nrUsers").val();
    const pageNr = $("#pageNr").val();
    $.getJSON({
        url: `./api/users/?size=${nrUsers}&page=${pageNr}`,
        dataType: "json",
        success: (data) => {
            $("#pageNr").attr("max", `${data.maxPage}`);
            postUsers(data);
        },
    });
}

function postUsers(response) {
    $("#tableBody").empty();
    $.each(response.users, (_i, user) => {
        $("#tableBody:last-child").append(
            $("<tr>"),
            $("<td>").text(user.id),
            $("<td>").text(user.email),
            $("<td>").text(user.first),
            $("<td>").text(user.last),
            $("<td>").text(user.company),
            $("<td>").text(user.created_at),
            $("<td>").text(user.country),
            $(`<button onclick=modifyUser(${user.id})>`).text("Modify user"),
            $(`<button onclick=deleteUser(${user.id})>`).text("Delete user")
        );
    });
}

/**
 * @param {Number|HTMLInputElement} changeOption
 */
function handlePageChange(changeOption) {
    if (!validPageOptionsHandler()) return;
    $("#pageNr").val((_i, oldPage) => {
        switch (changeOption) {
            case 1:
                return Number($("#pageNr").attr("min"));
            case 2:
                return oldPage > Number($("#pageNr").attr("min"))
                    ? --oldPage
                    : oldPage;
            case 3:
                return oldPage < Number($("#pageNr").attr("max"))
                    ? ++oldPage
                    : oldPage;
            case 4:
                return Number($("#pageNr").attr("max"));
            default: //Manually input page number
                return changeOption.value;
        }
    });

    getUsers();
}

function handlePageSizeChange() {
    if (!validPageOptionsHandler()) return;
    $("#pageNr").val(1);
    getUsers();
}

/**
 * @returns {boolean}
 */
function validPageOptionsHandler() {
    /* This function returns true if both nr of users and
    page nr is valid, and handles error messages for both
    fields */
    let pageNrValid = 1;
    let nrUsersValid = 1;

    // Page nr check
    if (
        $("#pageNr").val() < Number($("#pageNr").attr("min")) ||
        $("#pageNr").val() > Number($("#pageNr").attr("max"))
    ) {
        //Error message if ouf of bounds
        $("#pageNrError").text(
            `Page must be between ${$("#pageNr").attr("min")} and ${$(
                "#pageNr"
            ).attr("max")}`
        );
        pageNrValid = 0;
    } else {
        //Remove error message if in bounds
        $("#pageNrError").text("");
    }

    // Nr of users check
    if (
        $("#nrUsers").val() < Number($("#nrUsers").attr("min")) ||
        $("#nrUsers").val() > Number($("#nrUsers").attr("max"))
    ) {
        //Error message if ouf of bounds
        $("#nrUsersError").text(
            `Number of users shown must be between ${$("#nrUsers").attr(
                "min"
            )} and ${$("#nrUsers").attr("max")}`
        );
        nrUsersValid = 0;
    } else {
        //Remove error message if in bounds
        $("#nrUsersError").text("");
    }

    return pageNrValid && nrUsersValid;
}

function modifyUser(id) {
    window.location.href = `./modifyUser.html?id=${id}`;
}

function deleteUser(id) {
    fetch(`./api/deleteUser/${id}`, {
        method: "DELETE",
    });

    window.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    getUsers();
});
