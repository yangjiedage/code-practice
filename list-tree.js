const list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 1 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 2 },
  { id: 5, name: '部门E', parentId: 0 },
];

// 期待结果：
// [
//   { id: 1, name: '部门A', parentId: 0, children: [...] },
//   { id: 5, name: '部门E', parentId: 0, children: [] }
// ]

function listToTree(list) {
  const res = [];
  const treeMap = {};
  for (let i = 0; i < list.length; i++) {
    treeMap[list[i].id] = list[i];
    treeMap[list[i].id].children = []
  }
  for (let i = 0; i < list.length; i++) {
    const pid = list[i].parentId
    if (pid === 0) {
      res.push(list[i])
    } else if(treeMap[pid]) {
      treeMap[pid].children.push(list[i])
    }
  }

  return res;
}

console.log(listToTree(list))