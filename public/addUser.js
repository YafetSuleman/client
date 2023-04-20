/**
 * @param {Event} event
 */
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const jsonFormData = Object.fromEntries(formData.entries());
    console.log(jsonFormData);
    fetch("./api/addUser", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(jsonFormData),
    });

    window.location.reload();
}
