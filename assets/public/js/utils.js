var lastOpenedModalId = null;

function toggleElement(element, action) {

    var id = "#" + element;
    var element = document.querySelector(id);

    if(lastOpenedModalId) {
        // Close previously opened modal
        document.querySelector(lastOpenedModalId).attributes.state.value = "closed";
    }

    if(action == "open" && element.attributes.state.value != "open") {
        // Open element
        element.attributes.state.value = "open";
        lastOpenedModalId = id;
    } else if (action == "close" && element.attributes.state.value != "closed") {
        // Close element
        element.attributes.state.value = "closed";
        lastOpenedModalId = null;
    }
}