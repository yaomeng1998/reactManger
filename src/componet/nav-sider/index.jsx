import './index.less'
import logo from '../../assets/images/logo.png'
import { Button, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import memoryUtils from '../../utils/userMemory'
import menuList from '../../config/menuConfig'
import { SketchOutlined, MoneyCollectOutlined, FontSizeOutlined } from '@ant-design/icons';
const SubMenu = Menu.SubMenu;


export default function Sider() {
  const [openKey, setOpenKey] = useState('')
  const [menuNodes, setMenuNodes] = useState()
  const location = useLocation()
  const path = location.pathname
  /*
判断当前登陆用户对item是否有权限
 */
  var hasAuth = (item) => {
    const { key, isPublic } = item
    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username
    /*
    1. 如果当前用户是admin
    2. 如果当前item是公开的
    3. 当前用户有此item的权限: key有没有menus中
     */
    if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
      return true
    } else if (item.children) { // 4. 如果当前用户有此item的某个子item的权限
      return !!item.children.find(child => menus.indexOf(child.key) !== -1)
    }

    return false
  }

  /*
   根据menu的数据数组生成对应的标签数组
   使用reduce() + 递归调用
   */
  var getMenuNodes = (menuList) => {
    // 得到当前请求的路由路径
    const path = location.pathname

    return menuList.reduce((pre, item) => {

      // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
      if (hasAuth(item)) {
        // 向pre添加<Menu.Item>
        if (!item.children) {
          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key.slice(6)}>
                <MoneyCollectOutlined />
                {/* <Icon type={item.icon} /> */}
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {
          
          // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find(cItem => {
            return path.slice(1).indexOf(cItem.key) === 0
          })
          
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem?.key) {
            setOpenKey(item.key)
            console.log(66,item.key);
          }
          // 向pre添加<SubMenu>
          pre.push((
            <SubMenu
              key={item.key}
              title={
                <span>
                  <SketchOutlined />
                  {/* <Icon type={item.icon} /> */}
                  <span>{item.title}</span>
                </span>
              }
            >
              {getMenuNodes(item.children)}
            </SubMenu>
          ))
        }
      }

      return pre
    }, [])
  }
  useEffect(() => {
    setMenuNodes(getMenuNodes(menuList))
  }, [])
  if (path.indexOf('/product') === 0) { // 当前请求的是商品或其子路由界面
    path = '/product'
  }
  console.log(11,openKey);
  return (
    <div className='nav-sider'>
      {/* 头部 */}
      <div className="sider-header">
        <img src={logo} alt="" />
        <h1>后台管理系统</h1>
      </div>
      {/* menu */}
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[path.slice(1)]}
        defaultOpenKeys={[openKey]}
      >
        {
          menuNodes
        }

      </Menu>
    </div>
  )
}
