function loadGender(gender)
{
  console.log(typeof(gender));
   if (gender === "girl")
   {
     $("[name=sex]").val(["girl"]);
   }

   else if (gender === "boy")
   {
    $("[name=sex]").val(["boy"]);
   }
}
