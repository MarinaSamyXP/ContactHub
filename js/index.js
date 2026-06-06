// ^ HTML Elements

var contactImageInput = document.getElementById("contactImage");
var contactNameInput = document.getElementById("contactName");
var contactPhoneInput = document.getElementById("contactPhone");
var contactEmailInput = document.getElementById("contactEmail");
var contactAddressInput = document.getElementById("contactAddress");
var contactGroupInput = document.getElementById("contactGroup");
var contactNotesInput = document.getElementById("contactNotes");
var contactFavoriteInput = document.getElementById("contactFavorite");
var contactEmergencyInput = document.getElementById("contactEmergency");
var contactSearchInput = document.getElementById("contactSearch");
var contactsContainer = document.getElementById("contactContainer");
var favContactContainer = document.getElementById("favNumber");
var emergencyContactContainer = document.getElementById("emergencyNumber");
var totalCount = document.getElementById("totalCount");
var favCount = document.getElementById("favCount");
var emergencyCount = document.getElementById("emergencyCount");
var totalContacts = document.getElementById("total");

// ^ App Variables
if (localStorage.getItem("contactlist") !== null) {
  var contactList = JSON.parse(localStorage.getItem("contactlist"));
  displayAllContacts();
  displayAllFavContacts();
  displayAllEmergencyContact();
  updateStats();
} else {
  var contactList = [];
}

var updatedIndex = -1;
var nameRegex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
var phoneRegex = /^01[0125][0-9]{8}$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var addressRegex = /^[a-zA-Z0-9\u0600-\u06FF\s,.-]{3,100}$/;
var notesRegex = /^.{3,500}$/;

// ^ Functions()
function addContact() {
  var contact = {
    imageSrc:
      contactImageInput.files.length > 0 ? contactImageInput.files[0].name : "",
    name: contactNameInput.value,
    phone: contactPhoneInput.value,
    email: contactEmailInput.value,
    address: contactAddressInput.value,
    group: contactGroupInput.value,
    notes: contactNotesInput.value,
    favorite: contactFavoriteInput.checked,
    emergency: contactEmergencyInput.checked,
  };
  contactList.push(contact);
  localStorage.setItem("contactlist", JSON.stringify(contactList));
  Swal.fire({
    icon: "success",
    title: "Added!",
    text: "Contact has been added successfully.",
    showConfirmButton: false,
    timer: 1500,
  });
  var modal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal"),
  );
  modal.hide();
  // displayContact(contactList.length - 1);
  displayAllContacts();
  displayAllEmergencyContact();
  displayAllFavContacts();
  updateStats();
}

function displayContact(index) {
  var initials = contactList[index].name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  var contactContainerMarkup = `     <div class="col-12 col-md-6">
                <div class="contact-card rounded-4 bg-white overflow-hidden">
                  <div class="card-header">
                    <div class="d-flex align-items-center gap-3">
                      <div
                        class="letters rounded-3 fw-semibold text-white position-relative d-flex align-items-center justify-content-center rounded-3"
                      >
                      ${initials}
                        <div
                          class="${contactList[index].favorite ? "" : "invisible"} favorite rounded-circle position-absolute d-flex align-items-center justify-content-center"
                        >
                          <i class="text-white fs-11 fa-solid fa-star"></i>
                        </div>
                      <div
                       class="${
                         contactList[index].emergency ? "" : "invisible"
                       } heart-pulse rounded-circle position-absolute d-flex align-items-center justify-content-center"
>
                          <i
                            class="text-white fs-11 fa-solid fa-heart-pulse"
                          ></i>
                        </div>
                      </div>
                      <div class="mt-1">
                        <h3 class="m-0 fs-16 fw-bold">${contactList[index].name}</h3>
                        <div
                          class="m-0 color-g fs-12 fw-medium fs-14 color-g d-flex align-items-center gap-2"
                        >
                          <div
                            class="phone rounded-3 d-flex align-items-center justify-content-center mt-1"
                          >
                            <i class="fa-solid fa-phone"></i>
                          </div>
                          ${contactList[index].phone}
                        </div>
                      </div>
                    </div>
                    <div class="d-flex align-items-center gap-2 mb-2 mt-2">
                      <div
                        class="email rounded-3 d-flex align-items-center justify-content-center mt-1"
                      >
                        <i class="fa-solid fa-envelope"></i>
                      </div>
                      <p class="fs-14 m-0">${contactList[index].email}</p>
                    </div>
                    <div class="d-flex align-items-center gap-2 mb-2 mt-2">
                      <div
                        class="location rounded-3 d-flex align-items-center justify-content-center mt-1"
                      >
                        <i class="fa-solid fa-location-dot"></i>
                      </div>
                      <p class="fs-14 m-0">${contactList[index].address}</p>
                    </div>
                    <div class="d-flex align-items-center gap-2 mb-2 mt-2">
                      <span
                        class="badge rounded-3 fw-medium fs-11 py-1 px-2 fw-semibold"
                        >${contactList[index].group}</span
                      >
                     ${
                       contactList[index].emergency
                         ? `<span class="Emergency rounded-3 fs-11 fw-medium py-1 px-2 fw-semibold">
           Emergency
         </span>`
                         : ""
                     }
                    </div>
                  </div>
                  <div
                    class="card-actions px-3 d-flex align-items-center justify-content-between overflow-hidden"
                  >
                    <div class="right d-flex align-items-center gap-3">
                        <a href="tel:${contactList[index].phone}" 
                        class="phone-action rounded-3 action">
                          <i class="fa-solid fa-phone"></i>
                        </a>
                        <a href="mailto:${contactList[index].email}" 
                        class="envelope-action rounded-3 action">
                         <i class="fa-solid fa-envelope"></i>
                        </a>
                    </div>
                    <div class="left d-flex align-items-center gap-2">
                      <button class="star-action rounded-3 action"
                      onclick="addFavContact(${index})">
                        <i class="${contactList[index].favorite ? "fa-solid text-warning" : "fa-regular"} fa-star fs-16"></i>

                      </button>
                      <button class="heart-action rounded-3 action" onclick="addEmergencyContact(${index})">
                      <i class="${contactList[index].emergency ? "fa-solid fa-heart-pulse text-danger" : "fa-regular fa-heart"}"></i>
                      </button>
                      <button class="edit-action rounded-3 action" onclick=" addDataToInputs(${index})">
                        <i class="fa-solid fa-pen"></i>
                      </button>
                      <button class="delete-action rounded-3 action" onclick="deleteContact(${index})">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;
  contactsContainer.innerHTML += contactContainerMarkup;
}
function displayAllContacts() {
  contactsContainer.innerHTML = "";
  for (var i = 0; i < contactList.length; i++) {
    displayContact(i);
  }
  if (contactList.length > 0) {
    document.getElementById("contactEmptyMessage").classList.add("d-none");
  } else {
    document.getElementById("contactEmptyMessage").classList.remove("d-none");
  }
}
function deleteContact(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn me-3 btn-secondary",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Delete Contact?",
      text: "Are you sure you want to delete this contact? This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "cancel",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        contactList.splice(index, 1);

        localStorage.setItem("contactlist", JSON.stringify(contactList));

        contactsContainer.innerHTML = "";
        displayAllContacts();
        displayAllFavContacts();
        displayAllEmergencyContact();
        updateStats();

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Contact has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
}

function searchContact() {
  var keyWord = contactSearchInput.value;
  contactsContainer.innerHTML = "";
  for (var i = 0; i < contactList.length; i++) {
    if (
      contactList[i].name.toLowerCase().includes(keyWord.toLowerCase()) ||
      contactList[i].email.toLowerCase().includes(keyWord.toLowerCase()) ||
      contactList[i].phone.includes(keyWord)
    ) {
      displayContact(i);
    }
  }
}
function addFavContact(index) {
  contactList[index].favorite = !contactList[index].favorite;
  localStorage.setItem("contactlist", JSON.stringify(contactList));
  contactsContainer.innerHTML = "";
  displayAllContacts();
  displayAllFavContacts();
  updateStats();
}

function displayFavContact(index) {
  var initials = contactList[index].name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  var favContact = ` 
  <div class="col-12 col-md-6 col-lg-12">
  <div
                    class="inner fav-inner rounded-4 d-flex align-items-center  w-100"
                  >
                    <a class="p-2 d-flex gap-3 align-items-center">
                      <div
                        class="letters rounded-3 fw-semibold text-white position-relative d-flex align-items-center justify-content-center rounded-3"
                      >
                       ${initials}
                      </div>
                      <div class="mt-1">
                        <h3 class="m-0 fs-11 fw-semibold name">${contactList[index].name}</h3>
                        <div
                          class="m-0 color-g fs-10 fw-medium color-g d-flex align-items-center gap-2"
                        >
                          <div
                            class="phone rounded-3 d-flex align-items-center justify-content-center "
                          >  ${contactList[index].phone}</div>
                       
                        </div>
                      </div>
                    </a>
                    <div class="phone-action rounded-3 action ms-auto me-2">
                      <a href="tel:${contactList[index].phone}">
                        <i class="fa-solid fa-phone"></i>
                      </a>
                    </div>
                  </div>
                  </div>`;
  favContactContainer.innerHTML += favContact;
}
function displayAllFavContacts() {
  favContactContainer.innerHTML = "";
  var hasFav = false;
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].favorite) {
      hasFav = true;
      displayFavContact(i);
    }
  }
  if (hasFav) {
    document.getElementById("favEmptyMessage").classList.add("d-none");
  } else {
    document.getElementById("favEmptyMessage").classList.remove("d-none");
  }
}

function addEmergencyContact(index) {
  contactList[index].emergency = !contactList[index].emergency;
  localStorage.setItem("contactlist", JSON.stringify(contactList));
  contactsContainer.innerHTML = "";
  displayAllContacts();
  displayAllEmergencyContact();
  updateStats();
}

function displayEmergencyContact(index) {
  var initials = contactList[index].name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  var emergencyContact = `   <div class="col-12 col-md-6 col-lg-12">
                      <div
                        class="inner emergecy-inner rounded-4 d-flex align-items-center justify-content-between"
                      >
                        <a class="p-2 d-flex gap-3 align-items-center">
                          <div
                            class="letters rounded-3 fw-semibold text-white position-relative d-flex align-items-center justify-content-center rounded-3"
                          >
                           ${initials}
                          </div>
                          <div class="mt-1">
                            <h3 class="m-0 fs-11 fw-semibold name">${contactList[index].name}</h3>
                            <div
                              class="m-0 color-g fs-10 fw-medium color-g d-flex align-items-center gap-2"
                            >
                              <div
                                class="phone rounded-3 d-flex align-items-center justify-content-center"
                              >
                               ${contactList[index].phone}
                              </div>
                            </div>
                          </div>
                        </a>
                        <div
                          class="emergecy-call rounded-3 action ms-auto me-2"
                        >
                          <a href="tel:${contactList[index].phone}">
                            <i class="fa-solid fa-phone fs-12"></i>
                          </a>
                        </div>
                      </div>
                    </div>`;
  emergencyContactContainer.innerHTML += emergencyContact;
}
function displayAllEmergencyContact() {
  emergencyContactContainer.innerHTML = "";
  var hasEmergency = false;
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].emergency) {
      hasEmergency = true;
      displayEmergencyContact(i);
    }
  }
  if (hasEmergency) {
    document.getElementById("emergencyEmptyMessage").classList.add("d-none");
  } else {
    document.getElementById("emergencyEmptyMessage").classList.remove("d-none");
  }
}
function updateStats() {
  var total = contactList.length;
  var favorites = 0;
  var emergency = 0;
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].favorite) {
      favorites++;
    }
    if (contactList[i].emergency) {
      emergency++;
    }
  }
  totalCount.innerHTML = total;
  totalContacts.innerHTML = total;
  favCount.innerHTML = favorites;
  emergencyCount.innerHTML = emergency;
}
function addDataToInputs(index) {
  updatedIndex = index;
  contactNameInput.value = contactList[index].name;
  contactPhoneInput.value = contactList[index].phone;
  contactEmailInput.value = contactList[index].email;
  contactAddressInput.value = contactList[index].address;
  contactGroupInput.value = contactList[index].group;
  contactNotesInput.value = contactList[index].notes;
  contactFavoriteInput.checked = contactList[index].favorite;
  contactEmergencyInput.checked = contactList[index].emergency;

  var modal = document.getElementById("exampleModal");
  var myModal = bootstrap.Modal.getOrCreateInstance(modal);
  myModal.show();
}

function updateContact() {
  contactList[updatedIndex].name = contactNameInput.value;
  contactList[updatedIndex].phone = contactPhoneInput.value;
  contactList[updatedIndex].email = contactEmailInput.value;
  contactList[updatedIndex].address = contactAddressInput.value;
  contactList[updatedIndex].group = contactGroupInput.value;
  contactList[updatedIndex].notes = contactNotesInput.value;
  contactList[updatedIndex].favorite = contactFavoriteInput.checked;
  contactList[updatedIndex].emergency = contactEmergencyInput.checked;
  localStorage.setItem("contactlist", JSON.stringify(contactList));
  displayAllContacts();
  displayAllFavContacts();
  displayAllEmergencyContact();
  updateStats();
  var modal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal"),
  );
  modal.hide();
  Swal.fire({
    icon: "success",
    title: "Updated!",
    text: "Contact has been updated successfully.",
    showConfirmButton: false,
    timer: 1500,
  });
}
function saveContact() {
  if (updatedIndex == -1) {
    addContact();
  } else {
    updateContact();
    updatedIndex = -1;
  }
}
function validateContactNume() {
  if (nameRegex.test(contactNameInput.value)) {
    contactNameInput.nextElementSibling.classList.add("invisible");
  } else {
    contactNameInput.nextElementSibling.classList.remove("invisible");
  }
}
function validateContactphone() {
  if (phoneRegex.test(contactPhoneInput.value)) {
    contactPhoneInput.nextElementSibling.classList.add("invisible");
  } else {
    contactPhoneInput.nextElementSibling.classList.remove("invisible");
  }
}
function validateContactEmail() {
  if (emailRegex.test(contactEmailInput.value)) {
    contactEmailInput.nextElementSibling.classList.add("invisible");
  } else {
    contactEmailInput.nextElementSibling.classList.remove("invisible");
  }
}
