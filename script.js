$(document).ready(function () {
  const pageName = window.location.pathname.split('/').pop().replace('.html', '');
  let currentTab = "section1";

  $('.tab-button').on('click', function () {
    const tab = $(this).data('tab');
    $('.list').hide();
    $('#' + tab).show();
    currentTab = tab;
    loadData();
  });

  $('.add-button').on('click', function () {
    addNewItem();
  });

  function addNewItem(value = "") {
    const $inputRow = $(`
      <div class="input-row">
        <input type="checkbox" />
        <input type="text" value="${value}" />
      </div>
    `);
    $inputRow.find('input[type="text"]').on('input', saveData);
    $('#' + currentTab).prepend($inputRow);
    saveData();
  }

  function saveData() {
    const data = [];
    $('#' + currentTab + ' .input-row').each(function () {
      const text = $(this).find('input[type="text"]').val();
      data.push({ text: text });
    });

    const dbRef = firebase.database().ref(`notes/${pageName}/${currentTab}`);
    dbRef.set(data);
  }

  function loadData() {
    const dbRef = firebase.database().ref(`notes/${pageName}/${currentTab}`);
    dbRef.once('value', (snapshot) => {
      const list = snapshot.val() || [];
      $('#' + currentTab).empty();
      list.reverse().forEach(item => {
        addNewItem(item.text);
      });
    });
  }

  // Initial load
  loadData();
});
