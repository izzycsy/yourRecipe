//jQuery for addMore buttons
$(function() {
    /*
      Alert disappear after 3 seconds
  */
  
    setTimeout(() => {
      $(".alert").fadeOut("slow");
    }, 3000);
  
    /*
      Display new INGREDIENT on click of add more
    */
    $("#addIngredient").on("click", function(e) {
      e.preventDefault(); //kill default action
      let numberIdOfRow = $(".listIngredient .row:last-child").attr("data-id");
      let num = parseInt(numberIdOfRow) + 1;
  
      let html = `<div class="row mb-3" data-id="${num}" >
          <div class="col-10">
            <label>Ingredient: </label>
            <input name="ingredients[${num}][name]" class="form-control" placeholder="1/4 cup grated onion" />
          </div>
         
          <div class="col-1 alignX">
            <button class="btn del">x</button>
          </div>
        </div>`;
      $(".listIngredient").append(html);
    });
  
    /*
    Remove INGREDIENT on click of remove
    */
    $(".listIngredient").on("click", ".del", function(e) {
      e.preventDefault();

      /* For the red X:
          Find the parent of the parent of the del button 
          and completely remove it from the html
      */
      $(this)
        .parent()
        .parent()
        .remove();
    });
  });
  