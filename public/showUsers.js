const usersPerPage = 15;
let nrOfPages;
let currentPage;

function getUsers() {
    return $.getJSON({ url: "./api/users", dataType: "json" });
}

const users = getUsers();

function postUsers(users) {
    nrOfPages = Math.ceil(users.length / usersPerPage);
    currentPage = currentPage ?? 0;
    const usersToShow = users.filter((_i, index) => {
        return (
            index > currentPage * usersPerPage &&
            index < (currentPage + 1) * usersPerPage
        );
    });

    $.each(usersToShow, (_i, user) => {
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
postUsers(users);

function modifyUser(id) {
    window.location.href = `./modifyUser.html?id=${id}`;
}

function deleteUser(id) {
    fetch(`./api/deleteUser/${id}`, {
        method: "DELETE",
    });

    window.location.reload();
}

function handlePage() {
    console.log(this);
}
