// tout est calculé à partir de la couleur d'arrière-plan
// une fois que le joueur a choisi 4 couleurs, le code compare chaque couleur d'arrière-plan de la ligne courante de la table
// avec la clé 4 couleurs à découvrir.
$(function(){
game={ligne:0,col:0,cpt:0,cle:[],result:[0,0],choix:[],ledOn:0,clignL:0,colTab:['rgb(0, 0, 0)','rgb(255, 0, 0)','rgb(0, 255, 0)','rgb(0, 0, 255)','rgb(255, 255, 0)','rgb(255, 0, 255)','rgb(0, 255, 255)','rgb(255, 255, 255)','rgb(255, 125, 0)']
};

// 4Xcouleurs random est généré
function randCol(){return game.colTab[(Math.floor(Math.random()*(8-1+1)))+1]}
function cleGen(){ 
        game.cle=[];
        for(let i=0;i<4;i++){
            var temp =  randCol();
            while(game.cle.indexOf(temp)!=-1) temp = randCol();   
            game.cle.push(temp)
        }
}
//GETTER/SETTER couleurs : GETter(without colr) & SETter(with colr)
function col(elem,colr){ 
    if(colr){$(elem).css('background-color',colr)}else{return($(elem).css('background-color'))};
}

// game matrix (html table)
$('body').append('<table ></table>');
$('body').css({
    backgroundColor: 'rgb(0, 0, 0)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})
$('table').css({height: '88vh', width: '48vh'})
for(let i=0;i<11;i++){
    $('table').append('<tr></tr>');
    for(let j=0;j<6;j++){
        let temp=$('table tr:nth-child('+(i+1)+')');
        if(i<8)j>0&&j<5?temp.append('<td class="led"></td>'):temp.append('<td class="digit"></td>')

        if(i==8 && j==0)temp.append('<td class="entreLR" ></td>')
        if(i==8 && j==1)temp.append('<td class="message" colspan="4"></td>')
        
        if(i>8)j>0&&j<5?temp.append('<td class="select"></td>'):temp.append('<td></td>');
            if(i==9&&j>0&&j<5)$('table tr:nth-child('+(i+1)+') td:nth-child('+(j+1)+')').css('background-color',game.colTab[j])
            if(i==10&&j>0&&j<5)$('table tr:nth-child('+(i+1)+') td:nth-child('+(j+1)+')').css('background-color',game.colTab[j+4])
    }
}
col('.led',game.colTab[0])
col('tr:last td:first',game.colTab[0]);
$('tr:last td:last').toggleClass('submit')
$('tr:last td:first').toggleClass('clear')
col('.clear','hotpink')

function cssInit(elem,filt,file,xpos){
    $(elem).filter(filt).css({
        backgroundImage:'url("./mastermind/img/'+file+'")',
        backgroundSize:'cover',
        backgroundPositionX: xpos +'0%',
    })
}
cssInit('td','.led, .select, .submit','led.svg');
cssInit('td','.digit','digital.png',0);
cssInit('td','.submit','digital.png',8);
cssInit('td','.clear','digital.png',7);

function reset(){ //relance le jeu
    clearTimeout(clignTO);
    muteClick(1);
    game.cpt=1;
    if(game.ligne<=8){
        cssInit('tr:nth-child('+game.ligne+') td','.digit','digital.png',0);
        $('tr:nth-child('+game.ligne+') .led').css('background-color', game.colTab[0]);
        game.ligne++;
        setTimeout(() => {reset()}, 300);
    }
    else start();
}

function gagne(){
    muteClick(1);
    clearTimeout(clignTO);
    cssInit('td','.message','message.svg',10);
    game.cpt=-1;
}

function clickSelect(){
    if($(this).css('background-position-x')=='0%' && game.cpt<5){
    $(this).css('background-position-x', '100%')
    game.col=col(this)
    if(game.cpt<5){
        game.cpt++;
        if(game.cpt==5)col('.submit','red')
        col('tr:nth-child('+game.ligne+') td:nth-child('+game.cpt+')', game.col);
    }
}
}
function clickTest(){
    if(game.cpt==5){
        clearTimeout(clignTO);
        muteClick(1);
        game.col=$('tr:nth-child('+game.ligne+') td:nth-child(5)').filter('.led').css('background-color')
        game.cpt=1;
        game.ledOn=0;
        clign();
    }
}
function clickClear(){
    col('.submit','rgb(80, 0, 0)')
    col('tr:nth-child('+game.ligne+') td', game.colTab[0])
    game.cpt=1;
    $('.select').css('background-position-x','0%')
}

function muteClick(x){x?$('td').css('pointer-events','none'):$('td').not('.message').css('pointer-events','auto')}
function over(x,onOff){onOff==1?$(x).css('opacity','0.8'):$(x).css('opacity','1')}
$('.submit').click(clickTest)
$('.select').click(clickSelect)
$('.clear').click(clickClear)
$('.message').click(reset);
onclick=function(){if(game.cpt==-1)reset()}
$('.select, .clear').mouseover(function(){over(this,1)})
$('.select, .clear').mouseleave(function(){over(this,0)})

function clignLign(){//clignottement latérales des traits 
    clignTO=setTimeout(() => {
        cssInit('tr:nth-child('+game.ligne+') td','.digit','digital.png',5);
        game.clignL++==1?game.clignL=0:cssInit('tr:nth-child('+game.ligne+') td','.digit','digital.png',6);
        clignLign();
    }, 500);
}

function clign(){ //clignottement latérales des leds (type 'calcul-ordi')
    game.cpt++; 
    game.ledOn++;
    $('tr:nth-child('+game.ligne+') td').filter('.digit').css('background-position', -2+game.cpt+'0%')
        if(game.cpt==2){
            $('tr:nth-child('+game.ligne+') td:nth-child(5)').filter('.led').css('background-color',game.col)
        }else{
            $('tr:nth-child('+game.ligne+') td:nth-child('+(game.cpt-1)+')').filter('.led').css('background-color',game.col)
        } 
    game.col=$('tr:nth-child('+game.ligne+') td:nth-child('+game.cpt+')').filter('.led').css('background-color')
    $('tr:nth-child('+game.ligne+') td:nth-child('+game.cpt+')').filter('.led').css('background-color','black')

    if(game.cpt==6)game.cpt=1;
    if(game.ledOn<15){
        setTimeout((clign),80)
    }//fin du clignottement
    else{ 
        game.choix=[];
        game.result=[0,0]
        for (let i=2;i<6;i++){ 
            let c=col('table tr:nth-child('+game.ligne+') td:nth-child('+i+')');
            if(i==2||game.choix.indexOf(c)==-1){// si la couleur n'est pas dejà dans choix ( indexOf return alors -1)
            game.choix.push(c); //ajouter une couleur au choix
            if(game.cle.indexOf(c)!=-1)game.result[0]++;//comparaison tableauClé / couleur de led en cours
            if(game.cle[i-2]==c)game.result[1]++;
        }
    }
    cssInit('tr:nth-child('+game.ligne+') td:first','.digit','digital.png',game.result[0]);
    cssInit('tr:nth-child('+game.ligne+') td:last','.digit','digital.png',game.result[1]);
    col('.submit','rgb(80, 0, 0)');

    game.ligne--;
    muteClick(0);
    clignLign();
    $('.select').css('background-position-x','0%')
    if(game.result[1]==4)gagne()
    else{
        if(game.ligne==0){cssInit('td','.message','message.svg',5);reset()}
    };
    }
    
}
function start(){
    cssInit('td','.message','message.svg',0);
    col('.submit','rgb(80, 0, 0)')
    game.ligne=8;
    game.cpt=1;
    cleGen();
    muteClick(0);
    console.log(game.cle);
    clignLign();
    $('.message').css('pointer-events','none');
}
$('.select').css('margin','50px')
start();
})