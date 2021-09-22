import { TaskManager } from './C.js';

(async () => {  
  const generateJob = (id) =>  
      function () {  
          return new Promise((resolve, reject) => {  
              setTimeout(() => {  
                  Math.random() > 0.8 ? resolve() : reject();  
              }, Math.random() * 2000);  
          });  
      };  

  const tm = new TaskManager(3);  

  tm.addToQueue({  
      id: "id0",  
      priority: 10,  
      job: generateJob("id0"),  
  });  
  tm.addToQueue({  
      id: "id1",  
      priority: 1,  
      job: generateJob("id1"),  
  });  
  tm.addToQueue({  
      id: "id2",  
      priority: 10,  
      job: generateJob("id2"),  
  });  
  tm.addToQueue({  
      id: "id3",  
      priority: 5,  
      job: generateJob("id3"),  
  });  

  const report = await tm.run();  
  console.log(report);  
})();
