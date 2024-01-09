class Modal{
    constructor(){
        this.modal = document.querySelector('#modal');
        this.modalBtn = document.querySelector('#modal-btn');
        this.addEventListeners();
    }

    addEventListeners(){
        this.modalBtn.addEventListener('click', this.open.bind(this));
        window.addEventListener('click', this.outsideClick.bind(this));

        document.addEventListener('closemodal', ()=> this.close());
    }
     open (){
        this.modal.style.display = 'block'
    }
     close (){
        this.modal.style.display = 'none'
    }
     outsideClick(e){
        if(e.target === this.modal){
            this.close();
        }
    }
}

export default Modal