

  const humans_parent = document.getElementById("humans");
  const BLOOD_TYPES = {
    "O−": ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "A−": ["A−", "A+", "AB−", "AB+"],
    "A+": ["A+", "AB+"],
    "B−": ["B−", "B+", "AB−", "AB+"],
    "B+": ["B+", "AB+"],
    "AB−": ["AB−", "AB+"],
    "AB+": ["AB+"]
  };
  const reset_button = document.getElementById("reset");
  const selector = document.getElementById("blood_selector");
  const blood_vias = document.querySelectorAll("#humans .human .blood_via");
  const blood_bag = document.querySelector("#blood_content .main_bag .blood");
  const center_via = document.querySelector(".center_via .blood_via");
  const blood_types = document.querySelectorAll(".blood_type");
  let lastCalled;

  addListeners();

  function callIfChildren(e) {
    if (lastCalled) change();
    if (e.target !== this) setRecipents(e);
  }

  function addListeners() {
    selector.addEventListener("click", callIfChildren);
    reset_button.addEventListener("click", reset);
  }

  function reset() {
    change();
    blood_bag.style.height = "100px";
    center_via.style.height = "0px";
  }

  function change() {
    if (lastCalled && lastCalled.target) {
      lastCalled.target.classList.remove("highlight");
    }

    blood_vias.forEach(via => {
      via.style.width = "0px";
    });

    blood_types.forEach(type => {
      type.classList.remove("highlightText");
    });
  }

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function setRecipents(e) {
    if (!e.target.classList.contains('blood_type') && !e.target.classList.contains('social')) {
      e.target.classList.add("highlight");
      lastCalled = e;

      const donor = e.target.innerText.trim();
      const recipents = BLOOD_TYPES[donor];
      if (!recipents) return;

      for (let item of recipents) {
        const recipent_index = Array.from(BLOOD_TYPES.keys ? BLOOD_TYPES.keys() : Object.keys(BLOOD_TYPES)).indexOf(item);
        const height = 50 + 50 * Math.floor(recipent_index / 2);
        const blood_height = 125 - 25 * Math.floor(recipent_index / 2);
        blood_bag.style.height = `${blood_height}px`;
        center_via.style.height = `${height}px`;

        await timeout(100);
        blood_vias[recipent_index].style.width = "100%";
        blood_types[recipent_index].classList.add("highlightText");
      }
    }
  }
