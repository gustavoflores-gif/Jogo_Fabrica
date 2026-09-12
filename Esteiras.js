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

    if(angulo == Math.PI / 2)
    {
        Esteira.body.setSize(21.3 * Comprimento, 45 / Comprimento);
    }
    Esteira.setDisplaySize(45, 30 * Comprimento);

    const largura = Esteira.displayWidth;
    const altura = Esteira.displayHeight;

    Esteira.Pedacos = this.scene.add.tileSprite(
        Esteira.x, Esteira.y, largura, altura, pedacosTextura
    );
    Esteira.Pedacos.setRotation(angulo);



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

update(delta, time)
{
this.RodarEsteiras();
}
}