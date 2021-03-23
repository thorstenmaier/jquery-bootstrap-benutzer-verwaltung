import $ from "jquery";

const BENUTZERS_URL = "http://localhost:8080/benutzers";

$(function () {
  $("#vorname").on('keydown', function (event) {
    if (event.key == 'Enter') {
      $("#nachname").val("").trigger('focus');
      event.preventDefault();
      return false;
    }
  });

  $("#nachname").on('keydown', function (event) {
    if (event.key == 'Enter') {
      neuenBenutzerAnlegen();
      event.preventDefault();
      return false;
    }
  });

  $("#save").on('click', function (event) {
    neuenBenutzerAnlegen();
  });

  reloadList();
});

function neuenBenutzerAnlegen() {
  let benutzer = {};
  benutzer.vorname = $("#vorname").val();
  benutzer.nachname = $("#nachname").val();

  $.ajax(BENUTZERS_URL, {
    data: JSON.stringify(benutzer),
    contentType: 'application/json',
    type: 'POST',
    success: function () {
      reloadList();
    }
  });

  $("#vorname").val("").trigger('focus');
  $("#nachname").val("");
}

function reloadList() {
  $.ajax({
    dataType: "json",
    url: BENUTZERS_URL,
    success: function (data) {
      $("#benutzerliste tbody").empty();
      let benutzers = data["_embedded"]["benutzers"];
      for (let idx in benutzers) {
        let benutzer = benutzers[idx];
        $("#benutzerliste tbody").append("<tr>"
          + "<td>"
          + benutzer.id
          + "</td>"
          + "<td>"
          + benutzer.vorname
          + "</td>"
          + "<td>"
          + benutzer.nachname
          + "</td>"
          + "<td><button>Löschen</button></td>"
          + "</tr>");
      }
    }
  });
}