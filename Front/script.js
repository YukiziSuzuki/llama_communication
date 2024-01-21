//ボタンを押されたら
//サーバに送信・サーバからの返答を受信・返答を画面に表示
//
//ユーザ入力：UserSubmit
//ボット出力：BotResponce

//ボタンを押したら送信される
//例外：何も入力されなかった場合？何も返さない

//llama.cppのエンドポイントURL(今回はローカル)
const endpoint = "http://localhost:8000/v1/chat/completions";

//llamaに送信するメッセージ(system:事前プロンプト、user:ユーザ入力文章)

var bot_response_json = "";



window.onload = function(){
    userInputButton = document.getElementById('user_submit');

    userInputButton.addEventListener('click', async () => {
        let user_input = document.getElementById('user_input');
        // 空行の場合送信不可
        if (!user_input.value || !user_input.value.match(/\S/g)) return false;
        //送信ボタンを押されたとき、更新を防ぐ(?)
        //どうしよう？？
    
        //Enterで送信しようとしたとき
        //未実装、後回し
        //なんかできてた
        //できなくなりました
        
        // ulとliを作り、右寄せのスタイルを適用し投稿する
        const ul = document.getElementById('chat_ul');
        const li = document.createElement('li');
        const div = document.createElement('div');
        li.classList.add('right');
        ul.appendChild(li);
        li.appendChild(div);
        div.classList.add('chatbot-right');
        div.textContent = user_input.value;
        user_input.value = "";    
        const element = document.getElementById('chat_ul');
        element.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
        console.log(0,element.scrollHeight);

        //サーバに送信

        //[考え中…]の処理
        user_input.disabled = true;
        user_input.placeholder = "";
        user_input.style.backgroundColor = "#aBa7a9";
        
        await(askForLlama(user_input.value));
        console.log(bot_response_json);
        BotResponse(bot_response_json);
        
        
        user_input.disabled = false;
        user_input.style.backgroundColor = "#eeeeee";
        user_input.placeholder = "テキストを入力";
        //ここまで-サーバに送信
        
    });
    
    //仮置き
    botInputButton = document.getElementById('bot_submit');

    botInputButton.addEventListener('click', () => {/*こっちは偽物*/

            //サーバから受信
            let bot_response = document.getElementById('bot_response');
            // 空行の場合送信不可
            if (!bot_response.value || !bot_response.value.match(/\S/g)) return false;
            
            const ul = document.getElementById('chat_ul');
            const li = document.createElement('li');
            const div = document.createElement('div');
            li.classList.add('left');
            ul.appendChild(li);
            li.appendChild(div);
            div.classList.add('chatbot-left');
            div.textContent = bot_response.value;
        
            bot_response.value = "";
    });
};

function BotResponse(bot_response){/*こっちが本命 */
    const ul = document.getElementById('chat_ul');
    const li = document.createElement('li');
    const div = document.createElement('div');
    li.classList.add('left');
    ul.appendChild(li);
    li.appendChild(div);
    div.classList.add('chatbot-left');
    div.textContent = bot_response;
    const element = document.getElementById('chat_ul');
    element.scrollIntoView({
        behavior: "smooth",
        block: "end"
    });
    console.log(0,element.scrollHeight);
}

//llamaにリクエストを送信する関数
async function askForLlama(user_input) {
    var messages = [
        { role: 'system', content: "あなたはメイドです。あなたの名前はティアです。"},
        { role: 'user', content: user_input }
      ];
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages
        })
      });
  
      if (response.ok) {
        const result = await response.json();
        //llamaからの返答
        bot_response_json =  result.choices[0].message.content;
      } else {
        console.error('リクエストに失敗しました。');
        bot_response_json =  "[エラー]リクエストに失敗しました。";    
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
      bot_response_json =  "[エラー]サーバーとの接続に失敗しました。";    
    
    }
  }