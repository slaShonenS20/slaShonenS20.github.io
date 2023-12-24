const btn = document.getElementById('button');
const message = document.getElementById('message');
const input = document.getElementById('password');

btn.addEventListener('click', function (event) {
  const password = document.getElementById('password').value;
  auth(password);
  event.preventDefault();
});

function hash(text) {
  const sha = new jsSHA('SHA-256', 'TEXT');
  sha.update(text);
  return sha.getHash('HEX');
}
function auth(password) {
  const url = hash(password);
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      window.location = url;
    } else {
      message.innerHTML = 'パスワードが違います';
      message.style.color = "red";
      input.style = "background-color: #FADBDA;";
      input.value = '';
    }
  };
  xhr.onerror = function () {
    message.innerHTML = 'システムエラーが発生しました';
    message.style.color = "red";
  };
}
