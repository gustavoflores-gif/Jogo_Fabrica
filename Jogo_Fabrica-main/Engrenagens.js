class Engrenagens extends Phaser.Physics.Arcade.Sprite {

    constructor(scene){

                super(scene);

                scene.add.existing(this);

                this.scene = scene;
                this.engrenagens = [];
    }

    CriarEngrenagem(x, y, NumeroDentes, Texture, Velocidade,angulo, coneccao)
    {
        const Engrenagem = this.scene.physics.add.sprite(x, y, Texture);
        
        Engrenagem.NumeroDentes = NumeroDentes;
        Engrenagem.body.setCircle(NumeroDentes * 4.5);
        //Engrenagem.body.setCircle(NumeroDentes * 0.004);
        Engrenagem.setDisplaySize(NumeroDentes * 4, NumeroDentes * 4);

        if(Velocidade != 0)
        {
            Engrenagem.VelocidadeOriginal = Velocidade;
        }
        else {
            Engrenagem.VelocidadeOriginal = 0;
        }

        Engrenagem.Velocidade = Engrenagem.VelocidadeOriginal;
        Engrenagem.id = this.engrenagens.length;
        Engrenagem.setRotation(angulo);
        Engrenagem.coneccao = coneccao;
        Engrenagem.Tipo = 'Engrenagem';
        Engrenagem.Travado =false;

        Engrenagem.CentroPino = this.scene.add.zone(Engrenagem.x, Engrenagem.y, 1, 1);
        this.scene.physics.add.existing(Engrenagem.CentroPino);
        Engrenagem.CentroPino.body.setCircle(1);
        

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
            if(Engrenagem.VelocidadeOriginal != 0)
            {
                Engrenagem.Velocidade = Engrenagem.VelocidadeOriginal;
            }

            if(Engrenagem.Travado == true || this.engrenagens[i].Travado == true)
            {
                this.engrenagens[i].Travado = true;
                Engrenagem.Travado = true;
                this.engrenagens[i].Velocidade = 0;
                Engrenagem.Velocidade = 0;
            } else {

                if((Engrenagem.Velocidade > 0 && this.engrenagens[i].Velocidade > 0 ) ||
                (Engrenagem.Velocidade < 0 && this.engrenagens[i].Velocidade < 0 ))
                {
                    Engrenagem.Velocidade = 0;
                    Engrenagem.Travado = true;
                    this.engrenagens[i].Travado = true;
                    this.engrenagens[i].Velocidade = 0;
                } else {

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
            /*
            if(Engrenagem.VelocidadeOriginal != 0)
            {
                Engrenagem.Velocidade = Engrenagem.VelocidadeOriginal;
            }
                */
            }
            }
        }
    }

    EngrenagemEsteira()
        {
            
        }

    update(delta, time){
    for(let i = 0; i < this.engrenagens.length; i++)
    {
        this.DefinirVelocidade(this.engrenagens[i]);
        this.RodarEngrenagem(this.engrenagens[i]);
    }
}
}