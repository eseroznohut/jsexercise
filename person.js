"use strict"
class Person {
    Id;
    firstName;
    lastName;
    birthYear;
    gender;
    payment;
    constructor(Id, firstName, lastName, birthYear, gender, payment) {
        this.Id = Id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this.gender = gender;
        this.payment = payment;
    }
}

var App = ({
    personList: [],
    editing: false,
    clientFom: document.getElementById('dom_form'),
    btnCancel: document.getElementById('btnCancel'),
    btnGetPerson: document.getElementById("btnGetPerson"),
    btnSavePerson: document.getElementById("btnSavePerson"),
    btnDeletePerson: document.getElementById("btnDeletePerson"),
    inputEditedPersonId: document.getElementById("inputEditedPersonId"),
    inputPersonId: document.getElementById("inputPersonId"),
    inputFirstName: document.getElementById("inputFirstName"),
    inputLastName: document.getElementById("inputLastName"),
    inputBirthYear: document.getElementById("inputBirthYear"),
    selectGender: document.getElementById("selectGender"),
    inputPayment: document.getElementById("inputPayment"),
    tblPersonData: document.getElementById("tblPersonData").getElementsByTagName('tbody')[0],
    registerEvents: function () {
        btnGetPerson.addEventListener('click', App.crudOperations.read, false),
            btnDeletePerson.addEventListener('click', App.crudOperations.delete, false),
            btnSavePerson.addEventListener('click', App.save, false),
            btnCancel.addEventListener('click', App.cancelEditing, false)
    },
    get person() {
        var newPerson = new Person();
        newPerson.Id = this.personList.length + 1;
        newPerson.firstName = this.inputFirstName.value;
        newPerson.lastName = this.inputLastName.value;
        newPerson.birthYear = this.inputBirthYear.value;
        newPerson.gender = this.selectGender.value;
        newPerson.payment = this.inputPayment.value;
        return newPerson;
    },
    set person(person) {

        inputEditedPersonId.value = new Number(person[0].Id);
        inputFirstName.value = person[0].firstName;
        inputLastName.value = person[0].lastName;
        inputBirthYear.value = person[0].birthYear;
        selectGender.value = person[0].gender;
        inputPayment.value = new Number(person[0].payment);
    },
    checkEditing: () => {
        if (App.editing) {
            App.editing = false;
            App.btnCancel.style.display = 'none';
            App.btnSavePerson.setAttribute("data-statement", "create");
            App.btnSavePerson.innerHTML = 'Kaydet';
        } else {
            App.editing = true;
            App.btnCancel.style.display = 'block';
            App.btnSavePerson.setAttribute("data-statement", "update");
            App.btnSavePerson.innerHTML = 'Güncelle';
        }
        App.resetFormData();
    },
    cancelEditing: () => {
        App.checkEditing();
    },
    resetFormData: () => {
        inputFirstName.focus();
        App.clientFom.reset();
    },
    getInputPersonId: function () {
        console.log(inputPersonId.value);
        if (inputPersonId.value == '') { alert("Bir Id no girmeniz gerekiyor."); return; }
        return inputPersonId.value;
    },
    save: function (e) {
        var statement = e.target.getAttribute('data-statement');
        switch (statement) {
            case 'create': App.crudOperations.create(); break;
            case 'update': App.crudOperations.update(); break;
        }
    },
    addRowtblPersonData: (person) => {
        App.tblPersonData.insertRow().innerHTML = "<td>" + person.Id + "</td><td>" + person.firstName + " " + person.lastName + "</td><td>" + person.birthYear + "</td><td>" + person.gender + "</td><td>" + person.payment + "</td><td><button id='btn-sil-" + person.Id + "' class='btn btn-danger btn-xs' data-id='" + person.Id + "'>X</button></td>";
        document.getElementById("btn-sil-" + person.Id)
            .addEventListener("click", (event) => {
                event.target.parentElement.parentElement.remove();
                var personId = event.target.getAttribute("data-id");
                App.crudOperations.delete(personId);
            });
    },
    crudOperations: {
        create: () => {
            var person = App.person;
            App.personList.push(person);
            App.addRowtblPersonData(person);
            App.resetFormData();
        },
        read: () => {
            if (App.personList.length == 0) {
                alert("Listede hiç kayıt yok.");
                App.resetFormData();
                return;
            }

            var inputPersonId = App.getInputPersonId();

            if (inputPersonId > App.personList.length) {
                alert("Kayıt Bulunamadı.");
                App.resetFormData();
                return;
            }

            var person = App.personList.filter(x => x.Id == inputPersonId);
            App.checkEditing();
            App.person = person;
        },
        update: () => {

        },
        delete: (personId) => {
            var index = App.personList.map(x => {
                return x.Id;
            }).indexOf(personId);
            App.personList.splice(index, 1);
            console.log(App.personList);
        }
    },
    init() {
        this.registerEvents()
    }
});
App.init();
