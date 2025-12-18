module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/lllyasviel/FramePack app",
        ]
      }
    },
    {
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        message: [
          "copy /Y demo_gradio_k.py app",
          "copy /Y demo_gradio_f1.py app"
        ]
      },
    },
    {
      when: "{{platform !== 'win32'}}",
      method: "shell.run",
      params: {
        message: [
          "cp -f demo_gradio_k.py app",
          "cp -f demo_gradio_f1.py app"
        ]
      },
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          // xformers: true,
          // triton: true,
          // sageattention: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt",
          "uv pip install hf_xet"
        ]
      }
    },
    {
      method: 'input',
      params: {
        title: 'Installation completed',
        description: 'Click "Start FramePack (Standard)", "Start FramePack (F1)" or "Start FramePack (Key Frame)" in the left menu to launch the app manually'
      }
    },
  ]
}
