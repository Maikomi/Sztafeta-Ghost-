const Card = (elem, idiom) => {
    const element = elem;
    let cardIdiom = idiom;
    console.log(cardIdiom);

    const getElem = () => {
        return element;
    }

    const changeValue = () => {
        element.addClass("clicked");
    }

    const addEventListener = (eventCallback) =>{
        element.addEventListener("click", event => {
            eventCallback(event, cardIdiom)
        })
    }

    return{
        getElem,
        changeValue,
        addEventListener 
    }
}

export default Card;

