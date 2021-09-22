class TaskManager {
  queue = []
  robots = []
  N = 0
  constructor(N){
    for (let i = 0; i < N; i ++){
      this.robots.push({  
        successCount: 0,
        failedCount: 0,  
        tasks: [],
        timeSpent: 0,
      })
    }
  };    
  addToQueue(task){
    this.queue.push(task)
  };
  runTask(taskInd=0){
    if (taskInd == this.queue.length){
      return new Promise(resolve => resolve(this.robots))
    }
    const task = this.queue[taskInd]
    let ind = 0
    this.robots.forEach((robot, newInd, robots) => {
      if (robot.timeSpent < robots[ind].timeSpent){
        ind = newInd
      }
    })
    const startTime = new Date();
    return new Promise(resolve => {
      task.job()
      .then(() => {
        this.robots[ind].successCount ++
      })
      .catch(() => {
        this.robots[ind].failedCount ++
      })
      .finally(() => {
        const endTime = new Date();
        this.robots[ind].tasks.push(task.id)
        this.robots[ind].timeSpent += endTime - startTime
        resolve(this.runTask(taskInd+1))
      })
    })
  }
  run() {
    this.queue = this.queue.sort((a, b) => b.priority - a.priority)
    return this.runTask()
  };  
}  

module.exports = { TaskManager };