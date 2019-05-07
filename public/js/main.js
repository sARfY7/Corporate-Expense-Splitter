const d_form = document.forms[0];
const form_c = document.querySelector(".form-container form .emp");
const emp_id_error_msg = document.querySelector(".emp_id-error");
const pass_error_msg = document.querySelector(".pass-error");
const inp_emp_id = document.getElementById("emp_id");
const inp_pass = document.getElementById("pass");
const pwd_strength_meter = document.getElementById("pwd-strength-meter");

inp_pass.addEventListener("focusout", function() {
  inp_pass.style.borderColor = "rgba(0, 0, 0, 0)";
});

inp_pass.addEventListener("focusin", function() {
  inp_pass.style.borderColor = "rgba(0, 0, 0, 1)";
  validatePassword(this.value);
});

function addEmpFields(element) {
  //   console.log(element.value);
  const emp_field_no = element.value;
  for (let i = 0; i < emp_field_no; i++) {
    const div = document.createElement("div");
    div.classList.add("form-group");
    const inp = document.createElement("input");
    inp.setAttribute("type", "text");
    inp.setAttribute("placeholder", `Enter Employee #${i + 1} ID`);
    inp.setAttribute("name", "exp_dividedAmong");
    div.appendChild(inp);
    form_c.appendChild(div);
  }
}

function validateInput() {
  event.preventDefault();
  let is_valid_emp_id = true;
  let is_valid_pass = true;

  if (inp_emp_id.value === "") {
    is_valid_emp_id = false;
    inp_emp_id.classList.add("error");
    emp_id_error_msg.innerText = "Employee ID Cannot be Empty!";
  } else {
    is_valid_emp_id = true;
    inp_emp_id.classList.remove("error");
    emp_id_error_msg.innerText = "";
  }

  if (inp_pass.value === "") {
    is_valid_pass = false;
    inp_pass.classList.add("error");
    pass_error_msg.innerText = "Password Cannot be Empty!";
  } else {
    is_valid_pass = true;
    inp_pass.classList.remove("error");
    pass_error_msg.innerText = "";
  }

  if (is_valid_emp_id && is_valid_pass) {
    d_form.submit();
  }
}

function validatePassword(password) {
  // Do not show anything when the length of password is zero.
  if (password.length === 0) {
    pwd_strength_meter.innerHTML = "";
    inp_pass.style.borderColor = "black";
    return;
  }
  // Create an array and push all possible values that you want in password
  const matchedCase = new Array();
  matchedCase.push("[$@$!%*#?&]"); // Special Charector
  matchedCase.push("[A-Z]"); // Uppercase Alpabates
  matchedCase.push("[0-9]"); // Numbers
  matchedCase.push("[a-z]"); // Lowercase Alphabates

  // Check the conditions
  let ctr = 0;
  for (let i = 0; i < matchedCase.length; i++) {
    if (new RegExp(matchedCase[i]).test(password)) {
      ctr++;
    }
  }

  if (password.length >= 8) {
    ctr++;
  }

  // Display it
  let color = "";
  let strength = "";
  switch (ctr) {
    case 0:
    case 1:
    case 2:
      strength = "Password Strength: <b>Weak</b>";
      color = "red";
      break;
    case 3:
      strength = "Password Strength: <b>Medium</b>";
      color = "yellow";
      break;
    case 4:
      strength = "Password Strength: <b>Strong</b>";
      color = "orange";
      break;
    case 5:
      strength = "Password Strength: <b>Very Strong</b>";
      color = "green";
      break;
  }
  pwd_strength_meter.innerHTML = strength;
  inp_pass.style.borderColor = color;
}
