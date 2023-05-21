import { Tree, Form, Input } from 'antd';
import React, { useEffect, useState ,useImperativeHandle} from 'react';
import menusList from '../../config/menuConfig'
const Auth = (props,ref) => {
  const { role, role: { menus } } = props
  const [selectedNodes, setSelectedNodes] = useState(menus)
  useEffect(()=>{
    setSelectedNodes(role.menus)
  },[props])
  //第二种写法
  // const [nodeList, setNodeList] = useState([])
  const [snodeList, setSNodeList] = useState([])
  //第二种写法
  // var getNodes = (list) => {
  //   return list.reduce((pre, current) => {
  //     pre.push(
  //       <Tree.TreeNode title={current.title} key={current.key}>
  //         {current.children ? getNodes(current.children) : null}
  //       </Tree.TreeNode>)
  //     return pre
  //   }, [])
  // }

  var secondgetNodes = (list) => {
    if (list == undefined) return null
    return list.reduce((pre, current) => {
      pre.push(
        {
          title: current.title,
          key: current.key,
          children: secondgetNodes(current.children)
        }
      )
      return pre
    }, [])
  }
  useEffect(() => {
    //第二种写法
    // setNodeList(getNodes(menusList))
    setSNodeList(secondgetNodes(menusList))
  }, [])
  //点击复选框
  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys);
    setSelectedNodes(checkedKeys)
  };
  useImperativeHandle(ref, () => {
      return selectedNodes
  })
  return (
    <>
      <Form>
        <Form.Item
          label='角色名称'>
          <Input value={role.name} disabled />
        </Form.Item>
      </Form>
      <Tree
        defaultExpandAll={true}
        checkable
        treeData={snodeList}
        checkedKeys={selectedNodes}
        onCheck={onCheck}
      />
    </>
  );
};
export default React.forwardRef(Auth)