import React from 'react'
import {
  Modal,
} from 'antd'
import les from './index.less'

const ModalAbout = ({
  about,
  ...props,
}) => {
  // 定义属性
  const propsOfModal = {
    ...props,
    wrapClassName: les.modal,
  }

  return (
    <Modal {...propsOfModal}>
      <table className={les.table}>
        <tbody>
          <tr>
            <td>{about.admin}</td>
            <td>
              <span>pohcy (에무1918)</span>
            </td>
          </tr>
          <tr>
            <td>{about.designer}</td>
            <td className={les.author}>
              <a href="https://weibo.com/u/1061878751" target="_blank">
                电脑小龟L.T.
              </a>
              <a href="https://twitter.com/CCX_CX_D" target="_blank">
                (CCX_CX_D)
              </a>
              <a href="https://github.com/Runtu4378" target="_blank">
                闰土
              </a>
            </td>
          </tr>
          <tr>
            <td>{about.translator_KR}</td>
            <td>
              <span>KOZ39, marty</span>
            </td>
          </tr>
          <tr>
            <td>{about.thanks}</td>
            <td>
              <span>星光下的彩虹, 杯具终产物, 多多鱼鸟, <a href="https://gf.fws.tw/">少女前線資料庫</a>, 245795867a, iorph, myong, lins1122</span>
            </td>
          </tr>
          <tr>
            <td>{about.repository}</td>
            <td>
              <a href="https://github.com/pohcy/GFDB-Web">
                GitHub
              </a>
            </td>
          </tr>
          <tr>
            <td>{about.feedback}</td>
            <td>
              <a href="https://github.com/pohcy/GFDB-Web/issues">
                GitHub
              </a>
            </td>
          </tr>
          <tr>
            <td colSpan="2">{about.image_copyright}</td>
          </tr>
        </tbody>
      </table>
    </Modal>
  )
}

export default ModalAbout
