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
  let opcao = 3;
  let pinosarray = [];
  let engrenagensobj;
  let PodeMudarOpcao = true;
  let MaisProximo = 0;
  
  function preload() {

    //LoadAnima('assets/Engrenagem16', )
    this.load.image('fundo','assets/fundo3.png');
    this.load.image('Engrenagem16','assets/Engrenagem16.png');
    this.load.image('Engrenagem32','assets/Engrenagem32.png');
    this.load.image('Engrenagem8','assets/Engrenagem8.png');
    this.load.image('FundoEsteira','assets/FundoEsteira.png');
    this.load.image('PedacoEsteira','assets/PedacoEsteira.png');
    this.load.image('PedacoFundo','assets/PedacoFundo.png');
    this.load.image('PedacoFundoPossivel','assets/PedacoFundoPossivel.png');
    this.load.image('Pino','assets/Pino.png');

  }

  function create(){

    //this.fundo = this.add.image(this.scale.width / 2,this.scale.height / 2,'fundo');
    //this.fundo.setDisplaySize(this.scale.width,this.scale.height);

    Mouse = this.input.activePointer;

this.input.on('gameobjectdown', (pointer, gameObject) => {

      for(let i = 0; i < pinosarray.length; i++)
      {
        if(Phaser.Math.Distance.Between(pointer.x, pointer.y, pinosarray[i].x, pinosarray[i].y) <
         Phaser.Math.Distance.Between(pointer.x, pointer.y, pinosarray[MaisProximo].x, pinosarray[MaisProximo].y))
        {
          MaisProximo = i;
        }
      }

    const PinoClicado = pinosarray[MaisProximo];

    CriarObjeto(pinosarray[MaisProximo]);

    switch (gameObject.Tipo) {
        case 'Pino':
            //CriarObjeto(pinosarray[MaisProximo]);
            //console.log(pinosarray[MaisProximo].x, pinosarray[MaisProximo].y);
            break;
        case 'Esteira':
            //CriarObjeto(gameObject);
            //SelecionarEsteira(gameObject);
            break;
        case 'Engrenagem':
            ConectarEngrenagem(gameObject);
            break;
    }

});
    this.input.keyboard.on('keydown', (event) => {

      if(PodeMudarOpcao)
      {
        opcao = event.key;
      }

    });

        Fundo = this.add.tileSprite(
        this.scale.width / 2,this.scale.height / 2,
        this.scale.width,this.scale.height,
        'PedacoFundo'
        );

    engrenagensobj = new Engrenagens(this);
    esteira = new Esteiras(this, engrenagensobj);
  
    pinos = this.physics.add.staticGroup();
        qtPinos = 0;
    for(let i = 0; i < this.scale.width/45;i++)
    {
          for(let j = 0; j < this.scale.width/45;j++)
    {

      pinosarray[qtPinos] = pinos.create(i * 45 + 22.5,j * 45 + 22.5,'Pino');
      pinosarray[qtPinos].setInteractive();
      pinosarray[qtPinos].Tipo = 'Pino';
      qtPinos += 1;
    }
    }

    engrenagensobj.CriarEngrenagem(382.5,202.5,16,'Engrenagem16',Math.PI/100,Math.PI / 5);
    engrenagensobj.CriarEngrenagem(292.5,202.5,16,'Engrenagem16',-Math.PI/1000,0);
  }

function CriarObjeto(gameObject)
  {

    switch (opcao)
    {
      case '1':
    engrenagensobj.CriarEngrenagem(gameObject.x,gameObject.y,8,'Engrenagem8',0,Math.PI / 5);
      break

      case '2':
    engrenagensobj.CriarEngrenagem(gameObject.x,gameObject.y,16,'Engrenagem16',0,Math.PI / 5);
      break

      case '3':
    engrenagensobj.CriarEngrenagem(gameObject.x,gameObject.y,32,'Engrenagem32',0,Math.PI / 5);
      break

      case '4':

      PrimeiroX = gameObject.x;
      PrimeiroY = gameObject.y;

      opcao = '99';
      PodeMudarOpcao = false;

      break

      case '99':
        if(PrimeiroX != gameObject.x && PrimeiroY != gameObject.y)
        {
          console.log("Não alinhados");
          return;
        } else if (PrimeiroX == gameObject.x && PrimeiroY != gameObject.y)
        {
      esteira.CriarEsteira((PrimeiroX + gameObject.x)/2, (PrimeiroY + gameObject.y)/2, 
      (Math.abs(PrimeiroY - gameObject.y)) /45, 
      'FundoEsteira',0,0, 'PedacoEsteira');
        } else if(PrimeiroX != gameObject.x && PrimeiroY == gameObject.y)
        {
      esteira.CriarEsteira((PrimeiroX + gameObject.x)/2, (PrimeiroY + gameObject.y)/2, 
      (Math.abs(PrimeiroX - gameObject.x))/45, 
      'FundoEsteira',0,Math.PI / 2, 'PedacoEsteira');
        }

      PodeMudarOpcao = true;

      break
    }
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

  /*
Para rodar o projeto localmente sem o Live Server:

python -m http.server 8000

Depois, acessar no navegador:

http://localhost:8000

Para salvar as alterações no GitHub:

git add .
git commit -m "Descrição da alteração"
git push

*/
