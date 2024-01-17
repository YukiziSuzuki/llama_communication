from llama_cpp import Llama

# LLMの準備
llm = Llama(model_path="K:\llama.cpp\models\ELYZA-japanese-Llama-2-7b-instruct-q5_K_M.gguf")

# プロンプトの準備
prompt = """### Instruction: What is the height of Mount Fuji?
### Response:"""

# 推論の実行
output = llm(
    prompt,
    temperature=0.1,
    stop=["Instruction:", "Input:", "Response:", "\n"],
    echo=True,
)
print(output["choices"][0]["text"])