import $ from "jquery";

const USERS_URL = "http://localhost:8080/users";

function onEnterNext(eventListenerId, nextInputId, callback) {
  $(eventListenerId).on('keydown', function (event) {
    if (event.key == 'Enter') {
      if (callback) {
        callback();
      }
      $(nextInputId).trigger('focus');
      event.preventDefault();
      return false;
    }
  });
}

$(function () {
  onEnterNext("#username", "#firstname");
  onEnterNext("#firstname", "#lastname");
  onEnterNext("#lastname", "#username", neuenBenutzerAnlegen);
  $("#save").on('click', neuenBenutzerAnlegen);
  reloadList();
});

function neuenBenutzerAnlegen() {
  let benutzer = {};
  benutzer.username = $("#username").val();
  benutzer.firstname = $("#firstname").val();
  benutzer.lastname = $("#lastname").val();

  $.ajax(USERS_URL, {
    data: JSON.stringify(benutzer),
    contentType: 'application/json',
    type: 'POST',
    success: function () {
      reloadList();
      $("#username").val("").trigger('focus');
      $("#firstname").val("");
      $("#lastname").val("");
    },
    error: function(jqXHR) {
      alert("FEHLER:\n" + jqXHR.responseText);
    }
  });
}

function benutzerLoeschen(id) {
  $.ajax(USERS_URL + "/" + id, {
    type: 'DELETE',
    success: function () {
      reloadList();
    },
    error: function(jqXHR) {
      alert(jqXHR.responseText);
    }
  });
}

function reloadList() {
  $.ajax({
    dataType: "json",
    url: USERS_URL,
    success: function (data) {
      $("#benutzerliste tbody").empty();
      let users = data;
      for (let idx in users) {
        let benutzer = users[idx];
        $("#benutzerliste tbody").append("<tr>"
          + "<td>"
          + benutzer.username
          + "</td>"
          + "<td>"
          + benutzer.firstname
          + "</td>"
          + "<td>"
          + benutzer.lastname
          + "</td>"
          + "<td><button class=\"btn btn-danger\" id=\"delete"+ benutzer.id + "\">Löschen</button></td>"
          + "</tr>");
        $("#delete"+benutzer.id).on('click', () => benutzerLoeschen(benutzer.id));
      }
    }
  });
}