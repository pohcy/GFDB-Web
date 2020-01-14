import React from 'react'
import {
  Table,
} from 'antd'
import les from './index.less'
import Map from '@/services/BattleFieldMap'

const TeamCanvas = ({
  app,
  maps,
}) => {
  // 属性获取
  const {
    clientType,
    clientWidth,
    tableProps,
  } = app
  const {
    enemyTeamSelected,
    currentTurn,
  } = maps
  const {
    enemy_in_team_info,
  } = window.mDB
  
  // 属性定义
  const ids = enemyTeamSelected.member_ids || []
  const data = ids.map(id => {
    var member = enemy_in_team_info[id]
    var lvUp = window.gameIns.getEnemyTeamLvCorrection(enemyTeamSelected, currentTurn);
    var enemy = window.gameIns.getEnemyCharAtLevel(member.enemy_character_type_id, member.level + lvUp, member.number);
    
    return {
      id: id,
      name: __(enemy.name),
      number: enemy.number,
      level: enemy.level,
      maxlife: Math.ceil(enemy.life / enemy.number),
      pow: enemy.pow,
      rate: enemy.rate,
      hit: enemy.hit,
      dodge: enemy.dodge,
      range: enemy.range,
      speed: enemy.speed,
      armor_piercing: enemy.armor_piercing,
      armor: enemy.armor,
      def_break: enemy.def_break,
      def: enemy.def,
      def_percent: `${member.def_percent}%`,
      coordinator_x: member.coordinator_x,
      coordinator_y: member.coordinator_y,
      character: __(enemy.character),
    }
  })
  const map = new Map(enemyTeamSelected,data);
  map.generate();

  return (
    <div className={les.wrapepr}>
      <div className={les.canvasArea}>
      <canvas id="team_canvas_main" width="0" height="0" />
      </div>
    </div>
  )
}

export default TeamCanvas
