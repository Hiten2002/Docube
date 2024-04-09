$("#numberError").text("");
$("#captchaError").text("");
$("#enterOTP").text("");
$("#otpError").text("");
$("#loginsubmit").css("display", "none");
$(".otp").css("display", "none");
$("#verifyOTP").css("display", "none");
$("#resendOTP").css("display", "none");
const firebaseConfig = {
    apiKey: "AIzaSyBVS0USwTjIiAhhk0OPkOpJx2ov-kDc73A",
    authDomain: "docube-sarvadhi.firebaseapp.com",
    projectId: "docube-sarvadhi",
    storageBucket: "docube-sarvadhi.appspot.com",
    messagingSenderId: "17981617263",
    appId: "1:17981617263:web:87dfc45e227d38c601c99a",
    measurementId: "G-LGYGS1SWS0",
};
firebase.initializeApp(firebaseConfig);
render();
function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
            callback: function (response) {
                console.log("reCAPTCHA solved");
            },
            "expired-callback": function () {
                console.log("reCAPTCHA expiration");
            },
            timeout: 60000,
        }
    );
    recaptchaVerifier.render();
    var storedPhoneNumber = localStorage.getItem("phoneNumber");
    if (storedPhoneNumber) {
        $("#mybooking").css("display", "flex");
        $("#mybookingres").css("display", "flex");
        setTimeout(() => {
            localStorage.removeItem("phoneNumber");
            $("#mybooking").css("display", "none");
            $("#mybookingres").css("display", "none");
        }, 1 * 60 * 60 * 24 * 7 * 1000);
        return;
    }
}
// function sendOTP() {
//     var inputPhone = $("#formnumber").val();
//     var countryCode = $("#formnumber").intlTelInput(
//         "getSelectedCountryData"
//     ).dialCode;
//     var phoneNumber = "+91" + inputPhone;
//     console.log(phoneNumber);
//     var appVerifier = window.recaptchaVerifier;
//     var response = grecaptcha.getResponse();
//     $("#numberError").text("");
//     $("#captchaError").text("");
//     if (phoneNumber.length < 1 || response.length == 0) {
//         var phoneRegex = /^\+[1-9]{1}[0-9]{11,}$/;
//         if (!phoneRegex.test(phoneNumber)) {
//             $("#numberError").text("Please Enter Valid Phone Number.");
//         }
//         if (phoneNumber.length < 1) {
//             $("#numberError").text("Phone Number Field is Required.");
//         }
//         if (response.length == 0) {
//             $("#captchaError").text("Please verify you are human!");
//         }
//     } else {
//         console.log(phoneNumber);
//         firebase
//             .auth()
//             .signInWithPhoneNumber(phoneNumber, appVerifier)
//             .then(function (confirmationResult) {
//                 window.confirmationResult = confirmationResult;
//                 coderesult = confirmationResult;
//                 console.log("OTP is sent");
//                 $(".otp").css("display", "block");
//                 $("#verifyOTP").css("display", "block");
//                 $("#resendOTP").css("display", "block");
//                 $("#phone-number-wrapper").css("display", "none");
//                 $("#send").css("display", "none");
//             })
//             .catch(function (error) {
//                 console.log(phoneNumber);
//                 console.log("Error sending OTP:", error);
//                 if (error.code === "auth/invalid-phone-number") {
//                     $("#numberError").text("Please Enter Valid Phone Number.");
//                 }
//             });
//     }
// }


function sendOTP() {
  var inputPhone = $("#formnumber").val();
  var countryCode = $("#formnumber").intlTelInput(
      "getSelectedCountryData"
  ).dialCode;
  var phoneNumber = "+91" + inputPhone;
  console.log(phoneNumber);
  var appVerifier = window.recaptchaVerifier;
  var response = grecaptcha.getResponse();
  $("#numberError").text("");
  $("#captchaError").text("");
  
  // Disable button visually
  $(".send-otp-btn").addClass("disabled");
  // Remove click event to prevent multiple clicks
  $(".send-otp-btn").off("click");
  
  if (phoneNumber.length < 1 || response.length == 0) {
      var phoneRegex = /^\+[1-9]{1}[0-9]{11,}$/;
      if (!phoneRegex.test(phoneNumber)) {
          $("#numberError").text("Please Enter Valid Phone Number.");
      }
      if (phoneNumber.length < 1) {
          $("#numberError").text("Phone Number Field is Required.");
      }
      if (response.length == 0) {
          $("#captchaError").text("Please verify you are human!");
      }
      // Re-enable button after validation failure
      $(".send-otp-btn").removeClass("disabled");
      $(".send-otp-btn").on("click", sendOTP);
  } else {
      console.log(phoneNumber);
      firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
              window.confirmationResult = confirmationResult;
              coderesult = confirmationResult;
              console.log("OTP is sent");
              $(".spinner-border").css("display", "inline-block");
              setTimeout(function() {
                  $(".otp").css("display", "block");
                  $("#verifyOTP").css("display", "block");
                  $("#resendOTP").css("display", "block");
                  $("#phone-number-wrapper").css("display", "none");
                  $("#send").css("display", "none");
                  // Re-enable button after 3 seconds
                  $(".send-otp-btn").removeClass("disabled");
                  $(".send-otp-btn").on("click", sendOTP);
              }, 3000); // Display spinner after 3 seconds
          })
          .catch(function (error) {
              console.log(phoneNumber);
              console.log("Error sending OTP:", error);
              if (error.code === "auth/invalid-phone-number") {
                  $("#numberError").text("Please Enter Valid Phone Number.");
              }
              // Re-enable button after error
              $(".send-otp-btn").removeClass("disabled");
              $(".send-otp-btn").on("click", sendOTP);
          });
  }
}






// function sendOTP() {
//   var inputPhone = $("#formnumber").val();
//   var countryCode = $("#formnumber").intlTelInput(
//       "getSelectedCountryData"
//   ).dialCode;
//   var phoneNumber = "+91" + inputPhone;
//   console.log(phoneNumber);
//   var appVerifier = window.recaptchaVerifier;
//   var response = grecaptcha.getResponse();
//   $("#numberError").text("");
//   $("#captchaError").text("");
//   if (phoneNumber.length < 1 || response.length == 0) {
//       var phoneRegex = /^\+[1-9]{1}[0-9]{11,}$/;
//       if (!phoneRegex.test(phoneNumber)) {
//           $("#numberError").text("Please Enter Valid Phone Number.");
//       }
//       if (phoneNumber.length < 1) {
//           $("#numberError").text("Phone Number Field is Required.");
//       }
//       if (response.length == 0) {
//           $("#captchaError").text("Please verify you are human!");
//       }
//   } else {
//       console.log(phoneNumber);
//       firebase
//           .auth()
//           .signInWithPhoneNumber(phoneNumber, appVerifier)
//           .then(function (confirmationResult) {
//               window.confirmationResult = confirmationResult;
//               coderesult = confirmationResult;
//               console.log("OTP is sent");
//               $(".spinner-border").css("display", "inline-block");
//               $(".send-otp-btn").prop("disabled", true);
//               setTimeout(function() {
//                 $(".otp").css("display", "block");
//                 $("#verifyOTP").css("display", "block");
//                 $("#resendOTP").css("display", "block");
//                 $("#phone-number-wrapper").css("display", "none");
//                 $("#send").css("display", "none");
//               }, 3000); // Display spinner after 3 seconds
//           })
//           .catch(function (error) {
//               console.log(phoneNumber);
//               console.log("Error sending OTP:", error);
//               if (error.code === "auth/invalid-phone-number") {
//                   $("#numberError").text("Please Enter Valid Phone Number.");
//               }
//           });
//   }
// }





function codeverify() {
    var code = $("#formotp").val();
    var response = grecaptcha.getResponse();
    $("#captchaError").text("");
    $("#enterOTP").text("");
    $("#otpError").text("");
    var codeRegex = /^\d{6}$/;
    if (code.length == 0 || response.length == 0 || !codeRegex.test(code)) {
        if (code.length == 0) {
            $("#enterOTP").text("Please Enter OTP");
        } else if (!codeRegex.test(code)) {
            $("#otpError").text("Please Enter 6-Digit OTP");
        }
        if (response.length == 0) {
            $("#captchaError").text("Please verify you are human!");
        }
    } else {
        coderesult
            .confirm(code)
            .then(function () {
                $("#otpError").text("");
                $("#loginsubmit").css("display", "flex");
                $("#verifyOTP").css("display", "none");
                $("#resendOTP").css("display", "none");

                $("#sub").click();
            })
            .catch(function (error) {
                console.error("Error occurred:", error);
                $("#loginsubmit").css("display", "none");
                $("#verifyOTP").css("display", "block");
                $("#resendOTP").css("display", "block");
                if (error.code == "auth/invalid-verification-code") {
                    $("#otpError").text("Please Enter Valid OTP");
                }
                if (error.code == "auth/code-expired") {
                    console.log("code-expired");
                }
            });
    }
}

function codeverify() {
  var code = $("#formotp").val();
  var response = grecaptcha.getResponse();
  $("#captchaError").text("");
  $("#enterOTP").text("");
  $("#otpError").text("");
  var codeRegex = /^\d{6}$/;
  
  // Disable the button
  $("#verifyOTP").prop("disabled", true);
  
  if (code.length == 0 || response.length == 0 || !codeRegex.test(code)) {
      if (code.length == 0) {
          $("#enterOTP").text("Please Enter OTP");
      } else if (!codeRegex.test(code)) {
          $("#otpError").text("Please Enter 6-Digit OTP");
      }
      if (response.length == 0) {
          $("#captchaError").text("Please verify you are human!");
      }
      
      // Re-enable the button
      $("#verifyOTP").prop("disabled", false);
  } else {
      coderesult
          .confirm(code)
          .then(function () {
              $("#otpError").text("");
              $("#loginsubmit").css("display", "flex");
              $("#verifyOTP").css("display", "none");
              $("#resendOTP").css("display", "none");
              $("#sub").click();
          })
          .catch(function (error) {
              console.error("Error occurred:", error);
              $("#loginsubmit").css("display", "none");
              $("#verifyOTP").prop("disabled", false); // Re-enable the button

              if (error.code == "auth/invalid-verification-code") {
                  $("#otpError").text("Please Enter Valid OTP");
              }
              if (error.code == "auth/code-expired") {
                  console.log("code-expired");
              }
          });
  }
}


// function ReSendLoginOTP() {
//     var inputPhone = $("#formnumber").val();
//     var countryCode = $("#formnumber").intlTelInput(
//         "getSelectedCountryData"
//     ).dialCode;
//     var phoneNumber = "+" + countryCode + inputPhone;
//     console.log(phoneNumber);
//     var appVerifier = window.recaptchaVerifier;
//     var response = grecaptcha.getResponse();
//     $("#numberError").text("");
//     $(".otp-text-field").val("");
//     $("#captchaError").text("");
//     $(".otp-text-field").prop("disabled", true);
//     $(".otp-text-field").first().prop("disabled", false);
//     if (phoneNumber.length < 1 || response.length == 0) {
//         var phoneRegex = /^\+[1-9]{1}[0-9]{10,}$/;
//         if (phoneNumber.length < 1) {
//             $("#numberError").text("Please Enter Valid Phone Number. phoneRegex");
//         }
//         if (!phoneRegex.test(phoneNumber)) {
//             $("#numberError").text("Phone Number Field is Required.");
//         }
//         if (response.length == 0) {
//             $("#captchaError").text("Please verify you are human!");
//         }
//     } else {
//         firebase
//             .auth()
//             .signInWithPhoneNumber(phoneNumber, appVerifier)
//             .then(function (confirmationResult) {
//                 window.confirmationResult = confirmationResult;
//                 coderesult = confirmationResult;
//                 console.log("OTP is sent");
//                 document.getElementById("formotp").value = "";
//                 $(".otp").css("display", "block");
//                 $("#phone-number-wrapper").css("display", "none");
//                 $("#send").css("display", "none");
//             })
//             .catch(function (error) {
//                 console.log(phoneNumber);
//                 console.log("Error sending OTP:", error);
//                 if (error.code === "auth/invalid-phone-number") {
//                     $("#numberError").text("Please Enter Valid Phone Number.");
//                 }
//             });
//     }
// }

function ReSendLoginOTP() {
    var inputPhone = $("#formnumber").val();
    var countryCode = $("#formnumber").intlTelInput("getSelectedCountryData").dialCode;
    var phoneNumber = "+" + countryCode + inputPhone;
    console.log(phoneNumber);
    var appVerifier = window.recaptchaVerifier;
    var response = grecaptcha.getResponse();
    $("#numberError").text("");
    $(".otp-text-field").val("");
    $("#captchaError").text("");
    $(".otp-text-field").prop("disabled", true);
    $(".otp-text-field").first().prop("disabled", false);
    
    // Display "OTP is sent" message
    $("#otpSentMessage").text("OTP is sent").show();

    if (phoneNumber.length < 1 || response.length == 0) {
        var phoneRegex = /^\+[1-9]{1}[0-9]{10,}$/;
        if (phoneNumber.length < 1) {
            $("#numberError").text("Please Enter Valid Phone Number. phoneRegex");
        }
        if (!phoneRegex.test(phoneNumber)) {
            $("#numberError").text("Phone Number Field is Required.");
        }
        if (response.length == 0) {
            $("#captchaError").text("Please verify you are human!");
        }
    } else {
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                window.confirmationResult = confirmationResult;
                coderesult = confirmationResult;
                console.log("OTP is sent");
                document.getElementById("formotp").value = "";
                $(".otp").css("display", "block");
                $("#phone-number-wrapper").css("display", "none");
                $("#send").css("display", "none");
            })
            .catch(function (error) {
                console.log(phoneNumber);
                console.log("Error sending OTP:", error);
                if (error.code === "auth/invalid-phone-number") {
                    $("#numberError").text("Please Enter Valid Phone Number.");
                }
            });
    }
}

document
    .getElementById("wf-form-Login-Form")
    .addEventListener("submit", function (e) {
        var phoneNumber = $("#formnumber").val();
        var countryCode = $("#formnumber").intlTelInput(
            "getSelectedCountryData"
        ).dialCode;
        var mergedValue = "+" + countryCode + phoneNumber;
        $("#formnumber").val(mergedValue);
        console.log($("#formnumber").val());
        localStorage.setItem("phoneNumber", phoneNumber);
        setTimeout(() => {
            localStorage.removeItem("phoneNumber");
            $("#mybooking").css("display", "none");
            $("#mybookingres").css("display", "none");
        }, 1 * 60 * 60 * 24 * 7 * 1000);
        if (localStorage.getItem("phoneNumber")) {
            $("#mybooking").css("display", "flex");
            $("#mybookingres").css("display", "flex");
        }
    });
$("#formnumber").intlTelInput({
    initialCountry: "in",
    separateDialCode: true,
});

let digitValidate = function (ele) {
    ele.value = ele.value.replace(/[^0-9]/g, "").substring(0, 1);
};
const inputs = document.querySelectorAll(".otp-text-field");
inputs.forEach((input, index1) => {
    input.addEventListener("keyup", (e) => {
        const currentInput = input,
            nextInput = input.nextElementSibling,
            prevInput = input.previousElementSibling;
        if (currentInput.value.length > 1) {
            currentInput.value = "";
            return;
        }
        if (
            nextInput &&
            nextInput.hasAttribute("disabled") &&
            currentInput.value !== ""
        ) {
            nextInput.removeAttribute("disabled");
            nextInput.focus();
        }
        if (e.key === "Backspace") {
            inputs.forEach((input, index2) => {
                if (index1 <= index2 && prevInput) {
                    input.setAttribute("disabled", true);
                    input.value = "";
                    prevInput.focus();
                }
            });
        }
    });
});
window.addEventListener("load", () => inputs[0].focus());
const otp = document.querySelectorAll(".otp-text-field");
otp.forEach((input, index) => {
    input.setAttribute("oninput", "digitValidate(this)");
    input.setAttribute("onkeyup", `tabChanges(event, ${index})`);
});
function tabChanges(event, index) {
    console.log(
        `Tab change event triggered for input field with index: ${index}`
    );
    if (event.key === "Enter" || event.key === "ArrowRight") {
        if (otp[index + 1]) {
            otp[index + 1].focus();
        }
    } else if (event.key === "ArrowLeft") {
        if (otp[index - 1]) {
            otp[index - 1].focus();
        }
    }
}
const combinedInput = document.getElementById("formotp");
otp.forEach((input) => {
    input.addEventListener("input", function () {
        let combinedValue = "";
        otp.forEach((input) => {
            combinedValue += input.value;
        });
        combinedInput.value = combinedValue;
    });
    input.addEventListener("keyup", function (event) {
        if (event.key === "Backspace") {
            const index = Array.from(otp).indexOf(input);
            if (index > 0) {
                otp[index - 1].focus();
            }
        } else if (event.key.length === 1) {
            const index = Array.from(otp).indexOf(input);
            if (index < otp.length - 1) {
                otp[index + 1].focus();
            }
        }
    });
});

// $(document).ready(function () {
//     $('#book-appointment-button').click(function (e) {
//         var patientname = $('#patientName').val();
//         var location = $('#locationBox').val();
//         var service = $('#selectBox').val();
//         var datebox = $('#datebox').val();
//         var storedNumClick = localStorage.getItem('phoneNumber');

//         // Reset error messages and input field styles
//         $('#patient-box-error').text('');
//         $('#select-box-error').text('');
//         $('#location-box-error').text('');
//         $('#date-box-error').text('');
//         $('#radio-box-error').text('');

//         if (patientname === '') {
//             $('#patient-box-error').text('Please enter patient name');
//             $('#patientName').addClass('error');
//             e.preventDefault(); // Prevent the default form submission
//             return; // Stop further execution
//         }

//         if (service === null) {
//             $('#select-box-error').text('Please select a service');
//             $('#selectBox').addClass('error');
//             e.preventDefault(); // Prevent the default form submission
//             return; // Stop further execution
//         }

//         if (location === null) {
//             $('#location-box-error').text('Please select a location');
//             $('#locationBox').addClass('error');
//             e.preventDefault(); // Prevent the default form submission
//             return; // Stop further execution
//         }

//         if (datebox === '') {
//             $('#date-box-error').text('Please select a date');
//             $('#datebox').addClass('error');
//             e.preventDefault(); // Prevent the default form submission
//             return; // Stop further execution
//         }

//         if (!$('.timeslotinput').is(':checked')) {
//             $('#radio-box-error').text('Please select a time slot'); // Corrected id reference
//             $('.timeslotinput').addClass('error');
//             e.preventDefault(); // Prevent the default form submission
//             return; // Stop further execution
//         }

//         if (storedNumClick === null) {
//             $('#loginformbox').css('display', 'block');
//             e.preventDefault(); // Prevent the default form submission
//             return; // Stop further execution
//         } else {
//             // Auto-submit the form here
//             $('#appointment-form').submit();
//         }
//     });
// });

$(document).ready(function () {
    // Function to clear errors messages
    function clearErrors() {
        $(
            "#patient-box-error, #location-box-error, #select-box-error, #date-box-error"
        ).text("");
        $("#radio-box-error").text("");
    }

    $("input, select").on("input", function () {
        $(this).next(".error").text("");
    });

    $("#datebox").on("change", function () {
        var datebox = $("#datebox");
        if (datebox.val() != "") {
            $("#date-box-error").text("");
            console.log(datebox.val());
        }
        console.log(datebox.val());
    });

    $(document).on("change", 'input[type="radio"]', function () {
        console.log("print");
        var timeslot = $(".timeslotinput");
        if ($(".timeslotinput").is(":checked")) {
            $("#radio-box-error").text("");
            console.log(timeslot.val());
        }
        console.log(timeslot.val());
    });


    $("#book-appointment-button").click(function (e) {
        e.preventDefault(); // Prevent default form submission

        var errors = false; // Flag to track errors

        var patientname = $("#patientName").val();
        var location = $("#locationBox").val();
        var service = $("#selectBox").val();
        var datebox = $("#datebox").val();
        var storedPhoneNumber = localStorage.getItem("phoneNumber");
        var appointmentbutton = document.getElementsByClassName("load");

        clearErrors(); // Clear any previous errors

        // Validate patient name, location, service, and date
        if (patientname === "") {
            console.log("patientname");
            $("#patient-box-error").text("Please enter patient name");
            console.log("patientname-1");
            errors = true;
            console.log("patientname-2");
        }
        if (location === null) {
            console.log("location");
            $("#location-box-error").text("Please select a location");
            console.log("location-1");
            errors = true;
            console.log("location-2");
        }
        if (service === null) {
            console.log("service");
            $("#select-box-error").text("Please select a service");
            console.log("service-1");
            errors = true;
            console.log("service-2");
        }
        if (datebox === "") {
            $("#date-box-error").text("Please select a date");
            errors = true;
        }

        // Check if all fields are filled and storedPhoneNumber is null

        if (errors === false) {
            if (!$(".timeslotinput").is(":checked")) {
                $("#radio-box-error").text("Please select a time slot");
                errors = true;
            }
         
        }

        // Check if all fields are filled and storedPhoneNumber is null
        if (errors === false && storedPhoneNumber === null) {
            console.log(1);
            $("#loginformbox").css("display", "block");
            errors = true;
        }

        if (errors === false) {
            $("#appointment-form").submit();
            for (var i = 0; i < appointmentbutton.length; i++) {
                appointmentbutton[i].click(); // Trigger click event on each load button
            }
        }
    });
});

// function changeType() {
//     var loginFormBox = document.getElementById("loginformbox");
//     var bookButtons = document.getElementsByClassName("data");
//     if (loginFormBox) {
//         loginFormBox.style.display = "none";
//         for (var i = 0; i < bookButtons.length; i++) {
//             bookButtons[i].style.display = "none"; // Hide each book button
//         }
//     }

//     var loadButtons = document.getElementsByClassName("load");
//     for (var i = 0; i < loadButtons.length; i++) {
//         loadButtons[i].click(); // Trigger click event on each load button
//     }
// }
document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("wf-form-Login-Form");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        changeType(); // Call the changeType function
    });
});

function changeType() {
    var loginFormBox = document.getElementById("loginformbox");
    var bookButtons = document.getElementsByClassName("data");
    var dataloader = document.getElementById("dataloader");

    loginFormBox.style.display = "none";
    dataloader.style.display = "block";

    for (var i = 0; i < bookButtons.length; i++) {
        bookButtons[i].style.display = "none"; // Hide each book button
    }

    function hideBlock() {
        dataloader.style.display = "none";
        var loadButtons = document.getElementsByClassName("load");
        for (var i = 0; i < loadButtons.length; i++) {
            loadButtons[i].click(); // Trigger click event on each load button
        }
    }
    setTimeout(hideBlock, 4000);
}

// function submitbtn() {
//     var mybooking = document.getElementById("mybooking");
//     var dataloader = document.getElementById("dataloader");
//     var appointmentsuccess = document.getElementById("appointment-success-data");

//     // Check if mybooking is initially set to display: block
//     if (getComputedStyle(mybooking).display === "flex" ) {
//       document.getElementById('wf-form-Login-Form').addEventListener('submit', function (event) {
//         dataloader.style.display = "block";
//         setTimeout(function() {
//             dataloader.style.display = "none";
//             // Show appointmentsuccess after 4 seconds
//             appointmentsuccess.style.display = "block";
//         }, 4000);

//       })

//         // Hide the dataloader after 4 seconds
//     }
// }

// function submitbtn() {
//   var mybooking = document.getElementById("mybooking");
//   var dataloader = document.getElementById("dataloader");
//   var appointmentsuccess = document.getElementById("appointment-success-data");

//   // Check if mybooking is initially set to display: block
//   if (getComputedStyle(mybooking).display === "flex") {
//       // Check if any form field is blank
//       var formFields = document.forms["book-appointment-form"].getElementsByTagName("input");
//       var allFieldsFilled = true;
//       for (var i = 0; i < formFields.length; i++) {
//         if (formFields[i].type === "text" && formFields[i].value === "") {
//             allFieldsFilled = false;
//             break;
//         } else if (formFields[i].type === "radio" && !formFields[i].checked) {
//             allFieldsFilled = false;
//             break;
//         }
//     }

//       if (allFieldsFilled) {
//           dataloader.style.display = "block";

//           // Hide the dataloader after 4 seconds
//           setTimeout(function() {
//               dataloader.style.display = "none";
//               // Show appointmentsuccess after 4 seconds
//               appointmentsuccess.style.display = "block";
//           }, 4000);
//       } else {

//       }
//   }
// }
function submitbtn() {
    var mybooking = document.getElementById("mybooking");
    var dataloader = document.getElementById("dataloader");
    var appointmentsuccess = document.getElementById("appointment-success-data");

    // Check if mybooking is initially set to display: block
    if (getComputedStyle(mybooking).display === "flex") {
        // Check if any form field is blank
        var formFields =
            document.forms["book-appointment-form"].getElementsByTagName("input");
        var radioButtons = document.querySelectorAll(
            "input[type='radio'][name='timeslot']"
        );
        var allFieldsFilled = true;

        // Check if any text input is blank
        for (var i = 0; i < formFields.length; i++) {
            if (formFields[i].type === "text" && formFields[i].value === "") {
                allFieldsFilled = false;
                break;
            }
        }

        // Check if any radio button is checked
        var anyRadioChecked = false;
        for (var j = 0; j < radioButtons.length; j++) {
            if (radioButtons[j].checked) {
                anyRadioChecked = true;
                break;
            }
        }

        // If no radio button is checked, set allFieldsFilled to false
        if (!anyRadioChecked) {
            allFieldsFilled = false;
        }

        if (allFieldsFilled) {
            dataloader.style.display = "block";

            // Hide the dataloader after 4 seconds
            setTimeout(function () {
                dataloader.style.display = "none";
                // Show appointmentsuccess after 4 seconds
                appointmentsuccess.style.display = "block";
            }, 4000);
        } else {
            console.log("Please fill in all required fields.");
        }
    }
}

document.getElementById("selectBox").addEventListener("change", function () {
    var selectedValue = this.value;
    var video = document.getElementById("video");
    var consultation = document.getElementById("consultation");

    if (selectedValue === "Video Consultation") {
        video.style.display = "flex";
        consultation.style.display = "none";
    } else if (selectedValue === "For In-Person Consultation") {
        video.style.display = "none";
        consultation.style.display = "flex";
    } else {
        video.style.display = "none";
        consultation.style.display = "none";
    }
});