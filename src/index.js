import $ from "jquery";

$(function() {
  $("#vorname").keydown(function(event) {
    if (event.which == 13) {
      $("#nachname").val("").focus();
      event.preventDefault();
      return false;
    }
  });

  $("#nachname").keydown(function(event) {
    if (event.which == 13) {
      neuenBenutzerAnlegen();
      event.preventDefault();
      return false;
    }
  });

  $("#save").click(function(event) {
    neuenBenutzerAnlegen();
  });

  console.log("Anwendung wurde gestartet");
});

function neuenBenutzerAnlegen() {
  let benutzer = {};
  benutzer.vorname = $("#vorname").val();
  benutzer.nachname = $("#nachname").val();
  console.log(benutzer);

  $("#vorname").val("").focus();
  $("#nachname").val("");
  
  $("#benutzerliste tbody").append("<tr><td>" + benutzer.vorname + "</td><td>" + benutzer.nachname +"</td></tr>");
}