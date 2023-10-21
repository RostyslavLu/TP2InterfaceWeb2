export default class ValidationFormulaire{
    // constructor(){
        
    // }
    static estVide(champFormulaire){
        let estVide = champFormulaire == "";
        
        return estVide;
    }
    static estRadioSelectionne(inputName) {
        const radioButtons = document.querySelectorAll(`input[name="${inputName}"]`);
        return [...radioButtons].some((radio) => radio.checked);
      }
    
}