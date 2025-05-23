module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          //"git clone https://github.com/SUP3RMASS1VE/FramePack-fork app",
          //"git clone https://github.com/cocktailpeanut/FramePack app",
          "git clone https://github.com/lllyasviel/FramePack app",
        ]
      }
    },
    {
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        message: "copy /Y demo_gradio_k.py app"
      },
    },
    {
      when: "{{platform !== 'win32'}}",
      method: "shell.run",
      params: {
        message: "cp -f demo_gradio_k.py app"
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
          // triton: true   // uncomment this line if your project requires triton
          // sageattention: true   // uncomment this line if your project requires sageattention
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      method: 'input',
      params: {
        title: 'Installation completed',
        description: 'Click "Start FramePack (Standard) Or Start FramePack (F1 Version) in the left menu to launch the app manually'
      }
    },
  ]
}
