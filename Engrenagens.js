class Engrenagens extends Phaser.Physics.Arcade.Sprite {

    constructor(scene){

                super(scene);

                scene.add.existing(this);

                this.scene = scene;
                this.engrenagens = [];
    }

    CriarEngrenagem(x, y, NumeroDentes, Texture, Velocidade,angulo)
    {
        const Engrenagem = this.scene.physics.add.sprite(x, y, Texture);
        
        Engrenagem.NumeroDentes = NumeroDentes;
        //Engrenagem.body.setSize(NumeroDentes * 8.5, NumeroDentes * 8.5);
        Engrenagem.body.setCircle(NumeroDentes * 4.5);
        //Sim, tem que ser 4.5, senão ele não fica certo com o desenho
        Engrenagem.setDisplaySize(NumeroDentes * 4, NumeroDentes * 4);
        //Engrenagem.setSize(NumeroDentes * 8, NumeroDentes * 8);
        Engrenagem.Velocidade = Velocidade;
        Engrenagem.id = this.engrenagens.length;
        Engrenagem.setRotation(angulo);
        
        this.engrenagens.push(Engrenagem);    
    }

    RodarEngrenagem(Engrenagem)
    {
        Engrenagem.setRotation(Engrenagem.rotation + Engrenagem.Velocidade);
    }


    DefinirVelocidade(Engrenagem)
    {

        for(let i = 0; i < this.engrenagens.length; i++)
        {
        
            if(Engrenagem.id != this.engrenagens[i].id)
            {

        if(this.scene.physics.overlap(Engrenagem, this.engrenagens[i]))
        {
            if(Math.abs(Engrenagem.Velocidade) > Math.abs(this.engrenagens[i].Velocidade))
            {
                this.engrenagens[i].Velocidade = 
                (Engrenagem.Velocidade * Engrenagem.NumeroDentes)
                / this.engrenagens[i].NumeroDentes * -1;
            }
 
            else if(Math.abs(Engrenagem.Velocidade) < Math.abs(this.engrenagens[i].Velocidade))
            {
                Engrenagem.Velocidade = 
                (this.engrenagens[i].Velocidade * this.engrenagens[i].NumeroDentes ) 
                / Engrenagem.NumeroDentes * -1;
            }
            }
            }
        }
    }

    update(delta, time){
    for(let i = 0; i < this.engrenagens.length; i++)
    {
        this.DefinirVelocidade(this.engrenagens[i]);
        this.RodarEngrenagem(this.engrenagens[i]);
    }
}
}