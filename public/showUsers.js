function getUsers() {
    console.log("jag körs");
    const nrUsers = $("#nrUsers").val();
    const pageNr = $("#pageNr").val();
    $.getJSON({
        url: `./api/users/?size=${nrUsers}&page=${pageNr}`,
        dataType: "json",
        success: (data) => {
            postUsers(data);
        },
    });
}

function postUsers(users) {
    $.each(users, (_i, user) => {
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
    $("#pageNr").val((_i, oldPage) => {
        switch (changeOption) {
            case 1:
                return 1;
            case 2:
                return oldPage > 1 ? --oldPage : oldPage;
            case 3:
                return ++oldPage;
            case 4:
                return 100;
            default: //Manually input page number
                return changeOption.value;
        }
    });

    getUsers();
}

function handlePageSizeChange() {
    $("#pageNr").val(1);
    getUsers();
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
