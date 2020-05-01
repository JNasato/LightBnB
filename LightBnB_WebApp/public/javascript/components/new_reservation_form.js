$(() => {



  const $newReservationForm = $(`
    <form action="/api/reservations" method="post" id="new-reservation-form" class="new-reservation-form">
      <div class="new-reservation-form__field-wrapper">
        <label for"new-reservation-form__start">Start Date</label>
        <input type="text" name="start_date" placeholder="YYYY/MM/DD" id="new-reservation-form__start">
      </div>

      <div class="new-reservation-form__field-wrapper">
        <label for"new-reservation-form__end">End Date</label>
        <input type="text" name="end_date" placeholder="YYYY/MM/DD" id="new-reservation-form__end">
      </div>

        <div class="new-reservation-form__field-wrapper">
            <button>Create</button>
            <a id="reservation-form__cancel" href="#">Cancel</a>
        </div>
        
    </form>
  `)

  window.$newReservationForm = $newReservationForm;

  $newReservationForm.on('submit', function (event) {
    event.preventDefault();

    views_manager.show('none');

    const data = $(this).serialize();
    submitReservations(data)
    .then(() => {
      views_manager.show('listings');
    })
    .catch((error) => {
      console.error(error);
      views_manager.show('listings');
    })
  });

  $('body').on('click', '#reservation-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });
  
});