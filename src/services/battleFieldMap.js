import $ from 'jquery'
import ImgLoader from './imgLoader'

const { saveAs } = require('file-saver/dist/FileSaver.min.js')

const CANVAS_MAIN_ID = 'team_canvas_main'
const WATERMARK = 'https://gf.hometehomete.com/'
const IMAGE_BASEPATH = `${PUBLIC_PATH}static/img`

const CANVAS_WIDTH = 1184;
const CANVAS_HEIGHT = 300;

const CANVAS_BACKGROUND_COLOR = "#fff";
const CANVAS_MYTEAM_COLOR = "rgb(65,120,200)";
const CANVAS_ENEMY_COLOR = "brown";
const CANVAS_ENEMY_TEXT_COLOR = "brown";
const CANVAS_WATERMARK_COLOR = "#808080";
const CANVAS_GRID_COLOR = "#e2e2e2";
const CANVAS_MYTEAM_FRONTLINE_COLOR = "orange";
const CANVAS_MYTEAM_EX_FRONTLINE_COLOR = "purple";

const imgLoader = new ImgLoader()

class BattleFieldMap {
  mainCanvas = null
  enemys = null

  // enemyTeam = null
  // enemyTeamId = null
  // mission_info = null
  // spot_info = null
  // enemy_team_info = null
  // enemy_character_type_info = null
  // gun_info = null
  // ally_team_info = null
  // building_info = null

  grid_width = 50
  grid_height = 12

  /**
   * init map canvas Object
   */
  constructor (enemyTeam,enemys) {
    this.enemyTeam = enemyTeam
    this.enemyTeamId = enemyTeam.id || 0
    this.enemys = enemys

    // this.mission_info = mDB.mission_info,
    // this.spot_info = mDB.spot_info,
    // this.enemy_team_info = mDB.enemy_team_info,
    // this.enemy_character_type_info = mDB.enemy_character_type_info,
    // this.gun_info = mDB.gun_info,
    // this.ally_team_info = mDB.ally_team_info,
    // this.building_info = mDB.building_info

    // init Object data
    this.mainCanvas = document.getElementById(CANVAS_MAIN_ID);
    
    $("#team_canvas_main").width(CANVAS_WIDTH+"px")
    $("#team_canvas_main").height(CANVAS_HEIGHT+"px")
  }

  // show = false
  // missionId = 1
  // mapImgName = null
  // enemyPowerImgName = `${IMAGE_BASEPATH}/misc/power.png`
  // friendStatsImgName = `${IMAGE_BASEPATH}/misc/friendstats.png`
  // displayWidth = 0    // fg_x max
  // displayHeight = 0   // fg_y max
  // dx = 0              // bg_x offset
  // dy = 0              // bg_y offset
  // scale = 1.0         // = fg_xy / bg_xy
  // scaleMin = 1.0
  // turnNo = 1
  // selectedSpots = []

  /**
   * generate the map of target map
   */
  generate () {
    imgLoader.onload(() => {
      this.drawMainImage(this.mainCanvas);
    });
  }

  drawMainImage (canvas) {
    // var scale = this.scale;
    if (canvas != null && canvas.getContext){
      var ctx = canvas.getContext('2d');
      this.width = Math.abs(CANVAS_WIDTH);
      this.height = Math.abs(CANVAS_HEIGHT);
      //this.scaleMin = this.clientWidth / this.width;
      this.mainCanvas.width = this.width// * this.scaleMin;
      this.mainCanvas.height = this.height// * this.scaleMin;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
      ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
      ctx.fill();
      
      this.drawGrid(ctx);

      this.drawFrontlineGrid(ctx);

      this.drawMyTeam(ctx);

      this.drawEnemy(ctx);

      this.drawWatermark(ctx);
    }
  }

  drawGrid(ctx){
    ctx.fillStyle = CANVAS_GRID_COLOR
    //width
    for(var i = 0; i <= this.grid_height; i++){
      var y = (this.height * i / this.grid_height)
      
      ctx.fillRect(0,y,this.width,1);
      ctx.fill();
    }

    //height
    for(var i = 0; i <= this.grid_width; i++){
      var x = (this.width * i / this.grid_width)
      
      ctx.fillRect(x,0,1,this.height);
      ctx.fill();
    }
  }

  drawFrontlineGrid(ctx){
    var frontline = 8.79;
    var ex_frontline = 10.79;

    var frontline = (this.width * (frontline + 5) / this.grid_width)
    var ex_frontline = (this.width * (ex_frontline + 5) / this.grid_width)

    ctx.fillStyle = CANVAS_MYTEAM_FRONTLINE_COLOR;
    ctx.fillRect(frontline,0,1,this.height);
    ctx.fill();

    ctx.fillStyle = CANVAS_MYTEAM_EX_FRONTLINE_COLOR;
    ctx.fillRect(ex_frontline,0,1,this.height);
    ctx.fill();
  }

  drawMyTeam(ctx){
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        var x = -1.7  + 2.4 * i
        var y = -0.09 + 4.2 * j 

        var x = (this.width * (x + 5) / this.grid_width)
        var y = ctx.canvas.height - (this.height * (y + 2) / this.grid_height)  

        this.drawMyTeamCircle(ctx,x,y,3);
      }
    }
  }

  drawMyTeamCircle(ctx,x,y,r){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = CANVAS_MYTEAM_COLOR;
    ctx.strokeStyle = CANVAS_MYTEAM_COLOR;
    ctx.fill();
    ctx.stroke();
  }

  drawEnemy(ctx){
    $.each(this.enemys, (index,enemy) => {      
      var x = (this.width * (enemy.coordinator_x + 5) / this.grid_width)
      var y = ctx.canvas.height - (this.height * (enemy.coordinator_y + 2) / this.grid_height)

      this.drawEnemyCircle(ctx,x,y,4);
      this.drawEnemyName(ctx,x,y,enemy.name);
    });
  }

  drawEnemyCircle(ctx,x,y,r){
    ctx.beginPath();
    ctx.arc(x,y, r, 0, 2 * Math.PI);
    ctx.fillStyle = CANVAS_ENEMY_COLOR;
    ctx.strokeStyle = CANVAS_ENEMY_COLOR;
    ctx.fill();
    ctx.stroke();
  }

  drawEnemyName(ctx,x,y,name){
    ctx.save();
    ctx.font = "16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.globalAlpha = 0.8;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "transparent";
    ctx.strokeText(name,x,y - 5);
    ctx.fillStyle = CANVAS_ENEMY_TEXT_COLOR;
    ctx.fillText(name,x,y - 5);
    ctx.restore();
  }

  drawWatermark (ctx) {
    ctx.save();
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "end";
    ctx.textBaseline = "bottom";
    ctx.globalAlpha = 0.8;
    ctx.lineWidth = 3;
    this.drawWatermarkText(ctx, WATERMARK, ctx.canvas.width - 6, ctx.canvas.height - 2)
    ctx.restore();
  }

  drawWatermarkText (ctx, text, x, y) {
    ctx.strokeStyle = CANVAS_BACKGROUND_COLOR;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = CANVAS_WATERMARK_COLOR;
    ctx.fillText(text, x, y);
  }

  // bgX2fgX (x) {
  //   return (x + this.dx) * this.scale;
  // }

  // bgY2fgY (y) {
  //   return (y + this.dy) * this.scale;
  // }

  // fgX2bgX (x) {
  //   return x / this.scale - this.dx;
  // }

  // fgY2bgY (y) {
  //   return y / this.scale - this.dy;
  // }
}

export default BattleFieldMap
