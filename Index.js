/*$('#numberError').text('');
$('#captchaError').text('');
$('#enterOTP').text('');
$('#otpError').text('');
$('#loginsubmit').css('display', 'none');
$('.otp').css('display', 'none');
$('#verifyOTP').css('display', 'none');
$('#resendOTP').css('display', 'none');
const firebaseConfig = {
    apiKey: "AIzaSyB6mfkSUSzlHR8q6yngtopYMUgxtleeJRA",
    authDomain: "webflow-login-402609.firebaseapp.com",
    projectId: "webflow-login-402609",
    storageBucket: "webflow-login-402609.appspot.com",
    messagingSenderId: "87228908672",
    appId: "1:87228908672:web:82e2a9a8dd2c0e4bc5d265",
    measurementId: "G-JN8CEFTW9J"
};
firebase.initializeApp(firebaseConfig);
render();
function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'callback': function (response) {
            console.log('reCAPTCHA solved');
        },
        'expired-callback': function () {
            console.log('reCAPTCHA expiration');
        },
        'timeout': 60000
    });
    recaptchaVerifier.render();
    var storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
        setTimeout(() => {
            localStorage.removeItem('phoneNumber')
        }, 1 * 60 * 1000);
        return;
    }
}
function sendOTP() {
    var inputPhone = $("#formnumber").val();
    var countryCode = $("#formnumber").intlTelInput("getSelectedCountryData").dialCode;
    var phoneNumber = '+' + countryCode + inputPhone;
    console.log(phoneNumber);
    var appVerifier = window.recaptchaVerifier;
    var response = grecaptcha.getResponse();
    $('#numberError').text('');
    $('#captchaError').text('');
    if (phoneNumber.length < 1 || response.length == 0) {
        var phoneRegex = /^\+[1-9]{1}[0-9]{11,}$/;
        if (!phoneRegex.test(phoneNumber)) {
            $('#numberError').text('Please Enter Valid Phone Number.');
        }
        if (phoneNumber.length < 1) {
            $('#numberError').text('Phone Number Field is Required.');
        }
        if (response.length == 0) {
            $('#captchaError').text('Please verify you are human!');
        }
    }
    else {
        console.log(phoneNumber);
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                window.confirmationResult = confirmationResult;
                coderesult = confirmationResult;
                console.log("OTP is sent");
                $('.otp').css('display', 'block');
                $('#verifyOTP').css('display', 'block');
                $('#resendOTP').css('display', 'block');
                $('#phone-number-wrapper').css('display', 'none');
                $('#send').css('display', 'none');
            }).catch(function (error) {
                console.log(phoneNumber);
                console.log("Error sending OTP:", error);
                if (error.code === 'auth/invalid-phone-number') {
                    $('#numberError').text('Please Enter Valid Phone Number.');
                }
            });
    }
}
function codeverify() {
    var code = $("#formotp").val();
    var response = grecaptcha.getResponse();
    $('#captchaError').text('');
    $('#enterOTP').text('');
    $('#otpError').text('');
    var codeRegex = /^\d{6}$/;
    if (code.length == 0 || response.length == 0 || !codeRegex.test(code)) {
        if (code.length == 0) {
            $('#enterOTP').text('Please Enter OTP');
        }
        else if (!codeRegex.test(code)) {
            $('#otpError').text('Please Enter 6-Digit OTP');
        }
        if (response.length == 0) {
            $('#captchaError').text('Please verify you are human!');
        }
    }
    else {
        coderesult
            .confirm(code)
            .then(function () {
                $('#otpError').text('');
                $('#loginsubmit').css('display', 'block');
                $('#verifyOTP').css('display', 'none');
                $('#resendOTP').css('display', 'none');
            }).catch(function (error) {
                console.error("Error occurred:", error);
                $('#loginsubmit').css('display', 'none');
                $('#verifyOTP').css('display', 'block');
                $('#resendOTP').css('display', 'block');
                if (error.code == "auth/invalid-verification-code") {
                    $('#otpError').text('Please Enter Valid OTP');
                }
                if (error.code == "auth/code-expired") {
                    console.log("code-expired");
                }
            })
    }
}
function ReSendLoginOTP() {
    var inputPhone = $("#formnumber").val();
    var countryCode = $("#formnumber").intlTelInput("getSelectedCountryData").dialCode;
    var phoneNumber = '+' + countryCode + inputPhone;
    console.log(phoneNumber);
    var appVerifier = window.recaptchaVerifier;
    var response = grecaptcha.getResponse();
    $('#numberError').text('');
    $('#captchaError').text('');
    if (phoneNumber.length < 1 || response.length == 0) {
        var phoneRegex = /^\+[1-9]{1}[0-9]{10,}$/;
        if (phoneNumber.length < 1) {
            $('#numberError').text('Please Enter Valid Phone Number. phoneRegex');
        }
        if (!phoneRegex.test(phoneNumber)) {
            $('#numberError').text('Phone Number Field is Required.');
        }
        if (response.length == 0) {
            $('#captchaError').text('Please verify you are human!');
        }
    }
    
    else {
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                window.confirmationResult = confirmationResult;
                coderesult = confirmationResult;
                console.log("OTP is sent");
                document.getElementById("formotp").value = "";
                $('.otp').css('display', 'block');
                $('#phone-number-wrapper').css('display', 'none');
                $('#send').css('display', 'none');
            }).catch(function (error) {
                console.log(phoneNumber);
                console.log("Error sending OTP:", error);
                if (error.code === 'auth/invalid-phone-number') {
                    $('#numberError').text('Please Enter Valid Phone Number.');
                }
            });
    }
}
document.getElementById('wf-form-Login-Form').addEventListener('submit', function (e) {
    var phoneNumber = $("#formnumber").val();
    var countryCode = $("#formnumber").intlTelInput("getSelectedCountryData").dialCode;
    var mergedValue = "+" + countryCode + phoneNumber;
    $("#formnumber").val(mergedValue);
    console.log($("#formnumber").val());
    localStorage.setItem('phoneNumber', phoneNumber);
    setTimeout(() => {
        localStorage.removeItem('phoneNumber')
    }, 1 * 60 * 1000);
});
$("#formnumber").intlTelInput({
    initialCountry: "in",
    separateDialCode: true,
});*/










let digitValidate = function (ele) {
    ele.value = ele.value.replace(/[^0-9]/g, '').substring(0, 1);
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
        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
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
const otp = document.querySelectorAll('.otp-text-field');
otp.forEach((input, index) => {
    input.setAttribute('oninput', 'digitValidate(this)');
    input.setAttribute('onkeyup', `tabChanges(event, ${index})`);
});
function tabChanges(event, index) {
    console.log(`Tab change event triggered for input field with index: ${index}`);
    if (event.key === "Enter" || event.key === "ArrowRight") {
        if (otp[index + 1]) {
            otp[index + 1].focus();
        }
    } else if (event.key === "ArrowLeft") {
        if (otp[index - 1]) {
            otp[index - 1].focus();
        }
    }
};
const combinedInput = document.getElementById('formotp');
otp.forEach(input => {
    input.addEventListener('input', function () {
        let combinedValue = '';
        otp.forEach(input => {
            combinedValue += input.value;
        });
        combinedInput.value = combinedValue;
    });
    input.addEventListener('keyup', function (event) {
        if (event.key === 'Backspace') {
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