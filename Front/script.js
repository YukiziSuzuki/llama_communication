//ボタンを押されたら
//サーバに送信・サーバからの返答を受信・返答を画面に表示
//
//ユーザ入力：UserSubmit
//ボット出力：BotResponce

//ボタンを押したら送信される
//例外：何も入力されなかった場合？何も返さない

window.onload = function(){
    userInputButton = document.getElementById('user_submit');

    userInputButton.addEventListener('click', () => {
        let user_input = document.getElementById('user_input');
        // 空行の場合送信不可
        if (!user_input.value || !user_input.value.match(/\S/g)) return false;
        //送信ボタンを押されたとき、更新を防ぐ(?)
        //どうしよう？？
    
        //Enterで送信しようとしたとき
        //未実装、後回し
        
        // ulとliを作り、右寄せのスタイルを適用し投稿する
        const ul = document.getElementById('chat_ul');
        const li = document.createElement('li');
        const div = document.createElement('div');
        li.classList.add('right');
        ul.appendChild(li);
        li.appendChild(div);
        div.classList.add('chatbot-right');
        div.textContent = user_input.value;
        //サーバに送信
        user_input.value = "";
        
    });
    
    //仮置き
    botInputButton = document.getElementById('bot_submit');

    botInputButton.addEventListener('click', () => {/*こっちは偽物*/
        //function BotResponse(){/*こっちが本命 */
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

