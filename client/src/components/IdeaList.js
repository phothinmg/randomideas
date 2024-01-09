import IdeaApi from "../services/ideaApi.js";
class IdeaList{
    constructor(){

        this._ideaListEl = document.querySelector('#idea-list');
        this._ideas = [];
        this.getIdeas();
        // color for tags tabs
        this._validTags = new Set();
        this._validTags.add('technology');
        this._validTags.add('software');
        this._validTags.add('business');
        this._validTags.add('education');
        this._validTags.add('health');
        this._validTags.add('inventions');
    }

addEventListeners() {
    const del = (item) => this.deleteIdea(item)
   this._ideaListEl.addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-times')) {
      e.stopImmediatePropagation();
      const ideaId = e.target.parentElement.parentElement.dataset.id;
      del(ideaId);
     }
  });
}
    async getIdeas(){
        try {
            const res = await IdeaApi.getIdeas();
            this._ideas = res.data.data;
            this.render();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteIdea(ideaId){
        try {

            const res = await IdeaApi.deleteIdea(ideaId);
            this._ideas.filter((idea)=> idea._id !== ideaId);
            this.getIdeas();
        } catch (error) {
            alert('You can not delete this resource')
        }
    }

    addIdeaToList(idea){
        this._ideas.push(idea);
        this.render();

    }

    getTagClass(tag){
        tag = (tag ?? '').toLowerCase();
        const tagClass = this._validTags.has(tag) ? `tag-${tag}` : '';
        return tagClass;
    }

    render(){
        this._ideaListEl.innerHTML = this._ideas.map((idea) => {
            const tagClass = this.getTagClass(idea.tag);
            const deleteBtn = idea.username === localStorage.getItem('usernamne') ? ` <button class="delete"><i class="fas fa-times"></i></button>` : '';
            return `
            <div class="card" data-id="${idea._id}">
            ${deleteBtn}
          <h3>
           ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
         </div>
            
            `;
        }).join('')

        this.addEventListeners();
    }
}

export default IdeaList;