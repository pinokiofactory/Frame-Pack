module.exports = async (kernel) => {
  const port = await kernel.port()
  
  console.log("Starting F1 version directly")
  const scriptToRun = "demo_gradio_f1.py"
  
  return {
    daemon: true,
    run: [
      {
        method: "shell.run",
        params: {
          venv: "env",
          env: { },
          path: "app",
          message: [
            `python ${scriptToRun} --server 127.0.0.1 --port ${port}`,
          ],
          on: [{
            "event": "/http:\/\/\\S+/",
            "done": true
          }]
        }
      },
      {
        method: "local.set",
        params: {
          url: "{{input.event[0]}}"
        }
      }
    ]
  };

}; 
