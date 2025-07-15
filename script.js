$(document).ready(function () {
  const pageName = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");
  let currentTab = "section1";

  $(".tab-button").on("click", function () {
    const tab = $(this).data("tab");
    $(".list").hide();
    $("#" + tab).show();
    currentTab = tab;
    loadData();
  });

  $(".add-tab-button").on("click", function () {
    const tabCount = $(".tab-button").length + 1;
    const newTabId = `section${tabCount}`;

    const $newTab = $(`
      <button class="tab-button" data-tab="${newTabId}">
        <input type="text" value="Section ${tabCount}" class="tab-input" />
      </button>
    `);

    $("#subheader-tabs").append($newTab);
    $("#list-container").append(
      `<div class="list" id="${newTabId}" style="display:none"></div>`
    );

    $newTab.on("click", function () {
      $(".list").hide();
      $("#" + newTabId).show();
      currentTab = newTabId;
      loadData();
    });
  });

  $(".add-button").on("click", function () {
    const target = $(
      "#" + currentTab + ' .multi-state-checkbox[data-state="red"]'
    )
      .first()
      .closest(".input-row");
    if (target.length) {
      const $newRow = $(`
        <div class="input-row">
          <div class="multi-state-checkbox" data-state="blank"></div>
          <textarea></textarea>
        </div>
      `);
      $newRow.find("textarea").on("input", function () {
        autoResize(this);
        saveData();
      });
      autoResize($newRow.find("textarea")[0]);
      target.before($newRow);
      saveData();
    } else {
      addNewItem();
    }
  });

  $(".remove-button").on("click", function () {
    $("#" + currentTab + ' .multi-state-checkbox[data-state="red"]').each(
      function () {
        $(this).closest(".input-row").remove();
      }
    );
    saveData();
  });

  function addNewItem(value = "") {
    const $inputRow = $(`
      <div class="input-row">
        <div class="multi-state-checkbox" data-state="blank"></div>
        <textarea>${value}</textarea>
      </div>
    `);
    $inputRow.find("textarea").on("input", function () {
      autoResize(this);
      saveData();
    });
    $("#" + currentTab).prepend($inputRow);
    autoResize($inputRow.find("textarea")[0]);
    saveData();
  }

  function saveData() {
    const data = [];
    $("#" + currentTab + " .input-row").each(function () {
      const text = $(this).find("textarea").val();
      data.push({ text: text });
    });
    const key = `notes-${pageName}-${currentTab}`;
    localStorage.setItem(key, JSON.stringify(data));
  }

  function loadData() {
    const key = `notes-${pageName}-${currentTab}`;
    const raw = localStorage.getItem(key);
    const list = raw ? JSON.parse(raw) : [];
    $("#" + currentTab).empty();
    list.reverse().forEach((item) => {
      addNewItem(item.text);
    });
  }

  $(document).on("click", ".multi-state-checkbox", function () {
    const current = $(this).data("state");
    if (current === "blank") {
      $(this)
        .data("state", "red")
        .addClass("state-red")
        .removeClass("state-green");
    } else if (current === "red") {
      $(this)
        .data("state", "green")
        .addClass("state-green")
        .removeClass("state-red");
      $(this).closest(".input-row").addClass("collapsed");
    } else {
      $(this).data("state", "blank").removeClass("state-red state-green");
      $(this).closest(".input-row").removeClass("collapsed");
    }
  });

  // Initial load
  loadData();
});

function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}
