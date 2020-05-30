function sendMail() {
  $("#loading").show();
  $("#submit").hide();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const subject = document.querySelector('#subject').value;
  const body = document.querySelector('#body').value;
  const payload = {
   name,
   email,
   subject,
   body,
  };
  $.post('/contato', payload).then((response) => {
   console.log(response);
   document.querySelector('#name').value = '';
   document.querySelector('#email').value = '';
   document.querySelector('#subject').value = '';
   document.querySelector('#body').value = '';
   $("#message").show();
   $("#loading").hide();
   setTimeout(() => {
    $("#message").hide();
    $("#submit").show();
   },3000);
  });
}