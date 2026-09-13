class Esteiras extends Phaser.Physics.Arcade.Sprite {

    constructor(scene){

                super(scene);

                scene.add.existing(this);

                this.scene = scene;
                this.esteiras = [];
    }

    CriarEsteira(x, y, Comprimento, Texture, Velocidade, angulo, pedacosTextura)
{
    const Esteira = this.scene.physics.add.sprite(x, y, Texture);

    Esteira.Comprimento = Comprimento;
    Esteira.Velocidade = Velocidade;
    Esteira.id = this.esteiras.length;
    Esteira.angulo = angulo;
    Esteira.setRotation(angulo);
    Esteira.Tipo = 'Esteira';

    if(angulo == Math.PI / 2)
    {
        Esteira.body.setSize(32 * Comprimento, 32 / Comprimento);
    }
    
    Esteira.setDisplaySize(45, 45 * Comprimento);

    const largura = Esteira.displayWidth;
    const altura = Esteira.displayHeight;

    Esteira.Pedacos = this.scene.add.tileSprite(
        Esteira.x, Esteira.y, largura, altura, pedacosTextura
    );
    Esteira.Pedacos.setRotation(angulo);

    Esteira.setInteractive();
    Esteira.EngrenagemConectada = null;

    this.esteiras.push(Esteira);
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
    

    RodarEsteiras()
    {
        //console.log('chamou');
        for(let i = 0; i < this.esteiras.length;i++)
    {
        const Esteira = this.esteiras[i];
        Esteira.Pedacos.tilePositionY += Esteira.Velocidade;
    }
    }

update(delta, time)
{
this.RodarEsteiras();
}
}