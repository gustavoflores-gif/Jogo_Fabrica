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

    Esteira.setRotation(angulo);

    if(angulo == Math.PI / 2)
    {
        Esteira.body.setSize(21 * Comprimento, 44 / Comprimento);
    }

    Esteira.setDisplaySize(60, 40 * Comprimento);

    // largura/altura do tile calculadas a partir do tamanho final da esteira,
    // não do tamanho bruto da textura
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
        //for()
    }

update(delta, time)
{
this.RodarEsteiras();
}
}