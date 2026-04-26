function promiseQuick(tasks) {
  const results = new Array(tasks.length);
  const completed = new Array(tasks.length).fill(false);
  let nextIndexToPrint = 0; // 追踪下一个应该打印的任务索引

  tasks.forEach((task, index) => {
    task().then(res => {
      results[index] = res;
      completed[index] = true;
      console.log(`任务${index + 1}完成: ${res}`, completed, results);
      // 关键逻辑：尝试按顺序打印，
      //nextIndexToPrint记录的上一个打印的位置，每次都去检查下一个位置是否完成就打印
      while (nextIndexToPrint < tasks.length && completed[nextIndexToPrint]) {
        console.log(`任务 ${nextIndexToPrint + 1} 结果:`, results[nextIndexToPrint]);
        nextIndexToPrint++;
      }
    })
  });
}

const sleep = (ms, val) => () => new Promise(resolve => setTimeout(() => resolve(val), ms));

const taskList = [
  sleep(3000, "我是老大 (慢)"), 
  sleep(1000, "我是老二 (快)"), 
  sleep(2000, "我是老三 (中)"),
  sleep(5000, "我是老四 (最慢)"),
];

promiseQuick(taskList);