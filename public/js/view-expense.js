function approveReimbursement(expenseID) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp.open("GET", "/expense/reimburse/" + expenseID, true);
  xhttp.send();
}

function rejectReimbursement(expenseID) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp.open("GET", "/expense/reimburse/" + expenseID, true);
  xhttp.send();
}
