function Profile(details) {
    this.firstName          = details.firstName;
    this.lastName           = details.lastName;
    this.birth              = details.birth;
    this.instruments        = details.instruments;
    this.description        = details.description;
}

function checkPasswordSimilarity() {

    document.querySelector("#signUpMessage").innerHTML = document.querySelector("#signUpPassword").value != document.querySelector("#signUpConfirmPassword").value ? "Passwords don't match." : "";

}