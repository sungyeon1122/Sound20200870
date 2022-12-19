let musicFile; //nctdream-hellofuture
let musicFile2; //nctdream-glitch mode
let button; //노래재생
let button2; //노래선택
let button3;
let button4;
let button5;
let button6;
var jumpButton;
var jumpButton2;
var jumpButton3;
var jumpButton4;
var jumpButton5;
var text1;
let sliderVolume; //볼륨조절
var t=0;
let amp;
var rB;
let music;
let img; //배경이미지
let img2;
let img3;
let r,g,b;
let spectrum;
let h = 0;  // 막대 64개의 높이 배열
let w = (800-40) / 64 / 2;  // 막대 하나의 가로 길이

function setup()
{
    fft = new p5.FFT();

    img=loadImage("HelloFuture.jpg"); //배경이미지
    img2=loadImage("GlitchMode.jpg");
    img3=loadImage("STOP.jpg");
    createCanvas(640, 480);
    textSize(15);
    soundFormats('mp3', 'ogg');
    musicFile = loadSound('music', loadMusic);
    musicFile2 = loadSound('music2', loadMusic);
    //노래PLAY
    button = createButton("play");
    button.mousePressed(togglePlaying1);
    //노래STOP
    button6 = createButton("Stop");
    button6.mousePressed(togglePlaying6);
    //노래선택
    button2 = createButton("Music1");
    button2.mousePressed(togglePlaying2);
    music = 1;
    //볼륨조절
    text1=createElement('volume',' volume ');
    sliderVolume=createSlider(0,2,1,0.1);
    //text(sliderVolume.value(),0,10);
    //v=sliderVolume.value();
    //속도조절
    button3=createButton("0.5배속");
    button3.mousePressed(togglePlaying3);
    button4=createButton("1배속");
    button4.mousePressed(togglePlaying4);
    button5=createButton("2배속");
    button5.mousePressed(togglePlaying5);

    //재생위치조절 5단계 jump

    //뒤로가기
    jumpButton2=createButton("-20초");
    jumpButton2.mousePressed(togglePlaying10);

    jumpButton2=createButton("-10초");
    jumpButton2.mousePressed(togglePlaying7);

    //앞으로가기
    jumpButton=createButton("+10초");
    jumpButton.mousePressed(togglePlaying8);

    jumpButton3=createButton("+20초");
    jumpButton3.mousePressed(togglePlaying9);

    jumpButton3=createButton("+30초");
    jumpButton3.mousePressed(togglePlaying11);


    amp = new p5.Amplitude();
}

//노래재생
function togglePlaying1(){
    if(music === 1){
        if(!musicFile.isPlaying()){
            // rB=musicFile.reverseBuffer();
            musicFile.rate(1);
            musicFile.play();
            button.html('pause');
        }else{
            musicFile.pause();
            button.html('play');
        }
    }
    if(music === 2){
        if(!musicFile2.isPlaying()){
            // rB=musicFile.reverseBuffer();
            //musicFile2.jump(200);
            musicFile2.rate(1);
            musicFile2.play();
            button.html('pause');
        }else{
            musicFile2.pause();
            button.html('play');
        }
    }
 }

//노래선택
 function togglePlaying2(){
    if(music === 1){
        music = 2;
        musicFile.rate(1);
        musicFile.stop();
        clear();
        button.html('play');
        button2.html('Music2');
    }else{
        music = 1;
        musicFile2.rate(1);
        musicFile2.stop();
        clear();
        button.html('play');
        button2.html('Music1');
    }
    console.log(music);
 }

//속도조절 0.5배속
 function togglePlaying3(){
    if(music===1){
        musicFile.rate(0.5);
    }else{
    musicFile2.rate(0.5);
    }
 }
  //속도조절 1배속
  function togglePlaying4(){
    if(music===1){
        musicFile.rate(1);
    }else{
    musicFile2.rate(1);
    }
 }
 //속도조절 2배속
 function togglePlaying5(){
    if(music===1){
        musicFile.rate(2);
    }else{
    musicFile2.rate(2);
    }
 }
 //노래 Stop
 function togglePlaying6(){
    if(music===1){
        musicFile.stop();
        musicFile.rate(1);
        button.html('play');
        clear();
    }else{
    musicFile2.stop();
    musicFile2.rate(1);
    button.html('play');
    clear();
    }
 }
//노래 위치 조정 -10
 function togglePlaying7(){
    if(music===1){
        //musicFile.jump(10);
        var len = musicFile.currentTime();
        musicFile.jump( len-10);
    }else{
        var len2=musicFile2.currentTime();
        musicFile2.jump(len2-10);
    }
 }
//노래 위치 조정 +10
  function togglePlaying8(){
    if(music===1){
        //musicFile.jump(10);
        var len3 = musicFile.currentTime();
        musicFile.jump( len3+10);
    }else{
        var len4=musicFile2.currentTime();
        musicFile2.jump(len4+10);
    }
 }

 //노래 위치 조정 +20
 function togglePlaying9(){
    if(music===1){
        //musicFile.jump(10);
        var len5 = musicFile.currentTime();
        musicFile.jump( len5+20);
    }else{
        var len6=musicFile2.currentTime();
        musicFile2.jump(len6+20);
    }
 }

 //노래 위치 조정 -20
 function togglePlaying10(){
    if(music===1){
        //musicFile.jump(10);
        var len7 = musicFile.currentTime();
        musicFile.jump( len7-20);
    }else{
        var len8=musicFile2.currentTime();
        musicFile2.jump(len8-20);
    }
 }

  //노래 위치 조정 +30
  function togglePlaying11(){
    if(music===1){
        //musicFile.jump(10);
        var len9 = musicFile.currentTime();
        musicFile.jump( len9+30);
    }else{
        var len10=musicFile2.currentTime();
        musicFile2.jump(len10+30);
    }
 }
 
function loadMusic()
{
    console.log("It's Working");
}

  // 음악 visualize 함수
function visualize() {
    noStroke();
    r= random(255);
    g=random(255);
    b=random(255);
    fill(r,g,b);
      for (let i = 0; i < 64; i++) {  // 막대 개수 64개
        h = map(spectrum[i*10], 0, 300, 5, 200);  // spectrum 10 단위로 일부 값만 가져옴
        rect(2+2*w*i, 0, w, h);  // 위치를 20씩 이동하며 막대기 생성
      }
  }

function draw(){
    musicFile.setVolume(sliderVolume.value());
    musicFile2.setVolume(sliderVolume.value());
    spectrum = fft.analyze();


    if (musicFile.isPlaying()) { // 음악 실행되면
        image(img,0,0,640,480);
        visualize();  // 음악 visualize
      }
      else if(musicFile2.isPlaying()){
        image(img2,0,0,640,480);
        visualize();  // 음악 visualize
      } else {  // 음악이 정지해 있으면
        clear();  // 플레이 버튼 보이기
        image(img3,0,0,640,480);
      }


}
