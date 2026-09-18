class Esteiras extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, engrenagensRef){
        super(scene);
        scene.add.existing(this);
        this.scene = scene;
        this.esteiras = [];
        this.engrenagensRef = engrenagensRef;
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

    

    RodarEsteiras()
    {
        //console.log('chamou');
        for(let i = 0; i < this.esteiras.length;i++)
    {
        const Esteira = this.esteiras[i];
        Esteira.Pedacos.tilePositionY += Esteira.Velocidade;
    }
    }

    DefinirVelocidade(Esteira)
    {
        for(let i = 0; i < this.engrenagensRef.engrenagens.length; i++)
        {
            if(this.scene.physics.overlap(Esteira, this.engrenagensRef.engrenagens[i].CentroPino))
            {
                
                //this.engrenagensRef.engrenagens[i].setDepth(-100);
                /*
                if(Esteira.VelocidadeOriginal != 0)
                {
                    Esteira.Velocidade = Esteira.VelocidadeOriginal;
                }
    */
                if(Esteira.Travado == true || this.engrenagensRef.engrenagens[i].Travado == true)
                {
                    this.engrenagensRef.engrenagens[i].Travado = true;
                    Esteira.Travado = true;
                    this.engrenagensRef.engrenagens[i].Velocidade = 0;
                    Esteira.Velocidade = 0;
                } else {
    
                    if((Esteira.Velocidade > 0 && this.engrenagensRef.engrenagens[i].Velocidade < 0) ||
                    (Esteira.Velocidade < 0 && this.engrenagensRef.engrenagens[i].Velocidade > 0))
                    {
                        Esteira.Velocidade = 0;
                        Esteira.Travado = true;
                        this.engrenagensRef.engrenagens[i].Travado = true;
                        this.engrenagensRef.engrenagens[i].Velocidade = 0;
                    } else {
    
                        if(Math.abs(Esteira.Velocidade) > Math.abs(this.engrenagensRef.engrenagens[i].Velocidade))
                        {
                            this.engrenagensRef.engrenagens[i].Velocidade = Esteira.Velocidade / 100;
                        }
                        else if(Math.abs(Esteira.Velocidade) < Math.abs(this.engrenagensRef.engrenagens[i].Velocidade))
                        {
                            Esteira.Velocidade = this.engrenagensRef.engrenagens[i].Velocidade * 100;
                        }
                        console.log(Esteira.Velocidade);
                    }
                }
            }
        }
    }

        update(delta, time)
        {
            for(let i = 0; i < this.esteiras.length; i++)
                {
            this.DefinirVelocidade(this.esteiras[i]);
                }
        this.RodarEsteiras();
        }
        }