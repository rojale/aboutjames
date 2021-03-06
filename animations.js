$(document).ready(function() {
  $("#englink").hover(
    function() {
      $(this)
        .stop()
        .animate({ backgroundColor: "#3498db" }, 150);
    },
    function() {
      $(this)
        .stop()
        .animate({ backgroundColor: "#2c3e50" }, 150);
    }
  );
  $("#codlink").hover(
    function() {
      $(this)
        .stop()
        .animate({ backgroundColor: "#2ecc71" }, 150);
    },
    function() {
      $(this)
        .stop()
        .animate({ backgroundColor: "#2c3e50" }, 150);
    }
  );
  $("#liftlink").hover(
    function() {
      $(this)
        .stop()
        .animate({ backgroundColor: "#f39c12" }, 150);
    },
    function() {
      $(this)
        .stop()
        .animate({ backgroundColor: "#2c3e50" }, 150);
    }
  );
  $("#engiconwrapper").hover(function() {
    $("#engcloak").fadeTo(300, 1);
    $("#engmorewrapper").fadeTo(1000, 1);
  });
  $("#codiconwrapper").hover(function() {
    $("#codcloak").fadeTo(300, 1);
    $("#codmorewrapper").fadeTo(1000, 1);
  });
  $("#lifticonwrapper").hover(function() {
    $("#liftcloak").fadeTo(300, 1);
  });
  $("#contactbutton").click(function() {
    $("#contactbox").fadeIn(250);
  });
  $("#exitcontact").click(function() {
    $("#contactbox").fadeOut(250);
  });
  $("#imagebutton").click(function() {
    $("#imagebox").fadeIn(250);
  });
  $("#exitcontact2").click(function() {
    $("#imagebox").fadeOut(250);
  });
  $(".morewrapper a").hover(
    function() {
      $(this).animate({ backgroundColor: "#3498dbe" }, 200);
    },
    function() {
      $(this).animate({ backgroundColor: "#2980b9" }, 200);
    }
  );
});
