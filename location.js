
// map locations to numbers
const locationMap = {
  loc1: "7799086877",
  loc2: "7799086877",
  loc3: "7799086877",
  loc4: "7799086877",
  loc5: "7799086877",
  loc6: "7993477015",
  loc7: "7993477015",
  loc8: "7993477015",
  loc9: "7993477015",
  loc10:"7993477015"
};

document.addEventListener("DOMContentLoaded",()=>{
  const sel=document.getElementById("locationSelect");
  if(!sel) return;
  const saved=localStorage.getItem("userLocation");
  if(saved) sel.value=saved;
  sel.addEventListener("change",()=>{
    localStorage.setItem("userLocation",sel.value);
  });
});

// helper to get current number
window.getWhatsAppNumber = function(){
  const loc = localStorage.getItem("userLocation") || "loc1";
  return locationMap[loc] || "7799086877";
}
