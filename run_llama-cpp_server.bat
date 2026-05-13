@echo off
set LLAMA_ARG_HOST=0.0.0.0

llama-server ^
  -hf unsloth/gemma-4-E4B-it-GGUF:UD-Q4_K_XL ^
  --port 8080 ^
  -c 131072 ^
  --batch-size 512 ^
  --ubatch-size 512 ^
  --threads 8 ^
  --n-gpu-layers 999 ^
  --flash-attn on

pause