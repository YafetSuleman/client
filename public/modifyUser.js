const params = new URLSearchParams(window.location.search);
const id = params.get("id");

$.getJSON({ url: `./api/user/${id}`, dataType: "json", success: fillForm });

function fillForm(user) {
    $("#spanId").html(id);
    $("#spanDate").html(user.created_at);

    $("input:not([type=submit])").each((_i, el) => {
        el.setAttribute("placeholder", user[el.id]);
        el.setAttribute("value", user[el.id]);
    });
}

/**
 * @param {Event} event
 */
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const jsonFormData = Object.fromEntries(formData.entries());
    fetch(`./api/modifyUser/${id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(jsonFormData),
    });

    window.location.reload();
}
