module.exports = async (kernel) => {
  const port = await kernel.port()
  
  console.log("Starting standard version directly")
  const scriptToRun = "demo_gradio.py"
  
  return {
    requires: {
      bundle: "ai",
    },
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
            "event": "/http:\/\/[0-9.:]+/",
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
