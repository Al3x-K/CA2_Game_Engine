import Component from "./component.js";

class UI extends Component
{
    constructor(text,x,y,font,color,textAlign,textBaseline)    
    {
        super();
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
        this.textAlign = textAlign;
        this.textBaseline = textBaseline;
    }

    draw(ctx)
    {
        const camera = this.gameObject.game.camera;
        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(this.text,this.x + camera.x, this.y + camera.y);
    }

    setText(newText)
    {
        this.text = newText;
    }
}
export default UI;