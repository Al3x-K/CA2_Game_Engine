import GameObject from "../Engine/gameobject.js"
import UI from "../Engine/ui.js"

class Score extends GameObject
{
    constructor(x,y)
    {
        super(x,y);
        this.ui = new UI(0,0,50,50);
        this.addComponent(this.ui);
        this.tag = 'score';
    }
}
export default Score;