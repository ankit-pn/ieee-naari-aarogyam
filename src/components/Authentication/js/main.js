/*global jQuery*/
/*  eslint no-undef: "off" */
// import $ from "jquery";

{/* <script src="jquery.min.js"></script> */}
(function ($) {
  "use strict";

  $(".toggle-password").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
})(jQuery);
