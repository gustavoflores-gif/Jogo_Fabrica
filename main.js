const config = {

    type: Phaser.AUTO,

    width: innerWidth,
    height: innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

  const game = new Phaser.Game(config);
  
  function preload() {

    //LoadAnima('assets/Engrenagem16', )
    this.load.image('fundo','assets/fundo3.png');
    this.load.image('Engrenagem16','assets/Engrenagem16.png');
    this.load.image('Engrenagem32','assets/Engrenagem32.png');
    this.load.image('Engrenagem8','assets/Engrenagem8.png');
    this.load.image('FundoEsteira','assets/FundoEsteira.png');
    this.load.image('PedacoEsteira','assets/PedacoEsteira.png');

  }

  function create(){

    this.fundo = this.add.image(this.scale.width / 2,this.scale.height / 2,'fundo');
    engrenagensobj = new Engrenagens(this);
    esteira = new Esteiras(this);

    engrenagensobj.CriarEngrenagem(370,200,16,'Engrenagem16',Math.PI/10,Math.PI / 5);
    //engrenagensobj.CriarEngrenagem(550,200,32,'Engrenagem32',0,0);
    //engrenagensobj.CriarEngrenagem(730,200,16,'Engrenagem16',0,Math.PI / 5);
    //engrenagensobj.CriarEngrenagem(815,200,8,'Engrenagem8',0,0);
    //engrenagensobj.CriarEngrenagem(950,280,32,'Engrenagem32',0,Math.PI / 5);

    esteira.CriarEsteira(600, 300, 4, 'FundoEsteira', 0,Math.PI / 2, 'PedacoEsteira');
  }

function LoadAnima(caminho, nome, frameWidth, frameHeight,scene)
  {
    scene.load.spritesheet(nome, caminho, {
        frameWidth: frameWidth,
        frameHeight: frameHeight
    });
  }

  function CriaAnima(scene,frameRate, end, repeat, key, arquivo){
      if(scene.anims.exists(key)) 
        {
          return
        };

    scene.anims.create({
    key: key,
    frames: scene.anims.generateFrameNumbers(arquivo, {
        start: 0,
        end: end
    }),
    frameRate: frameRate,
    repeat: repeat
});
  }

  function update(time, delta)
  {
    engrenagensobj.update(delta, time);
    esteira.update(delta, time);

  }