
import { Counter } from './components/Counter';

//import main styles
import './styles/main.scss';



class App {
    constructor() {}
    onInit() {
        let counterElements = document.querySelectorAll(".counter");

        for(let i = 0; i < counterElements.length; i++) {
            new Counter(<HTMLElement> counterElements[i]);
        }
        
    }  
}

new App().onInit();





